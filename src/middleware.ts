import { NextRequest, NextResponse } from "next/server";
import {
  APEX_HOSTS,
  getStaticTenantAssetPrefix,
  isStaticTenantSlug,
} from "@/lib/tenants/registry";
import {
  buildClientRewritePath,
  extractSubdomain,
  normalizeHost,
  resolveClientSlug,
} from "@/lib/tenants/resolve-tenant";

function shouldBypass(pathname: string): boolean {
  return pathname.startsWith("/_next") || pathname.startsWith("/api");
}

function rewriteToClient(request: NextRequest, slug: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = buildClientRewritePath(slug, request.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

/** Serve a Vite SPA build from `public/{assetPrefix}/` on a dedicated subdomain. */
function rewriteToStaticTenant(
  request: NextRequest,
  assetPrefix: string,
): NextResponse {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname.startsWith(`/${assetPrefix}`)) {
    return NextResponse.next();
  }

  const hasFileExtension = /\.[a-z0-9]+$/i.test(pathname);

  if (!hasFileExtension) {
    url.pathname = `/${assetPrefix}/index.html`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/${assetPrefix}${pathname}`;
  return NextResponse.rewrite(url);
}

function resolveStaticTenantFromRequest(
  request: NextRequest,
  host: string,
): NextResponse | null {
  const devTenant = request.nextUrl.searchParams.get("tenant");
  if (host === "localhost" && devTenant && isStaticTenantSlug(devTenant)) {
    return rewriteToStaticTenant(
      request,
      getStaticTenantAssetPrefix(devTenant),
    );
  }

  const bareHost = host.replace(/^www\./, "");
  if (APEX_HOSTS.has(host) || bareHost === "marineflow.co.za") {
    return null;
  }

  const subdomain = extractSubdomain(bareHost);
  if (subdomain && isStaticTenantSlug(subdomain)) {
    return rewriteToStaticTenant(
      request,
      getStaticTenantAssetPrefix(subdomain),
    );
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = normalizeHost(request.headers.get("host"));

  // Static SPAs (tinker.marineflow.co.za) — must run before asset bypass
  const staticResponse = resolveStaticTenantFromRequest(request, host);
  if (staticResponse) {
    return staticResponse;
  }

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const devTenant = request.nextUrl.searchParams.get("tenant");
  if (host === "localhost" && devTenant) {
    return rewriteToClient(request, resolveClientSlug(devTenant));
  }

  const bareHost = host.replace(/^www\./, "");

  if (APEX_HOSTS.has(host) || bareHost === "marineflow.co.za") {
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(bareHost);

  if (!subdomain) {
    return rewriteToClient(request, resolveClientSlug(""));
  }

  return rewriteToClient(request, resolveClientSlug(subdomain));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

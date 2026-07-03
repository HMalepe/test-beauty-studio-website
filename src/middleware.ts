import { NextRequest, NextResponse } from "next/server";
import { APEX_HOSTS } from "@/lib/tenants/registry";
import {
  buildClientRewritePath,
  extractSubdomain,
  normalizeHost,
  resolveClientSlug,
} from "@/lib/tenants/resolve-tenant";

function shouldBypass(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/__tinker__")
  );
}

function rewriteToClient(request: NextRequest, slug: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = buildClientRewritePath(slug, request.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const host = normalizeHost(request.headers.get("host"));

  // Local dev without subdomain: localhost:3000?tenant=beauty-studio
  const devTenant = request.nextUrl.searchParams.get("tenant");
  if (host === "localhost" && devTenant) {
    return rewriteToClient(request, resolveClientSlug(devTenant));
  }

  const bareHost = host.replace(/^www\./, "");

  // Apex portfolio
  if (APEX_HOSTS.has(host) || bareHost === "marineflow.co.za") {
    return NextResponse.next();
  }

  const subdomain = extractSubdomain(bareHost);

  // tinker.marineflow.co.za — served via next.config host rewrites + public/__tinker__
  if (subdomain === "tinker") {
    return NextResponse.next();
  }

  if (!subdomain) {
    return rewriteToClient(request, resolveClientSlug(""));
  }

  return rewriteToClient(request, resolveClientSlug(subdomain));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

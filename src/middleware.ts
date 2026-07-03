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
    /\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|otf|css|js)$/i.test(
      pathname,
    )
  );
}

function rewriteToClient(
  request: NextRequest,
  slug: string,
): NextResponse {
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

  // Dev preview: localhost?tenant=beauty-studio
  const devTenant = request.nextUrl.searchParams.get("tenant");
  if (host === "localhost" && devTenant) {
    return rewriteToClient(request, resolveClientSlug(devTenant));
  }

  const bareHost = host.replace(/^www\./, "");

  // Apex / portfolio — marineflow.co.za, www, localhost (no subdomain)
  if (APEX_HOSTS.has(host) || bareHost === "marineflow.co.za") {
    return NextResponse.next();
  }

  // Client subdomain under marineflow.co.za (or *.localhost in dev)
  const subdomain = extractSubdomain(bareHost);

  if (!subdomain) {
    return rewriteToClient(request, resolveClientSlug(""));
  }

  return rewriteToClient(request, resolveClientSlug(subdomain));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

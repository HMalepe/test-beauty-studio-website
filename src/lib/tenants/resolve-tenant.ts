import {
  FALLBACK_SLUG,
  isKnownClientSlug,
  PLATFORM_DOMAIN,
} from "./registry";

/**
 * Normalize host header: lowercase, strip port.
 */
export function normalizeHost(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0].toLowerCase();
}

/**
 * Strip platform domain to extract subdomain.
 * e.g. beauty-studio.marineflow.co.za → beauty-studio
 * Returns null for apex / non-platform hosts.
 */
export function extractSubdomain(host: string): string | null {
  const bare = host.replace(/^www\./, "");

  if (bare === PLATFORM_DOMAIN) {
    return null;
  }

  const suffix = `.${PLATFORM_DOMAIN}`;
  if (bare.endsWith(suffix)) {
    const subdomain = bare.slice(0, -suffix.length);
    return subdomain.length > 0 ? subdomain : null;
  }

  // Local dev: beauty-studio.localhost
  if (bare.endsWith(".localhost")) {
    const subdomain = bare.slice(0, -".localhost".length);
    return subdomain.length > 0 ? subdomain : null;
  }

  return null;
}

/**
 * Map subdomain → internal route slug under `/(sites)/`.
 */
export function resolveClientSlug(subdomain: string): string {
  return isKnownClientSlug(subdomain) ? subdomain : FALLBACK_SLUG;
}

/**
 * Build internal rewrite path: /{slug}{pathname}
 * Route group `(sites)` is invisible — URL path is /beauty-studio, etc.
 */
export function buildClientRewritePath(
  slug: string,
  pathname: string,
): string {
  const suffix = pathname === "/" ? "" : pathname;
  return `/${slug}${suffix}`;
}

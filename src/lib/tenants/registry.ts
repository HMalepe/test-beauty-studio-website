/**
 * Known client slugs — must match a folder under `src/app/(sites)/{slug}/`.
 * Add a slug here when onboarding a new Next.js client site.
 */
export const KNOWN_CLIENT_SLUGS = [
  "beauty-studio",
  "marine-barber",
  "studio-luxe",
] as const;

export type KnownClientSlug = (typeof KNOWN_CLIENT_SLUGS)[number];

/**
 * Standalone sites (separate Vite/React apps) served as static SPAs on their
 * own subdomain — e.g. tinker.marineflow.co.za
 */
export const STATIC_TENANT_SLUGS = ["tinker"] as const;

export type StaticTenantSlug = (typeof STATIC_TENANT_SLUGS)[number];

/** Public folder prefix where each static tenant build is copied */
export const STATIC_TENANT_ASSET_PREFIX: Record<StaticTenantSlug, string> = {
  tinker: "__tinker__",
};

export const FALLBACK_SLUG = "_fallback" as const;

export const PLATFORM_DOMAIN = "marineflow.co.za";

export const APEX_HOSTS = new Set([
  "marineflow.co.za",
  "www.marineflow.co.za",
  "localhost",
  "127.0.0.1",
]);

export function isKnownClientSlug(slug: string): slug is KnownClientSlug {
  return (KNOWN_CLIENT_SLUGS as readonly string[]).includes(slug);
}

export function isStaticTenantSlug(slug: string): slug is StaticTenantSlug {
  return (STATIC_TENANT_SLUGS as readonly string[]).includes(slug);
}

export function getStaticTenantAssetPrefix(slug: StaticTenantSlug): string {
  return STATIC_TENANT_ASSET_PREFIX[slug];
}

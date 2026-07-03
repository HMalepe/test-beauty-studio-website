/**
 * Known client slugs — must match a folder under `src/app/(sites)/{slug}/`.
 * Add a slug here when onboarding a new client, then create the matching folder.
 */
export const KNOWN_CLIENT_SLUGS = [
  "beauty-studio",
  "marine-barber",
  "studio-luxe",
] as const;

export type KnownClientSlug = (typeof KNOWN_CLIENT_SLUGS)[number];

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

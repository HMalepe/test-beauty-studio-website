import type { KnownClientSlug } from "@/lib/tenants/registry";

export const siteConfig = {
  slug: "beauty-studio" satisfies KnownClientSlug,
  name: "Beauty Studio",
  hosts: ["beauty-studio.marineflow.co.za"],
  status: "active" as const,
};

const TINKER_HOSTS = ["tinker.marineflow.co.za", "tinker.localhost"];

function hostHas(host) {
  return [{ type: "host", value: host }];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async rewrites() {
    const beforeFiles = [];
    const fallback = [];

    for (const host of TINKER_HOSTS) {
      beforeFiles.push(
        {
          source: "/",
          has: hostHas(host),
          destination: "/__tinker__/index.html",
        },
        {
          source: "/:path*",
          has: hostHas(host),
          destination: "/__tinker__/:path*",
        },
      );

      // SPA fallback when a path has no matching file in public/__tinker__
      fallback.push({
        source: "/:path*",
        has: hostHas(host),
        destination: "/__tinker__/index.html",
      });
    }

    return { beforeFiles, fallback };
  },
};

export default nextConfig;

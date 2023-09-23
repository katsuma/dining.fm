/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
        {
            source: "/:path*",
            has: [{ type: "host", value: "www.dining.fm" }],
            destination: "https://dining.fm/:path*",
            permanent: true,
        },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig

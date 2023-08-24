/** @type {import('next').NextConfig} */
const nextConfig = {
  externals : { canvas: {} },
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

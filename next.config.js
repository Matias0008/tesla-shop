/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;

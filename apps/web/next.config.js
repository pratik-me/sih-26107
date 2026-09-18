const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@bis/ui', '@bis/shared-types', '@bis/api-client', '@bis/ai'],
  async rewrites() {
    if (process.env.API_URL) {
      return [
        {
          source: '/api/v1/:path*',
          destination: `${process.env.API_URL}/:path*`
        }
      ];
    }
    return [];
  }
};

module.exports = nextConfig;

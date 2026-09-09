const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@bis/ui', '@bis/shared-types', '@bis/api-client', '@bis/ai'],
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.API_URL || 'http://localhost:4000/api/v1/:path*'
      }
    ];
  }
};

module.exports = nextConfig;

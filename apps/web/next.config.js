const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@bis/ui', '@bis/shared-types', '@bis/api-client', '@bis/ai'],
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@bis/ui',
      '@radix-ui/react-tooltip',
      'recharts',
      'framer-motion'
    ]
  },
  async rewrites() {
    const rawApiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const baseUrl = rawApiUrl.replace(/\/$/, '');
    const destination = baseUrl.endsWith('/api/v1')
      ? `${baseUrl}/:path*`
      : `${baseUrl}/api/v1/:path*`;

    return [
      {
        source: '/api/v1/:path*',
        destination
      }
    ];
  }
};

module.exports = nextConfig;

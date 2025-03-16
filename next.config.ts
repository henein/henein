import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['open.api.nexon.com', `${process.env.STORAGE_URL}`],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

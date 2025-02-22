import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['open.api.nexon.com', `${process.env.STORAGE_URL}`],
  },
};

export default nextConfig;

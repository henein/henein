import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_NEXON_API_URL}`,
      `${process.env.NEXT_PUBLIC_STORAGE_URL}`,
    ],
  },
};

export default nextConfig;

import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {},

  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@splinetool/react-spline': path.resolve(process.cwd(), 'node_modules/@splinetool/react-spline/dist/react-spline-next.js'),
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    config.module.parser = {
      ...config.module.parser,
      javascript: {
        url: false,
      },
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anubhab-das.vercel.app',
      },
    ],
  },

  // Security headers (migrated from vercel.json)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/publications/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;

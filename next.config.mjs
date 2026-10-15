const cdnEnabled = process.env.CDN_ENABLED === 'true';
const cdnUrl = process.env.CDN_URL || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: cdnEnabled && cdnUrl ? cdnUrl : '',

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/_health',
          destination: '/api/health',
        },
      ],
    };
  },
};

export default nextConfig;

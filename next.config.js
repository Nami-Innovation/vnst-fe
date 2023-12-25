/** @type {import('next').NextConfig} */
const IS_OUTPUT_STANDALONE = process.env.IS_OUTPUT_STANDALONE === '1';

const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  // output: 'standalone',
};

if (IS_OUTPUT_STANDALONE) {
  nextConfig.output = 'standalone';
}

module.exports = nextConfig;

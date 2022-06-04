const ntm = require('next-transpile-modules');
const localPkg = ['@tencent/next-components', '@tencent/next-runtime']
const withTM = ntm(localPkg);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = withTM(nextConfig);

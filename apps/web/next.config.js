const ntm = require('next-transpile-modules');
const localPkg = ['@tencent/next-components']
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

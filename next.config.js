/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public as plain <img> with native lazy-loading,
  // so we keep the default image config minimal and dependency-free.
  poweredByHeader: false,
};

module.exports = nextConfig;

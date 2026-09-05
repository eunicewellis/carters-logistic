/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint is intentionally not configured for this project; skip it during builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — the site is served from GitHub Pages at www.rajan-lamichhane.com.np
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;

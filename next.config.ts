import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // <-- add this line to enable static export
  /* other config options here */
};

export default nextConfig;

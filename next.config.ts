import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    basePath: '/3dpc-3dtiles',
    assetPrefix: '/3dpc-3dtiles',
    output: "export",
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
};

export default nextConfig;

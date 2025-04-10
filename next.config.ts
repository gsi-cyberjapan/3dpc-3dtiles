import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
};

export default nextConfig;

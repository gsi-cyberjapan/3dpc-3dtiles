import type { NextConfig } from "next";

process.env.NEXT_PUBLIC_BASE_PATH = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
    output: "export",
    basePath: process.env.BASE_PATH,
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "",
    },
};

export default nextConfig;

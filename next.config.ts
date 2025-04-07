/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.IS_PUBLIC_REPO ? `/${process.env.REPOSITORY_NAME}` : "",
    assetPrefix: process.env.IS_PUBLIC_REPO ? `/${process.env.REPOSITORY_NAME}/` : "",
    base: './',
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
}

module.exports = nextConfig
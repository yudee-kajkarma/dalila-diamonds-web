/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    outputFileTracingRoot: __dirname,
    
    async redirects() {
        return [
            // Redirect URLs with special characters to home page
            {
                source: '/:path*\\$',
                destination: '/',
                permanent: true,
            },
            {
                source: '/:path*\\&',
                destination: '/',
                permanent: true,
            },
            {
                source: '/\\$',
                destination: '/',
                permanent: true,
            },
            {
                source: '/\\&',
                destination: '/',
                permanent: true,
            },
            // Catch other invalid special character URLs
            {
                source: '/:path*[\\#\\%\\^\\*\\(\\)\\+\\=\\[\\]\\{\\}\\|\\\\]',
                destination: '/',
                permanent: true,
            },
        ];
    },
    
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
        optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
    },
};

module.exports = nextConfig;

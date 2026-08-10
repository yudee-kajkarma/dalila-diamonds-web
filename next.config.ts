/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    outputFileTracingRoot: __dirname,
    
    async redirects() {
        const naturalRoughDestination = '/diamonds/natural-rough-diamonds';
        const naturalRoughLegacySources = [
            '/diamonds/rough-natural-diamonds',
            '/diamonds/natural-rough-diamond',
            '/blogs/natural-rough-diamonds',
            '/blogs/rough-diamonds',
        ];
        const localePrefixes = ['de', 'fr', 'it', 'nl', 'es'];

        const naturalRoughRedirects = naturalRoughLegacySources.flatMap((source) => [
            {
                source,
                destination: naturalRoughDestination,
                permanent: true,
            },
            ...localePrefixes.map((locale) => ({
                source: `/${locale}${source}`,
                destination: `/${locale}${naturalRoughDestination}`,
                permanent: true,
            })),
        ]);

        return [
            ...naturalRoughRedirects,
            {
                source: '/sud',
                destination: '/sell-your-diamond',
                permanent: true,
            },
            ...localePrefixes.map((locale) => ({
                source: `/${locale}/sud`,
                destination: `/${locale}/sell-your-diamond`,
                permanent: true,
            })),
            {
                source: '/blogs/diamonds-vs-lab-grown-diamonds',
                destination: '/resources/natural-vs-lab-grown-diamonds',
                permanent: true,
            },
            {
                source: '/blogs/difference-between-natural-and-lab-grown-diamonds',
                destination: '/resources/natural-vs-lab-grown-diamonds',
                permanent: true,
            },
            {
                source: '/blogs/4cs-of-natural-diamonds-explained',
                destination: '/resources/diamond-quality-chart',
                permanent: true,
            },
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

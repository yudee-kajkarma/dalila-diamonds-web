/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    outputFileTracingRoot: __dirname,
    
    // Redirects use `statusCode: 301` rather than `permanent: true`.
    //
    // Next.js serves `permanent: true` as HTTP 308, which preserves the request
    // method. Every redirect here is a permanent GET move, and the SEO audit
    // requires a direct 301 on the merged article URLs specifically, so 301 is
    // what these must return. Do not swap these back to `permanent`.
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
                statusCode: 301,
            },
            ...localePrefixes.map((locale) => ({
                source: `/${locale}${source}`,
                destination: `/${locale}${naturalRoughDestination}`,
                statusCode: 301,
            })),
        ]);

        return [
            // The default locale lives at the unprefixed routes; /en/* would
            // otherwise 404 now that [locale] only accepts de/fr/it/nl/es.
            {
                source: '/en',
                destination: '/',
                statusCode: 301,
            },
            {
                source: '/en/:path*',
                destination: '/:path*',
                statusCode: 301,
            },
            ...naturalRoughRedirects,
            {
                source: '/sud',
                destination: '/sell-your-diamond',
                statusCode: 301,
            },
            ...localePrefixes.map((locale) => ({
                source: `/${locale}/sud`,
                destination: `/${locale}/sell-your-diamond`,
                statusCode: 301,
            })),
            {
                source: '/blogs/diamonds-vs-lab-grown-diamonds',
                destination: '/resources/natural-vs-lab-grown-diamonds',
                statusCode: 301,
            },
            {
                source: '/blogs/difference-between-natural-and-lab-grown-diamonds',
                destination: '/resources/natural-vs-lab-grown-diamonds',
                statusCode: 301,
            },
            {
                source: '/blogs/4cs-of-natural-diamonds-explained',
                destination: '/resources/diamond-quality-chart',
                statusCode: 301,
            },
            // Redirect URLs with special characters to home page
            {
                source: '/:path*\\$',
                destination: '/',
                statusCode: 301,
            },
            {
                source: '/:path*\\&',
                destination: '/',
                statusCode: 301,
            },
            {
                source: '/\\$',
                destination: '/',
                statusCode: 301,
            },
            {
                source: '/\\&',
                destination: '/',
                statusCode: 301,
            },
            // Catch other invalid special character URLs
            {
                source: '/:path*[\\#\\%\\^\\*\\(\\)\\+\\=\\[\\]\\{\\}\\|\\\\]',
                destination: '/',
                statusCode: 301,
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
        optimizePackageImports: ["lucide-react"],
    },
};

module.exports = nextConfig;

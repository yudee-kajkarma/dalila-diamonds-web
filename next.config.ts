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

        // Article consolidation from the SEO revision. Each pair is a page
        // that was merged into a surviving one, so the old URL must keep
        // working for visitors and pass its ranking on.
        //
        // Neither end is always a blog: three survivors are /resources pages,
        // one is the /sell-your-diamond landing page, and one source is the
        // root-level /sell-your-diamond-safely, so both sides carry the path
        // they are served at. The capitalised slug below is how that article
        // is actually filed in the CMS, and paths are case-sensitive.
        //
        // These must stay live for as long as the old URLs have inbound links.
        // Generate and re-check with: npm run generate-redirects
        const mergeRedirects = [
            ['/blogs/princess-vs-cushion-vs-radiant-diamond', '/blogs/2026-princess-cut-vs-radiant-cut-diamanten'],
            ['/blogs/hoe-werken-de-vier-antwerpse-diamantbeurzen', '/blogs/antwerp-diamond-district-guide'],
            ['/blogs/wat-is-het-diamond-office-antwerpen', '/blogs/antwerp-diamond-office-import-process'],
            ['/blogs/diamond-buyback-program-for-jewelers', '/blogs/diamond-buyback-service-europe'],
            ['/blogs/diamond-memo-goods-consignment', '/blogs/diamond-memo-vs-consignment-vs-purchase'],
            ['/blogs/bespoke-diamond-sourcing-europe', '/blogs/how-to-source-rare-diamonds'],
            ['/blogs/custom-diamond-sourcing-for-jewelers', '/blogs/how-to-source-rare-diamonds'],
            ['/blogs/european-diamond-certification-comparison', '/blogs/hrd-vs-gia-vs-igi-diamond-certification'],
            ['/blogs/gia-vs-igi-vs-hrd-diamond-certification', '/blogs/hrd-vs-gia-vs-igi-diamond-certification'],
            ['/blogs/natuurlijke-vs-lab-grown-diamanten-verlovingsring-2026', '/blogs/natural-vs-lab-grown-diamonds-engagement-rings-2026'],
            ['/blogs/why-natural-diamonds-are-best-for-engagement-rings-2026', '/blogs/natural-vs-lab-grown-diamonds-engagement-rings-2026'],
            ['/blogs/place-vendome-supplier-standards', '/blogs/place-vendome-diamond-sourcing'],
            ['/blogs/the-diamant-2026-certificering-gia-igi', '/resources/diamond-grading-report-guide'],
            ['/blogs/waarom-is-diamantcertificering-belangrijk-2026', '/resources/diamond-grading-report-guide'],
            ['/blogs/de-4-cs-van-diamanten-uitgelegd', '/resources/diamond-quality-chart'],
            ['/blogs/are-natural-diamonds-real-diamonds', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/natuurlijke-diamanten-vs-lab-gekweekte-diamanten-in-2026-era', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/Natuurlijke-diamanten-vs-lab-grown-diamanten-2026', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/premium-natural-diamonds-vs-lab-grown', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/the-2026-lab-grown-vs-natuurlijke-diamanten', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/verschil-tussen-natuurlijke-en-lab-grown-diamanten-in-2026', '/resources/natural-vs-lab-grown-diamonds'],
            ['/blogs/sell-my-diamond-europe', '/sell-your-diamond'],
            ['/sell-your-diamond-safely', '/sell-your-diamond'],
        ].flatMap(([source, destination]) => [
            {
                source,
                destination,
                statusCode: 301,
            },
            ...localePrefixes.map((locale) => ({
                source: `/${locale}${source}`,
                destination: `/${locale}${destination}`,
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
            ...mergeRedirects,
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

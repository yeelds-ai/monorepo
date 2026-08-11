import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const SECURITY_HEADERS = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
];

const CSP_HEADER = `
    default-src 'self';
    connect-src 'self' https://api.dev.yeelds.ai https://api.yeelds.ai https://raw.githubusercontent.com/metrom-xyz/token-icons/refs/heads/main/mainnet-icons.json https://umami.metrom.xyz/api/c;
    frame-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://umami.metrom.xyz;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src * data: blob:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        turbopackRustReactCompiler: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    async redirects() {
        return [
            { source: "/", destination: "/en/explore", permanent: false },
            { source: "/en", destination: "/en/explore", permanent: false },
            // Old asset-class/grade routes consolidate into /yields with the
            // matching filter preselected via its query vocabulary. Must precede
            // the generic locale-prefix rule below, which would otherwise match
            // these bare paths first and prefix them instead of redirecting.
            {
                source: "/eth",
                destination: "/en/yields?asset_class=eth_class",
                permanent: false,
            },
            {
                source: "/btc",
                destination: "/en/yields?asset_class=btc_class",
                permanent: false,
            },
            {
                source: "/stables",
                destination: "/en/yields?asset_class=stablecoin",
                permanent: false,
            },
            {
                source: "/stables/usd",
                destination: "/en/yields?asset_class=usd_stable",
                permanent: false,
            },
            {
                source: "/stables/eur",
                destination: "/en/yields?asset_class=eur_stable",
                permanent: false,
            },
            {
                source: "/yield-bearing",
                destination: "/en/yields?yield_bearing=true",
                permanent: false,
            },
            {
                source: "/risk-graded",
                destination:
                    "/en/yields?sort=yeelds_score&order=desc&min_yeelds_grade=D",
                permanent: false,
            },
            // Prefix every unprefixed path with the default locale (replaces the
            // next-intl middleware — a redirect is cheaper and cacheable).
            {
                source: "/:path((?!en$|en/|_next/|api/|.*\\.).+)",
                destination: "/en/:path",
                permanent: false,
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    ...SECURITY_HEADERS,
                    {
                        key: "Content-Security-Policy",
                        value: CSP_HEADER.replace(/\n/g, ""),
                    },
                ],
            },
        ];
    },
};

export default createNextIntlPlugin()(nextConfig);

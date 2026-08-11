import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ReactNode } from "react";

import { SITE_URL } from "@/src/commons";
import { UMAMI_WEBSITE_ID } from "@/src/commons/env";
import { ClientProviders } from "@/src/components/client-providers";
import { Layout } from "@/src/components/layout";
import { routing } from "@/src/i18n/routing";

import "../../app.css";

// Brand face — Clash Display, self-hosted. The ramp is Semibold (600); Medium
// and Bold round it out.
const clashDisplay = localFont({
    src: [
        {
            path: "../fonts/clash-display/ClashDisplay-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/clash-display/ClashDisplay-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../fonts/clash-display/ClashDisplay-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-clash-display",
    display: "swap",
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: RootLayoutProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("metadata");
    const title = t("title");
    const description = t("description");

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: title,
            template: "%s | Yeelds",
        },
        description,
        openGraph: {
            type: "website",
            locale: "en_US",
            siteName: "Yeelds",
            title,
            description,
            url: `/${locale}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `/${locale}`,
        },
    };
}

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    return (
        <html
            lang={locale}
            className={`${clashDisplay.variable} ${manrope.variable} h-full antialiased`}
        >
            <head>
                <Script
                    defer
                    src="https://umami.metrom.xyz/s.js"
                    data-website-id={UMAMI_WEBSITE_ID}
                    data-domains="dev.yeelds.ai,www.yeelds.ai"
                />
            </head>
            <body className="background-default flex h-full flex-col font-sans">
                <NextIntlClientProvider>
                    <ClientProviders>
                        <Layout>{children}</Layout>
                    </ClientProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

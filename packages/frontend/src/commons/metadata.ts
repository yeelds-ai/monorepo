import type { Metadata } from "next";

import type { Locale } from "@/src/config";

export const SITE_NAME = "Yeelds";
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

interface BuildPageMetadataParams {
    locale: Locale;
    path: string;
    title: string;
    description: string;
}

export function buildPageMetadata({
    locale,
    path,
    title,
    description,
}: BuildPageMetadataParams): Metadata {
    const url = `/${locale}${path}`;
    const socialTitle = TITLE_TEMPLATE.replace("%s", title);

    return {
        title,
        description,
        openGraph: {
            type: "website",
            locale: "en_US",
            siteName: SITE_NAME,
            title: socialTitle,
            description,
            url,
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
        },
        alternates: { canonical: url },
    };
}

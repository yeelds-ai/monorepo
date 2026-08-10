import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildPageMetadata } from "@/src/commons/metadata";
import { Feed } from "@/src/components/feed";
import type { Locale } from "@/src/i18n/routing";

interface FeedPageProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
    params,
}: FeedPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("feed");

    return buildPageMetadata({
        locale,
        path: "/feed",
        title: t("title"),
        description: t("subtitle"),
    });
}

export default async function FeedPage({ params }: FeedPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Feed />;
}

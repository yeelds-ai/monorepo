import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: { canonical: `/${locale}/feed` },
    };
}

export default async function FeedPage({ params }: FeedPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Feed />;
}

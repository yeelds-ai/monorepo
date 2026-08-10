import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildPageMetadata } from "@/src/commons/metadata";
import { MessagePage } from "@/src/components/message-page";
import type { Locale } from "@/src/i18n/routing";

interface ExplorePageProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
    params,
}: ExplorePageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("explore");

    return buildPageMetadata({
        locale,
        path: "/explore",
        title: t("metaTitle"),
        description: t("subtitle"),
    });
}

export default async function ExplorePage({ params }: ExplorePageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("explore");

    return <MessagePage title={t("title")} description={t("subtitle")} />;
}

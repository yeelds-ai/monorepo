import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: { canonical: `/${locale}/explore` },
    };
}

export default async function ExplorePage() {
    const t = await getTranslations("explore");

    return <MessagePage title={t("title")} description={t("subtitle")} />;
}

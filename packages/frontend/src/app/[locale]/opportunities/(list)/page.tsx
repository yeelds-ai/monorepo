import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildPageMetadata } from "@/src/commons/metadata";
import { Opportunities } from "@/src/components/opportunities";
import type { Locale } from "@/src/i18n/routing";

interface YieldsPageProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
    params,
}: YieldsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("opportunities");

    return buildPageMetadata({
        locale,
        path: "/opportunities",
        title: t("metaTitle"),
        description: t("subtitle"),
    });
}

export default async function YieldsPage({ params }: YieldsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Opportunities />;
}

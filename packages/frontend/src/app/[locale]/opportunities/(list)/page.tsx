import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

    return {
        title: t("metaTitle"),
        description: t("subtitle"),
        alternates: { canonical: `/${locale}/opportunities` },
    };
}

export default async function YieldsPage({ params }: YieldsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Opportunities />;
}

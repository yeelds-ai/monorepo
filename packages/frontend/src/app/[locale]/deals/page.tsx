import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Deals } from "@/src/components/deals";
import type { Locale } from "@/src/i18n/routing";

export const dynamic = "force-static";

interface DealsPageProps {
    params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
    params,
}: DealsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("deals");

    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: { canonical: `/${locale}/deals` },
    };
}

export default async function DealsPage({ params }: DealsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Deals />;
}

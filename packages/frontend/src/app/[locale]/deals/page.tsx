import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildPageMetadata } from "@/src/commons/metadata";
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

    return buildPageMetadata({
        locale,
        path: "/deals",
        title: t("title"),
        description: t("subtitle"),
    });
}

export default async function DealsPage({ params }: DealsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Deals />;
}

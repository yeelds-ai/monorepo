import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default function DealsPage() {
    return <Deals />;
}

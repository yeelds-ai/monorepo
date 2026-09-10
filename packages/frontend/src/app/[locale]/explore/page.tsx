import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Explore } from "@/src/components/explore";
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
        title: t("metaTitle"),
        description: t("subtitle"),
        alternates: { canonical: `/${locale}/explore` },
    };
}

export default function ExplorePage() {
    return <Explore />;
}

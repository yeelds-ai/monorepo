import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Deal } from "@/src/components/deal";
import { getAllDealSlugs, getDealDetail } from "@/src/data/deals";
import type { Locale } from "@/src/i18n/routing";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getAllDealSlugs().map((slug) => ({ slug }));
}

interface DealPageProps {
    params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
    params,
}: DealPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const deal = getDealDetail(slug);

    if (!deal) {
        const t = await getTranslations("deal");
        return { title: t("notFound.title") };
    }

    return {
        title: deal.hero.title,
        description: deal.hero.subtitle,
        alternates: { canonical: `/${locale}/deals/${slug}` },
    };
}

export default async function DealPage({ params }: DealPageProps) {
    const { slug } = await params;

    const deal = getDealDetail(slug);
    if (!deal) notFound();

    return <Deal deal={deal} />;
}

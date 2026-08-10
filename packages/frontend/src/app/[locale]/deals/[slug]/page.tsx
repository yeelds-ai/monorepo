import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/src/commons/metadata";
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
        return buildPageMetadata({
            locale,
            path: `/deals/${slug}`,
            title: t("notFound.title"),
            description: t("notFound.description"),
        });
    }

    return buildPageMetadata({
        locale,
        path: `/deals/${slug}`,
        title: deal.hero.title,
        description: deal.hero.subtitle,
    });
}

export default async function DealPage({ params }: DealPageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const deal = getDealDetail(slug);
    if (!deal) notFound();

    return <Deal deal={deal} />;
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildPageMetadata } from "@/src/commons/metadata";
import { Opportunity } from "@/src/components/opportunity";
import type { Locale } from "@/src/i18n/routing";

interface OpportunityPageProps {
    params: Promise<{ locale: Locale; chain: string; address: string }>;
}

export async function generateMetadata({
    params,
}: OpportunityPageProps): Promise<Metadata> {
    const { locale, chain, address } = await params;
    const t = await getTranslations("opportunity");

    return buildPageMetadata({
        locale,
        path: `/opportunities/${chain}/${address}`,
        title: t("title", { chain, address }),
        description: t("description"),
    });
}

export default async function OpportunityPage({
    params,
}: OpportunityPageProps) {
    const { locale, chain, address } = await params;
    setRequestLocale(locale);

    return <Opportunity chain={chain} address={address} />;
}

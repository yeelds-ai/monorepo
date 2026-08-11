import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

    return {
        title: t("title", { chain, address }),
        description: t("description"),
        alternates: {
            canonical: `/${locale}/opportunities/${chain}/${address}`,
        },
    };
}

export default async function OpportunityPage({
    params,
}: OpportunityPageProps) {
    const { chain, address } = await params;

    return <Opportunity chain={chain} address={address} />;
}

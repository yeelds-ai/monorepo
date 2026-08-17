import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { YEELDS_API_CLIENT_SERVER } from "@/src/commons/server";
import { Opportunity } from "@/src/components/opportunity";
import type { Locale } from "@/src/i18n/routing";

type Translator = Awaited<ReturnType<typeof getTranslations<"opportunity">>>;

interface OpportunityPageProps {
    params: Promise<{ locale: Locale; chain: string; address: string }>;
}

async function getPageTitle({
    chain,
    address,
    t,
}: {
    chain: string;
    address: string;
    t: Translator;
}): Promise<string> {
    try {
        const opportunity = await YEELDS_API_CLIENT_SERVER.fetchOpportunity({
            chain,
            address,
        });

        if (!opportunity) return t("notFound.title");

        return `${opportunity.name} Yield & APY | Yeelds`;
    } catch {
        return t("notFound.title");
    }
}

export async function generateMetadata({
    params,
}: OpportunityPageProps): Promise<Metadata> {
    const { locale, chain, address } = await params;
    const t = await getTranslations("opportunity");
    const title = await getPageTitle({
        chain,
        address,
        t,
    });

    return {
        title,
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

import { MessagePage } from "@yeelds/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NavigationButton } from "@/src/components/navigation-button";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("deal");

    return {
        title: t("notFound.title"),
        robots: { index: false, follow: false },
    };
}

export default async function DealNotFound() {
    const t = await getTranslations("deal");

    return (
        <MessagePage
            title={t("notFound.title")}
            description={t("notFound.description")}
        >
            <NavigationButton href="/deals" text={t("backToDeals")} />
        </MessagePage>
    );
}

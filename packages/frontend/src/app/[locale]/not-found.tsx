import { MessagePage } from "@yeelds/ui";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("notFound");

    return {
        title: t("title"),
        description: t("description"),
        robots: { index: false, follow: false },
    };
}

export default async function NotFound() {
    const t = await getTranslations("notFound");

    return <MessagePage title={t("title")} description={t("description")} />;
}

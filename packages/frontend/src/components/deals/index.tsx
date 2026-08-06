import { Typography } from "@yeelds/ui";
import { getTranslations } from "next-intl/server";

import { getDealSummaries } from "@/src/data/deals";
import { DealCard } from "./deal-card";

import styles from "./styles.module.css";

export async function Deals() {
    const t = await getTranslations("deals");
    const deals = getDealSummaries();

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Typography as="h1" font="brand" size={28}>
                    {t("title")}
                </Typography>
                <Typography size={16} variant="secondary">
                    {t("subtitle")}
                </Typography>
            </div>
            {deals.length === 0 ? (
                <Typography size={14} variant="secondary">
                    {t("empty")}
                </Typography>
            ) : (
                <div className={styles.grid}>
                    {deals.map((deal) => (
                        <DealCard
                            key={deal.slug}
                            slug={deal.slug}
                            summary={deal.summary}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

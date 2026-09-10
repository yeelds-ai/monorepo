import { Typography } from "@yeelds/ui";
import { getTranslations } from "next-intl/server";

import { ExploreHotPicks } from "./hot-picks";
import { WeeklyNews } from "./news";
import { TotalTvlChart } from "./total-tvl-chart";

import styles from "./styles.module.css";

export async function Explore() {
    const t = await getTranslations("explore");

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Typography
                    as="h1"
                    font="brand"
                    size={28}
                    className={styles.title}
                >
                    {t("title")}
                </Typography>
                <Typography
                    size={16}
                    variant="secondary"
                    className={styles.subtitle}
                >
                    {t("subtitle")}
                </Typography>
            </div>

            <div className={styles.content}>
                <div className={styles.topRow}>
                    <TotalTvlChart />
                    <WeeklyNews />
                </div>
                <ExploreHotPicks />
            </div>
        </div>
    );
}

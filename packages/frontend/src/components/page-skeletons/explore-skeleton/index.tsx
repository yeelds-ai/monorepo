"use client";

import { Skeleton } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { NewsItemSkeleton } from "@/src/components/explore/news/news-item/news-item-skeleton";
import { OpportunitiesTable } from "@/src/components/opportunities/table";
import { TvlChart } from "@/src/components/tvl-chart";
import {
    TVL_RANGES,
    type TvlRange,
    computeRangeDisabled,
} from "@/src/utils/tvl-range";

import styles from "./styles.module.css";

const NEWS_ITEMS = 3;
const HOT_PICK_ROWS = 5;

export function ExploreSkeleton() {
    const t = useTranslations("explore.totalTvl");
    const rangeLabels = TVL_RANGES.reduce(
        (acc, value) => {
            acc[value] = t(`ranges.${value}`);
            return acc;
        },
        {} as Record<TvlRange, string>,
    );

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Skeleton height={32} width={192} />
                <Skeleton
                    height={24}
                    width={288}
                    className={styles.subtitleBar}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.topRow}>
                    <TvlChart
                        title={t("title")}
                        emptyLabel={t("empty")}
                        rangeLabels={rangeLabels}
                        rows={[]}
                        loading
                        fetching={false}
                        range="1Y"
                        rangeDisabled={computeRangeDisabled([])}
                        onRangeChange={() => {}}
                    />

                    <div className={styles.newsCard}>
                        <div className={styles.newsHeader}>
                            <Skeleton height={28} width={120} />
                            <Skeleton height={20} width={88} />
                        </div>
                        {Array.from({ length: NEWS_ITEMS }).map((_, index) => (
                            <NewsItemSkeleton key={index} />
                        ))}
                    </div>
                </div>

                <div className={styles.hotPicks}>
                    <div className={styles.hotPicksHeader}>
                        <Skeleton height={28} width={220} />
                        <Skeleton height={20} width={120} />
                    </div>
                    <div className={styles.hotPicksCard}>
                        <div className={styles.tabBar}>
                            <Skeleton height={20} width={72} />
                            <Skeleton height={20} width={88} />
                            <Skeleton height={20} width={104} />
                        </div>
                        <OpportunitiesTable
                            opportunities={[]}
                            loading
                            skeletonRowCount={HOT_PICK_ROWS}
                            sortable={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

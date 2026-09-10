"use client";

import { Tabs, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ArrowRightIcon } from "@/src/assets";
import { OpportunitiesTable } from "@/src/components/opportunities/table";
import {
    type UseOverviewReturnValue,
    useOverview,
} from "@/src/hooks/useOverview";
import { Link } from "@/src/i18n/routing";
import type { EnrichedOpportunity } from "@/src/types/opportunity";

import styles from "./styles.module.css";

type HotPickTabKey = keyof Pick<
    UseOverviewReturnValue,
    "topGraded" | "highestApy" | "topStableYield"
>;

const HOT_PICK_TABS: HotPickTabKey[] = [
    "topGraded",
    "highestApy",
    "topStableYield",
];
const SKELETON_ROWS = 5;

export function ExploreHotPicks() {
    const t = useTranslations("explore.hotPicks");
    const [activeTab, setActiveTab] = useState<HotPickTabKey>("topGraded");
    const { loading, topGraded, highestApy, topStableYield } = useOverview();

    const opportunitiesByTab: Record<HotPickTabKey, EnrichedOpportunity[]> = {
        topGraded,
        highestApy,
        topStableYield,
    };

    const hasAnyPicks = HOT_PICK_TABS.some(
        (key) => opportunitiesByTab[key].length > 0,
    );

    if (!loading && !hasAnyPicks) return null;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Typography as="h2" font="brand" size={20}>
                    {t("title")}
                </Typography>
                <Link href="/opportunities" className={styles.exploreLink}>
                    <Typography as="span" size={14} weight="bold" color="brand">
                        {t("exploreAllYields")}
                    </Typography>
                    <ArrowRightIcon className={styles.exploreLinkIcon} />
                </Link>
            </div>

            <div className={styles.card}>
                <Tabs
                    tabs={HOT_PICK_TABS.map((key) => ({
                        id: key,
                        label: t(`tabs.${key}`),
                    }))}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <OpportunitiesTable
                    opportunities={opportunitiesByTab[activeTab]}
                    loading={loading}
                    skeletonRowCount={SKELETON_ROWS}
                    sortable={false}
                    emptyState={
                        <Typography
                            size={16}
                            variant="secondary"
                            className={styles.empty}
                        >
                            {t("empty")}
                        </Typography>
                    }
                />
            </div>
        </div>
    );
}

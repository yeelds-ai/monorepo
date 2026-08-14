"use client";

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import type { FunctionComponent, SVGProps } from "react";

import {
    ArrowRightIcon,
    DiamondIcon,
    PendulumIcon,
    PieChartIcon,
    SafeIcon,
    TrendingUpIcon,
} from "@/src/assets";
import {
    type UseOverviewReturnValue,
    useOverview,
} from "@/src/hooks/useOverview";
import { Link } from "@/src/i18n/routing";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { HotPickColumn } from "./hot-pick-column";

import styles from "./styles.module.css";

type HotPickCategoryKey = keyof Pick<
    UseOverviewReturnValue,
    | "topGraded"
    | "topStableYield"
    | "deepestLiquidity"
    | "topBlueChip"
    | "highestApy"
>;

interface HotPickCategory {
    key: HotPickCategoryKey;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const HOT_PICK_CATEGORIES: HotPickCategory[] = [
    { key: "topGraded", icon: PendulumIcon },
    { key: "topStableYield", icon: SafeIcon },
    { key: "deepestLiquidity", icon: PieChartIcon },
    { key: "topBlueChip", icon: DiamondIcon },
    { key: "highestApy", icon: TrendingUpIcon },
];

export function HotPicks() {
    const t = useTranslations("explore.hotPicks");
    const {
        loading,
        topGraded,
        topStableYield,
        deepestLiquidity,
        topBlueChip,
        highestApy,
    } = useOverview();

    const opportunitiesByCategory: Record<
        HotPickCategoryKey,
        EnrichedOpportunity[]
    > = {
        topGraded,
        topStableYield,
        deepestLiquidity,
        topBlueChip,
        highestApy,
    };

    const hasAnyPicks = HOT_PICK_CATEGORIES.some(
        (category) => opportunitiesByCategory[category.key].length > 0,
    );

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

            <div className={styles.content}>
                {!loading && !hasAnyPicks ? (
                    <Typography
                        size={16}
                        variant="secondary"
                        className={styles.empty}
                    >
                        {t("empty")}
                    </Typography>
                ) : (
                    <div className={styles.grid}>
                        {HOT_PICK_CATEGORIES.map((category) => (
                            <HotPickColumn
                                key={category.key}
                                label={t(`categories.${category.key}`)}
                                icon={category.icon}
                                opportunities={
                                    opportunitiesByCategory[category.key]
                                }
                                loading={loading}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { FunctionComponent, SVGProps } from "react";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeIcon,
    EyeOffIcon,
    FlameIcon,
} from "@/src/assets";
import {
    DiamondIcon,
    PendulumIcon,
    PieChartIcon,
    SafeIcon,
    TrendingUpIcon,
} from "@/src/assets";
import { useOverview } from "@/src/hooks/useOverview";
import type {
    HotPickCategory,
    HotPickCategoryKey,
    HotPickItem,
} from "@/src/types/hot-picks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { HotPickCard } from "./hot-pick-card";
import { HotPickCardSkeleton } from "./hot-pick-card/hot-pick-card-skeleton";

import styles from "./styles.module.css";

const HOT_PICK_CATEGORY_ICONS: Record<
    HotPickCategoryKey,
    FunctionComponent<SVGProps<SVGSVGElement>>
> = {
    topGraded: PendulumIcon,
    topStableYield: SafeIcon,
    deepestLiquidity: PieChartIcon,
    topBlueChip: DiamondIcon,
    highestApy: TrendingUpIcon,
};
const HOT_PICK_CATEGORY_ORDER: HotPickCategoryKey[] = [
    "topGraded",
    "topStableYield",
    "deepestLiquidity",
    "topBlueChip",
    "highestApy",
];
const SKELETON_CARDS = 6;

export function HotPicks() {
    const t = useTranslations("opportunities.hotPicks");
    const [hidden, setHidden] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const items: HotPickItem[] = HOT_PICK_CATEGORY_ORDER.flatMap((key) => {
        const category: HotPickCategory = {
            key,
            icon: HOT_PICK_CATEGORY_ICONS[key],
            label: t(`categories.${key}`),
        };
        return opportunitiesByCategory[key].map((opportunity) => ({
            category,
            opportunity,
        }));
    });

    const hasAnyPicks = items.length > 0;

    function updateScrollState() {
        const node = scrollRef.current;
        if (!node) return;
        setCanScrollLeft(node.scrollLeft > 0);
        setCanScrollRight(
            node.scrollLeft + node.clientWidth < node.scrollWidth - 1,
        );
    }

    useEffect(() => {
        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        return () => window.removeEventListener("resize", updateScrollState);
    }, [items.length, loading]);

    function handleOnScroll() {
        updateScrollState();
    }

    function handleOnToggleHidden() {
        setHidden((current) => !current);
    }

    function handleOnScrollLeft() {
        scrollRef.current?.scrollBy({
            left: -scrollRef.current.clientWidth * 0.8,
            behavior: "smooth",
        });
    }

    function handleOnScrollRight() {
        scrollRef.current?.scrollBy({
            left: scrollRef.current.clientWidth * 0.8,
            behavior: "smooth",
        });
    }

    if (!loading && !hasAnyPicks) return null;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <div className={styles.title}>
                        <FlameIcon className={styles.titleIcon} />
                        <Typography as="h2" size={16} weight="bold">
                            {t("title")}
                        </Typography>
                    </div>

                    <button
                        type="button"
                        onClick={handleOnToggleHidden}
                        className={styles.hideButton}
                    >
                        <Typography
                            as="span"
                            size={14}
                            weight="bold"
                            color="brand"
                        >
                            {hidden ? t("show") : t("hide")}
                        </Typography>
                        {hidden ? (
                            <EyeIcon className={styles.eyeIcon} />
                        ) : (
                            <EyeOffIcon className={styles.eyeIcon} />
                        )}
                    </button>
                </div>

                {!hidden && (
                    <div className={styles.nav}>
                        <button
                            type="button"
                            onClick={handleOnScrollLeft}
                            disabled={!canScrollLeft}
                            aria-label={t("scrollLeft")}
                            className={styles.navButton}
                        >
                            <ArrowLeftIcon className={styles.navIcon} />
                        </button>
                        <button
                            type="button"
                            onClick={handleOnScrollRight}
                            disabled={!canScrollRight}
                            aria-label={t("scrollRight")}
                            className={styles.navButton}
                        >
                            <ArrowRightIcon className={styles.navIcon} />
                        </button>
                    </div>
                )}
            </div>

            {!hidden && (
                <div
                    ref={scrollRef}
                    onScroll={handleOnScroll}
                    className={styles.scrollRow}
                >
                    {loading
                        ? Array.from({ length: SKELETON_CARDS }).map(
                              (_, index) => <HotPickCardSkeleton key={index} />,
                          )
                        : items.map(({ category, opportunity }) => (
                              <HotPickCard
                                  key={`${category.key}-${opportunity.address}`}
                                  category={category}
                                  opportunity={opportunity}
                              />
                          ))}
                </div>
            )}
        </div>
    );
}

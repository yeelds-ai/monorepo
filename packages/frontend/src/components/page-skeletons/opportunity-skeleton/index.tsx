"use client";

import { Skeleton } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { TvlChart } from "@/src/components/tvl-chart";
import {
    TVL_RANGES,
    type TvlRange,
    computeRangeDisabled,
} from "@/src/utils/tvl-range";

import styles from "./styles.module.css";

export function OpportunitySkeleton() {
    const t = useTranslations("opportunity.totalTvlCard");
    const rangeLabels = TVL_RANGES.reduce(
        (acc, value) => {
            acc[value] = t(`ranges.${value}`);
            return acc;
        },
        {} as Record<TvlRange, string>,
    );

    return (
        <div className={styles.root}>
            <Skeleton size={16} width={96} />

            <div className={styles.identity}>
                <div className={styles.topRow}>
                    <span className={styles.logoWrapper}>
                        <Skeleton circular width={48} />
                        <Skeleton
                            circular
                            width={24}
                            className={styles.chainDot}
                        />
                    </span>
                    <span className={styles.nameLine}>
                        <Skeleton size={28} width={160} />
                        <Skeleton size={18} width={100} />
                    </span>
                </div>
                <span className={styles.chipRow}>
                    <Skeleton height={32} width={96} />
                    <Skeleton height={32} width={80} />
                    <Skeleton height={32} width={96} />
                </span>
            </div>

            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Skeleton circular width={18} />
                            <Skeleton height={24} width={120} />
                        </div>

                        <div className={styles.riskGrade}>
                            <div className={styles.cardHeader}>
                                <Skeleton circular width={16} />
                                <Skeleton size={12} width={80} />
                            </div>
                            <div className={styles.riskGradeContent}>
                                <Skeleton width={44} height={36} />
                                <div className={styles.riskGradeScore}>
                                    <Skeleton height={20} width={72} />
                                    <Skeleton size={12} width={110} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.riskGradeRow}>
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className={styles.riskGrade}>
                                    <div className={styles.cardHeader}>
                                        <Skeleton circular width={16} />
                                        <Skeleton size={12} width={60} />
                                    </div>
                                    <div className={styles.riskGradeContent}>
                                        <Skeleton width={44} height={36} />
                                        <div className={styles.riskGradeScore}>
                                            <Skeleton height={20} width={48} />
                                            <Skeleton size={12} width={80} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Skeleton size={12} width={160} />
                    </div>

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
                        titleSize={12}
                        valueSize={24}
                    />

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Skeleton circular width={18} />
                            <Skeleton height={24} width={120} />
                        </div>
                        <Skeleton size={14} width="80%" />
                        <Skeleton size={14} width="60%" />
                    </div>
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.reviewCard}>
                        <div className={styles.cardHeader}>
                            <Skeleton circular width={24} />
                            <Skeleton height={28} width={120} />
                        </div>
                        <div className={styles.spreadRow}>
                            <Skeleton size={14} width="40%" />
                            <Skeleton size={20} width={64} />
                        </div>
                        <Skeleton height={8} width="100%" />
                        <Skeleton size={14} width="70%" />
                        <Skeleton size={14} width="70%" />
                        <Skeleton size={14} width="70%" />
                        <Skeleton height={44} width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
}

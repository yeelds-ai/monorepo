import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { ChartAverageIcon } from "@/src/assets";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatPercentage } from "@/src/utils/format";

import styles from "./styles.module.css";

interface YieldCompositionProps {
    opportunity: EnrichedOpportunity;
}

export function YieldComposition({ opportunity }: YieldCompositionProps) {
    const t = useTranslations("opportunity.review.yieldComposition");

    const { apy, totalApy, totalRewardsApr } = opportunity;
    const baseShare = totalApy > 0 ? (apy / totalApy) * 100 : 100;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <ChartAverageIcon className={styles.chartIcon} />
                <Typography font="brand" size={16}>
                    {t("title")}
                </Typography>
            </div>

            <div className={styles.summary}>
                <Typography as="span" size={14} variant="secondary">
                    {t("totalApy")}
                </Typography>
                <Typography as="span" size={20} font="brand">
                    {formatPercentage(totalApy)}
                </Typography>
            </div>

            <div className={styles.bar}>
                <div
                    className={styles.baseSegment}
                    style={{ width: `${baseShare}%` }}
                />
                <div className={styles.rewardsSegment} />
            </div>

            <div className={styles.legend}>
                <div className={styles.row}>
                    <span
                        className={classNames(styles.swatch, styles.baseSwatch)}
                    />
                    <Typography as="span" size={14}>
                        {t("baseApy")}:
                    </Typography>
                    <Typography as="span" size={14} font="brand" color="brand">
                        {formatPercentage(apy)}
                    </Typography>
                </div>
                <div className={styles.row}>
                    <span
                        className={classNames(
                            styles.swatch,
                            styles.rewardsSwatch,
                        )}
                    />
                    <Typography as="span" size={14} variant="secondary">
                        {t("incentiveRewards")}:
                    </Typography>
                    <Typography as="span" size={14} font="brand">
                        {formatPercentage(totalRewardsApr)}
                    </Typography>
                </div>
                <div className={styles.row}>
                    <Typography as="span" size={14} variant="secondary">
                        {t("organicRatio")}:
                    </Typography>
                    <Typography as="span" size={14} font="brand">
                        {formatPercentage(baseShare)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

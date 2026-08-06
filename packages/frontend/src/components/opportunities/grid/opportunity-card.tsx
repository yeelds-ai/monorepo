import type { Opportunity } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { OpportunityIdentity } from "@/src/components/opportunity-identity";
import { Link } from "@/src/i18n/routing";
import { formatApy, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

interface OpportunityCardProps {
    opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
    const t = useTranslations("opportunities.table");

    return (
        <div className={styles.card}>
            <Link
                href={`/opportunities/${opportunity.chain}/${opportunity.address}`}
                className={styles.link}
            />
            <div className={styles.content}>
                <OpportunityIdentity opportunity={opportunity} />

                <div className={styles.apyRow}>
                    <Typography size={24} font="brand" className={styles.apy}>
                        {formatApy(opportunity.apy)}
                    </Typography>
                    <Typography size={14} weight="bold" variant="secondary">
                        {t("apy")}
                    </Typography>
                </div>

                <div className={styles.divider} />

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Typography
                            size={10}
                            weight="bold"
                            uppercase
                            variant="secondary"
                        >
                            {t("tvl")}
                        </Typography>
                        <Typography
                            size={14}
                            weight="bold"
                            className={styles.statValue}
                        >
                            {opportunity.tvlUsd
                                ? formatUsd(opportunity.tvlUsd)
                                : "—"}
                        </Typography>
                    </div>
                    <div className={styles.stat}>
                        <Typography
                            size={10}
                            weight="bold"
                            uppercase
                            variant="secondary"
                        >
                            {t("stability")}
                        </Typography>
                        <div className={styles.statBadge}>
                            <Typography
                                size={14}
                                weight="bold"
                                className={styles.statValue}
                            >
                                {/* TODO: implement stability badge */}-
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.stat}>
                        <Typography
                            size={10}
                            weight="bold"
                            uppercase
                            variant="secondary"
                        >
                            {t("dailyPer1k")}
                        </Typography>
                        <Typography
                            size={14}
                            weight="bold"
                            className={styles.statValue}
                        >
                            {/* TODO: implement daily estimate */}-
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

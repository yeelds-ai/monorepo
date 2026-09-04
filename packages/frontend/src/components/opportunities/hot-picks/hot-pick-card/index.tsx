import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";
import type { HotPickCategory } from "@/src/types/hot-picks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatPercentage, formatUsd } from "@/src/utils/format";
import { HotPickIdentity } from "./identity";

import styles from "./styles.module.css";

interface HotPickCardProps {
    category: HotPickCategory;
    opportunity: EnrichedOpportunity;
}

export function HotPickCard({ category, opportunity }: HotPickCardProps) {
    const t = useTranslations("opportunities.hotPicks.opportunity");
    const href = `/opportunities/${opportunity.chain}/${opportunity.address}`;

    return (
        <Link
            href={href}
            aria-label={`${opportunity.protocol.name} ${opportunity.strategy}`}
            className={styles.card}
        >
            <HotPickIdentity category={category} opportunity={opportunity} />

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <Typography
                        size={20}
                        font="brand"
                        className={styles.apyValue}
                    >
                        {formatPercentage(opportunity.apy)}
                    </Typography>
                    <Typography size={14} weight="bold" variant="secondary">
                        {t("apy")}
                    </Typography>
                </div>
                <div className={styles.divider} />
                <div className={styles.stat}>
                    <Typography size={14} weight="bold">
                        {opportunity.tvlUsd
                            ? formatUsd(opportunity.tvlUsd)
                            : "-"}
                    </Typography>
                    <Typography size={14} weight="bold" variant="secondary">
                        {t("tvl")}
                    </Typography>
                </div>
            </div>
        </Link>
    );
}

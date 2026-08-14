import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { OpportunityIdentity } from "@/src/components/opportunity-identity";
import { Link } from "@/src/i18n/routing";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatApy, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

interface HotPickCardProps {
    opportunity: EnrichedOpportunity;
}

export function HotPickCard({ opportunity }: HotPickCardProps) {
    const t = useTranslations("explore.opportunity");
    const href = `/opportunities/${opportunity.chain}/${opportunity.address}`;

    return (
        <Link
            href={href}
            aria-label={`${opportunity.protocol.name} ${opportunity.strategy}`}
            className={styles.card}
        >
            <OpportunityIdentity opportunity={opportunity} />

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <Typography
                        size={20}
                        font="brand"
                        className={styles.apyValue}
                    >
                        {formatApy(opportunity.apy)}
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
                            : "—"}
                    </Typography>
                    <Typography size={14} weight="bold" variant="secondary">
                        {t("tvl")}
                    </Typography>
                </div>
            </div>
        </Link>
    );
}

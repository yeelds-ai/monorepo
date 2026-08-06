import type { Opportunity } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { LoadingBar } from "@/src/components/loading-bar";
import { OpportunityCard } from "./opportunity-card";

import styles from "./styles.module.css";

interface OpportunitiesGridProps {
    opportunities: Opportunity[];
    placeholderLoading?: boolean;
}

export function OpportunitiesGrid({
    opportunities,
    placeholderLoading = false,
}: OpportunitiesGridProps) {
    const t = useTranslations("opportunities.table");

    if (opportunities.length === 0)
        return (
            <div className={styles.wrapper}>
                <div className={styles.empty}>
                    <Typography size={14} weight="medium" variant="secondary">
                        {t("empty")}
                    </Typography>
                </div>
            </div>
        );

    return (
        <div className={styles.wrapper}>
            <LoadingBar loading={placeholderLoading} />
            <div className={styles.grid}>
                {opportunities.map((opportunity) => (
                    <OpportunityCard
                        key={opportunity.address}
                        opportunity={opportunity}
                    />
                ))}
            </div>
        </div>
    );
}

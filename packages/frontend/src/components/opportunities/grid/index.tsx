import type { Opportunity } from "@yeelds/sdk";

import { LoadingBar } from "@/src/components/loading-bar";
import { EmptyOpportunities } from "../empty";
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
    if (opportunities.length === 0) return <EmptyOpportunities />;

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

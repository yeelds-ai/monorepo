import { Typography } from "@yeelds/ui";
import type { FunctionComponent, SVGProps } from "react";

import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { HotPickCard } from "./hot-pick-card";
import { HotPickCardSkeleton } from "./hot-pick-card-skeleton";

import styles from "./styles.module.css";

const SKELETON_CARDS = 5;

interface HotPickColumnProps {
    label: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    opportunities: EnrichedOpportunity[];
    loading: boolean;
}

export function HotPickColumn({
    label,
    icon: Icon,
    opportunities,
    loading,
}: HotPickColumnProps) {
    if (!loading && opportunities.length === 0) return null;

    return (
        <div className={styles.column}>
            <div className={styles.label}>
                <Icon className={styles.labelIcon} />
                <Typography
                    size={14}
                    weight="bold"
                    variant="secondary"
                    className={styles.labelText}
                >
                    {label}
                </Typography>
            </div>

            <div className={styles.columnList}>
                {loading
                    ? Array.from({ length: SKELETON_CARDS }).map((_, index) => (
                          <HotPickCardSkeleton key={index} />
                      ))
                    : opportunities.map((opportunity) => (
                          <HotPickCard
                              key={opportunity.address}
                              opportunity={opportunity}
                          />
                      ))}
            </div>
        </div>
    );
}

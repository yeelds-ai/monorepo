import { Typography } from "@yeelds/ui";

import type { DealOverview as DealOverviewData } from "@/src/types/deal";
import { SectionCard } from "../section-card";
import { SectionTile } from "../section-tile";

import styles from "./styles.module.css";

interface DealOverviewProps {
    overview: DealOverviewData;
    title: string;
}

export function DealOverview({ overview, title }: DealOverviewProps) {
    return (
        <SectionCard number="01" title={overview.title ?? title}>
            <div className={styles.paragraphs}>
                {overview.paragraphs.map((paragraph) => (
                    <Typography key={paragraph} size={14} variant="secondary">
                        {paragraph}
                    </Typography>
                ))}
            </div>
            {overview.facts.length > 0 && (
                <div className={styles.facts}>
                    {overview.facts.map((fact) => (
                        <SectionTile key={fact.label}>
                            <Typography size={12} variant="secondary">
                                {fact.label}
                            </Typography>
                            <Typography size={14} weight="bold">
                                {fact.value}
                            </Typography>
                        </SectionTile>
                    ))}
                </div>
            )}
        </SectionCard>
    );
}

import { Typography } from "@yeelds/ui";

import { ShieldIcon, TrendingUpIcon } from "@/src/assets";
import type { DealYieldMechanics as DealYieldMechanicsData } from "@/src/types/deal";
import { SectionCard } from "../section-card";
import { SectionTile } from "../section-tile";

import styles from "./styles.module.css";

interface DealYieldMechanicsProps {
    yieldMechanics: DealYieldMechanicsData;
    title: string;
}

export function DealYieldMechanics({
    yieldMechanics,
    title,
}: DealYieldMechanicsProps) {
    return (
        <SectionCard number="02" title={yieldMechanics.title ?? title}>
            <Typography size={14} variant="secondary">
                {yieldMechanics.intro}
            </Typography>
            <div className={styles.scenarios}>
                {yieldMechanics.scenarios.map((scenario) => {
                    const Icon =
                        scenario.tone === "protected"
                            ? ShieldIcon
                            : TrendingUpIcon;

                    return (
                        <SectionTile
                            key={scenario.tag}
                            className={styles.scenario}
                        >
                            <div className={styles.scenarioTag}>
                                <Icon className={styles.scenarioIcon} />
                                <Typography
                                    as="span"
                                    size={12}
                                    weight="bold"
                                    color="brand"
                                >
                                    {scenario.tag}
                                </Typography>
                            </div>
                            <Typography size={14} weight="bold">
                                {scenario.condition}
                            </Typography>
                            <Typography size={14} variant="secondary">
                                {scenario.body}
                            </Typography>
                        </SectionTile>
                    );
                })}
            </div>
        </SectionCard>
    );
}

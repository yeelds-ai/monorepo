import { Typography } from "@yeelds/ui";

import { ArrowRightIcon } from "@/src/assets";
import type { DealFlow as DealFlowData } from "@/src/types/deal";
import { SectionCard } from "../section-card";

import styles from "./styles.module.css";

interface DealFlowProps {
    flow: DealFlowData;
    title: string;
}

export function DealFlow({ flow, title }: DealFlowProps) {
    return (
        <SectionCard number="04" title={flow.title ?? title}>
            <ol className={styles.steps}>
                {flow.steps.map((step, index) => (
                    <li key={step.title} className={styles.step}>
                        <span className={styles.stepIndex}>{index + 1}</span>
                        <div className={styles.stepContent}>
                            <Typography as="span" size={14} weight="bold">
                                {step.title}
                            </Typography>
                            <ArrowRightIcon className={styles.arrowIcon} />
                            <Typography as="span" size={14} variant="secondary">
                                {step.body}
                            </Typography>
                        </div>
                    </li>
                ))}
            </ol>
        </SectionCard>
    );
}

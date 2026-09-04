import { GradeTag, Typography } from "@yeelds/ui";

import { ChainDot } from "@/src/components/chain-dot";
import type { HotPickCategory } from "@/src/types/hot-picks";
import type { EnrichedOpportunity } from "@/src/types/opportunity";

import styles from "./styles.module.css";

interface HotPickIdentityProps {
    category: HotPickCategory;
    opportunity: EnrichedOpportunity;
}

export function HotPickIdentity({
    category,
    opportunity,
}: HotPickIdentityProps) {
    const Icon = category.icon;
    const protocolRegistry = opportunity.protocol.registry;

    return (
        <div className={styles.root}>
            <span className={styles.logoWrapper}>
                {protocolRegistry && (
                    <protocolRegistry.icon className={styles.logo} />
                )}
                <span className={styles.chainDot}>
                    <ChainDot chain={opportunity.chain} size={16} />
                </span>
            </span>

            <div className={styles.infoContainer}>
                <div className={styles.labelRow}>
                    <Icon className={styles.labelIcon} />
                    <Typography size={12} weight="bold" variant="secondary">
                        {category.label}
                    </Typography>
                </div>

                <div className={styles.titleRow}>
                    <Typography
                        size={16}
                        weight="bold"
                        className={styles.protocolName}
                    >
                        {opportunity.protocol.name}
                    </Typography>
                    <Typography
                        as="span"
                        size={12}
                        weight="bold"
                        variant="secondary"
                        truncate
                        capitalize
                        className={styles.strategyText}
                    >
                        {opportunity.strategy}
                        {opportunity.name && (
                            <>
                                {" "}
                                <span aria-hidden="true">•</span>{" "}
                                {opportunity.name}
                            </>
                        )}
                    </Typography>
                    <GradeTag
                        size="sm"
                        grade={opportunity.grade?.letter}
                        className={styles.gradeTag}
                    />
                </div>
            </div>
        </div>
    );
}

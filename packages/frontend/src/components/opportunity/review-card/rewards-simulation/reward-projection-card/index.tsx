import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface RewardProjectionCardProps {
    label: ReactNode;
    value: string;
    variant?: "default" | "highlight";
}

export function RewardProjectionCard({
    label,
    value,
    variant = "default",
}: RewardProjectionCardProps) {
    return (
        <div className={classNames("root", styles.card, styles[variant])}>
            <div className={styles.periodLabel}>
                <Typography
                    as="span"
                    size={12}
                    variant="secondary"
                    className={styles.periodLabelText}
                >
                    {label}
                </Typography>
            </div>
            <div className={styles.rewardValue}>
                <Typography
                    as="span"
                    font="brand"
                    size={16}
                    color={variant === "highlight" ? "brand" : undefined}
                >
                    {value}
                </Typography>
            </div>
        </div>
    );
}

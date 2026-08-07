"use client";

import classNames from "classnames";
import type { FunctionComponent, SVGProps } from "react";

import { Typography } from "../typography";

import styles from "./styles.module.css";

export interface MultiSelectTriggerProps {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
    selectedLabels: string[];
    open: boolean;
    onAnchorChange: (element: HTMLButtonElement | null) => void;
    onClick: () => void;
}

export function MultiSelectTrigger({
    icon: Icon,
    label,
    selectedLabels,
    open,
    onAnchorChange,
    onClick,
}: MultiSelectTriggerProps) {
    const firstSelected = selectedLabels[0];
    const extraCount = Math.max(selectedLabels.length - 1, 0);
    const active = selectedLabels.length > 0;

    return (
        <button
            ref={onAnchorChange}
            type="button"
            onClick={onClick}
            className={classNames("root", styles.trigger, {
                [styles.active]: active,
                [styles.open]: open,
            })}
        >
            {Icon && <Icon className={styles.triggerIcon} />}
            <div className={styles.triggerLabels}>
                <Typography
                    size={14}
                    weight="medium"
                    className={classNames(styles.triggerLabel, {
                        [styles.active]: active,
                    })}
                >
                    {label}
                </Typography>
                <div className={styles.selectedWithCountLabel}>
                    {firstSelected && (
                        <Typography size={12} weight="bold" color="brand">
                            {firstSelected}
                        </Typography>
                    )}
                    {extraCount > 0 && (
                        <Typography size={12} weight="bold" variant="secondary">
                            +{extraCount}
                        </Typography>
                    )}
                </div>
            </div>
        </button>
    );
}

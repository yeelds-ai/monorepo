"use client";

import classNames from "classnames";
import type { FunctionComponent, SVGProps } from "react";

import { CancelCircleIcon, CircledPlusIcon } from "../../assets";
import { Typography } from "../typography";

import styles from "./styles.module.css";

export interface MultiSelectTriggerProps {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
    selectedLabels: string[];
    open: boolean;
    clearLabel: string;
    onAnchorChange: (element: HTMLDivElement | null) => void;
    onClick: () => void;
    onClear: () => void;
}

export function MultiSelectTrigger({
    icon: Icon,
    label,
    selectedLabels,
    open,
    clearLabel,
    onAnchorChange,
    onClick,
    onClear,
}: MultiSelectTriggerProps) {
    const firstSelected = selectedLabels[0];
    const extraCount = Math.max(selectedLabels.length - 1, 0);
    const active = selectedLabels.length > 0;
    const showSelectedLabels = firstSelected || extraCount > 0;

    return (
        <div
            ref={onAnchorChange}
            className={classNames("root", styles.trigger, {
                [styles.active]: active,
                [styles.open]: open,
            })}
        >
            {active && (
                <button
                    type="button"
                    onClick={onClear}
                    aria-label={clearLabel}
                    className={classNames("clear", styles.clearButton)}
                >
                    <CancelCircleIcon
                        className={classNames(
                            styles.triggerIcon,
                            styles.active,
                        )}
                    />
                </button>
            )}
            <button
                type="button"
                onClick={onClick}
                className={classNames("open", styles.openButton)}
            >
                {!active &&
                    (Icon ? (
                        <Icon className={styles.triggerIcon} />
                    ) : (
                        <CircledPlusIcon className={styles.triggerIcon} />
                    ))}
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
                    {showSelectedLabels && (
                        <div className={styles.selectedWithCountLabel}>
                            {firstSelected && (
                                <Typography
                                    size={12}
                                    weight="bold"
                                    color="brand"
                                >
                                    {firstSelected}
                                </Typography>
                            )}
                            {extraCount > 0 && (
                                <Typography
                                    size={12}
                                    weight="bold"
                                    variant="secondary"
                                >
                                    +{extraCount}
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
}

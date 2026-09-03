"use client";

import type { GradeTier } from "@yeelds/sdk";
import {
    CancelCircleIcon,
    CircledPlusIcon,
    Popover,
    Typography,
} from "@yeelds/ui";
import classNames from "classnames";
import { useState } from "react";

import styles from "./styles.module.css";

const SELECTABLE_TIERS: GradeTier[] = ["A", "B", "C", "D"];

interface GradeFilterProps {
    label: string;
    ariaLabel: string;
    clearAriaLabel: string;
    optionLabel: (tier: GradeTier) => string;
    valueLabel: (tier: GradeTier) => string;
    value: GradeTier | undefined;
    onChange: (value: GradeTier | undefined) => void;
}

export function GradeFilter({
    label,
    ariaLabel,
    clearAriaLabel,
    optionLabel,
    valueLabel,
    value,
    onChange,
}: GradeFilterProps) {
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    const active = value !== undefined;

    function handleOnToggleOpen() {
        setOpen((current) => !current);
    }

    function handleOnClear() {
        onChange(undefined);
    }

    function getHandleOnSelect(tier: GradeTier) {
        return () => onChange(tier === value ? undefined : tier);
    }

    return (
        <>
            <div
                ref={setAnchor}
                className={classNames("root", styles.trigger, {
                    [styles.active]: active,
                    [styles.open]: open,
                })}
            >
                {active && (
                    <button
                        type="button"
                        onClick={handleOnClear}
                        aria-label={clearAriaLabel}
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
                    aria-label={ariaLabel}
                    aria-expanded={open}
                    onClick={handleOnToggleOpen}
                    className={classNames("open", styles.openButton)}
                >
                    {!active && (
                        <CircledPlusIcon className={styles.triggerIcon} />
                    )}
                    <Typography
                        size={14}
                        weight="medium"
                        className={classNames(styles.triggerLabel, {
                            [styles.active]: active,
                        })}
                    >
                        {label}
                    </Typography>
                    {active && (
                        <Typography size={12} weight="bold" color="brand">
                            {valueLabel(value)}
                        </Typography>
                    )}
                </button>
            </div>
            <Popover
                anchor={anchor}
                open={open}
                onOpenChange={setOpen}
                placement="bottom-start"
                margin={8}
                className={styles.popover}
            >
                <div className={styles.options} role="radiogroup">
                    {SELECTABLE_TIERS.map((tier) => {
                        const selected = tier === value;
                        return (
                            <button
                                key={tier}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={getHandleOnSelect(tier)}
                                className={classNames("option", styles.option, {
                                    [styles.selected]: selected,
                                })}
                            >
                                <span
                                    className={classNames(styles.radio, {
                                        [styles.selected]: selected,
                                    })}
                                />
                                <Typography size={14} weight="medium">
                                    {optionLabel(tier)}
                                </Typography>
                            </button>
                        );
                    })}
                </div>
            </Popover>
        </>
    );
}

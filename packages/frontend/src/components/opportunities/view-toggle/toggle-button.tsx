"use client";

import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import type { ViewOption, YieldsView } from "./index";

import styles from "./styles.module.css";

interface ViewToggleButtonProps {
    option: ViewOption;
    active: boolean;
    onChange: (view: YieldsView) => void;
}

export function ViewToggleButton({
    option: { value, icon: Icon },
    active,
    onChange,
}: ViewToggleButtonProps) {
    const t = useTranslations("opportunities.viewToggle");

    function handleOnClick() {
        onChange(value);
    }

    return (
        <button
            onClick={handleOnClick}
            aria-current={active ? "page" : undefined}
            className={classNames("viewButton", styles.button, {
                [styles.active]: active,
            })}
        >
            <Icon aria-hidden="true" className={styles.icon} />
            <Typography as="span" size={14} className={styles.label}>
                {t(value)}
            </Typography>
        </button>
    );
}

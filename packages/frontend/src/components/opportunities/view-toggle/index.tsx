"use client";

import { useTranslations } from "next-intl";
import type { FunctionComponent, SVGProps } from "react";

import { GridViewIcon, ServerStackIcon } from "@/src/assets";
import { ViewToggleButton } from "./toggle-button";

import styles from "./styles.module.css";

export interface ViewOption {
    value: YieldsView;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export type YieldsView = "table" | "grid";

const VIEWS: ViewOption[] = [
    { value: "table", icon: ServerStackIcon },
    { value: "grid", icon: GridViewIcon },
] as const;

interface ViewToggleProps {
    view: YieldsView;
    onChange: (view: YieldsView) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    const t = useTranslations("opportunities.viewToggle");

    return (
        <nav aria-label={t("ariaLabel")} className={styles.root}>
            {VIEWS.map((option, index) => (
                <div key={option.value} className={styles.item}>
                    {index > 0 && (
                        <span aria-hidden="true" className={styles.divider} />
                    )}
                    <ViewToggleButton
                        option={option}
                        active={view === option.value}
                        onChange={onChange}
                    />
                </div>
            ))}
        </nav>
    );
}

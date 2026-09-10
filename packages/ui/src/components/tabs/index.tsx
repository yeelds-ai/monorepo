"use client";

import classNames from "classnames";

import styles from "./styles.module.css";

export interface TabItem<T extends string = string> {
    id: T;
    label: string;
}

interface TabsProps<T extends string = string> {
    tabs: TabItem<T>[];
    activeTab: T;
    onTabChange: (id: T) => void;
    className?: string;
}

export function Tabs<T extends string = string>({
    tabs,
    activeTab,
    onTabChange,
    className,
}: TabsProps<T>) {
    function getHandleOnTabChange(id: T) {
        return () => onTabChange(id);
    }

    return (
        <div
            role="tablist"
            className={classNames("root", styles.root, className)}
        >
            {tabs.map((tab) => {
                const active = tab.id === activeTab;

                return (
                    <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={active}
                        onClick={getHandleOnTabChange(tab.id)}
                        className={classNames("tab", styles.tab, {
                            [styles.active]: active,
                        })}
                    >
                        <span className={classNames("label", styles.label)}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

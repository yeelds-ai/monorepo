import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export interface TagProps {
    children: ReactNode;
    padding?: "compact" | "spaced";
    className?: string;
}

export function Tag({ children, padding = "compact", className }: TagProps) {
    return (
        <div
            className={classNames(
                "root",
                styles.root,
                styles[padding],
                className,
            )}
        >
            {children}
        </div>
    );
}

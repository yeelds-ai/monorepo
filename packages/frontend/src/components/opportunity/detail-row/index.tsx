import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface DetailRowProps {
    label: ReactNode;
    children: ReactNode;
    className?: string;
}

export function DetailRow({ label, children, className }: DetailRowProps) {
    return (
        <div className={classNames("row", styles.row, className)}>
            <Typography as="span" size={14} variant="secondary">
                {label}
            </Typography>
            <span className={styles.rowValue}>{children}</span>
        </div>
    );
}

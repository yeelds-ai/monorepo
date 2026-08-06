import { Typography } from "@yeelds/ui";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface DetailRowProps {
    label: ReactNode;
    children: ReactNode;
}

export function DetailRow({ label, children }: DetailRowProps) {
    return (
        <div className={styles.row}>
            <Typography as="span" size={14} variant="secondary">
                {label}
            </Typography>
            <span className={styles.rowValue}>{children}</span>
        </div>
    );
}

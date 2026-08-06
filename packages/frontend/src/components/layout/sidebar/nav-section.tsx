import { Typography } from "@yeelds/ui";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface NavSectionProps {
    title: string;
    children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
    return (
        <div className={styles.section}>
            <Typography
                as="h3"
                size={10}
                weight="bold"
                variant="secondary"
                uppercase
                className={styles.sectionTitle}
            >
                {title}
            </Typography>
            <div className={styles.sectionItems}>{children}</div>
        </div>
    );
}

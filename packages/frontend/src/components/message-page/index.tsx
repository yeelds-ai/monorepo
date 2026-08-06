import { Typography } from "@yeelds/ui";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface MessagePageProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export function MessagePage({
    title,
    description,
    children,
}: MessagePageProps) {
    return (
        <div className={styles.root}>
            <Typography as="h1" font="brand" size={24}>
                {title}
            </Typography>
            <Typography size={14} variant="secondary">
                {description}
            </Typography>
            {children}
        </div>
    );
}

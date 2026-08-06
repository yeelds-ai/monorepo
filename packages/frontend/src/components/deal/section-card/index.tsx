import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface SectionCardProps {
    number: string;
    title: ReactNode;
    children: ReactNode;
    className?: string;
}

export function SectionCard({
    number,
    title,
    children,
    className,
}: SectionCardProps) {
    return (
        <div className={classNames("card", styles.root, className)}>
            <div className={classNames("header", styles.header)}>
                <Typography as="span" size={12} weight="bold" color="brand">
                    {number}
                </Typography>
                <Typography as="span" size={16} weight="bold">
                    {title}
                </Typography>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

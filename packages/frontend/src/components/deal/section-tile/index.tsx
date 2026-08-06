import classNames from "classnames";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

interface SectionTileProps {
    children: ReactNode;
    className?: string;
}

export function SectionTile({ children, className }: SectionTileProps) {
    return (
        <div className={classNames("root", styles.root, className)}>
            {children}
        </div>
    );
}

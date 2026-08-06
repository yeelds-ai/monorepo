import classNames from "classnames";

import styles from "./styles.module.css";

export type SkeletonSize = 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28;

export interface SkeletonProps {
    size?: SkeletonSize;
    circular?: boolean;
    width?: number | string;
    height?: number | string;
    className?: string;
}

export function Skeleton({
    size = 16,
    circular,
    width,
    height,
    className,
}: SkeletonProps) {
    return (
        <span
            style={{
                width,
                height: height ?? (circular ? width : undefined),
            }}
            className={classNames(
                "root",
                styles.root,
                styles[`size${size}`],
                className,
                { [styles.circular]: circular },
            )}
        />
    );
}

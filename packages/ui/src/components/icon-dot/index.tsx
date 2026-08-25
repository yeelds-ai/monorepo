import classNames from "classnames";
import type { FunctionComponent, SVGProps } from "react";

import styles from "./styles.module.css";

interface IconDotProps {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    fallbackText: string;
    size?: number;
    className?: string;
}

export function IconDot({
    icon: Icon,
    fallbackText,
    size = 24,
    className,
}: IconDotProps) {
    return (
        <span
            style={{ width: size, height: size }}
            className={classNames("root", styles.root, className)}
        >
            {Icon ? (
                <Icon className={classNames("icon", styles.icon)} />
            ) : (
                <span
                    style={{ fontSize: size * 0.42 }}
                    className={classNames("initial", styles.initial)}
                >
                    {fallbackText}
                </span>
            )}
        </span>
    );
}

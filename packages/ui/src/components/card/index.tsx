import classNames from "classnames";
import type { FunctionComponent, ReactNode, SVGProps } from "react";

import { Typography } from "../typography";

import styles from "./styles.module.css";

export interface CardProps {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    title: ReactNode;
    children: ReactNode;
    className?: string;
}

export function Card({ icon: Icon, title, children, className }: CardProps) {
    return (
        <div className={classNames("card", styles.root, className)}>
            <div className={classNames("header", styles.header)}>
                {Icon && <Icon className={classNames("icon", styles.icon)} />}
                <Typography as="span" size={16} weight="bold">
                    {title}
                </Typography>
            </div>
            {children}
        </div>
    );
}

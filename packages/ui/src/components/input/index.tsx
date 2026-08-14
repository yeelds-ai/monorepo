import classNames from "classnames";
import type { FunctionComponent, InputHTMLAttributes, SVGProps } from "react";

import styles from "./styles.module.css";

export interface InputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className"
> {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    iconPlacement?: "left" | "right";
    className?: string;
}

export function Input({
    icon: Icon,
    iconPlacement = "right",
    className,
    ...rest
}: InputProps) {
    const icon = Icon && <Icon className={classNames("icon", styles.icon)} />;

    return (
        <div className={classNames("root", styles.root, className)}>
            {iconPlacement === "left" && icon}
            <input className={classNames("input", styles.input)} {...rest} />
            {iconPlacement === "right" && icon}
        </div>
    );
}

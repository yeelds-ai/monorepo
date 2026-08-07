import classNames from "classnames";
import type { InputHTMLAttributes } from "react";

import styles from "./styles.module.css";

export interface InputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className"
> {
    className?: string;
}

export function Input({ className, ...rest }: InputProps) {
    return (
        <input
            className={classNames("root", styles.root, className)}
            {...rest}
        />
    );
}

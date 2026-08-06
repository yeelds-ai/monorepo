import classNames from "classnames";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.css";

interface BrandTypographyProps {
    font: "brand";
    size?: 14 | 16 | 18 | 20 | 24 | 28;
    variant?: "primary" | "secondary";
    color?: "brand";
}

interface SystemTypographyProps {
    font?: "system";
    size?: 10 | 12 | 14 | 16 | 18 | 20;
    weight?: "medium" | "bold";
    variant?: "primary" | "secondary";
    color?: "brand";
}

type TypographyBaseProps = (BrandTypographyProps | SystemTypographyProps) & {
    as?: ElementType;
    className?: string;
    uppercase?: boolean;
    capitalize?: boolean;
    children: ReactNode;
};

export type TypographyProps = TypographyBaseProps &
    Omit<HTMLAttributes<HTMLElement>, keyof TypographyBaseProps>;

export function Typography(props: TypographyProps) {
    const {
        size = 16,
        variant = "primary",
        color,
        as: Element = "p",
        className,
        uppercase,
        capitalize,
        children,
        weight: weightProp,
        ...rest
    } = props as TypographyProps & SystemTypographyProps;
    const weight =
        props.font === "brand" ? undefined : (weightProp ?? "medium");

    return (
        <Element
            {...rest}
            className={classNames(
                "root",
                className,
                styles.root,
                styles[`size${size}`],
                {
                    [styles.brand]: props.font === "brand",
                    [styles.system]: props.font !== "brand",
                    [styles.medium]: weight === "medium",
                    [styles.bold]: weight === "bold",
                    [styles[variant]]: true,
                    [styles.colorBrand]: color === "brand",
                    [styles.uppercase]: uppercase,
                    [styles.capitalize]: capitalize,
                },
            )}
        >
            {children}
        </Element>
    );
}

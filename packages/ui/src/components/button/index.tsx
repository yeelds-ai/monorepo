import classNames from "classnames";
import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ElementType,
    type ForwardedRef,
    type FunctionComponent,
    type MouseEvent,
    type ReactNode,
    type SVGProps,
    forwardRef,
} from "react";

import { Typography } from "../typography";

import styles from "./styles.module.css";

export interface BaseButtonProps {
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    variant?: "primary";
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    className?: string;
    children: ReactNode;
}

export type CleanHTMLButtonProps = BaseButtonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;
export type CleanHTMLAnchorProps = BaseButtonProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export type ButtonProps = CleanHTMLButtonProps | CleanHTMLAnchorProps;

export type RefType<P extends ButtonProps> = ForwardedRef<
    "href" extends keyof P ? HTMLAnchorElement : HTMLButtonElement
>;

const Component = (props: ButtonProps, ref: RefType<typeof props>) => {
    const {
        variant = "primary",
        disabled,
        onClick,
        icon: Icon,
        className,
        children,
        ...rest
    } = props;

    function handleOnClick(event: MouseEvent) {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Root, rootProps]: [ElementType, any] =
        "href" in rest
            ? [
                  "a",
                  {
                      href: disabled ? undefined : rest.href,
                      onClick: handleOnClick,
                      "aria-disabled": disabled,
                      tabIndex: disabled ? -1 : undefined,
                  },
              ]
            : ["button", { onClick: handleOnClick, disabled }];

    return (
        <Root
            {...rootProps}
            {...rest}
            ref={ref}
            className={classNames(
                "root",
                styles.root,
                styles[variant],
                className,
                { [styles.disabled]: disabled },
            )}
        >
            <Typography
                as="span"
                size={16}
                weight="bold"
                className={styles.label}
            >
                {children}
            </Typography>
            {Icon && <Icon className={classNames("icon", styles.icon)} />}
        </Root>
    );
};

export const Button = forwardRef(Component) as <P extends ButtonProps>(
    props: P & { ref?: RefType<P> },
) => ReturnType<typeof Component>;

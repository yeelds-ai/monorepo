"use client";

import {
    type ElementType,
    type HTMLAttributes,
    type ReactNode,
    useState,
} from "react";

import { Popover } from "../popover";

import styles from "./styles.module.css";

interface TruncateTooltipProps {
    as: ElementType;
    rest: HTMLAttributes<HTMLElement>;
    children: ReactNode;
    className?: string;
}

export function TruncateTooltip({
    as: Element,
    className,
    rest,
    children,
}: TruncateTooltipProps) {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    function handleOnMouseEnter() {
        if (anchor && anchor.scrollWidth > anchor.clientWidth) setOpen(true);
    }

    function handleOnMouseLeave() {
        setOpen(false);
    }

    return (
        <>
            <Element
                {...rest}
                ref={setAnchor}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className={className}
            >
                {children}
            </Element>
            <Popover
                anchor={anchor}
                open={open}
                onOpenChange={setOpen}
                placement="top"
                margin={8}
                className={styles.tooltipContent}
            >
                {children}
            </Popover>
        </>
    );
}

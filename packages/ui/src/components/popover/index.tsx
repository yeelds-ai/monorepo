"use client";

import {
    FloatingPortal,
    type Placement,
    autoUpdate,
    flip,
    offset,
    size,
    useDismiss,
    useFloating,
    useInteractions,
} from "@floating-ui/react";
import classNames from "classnames";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { type ReactNode, forwardRef, useCallback, useState } from "react";

import styles from "./styles.module.css";

export interface PopoverProps {
    open: boolean;
    anchor?: Element | null;
    variant?: "primary" | "secondary";
    contained?: boolean;
    margin?: number;
    placement?: Placement;
    className?: string;
    children?: ReactNode;
    root?: HTMLElement | null;
    onOpenChange: (open: boolean) => void;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    function Popover(
        {
            open,
            anchor,
            variant = "primary",
            contained = false,
            margin,
            placement,
            className,
            children,
            root,
            onOpenChange,
        },
        ref,
    ) {
        const [popper, setPopper] = useState<HTMLDivElement | null>(null);

        const { floatingStyles, context } = useFloating({
            elements: { reference: anchor, floating: popper },
            open,
            onOpenChange,
            middleware: [
                offset(margin ?? 10),
                contained
                    ? size({
                          apply({ rects, elements }) {
                              Object.assign(elements.floating.style, {
                                  width: `${rects.reference.width}px`,
                              });
                          },
                      })
                    : null,
                flip({
                    fallbackPlacements: ["top", "bottom", "left", "right"],
                }),
            ],
            placement,
            whileElementsMounted: autoUpdate,
        });

        const dismiss = useDismiss(context);
        const { getFloatingProps } = useInteractions([dismiss]);

        const mergedRef = useCallback(
            (element: HTMLDivElement | null) => {
                if (typeof ref === "function") ref(element);
                else if (ref) ref.current = element;
                setPopper(element);
            },
            [ref],
        );

        return (
            <AnimatePresence>
                {open && (
                    <FloatingPortal root={root}>
                        <motion.div
                            ref={mergedRef}
                            {...getFloatingProps()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: easeInOut }}
                            style={floatingStyles}
                            className={classNames(
                                "root",
                                styles.root,
                                className,
                                { [styles[variant]]: true },
                            )}
                        >
                            {children}
                        </motion.div>
                    </FloatingPortal>
                )}
            </AnimatePresence>
        );
    },
);

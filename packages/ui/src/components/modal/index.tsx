"use client";

import classNames from "classnames";
import {
    AnimatePresence,
    type MotionProps,
    easeInOut,
    motion,
} from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { useLockBodyScroll } from "react-use";

import styles from "./styles.module.css";

export type ModalTransition = "slide-right" | "fade-center";

export interface ModalProps {
    open?: boolean;
    onDismiss?: () => void;
    transition?: ModalTransition;
    className?: string;
    children?: ReactNode;
}

const TRANSITION = { ease: easeInOut, duration: 0.2 };

const PANEL_MOTION: Record<
    ModalTransition,
    Pick<MotionProps, "initial" | "animate" | "exit">
> = {
    "slide-right": {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
    },
    "fade-center": {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
};

export function Modal({
    open,
    onDismiss,
    transition = "slide-right",
    className,
    children,
}: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useLockBodyScroll(!!open);

    useEffect(() => {
        if (!open || !onDismiss) return;

        function handleOnMouseDown(event: MouseEvent) {
            if (
                event.button === 0 &&
                !!overlayRef.current &&
                overlayRef.current.isSameNode(event.target as Node)
            )
                onDismiss?.();
        }

        function handleOnKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onDismiss?.();
        }

        document.addEventListener("mousedown", handleOnMouseDown);
        document.addEventListener("keydown", handleOnKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleOnMouseDown);
            document.removeEventListener("keydown", handleOnKeyDown);
        };
    }, [open, onDismiss]);

    const centered = transition === "fade-center";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={TRANSITION}
                    className={classNames(
                        "root",
                        styles.root,
                        centered ? styles.fadeCenter : styles.slideRight,
                    )}
                >
                    <motion.div
                        {...PANEL_MOTION[transition]}
                        transition={TRANSITION}
                        className={classNames(
                            "panel",
                            styles.panel,
                            centered ? styles.panelAuto : styles.panelFull,
                            className,
                        )}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

const SHOW_DELAY = 300;
const INITIAL_SPEED = 5;
const SLOWDOWN_FACTOR = 20;
const COMPLETE_HOLD = 150;

interface LoadingBarProps {
    loading: boolean;
    className?: string;
}

export function LoadingBar({ loading, className }: LoadingBarProps) {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const showRef = useRef(show);

    useEffect(() => {
        showRef.current = show;
    }, [show]);

    useEffect(() => {
        if (loading) {
            const showTimeout = setTimeout(() => setShow(true), SHOW_DELAY);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const increment = Math.max(
                        0.5,
                        INITIAL_SPEED / (1 + prev / SLOWDOWN_FACTOR),
                    );
                    return Math.min(95, prev + increment);
                });
            }, 40);

            return () => {
                clearTimeout(showTimeout);
                clearInterval(interval);
            };
        }

        if (!showRef.current) {
            setProgress(0);
            return;
        }

        setProgress(100);
        const holdTimeout = setTimeout(() => {
            setProgress(0);
            setShow(false);
        }, COMPLETE_HOLD);

        return () => clearTimeout(holdTimeout);
    }, [loading]);

    return (
        <div className={classNames("root", styles.root, className)}>
            {show && (
                <div
                    style={{ width: `${progress}%` }}
                    className={classNames("progress", styles.progress)}
                />
            )}
        </div>
    );
}

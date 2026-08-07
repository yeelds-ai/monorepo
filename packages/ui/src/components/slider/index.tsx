"use client";

import classNames from "classnames";
import { type PointerEvent, useCallback, useRef } from "react";

import styles from "./styles.module.css";

export type SliderValue = [number, number];

export interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    minDistance?: number;
    value: SliderValue;
    className?: string;
    onChange: (value: SliderValue) => void;
    onChangeEnd?: (value: SliderValue) => void;
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

export function Slider({
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    step = DEFAULT_STEP,
    minDistance = step,
    value,
    className,
    onChange,
    onChangeEnd,
}: SliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [low, high] = value;

    const positionToValue = useCallback(
        (clientX: number) => {
            const track = trackRef.current;
            if (!track) return min;

            const rect = track.getBoundingClientRect();
            const ratio = Math.min(
                Math.max((clientX - rect.left) / rect.width, 0),
                1,
            );
            const raw = min + ratio * (max - min);
            return Math.round((raw - min) / step) * step + min;
        },
        [min, max, step],
    );

    function handleOnPointerDown(event: PointerEvent<HTMLDivElement>) {
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handleOnPointerUp(event: PointerEvent<HTMLDivElement>) {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        onChangeEnd?.(value);
    }

    function handleOnLowPointerMove(event: PointerEvent<HTMLDivElement>) {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const next = Math.min(
            positionToValue(event.clientX),
            high - minDistance,
        );
        onChange([Math.max(next, min), high]);
    }

    function handleOnHighPointerMove(event: PointerEvent<HTMLDivElement>) {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const next = Math.max(
            positionToValue(event.clientX),
            low + minDistance,
        );
        onChange([low, Math.min(next, max)]);
    }

    const lowPercent = ((low - min) / (max - min)) * 100;
    const highPercent = ((high - min) / (max - min)) * 100;

    return (
        <div className={classNames("root", styles.root, className)}>
            <div ref={trackRef} className={classNames("track", styles.track)}>
                <div
                    className={classNames("range", styles.range)}
                    style={{
                        left: `${lowPercent}%`,
                        width: `${highPercent - lowPercent}%`,
                    }}
                />
                <div
                    role="slider"
                    aria-orientation="horizontal"
                    aria-valuemin={min}
                    aria-valuemax={high}
                    aria-valuenow={low}
                    onPointerDown={handleOnPointerDown}
                    onPointerMove={handleOnLowPointerMove}
                    onPointerUp={handleOnPointerUp}
                    style={{ left: `${lowPercent}%` }}
                    className={classNames("thumb", styles.thumb)}
                />
                <div
                    role="slider"
                    aria-orientation="horizontal"
                    aria-valuemin={low}
                    aria-valuemax={max}
                    aria-valuenow={high}
                    onPointerDown={handleOnPointerDown}
                    onPointerMove={handleOnHighPointerMove}
                    onPointerUp={handleOnPointerUp}
                    style={{ left: `${highPercent}%` }}
                    className={classNames("thumb", styles.thumb)}
                />
            </div>
        </div>
    );
}

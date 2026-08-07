"use client";

import {
    Input,
    Popover,
    Slider,
    type SliderValue,
    Typography,
} from "@yeelds/ui";
import classNames from "classnames";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";

import { clamp } from "@/src/utils/math";

import styles from "./styles.module.css";

export interface RangeFilterProps {
    label: string;
    ariaLabel: string;
    title: string;
    minCaption: string;
    maxCaption: string;
    min: number;
    max: number;
    step: number;
    minDistance: number;
    value: SliderValue | undefined;
    format: (value: number) => string;
    parse: (input: string) => number | null;
    onChange: (value: SliderValue | undefined) => void;
}

export function RangeFilter({
    label,
    ariaLabel,
    title,
    minCaption,
    maxCaption,
    min,
    max,
    step,
    minDistance,
    value,
    format,
    parse,
    onChange,
}: RangeFilterProps) {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const low = value?.[0] ?? min;
    const high = value?.[1] ?? max;

    const [draft, setDraft] = useState<SliderValue>([low, high]);
    const [prevLow, setPrevLow] = useState(low);
    const [prevHigh, setPrevHigh] = useState(high);
    if (low !== prevLow || high !== prevHigh) {
        setPrevLow(low);
        setPrevHigh(high);
        setDraft([low, high]);
    }

    const [lowText, setLowText] = useState(format(draft[0]));
    const [highText, setHighText] = useState(format(draft[1]));
    const [lowFocused, setLowFocused] = useState(false);
    const [highFocused, setHighFocused] = useState(false);

    const [prevDraft, setPrevDraft] = useState(draft);
    if (prevDraft !== draft) {
        setPrevDraft(draft);
        if (!lowFocused) setLowText(format(draft[0]));
        if (!highFocused) setHighText(format(draft[1]));
    }

    function commit(next: SliderValue) {
        onChange(next[0] === min && next[1] === max ? undefined : next);
    }

    function handleOnToggleOpen() {
        setOpen((current) => !current);
    }

    function handleOnSliderChange(next: SliderValue) {
        setDraft(next);
    }

    function handleOnSliderChangeEnd(next: SliderValue) {
        commit(next);
    }

    function handleOnLowTextChange(event: ChangeEvent<HTMLInputElement>) {
        setLowText(event.target.value);
    }

    function handleOnHighTextChange(event: ChangeEvent<HTMLInputElement>) {
        setHighText(event.target.value);
    }

    function handleOnLowFocus() {
        setLowFocused(true);
    }

    function handleOnHighFocus() {
        setHighFocused(true);
    }

    function handleOnLowBlur() {
        setLowFocused(false);
        const parsed = parse(lowText);
        if (parsed === null) {
            setLowText(format(draft[0]));
            return;
        }

        const next: SliderValue = [
            clamp(parsed, min, draft[1] - minDistance),
            draft[1],
        ];

        setDraft(next);
        commit(next);
    }

    function handleOnHighBlur() {
        setHighFocused(false);
        const parsed = parse(highText);
        if (parsed === null) {
            setHighText(format(draft[1]));
            return;
        }

        const next: SliderValue = [
            draft[0],
            clamp(parsed, draft[0] + minDistance, max),
        ];

        setDraft(next);
        commit(next);
    }

    function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") event.currentTarget.blur();
    }

    const active = draft[0] !== min || draft[1] !== max;

    return (
        <>
            <button
                ref={setAnchor}
                type="button"
                aria-label={ariaLabel}
                aria-expanded={open}
                onClick={handleOnToggleOpen}
                className={classNames("root", styles.trigger, {
                    [styles.active]: active,
                    [styles.open]: open,
                })}
            >
                <Typography
                    size={14}
                    weight="medium"
                    className={classNames(styles.triggerLabel, {
                        [styles.active]: active,
                    })}
                >
                    {label}
                </Typography>
                {active && (
                    <Typography size={12} weight="bold" color="brand">
                        {format(draft[0])}–{format(draft[1])}
                    </Typography>
                )}
            </button>
            <Popover
                anchor={anchor}
                open={open}
                onOpenChange={setOpen}
                placement="bottom-start"
                margin={8}
                className={styles.popover}
            >
                <Typography size={16} weight="bold">
                    {title}
                </Typography>
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    minDistance={minDistance}
                    value={draft}
                    onChange={handleOnSliderChange}
                    onChangeEnd={handleOnSliderChangeEnd}
                    className={styles.slider}
                />
                <div className={styles.inputs}>
                    <Input
                        value={lowText}
                        type="text"
                        inputMode="decimal"
                        aria-label={minCaption}
                        onChange={handleOnLowTextChange}
                        onFocus={handleOnLowFocus}
                        onBlur={handleOnLowBlur}
                        onKeyDown={handleOnKeyDown}
                        className={classNames(styles.input, styles.low)}
                    />
                    <span className={styles.dash} />
                    <Input
                        value={highText}
                        type="text"
                        inputMode="decimal"
                        aria-label={maxCaption}
                        onChange={handleOnHighTextChange}
                        onFocus={handleOnHighFocus}
                        onBlur={handleOnHighBlur}
                        onKeyDown={handleOnKeyDown}
                        className={classNames(styles.input, styles.high)}
                    />
                    <Typography
                        size={10}
                        variant="secondary"
                        className={classNames(styles.caption, styles.low)}
                    >
                        {minCaption}
                    </Typography>
                    <Typography
                        size={10}
                        variant="secondary"
                        className={classNames(styles.caption, styles.high)}
                    >
                        {maxCaption}
                    </Typography>
                </div>
            </Popover>
        </>
    );
}

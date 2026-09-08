"use client";

import { CancelCircleIcon } from "@yeelds/ui";
import classNames from "classnames";
import { type ChangeEvent, useState } from "react";
import { useDebounce } from "react-use";

import { SearchIcon } from "@/src/assets";

import styles from "./styles.module.css";

const DEBOUNCE_MS = 300;

interface SearchFilterProps {
    value?: string;
    placeholder: string;
    ariaLabel: string;
    clearAriaLabel: string;
    onChange: (value: string | undefined) => void;
    className?: string;
}

export function SearchFilter({
    value,
    placeholder,
    ariaLabel,
    clearAriaLabel,
    onChange,
    className,
}: SearchFilterProps) {
    const [query, setQuery] = useState(value ?? "");
    const [lastValue, setLastValue] = useState(value);

    if (value !== lastValue) {
        setLastValue(value);
        setQuery(value ?? "");
    }

    useDebounce(
        () => {
            if (query !== (value ?? "")) onChange(query || undefined);
        },
        DEBOUNCE_MS,
        [query],
    );

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    function handleOnClear() {
        setQuery("");
        onChange(undefined);
    }

    return (
        <div
            className={classNames("root", styles.root, className, {
                [styles.active]: query.length > 0,
            })}
        >
            <SearchIcon className={classNames("icon", styles.icon)} />
            <input
                type="search"
                value={query}
                placeholder={placeholder}
                aria-label={ariaLabel}
                onChange={handleOnChange}
                className={classNames("input", styles.input)}
            />
            {query.length > 0 && (
                <button
                    type="button"
                    onClick={handleOnClear}
                    aria-label={clearAriaLabel}
                    className={classNames("clear", styles.clearButton)}
                >
                    <CancelCircleIcon className={styles.clearIcon} />
                </button>
            )}
        </div>
    );
}

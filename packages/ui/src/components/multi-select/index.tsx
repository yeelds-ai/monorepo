"use client";

import classNames from "classnames";
import {
    type ChangeEvent,
    type FunctionComponent,
    type SVGProps,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useClickAway, useDebounce } from "react-use";
import { List, type RowComponentProps } from "react-window";

import { CheckIcon } from "../../assets";
import { Popover } from "../popover";
import { Typography } from "../typography";
import { MultiSelectTrigger } from "./trigger";

import styles from "./styles.module.css";

export type ValueType = string | number;

export interface SelectOption<V extends ValueType, D = unknown> {
    label: string;
    value: V;
    data?: D;
    disabled?: boolean;
}

export interface MultiSelectMessages {
    deselectAll: string;
    noResults: string;
    searchPlaceholder: string;
    clear: string;
}

const OPTION_ROW_HEIGHT = 36;
const MAX_VISIBLE_OPTIONS = 6;
const SEARCH_DEBOUNCE_MS = 200;
const SKELETON_LABEL_WIDTHS = ["70%", "45%", "60%", "50%", "65%"];
const SHOW_DESELECT_ALL_THRESHOLD = 5;

export interface MultiSelectProps<
    V extends ValueType,
    O extends SelectOption<V>,
> {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
    options: O[];
    values: O[];
    search?: boolean;
    loading?: boolean;
    portalContainer?: HTMLElement | null;
    messages: MultiSelectMessages;
    className?: string;
    onChange: (values: O[]) => void;
}

interface OptionRowData<V extends ValueType, O extends SelectOption<V>> {
    options: O[];
    selectedValues: Set<V>;
    onSelect: (option: O) => void;
}

export function MultiSelect<V extends ValueType, O extends SelectOption<V>>({
    icon,
    label,
    options,
    values,
    search = false,
    loading = false,
    portalContainer,
    messages,
    className,
    onChange,
}: MultiSelectProps<V, O>) {
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useDebounce(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS, [query]);

    useClickAway(containerRef, () => setQuery(""));

    useEffect(() => {
        if (!open) setQuery("");
    }, [open]);

    const filteredOptions = useMemo(() => {
        if (!debouncedQuery) return options;

        const needle = debouncedQuery.toLowerCase();
        return options.filter((option) =>
            option.label.toLowerCase().includes(needle),
        );
    }, [options, debouncedQuery]);

    const selectedValues = useMemo(
        () => new Set(values.map((option) => option.value)),
        [values],
    );

    function handleOnToggleOpen() {
        setOpen((current) => !current);
    }

    function handleOnDeselectAll() {
        onChange([]);
    }

    function handleOnSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    const handleOnSelect = useCallback(
        (option: O) => {
            const isSelected = selectedValues.has(option.value);
            const next = isSelected
                ? options.filter(
                      (candidate) =>
                          selectedValues.has(candidate.value) &&
                          candidate.value !== option.value,
                  )
                : options
                      .filter((candidate) =>
                          selectedValues.has(candidate.value),
                      )
                      .concat(option);
            onChange(next);
        },
        [options, selectedValues, onChange],
    );

    const rowProps = useMemo<OptionRowData<V, O>>(
        () => ({
            options: filteredOptions,
            selectedValues,
            onSelect: handleOnSelect,
        }),
        [filteredOptions, selectedValues, handleOnSelect],
    );

    const listHeight =
        Math.min(filteredOptions.length, MAX_VISIBLE_OPTIONS) *
        OPTION_ROW_HEIGHT;

    const selectedLabels = values.map((option) => option.label);
    const showDeselectAll =
        values.length === options.length &&
        options.length >= SHOW_DESELECT_ALL_THRESHOLD;

    return (
        <div
            ref={containerRef}
            className={classNames("root", styles.root, className)}
        >
            <MultiSelectTrigger
                icon={icon}
                label={label}
                selectedLabels={selectedLabels}
                open={open}
                clearLabel={messages.clear}
                onAnchorChange={setAnchor}
                onClick={handleOnToggleOpen}
                onClear={handleOnDeselectAll}
            />
            <Popover
                anchor={anchor}
                open={open}
                root={portalContainer}
                onOpenChange={setOpen}
                placement="bottom-start"
                margin={8}
                contained
                className={styles.popover}
            >
                {loading ? (
                    <SkeletonOptions />
                ) : (
                    <>
                        {showDeselectAll && (
                            <button
                                type="button"
                                onClick={handleOnDeselectAll}
                                className={classNames(
                                    "deselectAll",
                                    styles.deselectAll,
                                )}
                            >
                                <Typography
                                    size={12}
                                    weight="bold"
                                    color="brand"
                                >
                                    {messages.deselectAll}
                                </Typography>
                            </button>
                        )}
                        {search && (
                            <input
                                type="text"
                                value={query}
                                placeholder={messages.searchPlaceholder}
                                onChange={handleOnSearchChange}
                                className={classNames("search", styles.search)}
                            />
                        )}
                        {filteredOptions.length === 0 ? (
                            <div className={classNames("empty", styles.empty)}>
                                <Typography size={14} variant="secondary">
                                    {messages.noResults}
                                </Typography>
                            </div>
                        ) : (
                            <List
                                rowHeight={OPTION_ROW_HEIGHT}
                                rowCount={filteredOptions.length}
                                rowProps={rowProps}
                                rowComponent={OptionRow}
                                style={{ height: listHeight }}
                            />
                        )}
                    </>
                )}
            </Popover>
        </div>
    );
}

function SkeletonOptions() {
    return (
        <div>
            {SKELETON_LABEL_WIDTHS.map((width, index) => (
                <div
                    key={index}
                    style={{ height: OPTION_ROW_HEIGHT }}
                    className={classNames(
                        "skeletonOption",
                        styles.skeletonOption,
                    )}
                >
                    <span
                        className={classNames(
                            "skeletonCheckbox",
                            styles.skeletonCheckbox,
                            styles.loading,
                        )}
                    />
                    <span
                        style={{ width }}
                        className={classNames(
                            "skeletonLabel",
                            styles.skeletonLabel,
                            styles.loading,
                        )}
                    />
                </div>
            ))}
        </div>
    );
}

function OptionRow<V extends ValueType, O extends SelectOption<V>>({
    ariaAttributes,
    index,
    style,
    options,
    selectedValues,
    onSelect,
}: RowComponentProps<OptionRowData<V, O>>) {
    const option = options[index];
    const selected = selectedValues.has(option.value);

    function handleOnClick() {
        if (option.disabled) return;
        onSelect(option);
    }

    return (
        <div
            style={style}
            onClick={handleOnClick}
            className={classNames("option", styles.option, {
                [styles.disabled]: option.disabled,
            })}
            {...ariaAttributes}
        >
            <span
                className={classNames("checkbox", styles.checkbox, {
                    [styles.checked]: selected,
                })}
            >
                <CheckIcon
                    className={classNames(styles.checkIcon, {
                        [styles.checked]: selected,
                    })}
                />
            </span>
            <Typography size={14} className={styles.optionLabel}>
                {option.label}
            </Typography>
        </div>
    );
}

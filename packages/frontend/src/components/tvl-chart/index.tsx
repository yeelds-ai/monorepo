"use client";

import { areaY, defineChart, dot, lineY } from "@tanstack/charts";
import { whenFocused } from "@tanstack/charts/focus/mark";
import { Chart } from "@tanstack/charts/react/tooltip";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import {
    type BrandTypographyProps,
    Skeleton,
    type SystemTypographyProps,
    Tabs,
    Typography,
} from "@yeelds/ui";
import classNames from "classnames";
import { scaleUtc } from "d3-scale";
import { useMemo } from "react";

import { RoundedTriangleIcon } from "@/src/assets";
import {
    formatOrdinalTime,
    formatPercentage,
    formatUsd,
} from "@/src/utils/format";
import { TVL_RANGES, type TvlRange } from "@/src/utils/tvl-range";

import styles from "./styles.module.css";

const TVL_ACCENT = "#ffceeb";
const TVL_MARKER_BG = "#191216";
const CHART_HEIGHT = 300;

const DAY_MS = 86_400_000;
const SHORT_SPAN_DAYS = 45;

const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
});
const MONTH_DAY_FORMATTER = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
});
const TOOLTIP_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
});

export interface TvlRow {
    date: Date;
    value: number;
}

interface TvlChartProps {
    title: string;
    emptyLabel: string;
    rangeLabels: Record<TvlRange, string>;
    rows: TvlRow[];
    loading: boolean;
    fetching: boolean;
    range: TvlRange;
    rangeDisabled: Record<TvlRange, boolean>;
    onRangeChange: (range: TvlRange) => void;
    titleSize?: SystemTypographyProps["size"];
    valueSize?: BrandTypographyProps["size"];
}

export function TvlChart({
    title,
    emptyLabel,
    rangeLabels,
    rows,
    loading,
    fetching,
    range,
    rangeDisabled,
    onRangeChange,
    titleSize = 14,
    valueSize = 36,
}: TvlChartProps) {
    const currentValue = rows.at(-1)?.value ?? 0;
    const firstValue = rows[0]?.value ?? 0;
    const deltaPct = firstValue
        ? ((currentValue - firstValue) / firstValue) * 100
        : 0;
    const positive = deltaPct >= 0;

    const spanDays =
        rows.length > 1
            ? (rows.at(-1)!.date.getTime() - rows[0].date.getTime()) / DAY_MS
            : 0;
    const xTickFormatter =
        spanDays <= SHORT_SPAN_DAYS
            ? MONTH_DAY_FORMATTER
            : MONTH_YEAR_FORMATTER;

    const definition = useMemo(
        () =>
            defineChart({
                marks: [
                    areaY(rows, {
                        x: "date",
                        y: "value",
                        fill: "url(#tvlFill)",
                        fillOpacity: 1,
                    }),
                    lineY(rows, {
                        x: "date",
                        y: "value",
                        stroke: TVL_ACCENT,
                        strokeWidth: 1.5,
                    }),
                    whenFocused(
                        dot(rows, {
                            x: "date",
                            y: "value",
                            r: 6,
                            fill: TVL_MARKER_BG,
                            stroke: TVL_ACCENT,
                            strokeWidth: 1,
                        }),
                    ),
                    whenFocused(
                        dot(rows, {
                            x: "date",
                            y: "value",
                            r: 3.6,
                            fill: TVL_ACCENT,
                            stroke: "none",
                        }),
                    ),
                ],
                scales: {
                    x: {
                        scale: scaleUtc,
                        nice: true,
                        axis: {
                            line: false,
                            ticks: {
                                size: 0,
                                padding: 20,
                                format: (value: Date) =>
                                    xTickFormatter.format(value),
                            },
                            tickLabels: { fontSize: 12, fontWeight: 700 },
                        },
                    },
                    y: {
                        scale: scaleLinear,
                        nice: true,
                        grid: true,
                        axis: {
                            line: false,
                            ticks: {
                                size: 0,
                                padding: 20,
                                format: (value: number) => formatUsd(value),
                            },
                            tickLabels: {
                                fontSize: 12,
                                fontWeight: 700,
                                anchor: "end",
                            },
                        },
                    },
                },
                gradients: [
                    {
                        id: "tvlFill",
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                        stops: [
                            { offset: 0.05, color: TVL_ACCENT, opacity: 0.6 },
                            { offset: 0.95, color: TVL_ACCENT, opacity: 0.024 },
                        ],
                    },
                ],
                theme: { muted: "#b1afb1", grid: "#686366" },
                clip: true,
                focusRing: false,
                tooltip: { use: tooltip, className: styles.tooltip },
            }),
        [rows, xTickFormatter],
    );

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.headline}>
                    <Typography
                        as="h2"
                        size={titleSize}
                        weight="bold"
                        variant="secondary"
                    >
                        {title}
                    </Typography>
                    <div className={styles.valueRow}>
                        {loading ? (
                            <Skeleton width={140} height={valueSize + 8} />
                        ) : (
                            <>
                                <Typography
                                    as="span"
                                    font="brand"
                                    size={valueSize}
                                >
                                    {formatUsd(currentValue)}
                                </Typography>
                                <div
                                    className={classNames(
                                        "delta",
                                        styles.delta,
                                        {
                                            [styles.positive]: positive,
                                            [styles.negative]: !positive,
                                        },
                                    )}
                                >
                                    <RoundedTriangleIcon
                                        className={styles.deltaIcon}
                                    />
                                    <Typography
                                        as="span"
                                        size={14}
                                        weight="bold"
                                        color={
                                            positive ? "excellent" : "negative"
                                        }
                                    >
                                        {positive ? "+" : "-"}
                                        {formatPercentage(Math.abs(deltaPct))}
                                    </Typography>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {loading ? (
                    <Skeleton
                        width={174}
                        height={36}
                        className={styles.rangeTabsSkeleton}
                    />
                ) : (
                    <Tabs
                        tabs={TVL_RANGES.map((value) => ({
                            id: value,
                            label: rangeLabels[value],
                            disabled: rangeDisabled[value],
                        }))}
                        activeTab={range}
                        onTabChange={onRangeChange}
                        variant="pill"
                        className={styles.rangeTabs}
                    />
                )}
            </div>

            <div className={styles.chartWrapper}>
                {loading ? (
                    <Skeleton
                        width="100%"
                        height={CHART_HEIGHT}
                        className={styles.chartSkeleton}
                    />
                ) : rows.length === 0 ? (
                    <Typography
                        size={14}
                        variant="secondary"
                        className={styles.empty}
                    >
                        {emptyLabel}
                    </Typography>
                ) : (
                    <div
                        className={classNames("chart", styles.chart, {
                            [styles.stale]: fetching,
                        })}
                    >
                        <Chart
                            definition={definition}
                            height={CHART_HEIGHT}
                            ariaLabel={title}
                            renderTooltipBody={({ points }) => {
                                const point = points[0];
                                if (!point) return null;
                                const when = `${TOOLTIP_DATE_FORMATTER.format(
                                    point.xValue,
                                )} · ${formatOrdinalTime(point.xValue.toISOString())}`;
                                return (
                                    <div className={styles.tooltipBody}>
                                        <Typography
                                            as="span"
                                            font="brand"
                                            size={16}
                                        >
                                            {formatUsd(point.yValue)}
                                        </Typography>
                                        <Typography
                                            as="span"
                                            size={12}
                                            weight="medium"
                                            variant="secondary"
                                        >
                                            {when}
                                        </Typography>
                                    </div>
                                );
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

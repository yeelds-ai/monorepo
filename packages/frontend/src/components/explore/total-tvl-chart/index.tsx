"use client";

import { areaY, defineChart, dot, lineY } from "@tanstack/charts";
import { whenFocused } from "@tanstack/charts/focus/mark";
import { Chart } from "@tanstack/charts/react/tooltip";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { Skeleton, Typography } from "@yeelds/ui";
import classNames from "classnames";
import { scaleUtc } from "d3-scale";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { RoundedTriangleIcon } from "@/src/assets";
import { useOverview } from "@/src/hooks/useOverview";
import {
    formatOrdinalTime,
    formatPercentage,
    formatUsd,
} from "@/src/utils/format";

import styles from "./styles.module.css";

const TVL_ACCENT = "#ffceeb";
const TVL_MARKER_BG = "#191216";
const CHART_HEIGHT = 300;

type TvlRange = "1M" | "3M" | "6M" | "1Y";

const TVL_RANGES = ["1M", "3M", "6M", "1Y"] as const;
const TVL_RANGE_MONTHS: Record<TvlRange, number> = {
    "1M": 1,
    "3M": 3,
    "6M": 6,
    "1Y": 12,
};

const DAY_MS = 86_400_000;
const TVL_RANGE_MIN_SPAN_DAYS: Record<TvlRange, number> = {
    "1M": 0,
    "3M": 30,
    "6M": 90,
    "1Y": 180,
};

// Keep an already-fetched range warm so switching back to it hits no network.
const TVL_STALE_TIME = 5 * 60_000;

const MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
});
const TOOLTIP_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
});

interface TvlRow {
    date: Date;
    value: number;
}

export function TotalTvlChart() {
    const t = useTranslations("explore.totalTvl");
    const [range, setRange] = useState<TvlRange>("1Y");

    const { tvl: fullTvl } = useOverview({ staleTime: TVL_STALE_TIME });

    const rangeDisabled = useMemo<Record<TvlRange, boolean>>(() => {
        const earliest = fullTvl[0]?.capturedAt;
        const latest = fullTvl.at(-1)?.capturedAt;
        const spanDays =
            earliest && latest
                ? (new Date(latest).getTime() - new Date(earliest).getTime()) /
                  DAY_MS
                : undefined;

        return TVL_RANGES.reduce(
            (acc, value) => {
                acc[value] =
                    spanDays !== undefined &&
                    spanDays < TVL_RANGE_MIN_SPAN_DAYS[value];
                return acc;
            },
            {} as Record<TvlRange, boolean>,
        );
    }, [fullTvl]);

    // A shrinking dataset can invalidate the selected range without a click.
    const activeRange = rangeDisabled[range]
        ? ([...TVL_RANGES].reverse().find((value) => !rangeDisabled[value]) ??
          "1M")
        : range;

    const tvlFrom = useMemo(() => {
        const from = new Date();
        from.setHours(0, 0, 0, 0);
        from.setMonth(from.getMonth() - TVL_RANGE_MONTHS[activeRange]);
        return from.toISOString();
    }, [activeRange]);

    const { tvl, loading, fetching } = useOverview({
        tvlFrom,
        staleTime: TVL_STALE_TIME,
    });

    const rows = useMemo<TvlRow[]>(
        () =>
            tvl.map((point) => ({
                date: new Date(point.capturedAt),
                value: point.netUsd,
            })),
        [tvl],
    );

    const currentValue = rows.at(-1)?.value ?? 0;
    const firstValue = rows[0]?.value ?? 0;
    const deltaPct = firstValue
        ? ((currentValue - firstValue) / firstValue) * 100
        : 0;
    const positive = deltaPct >= 0;

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
                                    MONTH_YEAR_FORMATTER.format(value),
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
        [rows],
    );

    function getHandleOnRangeSelect(value: TvlRange) {
        return () => setRange(value);
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.headline}>
                    <Typography
                        as="h2"
                        size={14}
                        weight="bold"
                        variant="secondary"
                    >
                        {t("title")}
                    </Typography>
                    <div className={styles.valueRow}>
                        {loading ? (
                            <Skeleton width={140} height={44} />
                        ) : (
                            <>
                                <Typography as="span" font="brand" size={36}>
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
                    <div className={styles.rangeTabs} role="tablist">
                        {TVL_RANGES.map((value) => (
                            <button
                                key={value}
                                type="button"
                                role="tab"
                                disabled={rangeDisabled[value]}
                                aria-selected={value === activeRange}
                                onClick={getHandleOnRangeSelect(value)}
                                className={classNames(
                                    "rangeTab",
                                    styles.rangeTab,
                                    { [styles.active]: value === activeRange },
                                )}
                            >
                                {t(`ranges.${value}`)}
                            </button>
                        ))}
                    </div>
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
                        {t("empty")}
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
                            ariaLabel={t("title")}
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

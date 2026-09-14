export type TvlRange = "1M" | "3M" | "6M" | "1Y";

export const TVL_RANGES = ["1M", "3M", "6M", "1Y"] as const;

// Keep an already-fetched range warm so switching back to it hits no network.
export const TVL_STALE_TIME = 5 * 60_000;

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

export function computeRangeDisabled(
    points: { capturedAt: string }[],
): Record<TvlRange, boolean> {
    const earliest = points[0]?.capturedAt;
    const latest = points.at(-1)?.capturedAt;
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
}

// A shrinking dataset can invalidate the selected range without a click.
export function resolveActiveRange(
    range: TvlRange,
    rangeDisabled: Record<TvlRange, boolean>,
): TvlRange {
    if (!rangeDisabled[range]) return range;
    return (
        [...TVL_RANGES].reverse().find((value) => !rangeDisabled[value]) ?? "1M"
    );
}

export function computeTvlFrom(range: TvlRange): string {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    from.setMonth(from.getMonth() - TVL_RANGE_MONTHS[range]);
    return from.toISOString();
}

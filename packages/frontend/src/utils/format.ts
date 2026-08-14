export function formatUsd(usd: number): string {
    if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(1)}B`;
    if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
    if (usd >= 10_000) return `$${(usd / 1_000).toFixed(1)}K`;
    return `$${new Intl.NumberFormat("en-US").format(usd)}`;
}

export function formatApy(apy: number | null): string {
    if (apy === null) return "—";
    if (apy < 0.01) return "<0.01%";
    if (apy > 10_000) return ">10,000%";
    return `${apy.toFixed(2)}%`;
}

export function formatDailyEstimate(apy: number, principal = 1_000): string {
    const daily = (principal * (apy / 100)) / 365;
    if (daily < 0.01) return "<$0.01";
    return `$${daily.toFixed(2)}`;
}

export function calculateRewardEstimate(
    apy: number,
    principal: number,
    days: number,
): number {
    return (principal * (apy / 100) * days) / 365;
}

const USD_SUFFIX_MULTIPLIERS: Record<string, number> = {
    k: 1_000,
    m: 1_000_000,
    b: 1_000_000_000,
};

export function parseUsd(input: string): number | null {
    const trimmed = input.trim().replace(/[$,\s]/g, "");
    if (!trimmed) return null;

    const match = /^(-?\d*\.?\d+)([kmb])?$/i.exec(trimmed);
    if (!match) return null;

    const [, digits, suffix] = match;
    const multiplier = suffix
        ? USD_SUFFIX_MULTIPLIERS[suffix.toLowerCase()]
        : 1;
    return Number(digits) * multiplier;
}

export function parseApy(input: string): number | null {
    const trimmed = input.trim().replace(/[%\s]/g, "");
    if (!trimmed) return null;

    const value = Number(trimmed);
    return Number.isFinite(value) ? value : null;
}

function ordinalSuffix(day: number): string {
    if (day % 10 === 1 && day % 100 !== 11) return "st";
    if (day % 10 === 2 && day % 100 !== 12) return "nd";
    if (day % 10 === 3 && day % 100 !== 13) return "rd";
    return "th";
}

export function formatOrdinalDate(iso: string): string {
    const date = new Date(iso);
    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat("en", {
        month: "long",
        timeZone: "UTC",
    }).format(date);
    return `${day}${ordinalSuffix(day)} ${month} ${date.getUTCFullYear()}`;
}

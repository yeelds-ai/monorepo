export function formatUsd(usd: number): string {
    if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(1)}B`;
    if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
    if (usd >= 1_000) return `$${(usd / 1_000).toFixed(1)}K`;
    return `$${usd.toFixed(0)}`;
}

export function formatApy(apy: number | null): string {
    if (apy === null) return "—";
    if (apy < 0.01) return "<0.01%";
    if (apy > 10_000) return ">10,000%";
    return `${apy.toFixed(2)}%`;
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

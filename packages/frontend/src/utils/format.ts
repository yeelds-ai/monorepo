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

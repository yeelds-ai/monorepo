// The aggregate strip's four catalog-wide figures, mirroring the old
// GET /api/v1/stats. Fetched separately from the catalog page so the numbers
// stay class-wide under server-side pagination.
export interface Stats {
    totalOpportunities: number;
    totalTvlUsd: number;
    chainsCovered: number;
    protocolsCovered: number;
}

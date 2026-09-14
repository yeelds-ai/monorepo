"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { TvlChart, type TvlRow } from "@/src/components/tvl-chart";
import { useOpportunityTvl } from "@/src/hooks/useOpportunityTvl";
import {
    TVL_RANGES,
    TVL_STALE_TIME,
    type TvlRange,
    computeRangeDisabled,
    computeTvlFrom,
    resolveActiveRange,
} from "@/src/utils/tvl-range";

interface TotalTvlCardProps {
    chain: string;
    address: string;
}

export function TotalTvlCard({ chain, address }: TotalTvlCardProps) {
    const t = useTranslations("opportunity.totalTvlCard");
    const [range, setRange] = useState<TvlRange>("1Y");

    const { tvl: fullTvl } = useOpportunityTvl({
        chain,
        address,
        staleTime: TVL_STALE_TIME,
    });
    const rangeDisabled = useMemo(
        () => computeRangeDisabled(fullTvl),
        [fullTvl],
    );
    const activeRange = resolveActiveRange(range, rangeDisabled);

    const tvlFrom = useMemo(() => computeTvlFrom(activeRange), [activeRange]);
    const { tvl, loading, fetching } = useOpportunityTvl({
        chain,
        address,
        from: tvlFrom,
        staleTime: TVL_STALE_TIME,
    });

    const rows = useMemo<TvlRow[]>(
        () =>
            tvl.map((point) => ({
                date: new Date(point.capturedAt),
                value: point.tvlUsd,
            })),
        [tvl],
    );

    const rangeLabels = useMemo(
        () =>
            TVL_RANGES.reduce(
                (acc, value) => {
                    acc[value] = t(`ranges.${value}`);
                    return acc;
                },
                {} as Record<TvlRange, string>,
            ),
        [t],
    );

    return (
        <TvlChart
            title={t("title")}
            emptyLabel={t("empty")}
            rangeLabels={rangeLabels}
            rows={rows}
            loading={loading}
            fetching={fetching}
            range={activeRange}
            rangeDisabled={rangeDisabled}
            onRangeChange={setRange}
            titleSize={12}
            valueSize={24}
        />
    );
}

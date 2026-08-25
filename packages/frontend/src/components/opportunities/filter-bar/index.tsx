"use client";

import type { Strategy } from "@yeelds/sdk";
import {
    MultiSelect,
    type SelectOption,
    type SliderValue,
    Typography,
} from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { FilterListIcon } from "@/src/assets";
import { useOpportunitiesFilters } from "@/src/hooks/useFilters";
import { useOpportunitiesParams } from "@/src/hooks/useOpportunitiesParams";
import {
    formatPercentage,
    formatUsd,
    parseApy,
    parseUsd,
} from "@/src/utils/format";
import { RangeFilter } from "./range-filter";

import styles from "./styles.module.css";

const TVL_MIN = 0;
const TVL_MAX = 1_000_000_000;
const TVL_STEP = 10_000;
const TVL_MIN_DISTANCE = 1_000_000;

const APY_MIN = 0;
const APY_MAX = 100;
const APY_STEP = 0.25;
const APY_MIN_DISTANCE = 0.5;

export function FilterBar() {
    const t = useTranslations("opportunities.filterBar");
    const { loading, filters } = useOpportunitiesFilters();
    const { query, setParam, setParams, clearFilters, activeFilterCount } =
        useOpportunitiesParams();
    const [mobileOpen, setMobileOpen] = useState(false);

    const messages = {
        deselectAll: t("deselectAll"),
        noResults: t("noResults"),
        searchPlaceholder: t("searchPlaceholder"),
        clear: t("clearFilterAriaLabel"),
    };

    const chainOptions = useMemo<SelectOption<string>[]>(
        () =>
            filters.chains.map((chain) => ({
                value: chain.slug,
                label: chain.name.charAt(0).toUpperCase() + chain.name.slice(1),
            })),
        [filters.chains],
    );

    const protocolOptions = useMemo<SelectOption<string>[]>(
        () =>
            filters.protocols.map((protocol) => ({
                value: protocol.slug,
                label: protocol.name,
            })),
        [filters.protocols],
    );

    const strategyOptions = useMemo<SelectOption<Strategy>[]>(
        () =>
            filters.strategies.map((strategy) => ({
                value: strategy.slug,
                label: strategy.name,
            })),
        [filters.strategies],
    );

    const selectedChains = useMemo(
        () =>
            chainOptions.filter((option) =>
                query.chains?.includes(option.value),
            ),
        [chainOptions, query.chains],
    );

    const selectedProtocols = useMemo(
        () =>
            protocolOptions.filter((option) =>
                query.protocols?.includes(option.value),
            ),
        [protocolOptions, query.protocols],
    );

    const selectedStrategies = useMemo(
        () =>
            strategyOptions.filter((option) =>
                query.strategies?.includes(option.value),
            ),
        [strategyOptions, query.strategies],
    );

    function handleOnToggleMobile() {
        setMobileOpen((open) => !open);
    }

    function handleOnChainsChange(options: SelectOption<string>[]) {
        setParam(
            "chains",
            options.length ? options.map((option) => option.value) : undefined,
        );
    }

    function handleOnProtocolsChange(options: SelectOption<string>[]) {
        setParam(
            "protocols",
            options.length ? options.map((option) => option.value) : undefined,
        );
    }

    function handleOnStrategiesChange(options: SelectOption<Strategy>[]) {
        setParam(
            "strategies",
            options.length ? options.map((option) => option.value) : undefined,
        );
    }

    function handleOnTvlChange(value: SliderValue | undefined) {
        setParams({ tvlFrom: value?.[0], tvlTo: value?.[1] });
    }

    function handleOnApyChange(value: SliderValue | undefined) {
        setParams({ apyFrom: value?.[0], apyTo: value?.[1] });
    }

    return (
        <div className={styles.root}>
            <button
                onClick={handleOnToggleMobile}
                aria-expanded={mobileOpen}
                aria-controls="yields-filter-panel"
                className={styles.mobileToggle}
            >
                <FilterListIcon className={styles.mobileToggleIcon} />
                <Typography
                    as="span"
                    size={14}
                    weight="medium"
                    variant="secondary"
                >
                    {activeFilterCount > 0
                        ? t("toggleActive", { count: activeFilterCount })
                        : t("toggle")}
                </Typography>
            </button>
            <div
                id="yields-filter-panel"
                className={classNames(styles.panel, {
                    [styles.open]: mobileOpen,
                })}
            >
                <MultiSelect
                    label={t("chainLabel")}
                    options={chainOptions}
                    values={selectedChains}
                    search={chainOptions.length > 1}
                    loading={loading}
                    messages={messages}
                    onChange={handleOnChainsChange}
                />
                <MultiSelect
                    label={t("protocolLabel")}
                    options={protocolOptions}
                    values={selectedProtocols}
                    search={protocolOptions.length > 1}
                    loading={loading}
                    messages={messages}
                    onChange={handleOnProtocolsChange}
                />
                <MultiSelect
                    label={t("strategy.label")}
                    options={strategyOptions}
                    values={selectedStrategies}
                    search={strategyOptions.length > 1}
                    loading={loading}
                    messages={messages}
                    onChange={handleOnStrategiesChange}
                />
                <RangeFilter
                    label={t("tvl.label")}
                    ariaLabel={t("tvlAriaLabel")}
                    clearAriaLabel={t("clearFilterAriaLabel")}
                    title={t("tvl.title")}
                    minCaption={t("rangeMinLabel")}
                    maxCaption={t("rangeMaxLabel")}
                    min={TVL_MIN}
                    max={TVL_MAX}
                    step={TVL_STEP}
                    minDistance={TVL_MIN_DISTANCE}
                    value={
                        query.tvlFrom !== undefined || query.tvlTo !== undefined
                            ? [query.tvlFrom ?? TVL_MIN, query.tvlTo ?? TVL_MAX]
                            : undefined
                    }
                    format={formatUsd}
                    parse={parseUsd}
                    onChange={handleOnTvlChange}
                />
                <RangeFilter
                    label={t("apr.label")}
                    ariaLabel={t("aprAriaLabel")}
                    clearAriaLabel={t("clearFilterAriaLabel")}
                    title={t("apr.title")}
                    minCaption={t("rangeMinLabel")}
                    maxCaption={t("rangeMaxLabel")}
                    min={APY_MIN}
                    max={APY_MAX}
                    step={APY_STEP}
                    minDistance={APY_MIN_DISTANCE}
                    value={
                        query.apyFrom !== undefined || query.apyTo !== undefined
                            ? [query.apyFrom ?? APY_MIN, query.apyTo ?? APY_MAX]
                            : undefined
                    }
                    format={formatPercentage}
                    parse={parseApy}
                    onChange={handleOnApyChange}
                />

                {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className={styles.clear}>
                        <Typography
                            as="span"
                            size={12}
                            weight="bold"
                            className={styles.clearLabel}
                        >
                            {t("clear", { count: activeFilterCount })}
                        </Typography>
                    </button>
                )}
            </div>
        </div>
    );
}

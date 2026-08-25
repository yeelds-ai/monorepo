"use client";

import type {
    OpportunitiesParams,
    SortDirection,
    SortField,
    Strategy,
} from "@yeelds/sdk";
import { useSearchParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";

import { usePathname, useRouter } from "@/src/i18n/routing";

const FILTER_GROUPS: (keyof OpportunitiesParams)[][] = [
    ["chains"],
    ["protocols"],
    ["strategies"],
    ["tvlFrom", "tvlTo"],
    ["apyFrom", "apyTo"],
    ["minScore"],
];

export interface UseOpportunitiesParamsReturnValue {
    query: OpportunitiesParams;
    setParam: <K extends keyof OpportunitiesParams>(
        key: K,
        value: OpportunitiesParams[K],
    ) => void;
    setParams: (params: Partial<OpportunitiesParams>) => void;
    clearFilters: () => void;
    activeFilterCount: number;
}

function parseQuery(searchParams: URLSearchParams): OpportunitiesParams {
    const chains = searchParams.get("chains");
    const protocols = searchParams.get("protocols");
    const strategies = searchParams.get("strategies");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");
    const tvlFrom = searchParams.get("tvlFrom");
    const tvlTo = searchParams.get("tvlTo");
    const apyFrom = searchParams.get("apyFrom");
    const apyTo = searchParams.get("apyTo");
    const minScore = searchParams.get("minScore");
    const sort = searchParams.get("sort");
    const direction = searchParams.get("direction");

    return {
        chains: chains ? chains.split(",") : undefined,
        protocols: protocols ? protocols.split(",") : undefined,
        strategies: strategies
            ? (strategies.split(",") as Strategy[])
            : undefined,
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        tvlFrom: tvlFrom ? Number(tvlFrom) : undefined,
        tvlTo: tvlTo ? Number(tvlTo) : undefined,
        apyFrom: apyFrom ? Number(apyFrom) : undefined,
        apyTo: apyTo ? Number(apyTo) : undefined,
        minScore: minScore ? Number(minScore) : undefined,
        sort: sort ? (sort as SortField) : "tvl",
        direction: direction ? (direction as SortDirection) : "desc",
    };
}

function serializeValue(
    value: OpportunitiesParams[keyof OpportunitiesParams],
): string | undefined {
    if (value === undefined || value === null) return undefined;
    if (Array.isArray(value)) return value.length ? value.join(",") : undefined;
    return String(value);
}

/**
 * The one URL-state hook every opportunity control reads and writes through for
 * filters, plus pagination.
 *
 * Setting any param besides `page` clears `page` (a filter change invalidates
 * the page index); setting `page` itself leaves it alone, which is what lets
 * `Pagination` navigate pages without wiping itself.
 *
 * `query` is optimistic: the App Router only reflects a searchParams change
 * once the new page's server payload lands, so controls that render straight
 * off `query` would otherwise lag a full round trip behind the click.
 * `useOptimistic` makes it update in the same tick as the click and
 * reconciles automatically once the navigation commits.
 */
export function useOpportunitiesParams(): UseOpportunitiesParamsReturnValue {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setOptimisticQuery] = useOptimistic(
        parseQuery(searchParams),
        (_current: OpportunitiesParams, next: OpportunitiesParams) => next,
    );

    function navigate(params: URLSearchParams, next: OpportunitiesParams) {
        startTransition(() => {
            setOptimisticQuery(next);
            const qs = params.toString();
            router.push(qs ? `${pathname}?${qs}` : pathname);
        });
    }

    function apply(
        next: Partial<OpportunitiesParams>,
        { preservePage = false }: { preservePage?: boolean } = {},
    ) {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(next)) {
            const serialized = serializeValue(value);
            if (!serialized) params.delete(key);
            else params.set(key, serialized);
        }
        if (!preservePage) params.delete("page");

        const nextQuery: OpportunitiesParams = { ...query, ...next };
        if (!preservePage) nextQuery.page = undefined;

        navigate(params, nextQuery);
    }

    function setParam<K extends keyof OpportunitiesParams>(
        key: K,
        value: OpportunitiesParams[K],
    ) {
        apply({ [key]: value } as Partial<OpportunitiesParams>, {
            preservePage: key === "page",
        });
    }

    function setParams(next: Partial<OpportunitiesParams>) {
        apply(next);
    }

    function clearFilters() {
        navigate(new URLSearchParams(), {});
    }

    const activeFilterCount = FILTER_GROUPS.filter((keys) =>
        keys.some((key) => query[key] !== undefined),
    ).length;

    return { query, setParam, setParams, clearFilters, activeFilterCount };
}

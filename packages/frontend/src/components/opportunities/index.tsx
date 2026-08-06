"use client";

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Pagination } from "@/src/components/pagination";
import { useOpportunities } from "@/src/hooks/useOpportunities";
import { useOpportunitiesParams } from "@/src/hooks/useOpportunitiesParams";
import { FilterBar } from "./filter-bar";
import { OpportunitiesGrid } from "./grid";
import { OpportunitiesTable } from "./table";
import { ViewToggle, type YieldsView } from "./view-toggle";

import styles from "./styles.module.css";

export const DEFAULT_PAGE_LIMIT = 20;

export function Opportunities() {
    const t = useTranslations("opportunities");
    const { query, setParam } = useOpportunitiesParams();
    const [view, setView] = useState<YieldsView>("table");
    const {
        opportunities,
        totalOpportunities,
        loading,
        fetching,
        placeholderData,
    } = useOpportunities({
        ...query,
        pageSize: query.pageSize ?? DEFAULT_PAGE_LIMIT,
    });

    const page = query.page ?? 1;
    const limit = query.pageSize ?? DEFAULT_PAGE_LIMIT;
    const totalPages = Math.max(1, Math.ceil(totalOpportunities / limit));
    const isGrid = view === "grid";

    function handleOnPageChange(page: number) {
        setParam("page", page <= 1 ? undefined : page);
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div>
                    <Typography
                        as="h1"
                        font="brand"
                        size={28}
                        className={styles.title}
                    >
                        {t("title")}
                    </Typography>
                    <Typography
                        size={16}
                        variant="secondary"
                        className={styles.subtitle}
                    >
                        {t("subtitle")}
                    </Typography>
                </div>
                <ViewToggle view={view} onChange={setView} />
            </div>

            <FilterBar />

            <div className={styles.content}>
                {isGrid ? (
                    <OpportunitiesGrid
                        opportunities={opportunities}
                        placeholderLoading={placeholderData && fetching}
                    />
                ) : (
                    <OpportunitiesTable
                        opportunities={opportunities}
                        loading={loading}
                        placeholderLoading={placeholderData && fetching}
                    />
                )}
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                total={totalOpportunities}
                unit={t("paginationUnit")}
                onPageChange={handleOnPageChange}
            />
        </div>
    );
}

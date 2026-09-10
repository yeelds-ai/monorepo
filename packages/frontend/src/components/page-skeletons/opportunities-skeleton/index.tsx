"use client";

import { Pagination, Skeleton } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { OpportunitiesTable } from "@/src/components/opportunities/table";

import styles from "./styles.module.css";

export function OpportunitiesSkeleton() {
    const t = useTranslations("opportunities");
    const tPagination = useTranslations("pagination");

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div>
                    <Skeleton height={32} width={192} />
                    <Skeleton
                        height={24}
                        width={288}
                        className={styles.subtitleBar}
                    />
                </div>
                <Skeleton height={24} width={64} />
            </div>

            <div className={styles.filterBar}>
                <Skeleton height={32} width={114} />
                <Skeleton height={32} width={114} />
                <Skeleton height={32} width={114} />
                <Skeleton height={32} width={50} />
                <Skeleton height={32} width={50} />
            </div>

            <div className={styles.content}>
                <OpportunitiesTable opportunities={[]} loading />
            </div>

            <Pagination
                page={1}
                totalPages={1}
                labels={{
                    showing: tPagination("showing", {
                        page: 1,
                        totalPages: 1,
                        total: 0,
                        unit: t("paginationUnit"),
                    }),
                    firstPage: tPagination("firstPage"),
                    previousPage: tPagination("previousPage"),
                    nextPage: tPagination("nextPage"),
                    lastPage: tPagination("lastPage"),
                }}
                onPageChange={() => {}}
            />
        </div>
    );
}

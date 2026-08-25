"use client";

import { Pagination, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useFeed } from "@/src/hooks/useFeed";
import { FeedGrid } from "./grid";

import styles from "./styles.module.css";

export const DEFAULT_PAGE_LIMIT = 12;

export function Feed() {
    const t = useTranslations("feed");
    const tPagination = useTranslations("pagination");
    const [page, setPage] = useState(1);
    const { feedItems, totalFeedItems, loading, placeholderData, fetching } =
        useFeed({
            page,
            pageSize: DEFAULT_PAGE_LIMIT,
        });

    const totalPages = Math.max(
        1,
        Math.ceil(totalFeedItems / DEFAULT_PAGE_LIMIT),
    );

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
            </div>

            <div className={styles.content}>
                <FeedGrid
                    feedItems={feedItems}
                    loading={loading}
                    placeholderLoading={placeholderData && fetching}
                />
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                labels={{
                    showing: tPagination("showing", {
                        page,
                        totalPages,
                        total: totalFeedItems,
                        unit: t("paginationUnit"),
                    }),
                    firstPage: tPagination("firstPage"),
                    previousPage: tPagination("previousPage"),
                    nextPage: tPagination("nextPage"),
                    lastPage: tPagination("lastPage"),
                }}
                onPageChange={setPage}
            />
        </div>
    );
}

"use client";

import { Pagination, Skeleton } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import styles from "./styles.module.css";

const SKELETON_CARDS = 12;

export function FeedSkeleton() {
    const t = useTranslations("feed");
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
            </div>

            <div className={styles.content}>
                <div className={styles.grid}>
                    {Array.from({ length: SKELETON_CARDS }).map((_, index) => (
                        <Skeleton
                            key={index}
                            height={220}
                            className={styles.cardSkeleton}
                        />
                    ))}
                </div>
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

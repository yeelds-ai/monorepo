"use client";

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@/src/assets";

import styles from "./styles.module.css";

interface PaginationProps {
    page: number;
    totalPages: number;
    total: number;
    unit: string;
    onPageChange: (page: number) => void;
}

export function Pagination({
    page,
    totalPages,
    total,
    unit,
    onPageChange,
}: PaginationProps) {
    const t = useTranslations("pagination");

    const atFirst = page <= 1;
    const atLast = page >= totalPages;

    function handleOnFirstPage() {
        onPageChange(1);
    }

    function handleOnPreviousPage() {
        onPageChange(page - 1);
    }

    function handleOnNextPage() {
        onPageChange(page + 1);
    }

    function handleOnLastPage() {
        onPageChange(totalPages);
    }

    return (
        <div className={styles.root}>
            <Typography size={10} weight="medium" variant="secondary">
                {t("showing", { page, totalPages, total, unit })}
            </Typography>

            <div className={styles.nav}>
                <button
                    onClick={handleOnFirstPage}
                    disabled={atFirst}
                    aria-label={t("firstPage")}
                    className={styles.navButton}
                >
                    <ChevronDoubleLeftIcon className={styles.navIcon} />
                </button>
                <button
                    onClick={handleOnPreviousPage}
                    disabled={atFirst}
                    aria-label={t("previousPage")}
                    className={styles.navButton}
                >
                    <ChevronLeftIcon className={styles.navIcon} />
                </button>
                <div className={styles.current}>
                    <Typography size={10} weight="bold" aria-current="page">
                        {page}
                    </Typography>
                </div>
                <button
                    onClick={handleOnNextPage}
                    disabled={atLast}
                    aria-label={t("nextPage")}
                    className={styles.navButton}
                >
                    <ChevronRightIcon className={styles.navIcon} />
                </button>
                <button
                    onClick={handleOnLastPage}
                    disabled={atLast}
                    aria-label={t("lastPage")}
                    className={styles.navButton}
                >
                    <ChevronDoubleRightIcon className={styles.navIcon} />
                </button>
            </div>
        </div>
    );
}

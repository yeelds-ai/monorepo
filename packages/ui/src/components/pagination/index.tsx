"use client";

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "../../assets";
import { Typography } from "../typography";

import styles from "./styles.module.css";

interface PaginationLabels {
    showing: string;
    firstPage: string;
    previousPage: string;
    nextPage: string;
    lastPage: string;
}

interface PaginationProps {
    page: number;
    totalPages: number;
    labels: PaginationLabels;
    onPageChange: (page: number) => void;
}

export function Pagination({
    page,
    totalPages,
    labels,
    onPageChange,
}: PaginationProps) {
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
                {labels.showing}
            </Typography>

            <div className={styles.nav}>
                <button
                    onClick={handleOnFirstPage}
                    disabled={atFirst}
                    aria-label={labels.firstPage}
                    className={styles.navButton}
                >
                    <ChevronDoubleLeftIcon className={styles.navIcon} />
                </button>
                <button
                    onClick={handleOnPreviousPage}
                    disabled={atFirst}
                    aria-label={labels.previousPage}
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
                    aria-label={labels.nextPage}
                    className={styles.navButton}
                >
                    <ChevronRightIcon className={styles.navIcon} />
                </button>
                <button
                    onClick={handleOnLastPage}
                    disabled={atLast}
                    aria-label={labels.lastPage}
                    className={styles.navButton}
                >
                    <ChevronDoubleRightIcon className={styles.navIcon} />
                </button>
            </div>
        </div>
    );
}

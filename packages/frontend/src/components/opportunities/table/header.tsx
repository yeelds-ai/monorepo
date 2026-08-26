import type { SortDirection, SortField } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { ArrowDown, ArrowUp } from "@/src/assets";

import styles from "./styles.module.css";

export const HEADER_KEYS = [
    "chain",
    "protocol",
    "name",
    "tvl",
    "grade",
    "apy",
] as const;

const SORT_FIELDS: Partial<Record<(typeof HEADER_KEYS)[number], SortField>> = {
    tvl: "tvl",
    grade: "score",
    apy: "apy",
};

const COL_WIDTH_RATIOS: Record<(typeof HEADER_KEYS)[number], number> = {
    chain: 5,
    protocol: 9,
    name: 22,
    tvl: 8,
    grade: 8,
    apy: 8,
};

const TOTAL_COL_WIDTH_RATIO = Object.values(COL_WIDTH_RATIOS).reduce(
    (sum, ratio) => sum + ratio,
    0,
);

export const COL_WIDTHS: Record<(typeof HEADER_KEYS)[number], string> =
    Object.fromEntries(
        HEADER_KEYS.map((key) => [
            key,
            `${(COL_WIDTH_RATIOS[key] / TOTAL_COL_WIDTH_RATIO) * 100}%`,
        ]),
    ) as Record<(typeof HEADER_KEYS)[number], string>;

interface OpportunitiesTableHeaderProps {
    sort?: SortField;
    direction?: SortDirection;
    onSortChange: (sort?: SortField, direction?: SortDirection) => void;
}

export function OpportunitiesTableHeader({
    sort,
    direction,
    onSortChange,
}: OpportunitiesTableHeaderProps) {
    const t = useTranslations("opportunities.table");

    function getHandleOnHeaderClick(field: SortField) {
        return () => {
            if (sort !== field) return onSortChange(field, "desc");
            if (direction === "desc") return onSortChange(field, "asc");
            onSortChange(undefined, undefined);
        };
    }

    return (
        <thead>
            <tr>
                {HEADER_KEYS.map((key) => {
                    const field = SORT_FIELDS[key];
                    if (!field)
                        return (
                            <th key={key} className={styles.header}>
                                <Typography
                                    size={14}
                                    weight="bold"
                                    variant="secondary"
                                >
                                    {t(key)}
                                </Typography>
                            </th>
                        );

                    const active = sort === field;

                    return (
                        <th
                            key={key}
                            className={styles.header}
                            aria-sort={
                                active
                                    ? direction === "asc"
                                        ? "ascending"
                                        : "descending"
                                    : "none"
                            }
                        >
                            <button
                                onClick={getHandleOnHeaderClick(field)}
                                className={classNames(
                                    "sortableHeader",
                                    styles.sortableHeader,
                                )}
                            >
                                <Typography
                                    size={14}
                                    weight="bold"
                                    variant="secondary"
                                >
                                    {t(key)}
                                </Typography>
                                <span className={styles.sortIcons}>
                                    <ArrowUp
                                        className={classNames(
                                            "sortIcon",
                                            styles.sortIcon,
                                            {
                                                [styles.active]:
                                                    active &&
                                                    direction === "asc",
                                            },
                                        )}
                                    />
                                    <ArrowDown
                                        className={classNames(
                                            "sortIcon",
                                            styles.sortIcon,
                                            {
                                                [styles.active]:
                                                    active &&
                                                    direction === "desc",
                                            },
                                        )}
                                    />
                                </span>
                            </button>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import styles from "./styles.module.css";

export const HEADER_KEYS = [
    "chain",
    "protocol",
    "strategy",
    "tvl",
    "stability",
    "grade",
    "apy",
    "dailyEstimate",
] as const;

const COL_WIDTH_RATIOS: Record<(typeof HEADER_KEYS)[number], number> = {
    chain: 6,
    protocol: 15,
    strategy: 20,
    tvl: 10,
    stability: 8,
    grade: 8,
    apy: 8,
    dailyEstimate: 8,
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

export function OpportunitiesTableHeader() {
    const t = useTranslations("opportunities.table");

    return (
        <thead>
            <tr>
                {HEADER_KEYS.map((key) => (
                    <th key={key} className={styles.header}>
                        <Typography size={14} weight="bold" variant="secondary">
                            {t(key)}
                        </Typography>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

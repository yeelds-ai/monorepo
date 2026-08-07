import type { SortDirection, SortField } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { LoadingBar } from "@/src/components/loading-bar";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { DEFAULT_PAGE_LIMIT } from "..";
import { COL_WIDTHS, HEADER_KEYS, OpportunitiesTableHeader } from "./header";
import { OpportunityRow } from "./opportunity-row";
import { SkeletonOpportunityRow } from "./skeleton-row";

import styles from "./styles.module.css";

interface OpportunitiesTableProps {
    opportunities: EnrichedOpportunity[];
    loading?: boolean;
    placeholderLoading?: boolean;
    sort?: SortField;
    direction?: SortDirection;
    onSortChange?: (sort?: SortField, direction?: SortDirection) => void;
}

export function OpportunitiesTable({
    opportunities,
    loading = false,
    placeholderLoading = false,
    sort,
    direction,
    onSortChange = () => {},
}: OpportunitiesTableProps) {
    const t = useTranslations("opportunities.table");

    if (!loading && opportunities.length === 0)
        return (
            <div className={styles.wrapper}>
                <div className={styles.empty}>
                    <Typography size={14} weight="medium" variant="secondary">
                        {t("empty")}
                    </Typography>
                </div>
            </div>
        );

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <table className={styles.table}>
                    <colgroup>
                        {HEADER_KEYS.map((key) => (
                            <col key={key} style={{ width: COL_WIDTHS[key] }} />
                        ))}
                    </colgroup>
                    <OpportunitiesTableHeader
                        sort={sort}
                        direction={direction}
                        onSortChange={onSortChange}
                    />
                    <tbody>
                        <tr aria-hidden="true" className={styles.loadingBarRow}>
                            <td
                                colSpan={HEADER_KEYS.length}
                                className={styles.loadingBarCell}
                            >
                                <LoadingBar
                                    loading={placeholderLoading}
                                    className={styles.loadingBar}
                                />
                            </td>
                        </tr>
                        {loading
                            ? Array.from({ length: DEFAULT_PAGE_LIMIT }).map(
                                  (_, index) => (
                                      <SkeletonOpportunityRow key={index} />
                                  ),
                              )
                            : opportunities.map((opportunity) => (
                                  <OpportunityRow
                                      key={opportunity.address}
                                      opportunity={opportunity}
                                  />
                              ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

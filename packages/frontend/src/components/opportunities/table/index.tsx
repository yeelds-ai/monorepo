import type { SortDirection, SortField } from "@yeelds/sdk";
import { LoadingBar } from "@yeelds/ui";
import type { ReactNode } from "react";

import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { DEFAULT_PAGE_LIMIT } from "..";
import { EmptyOpportunities } from "../empty";
import { COL_WIDTHS, HEADER_KEYS, OpportunitiesTableHeader } from "./header";
import { OpportunityRow } from "./opportunity-row";
import { SkeletonOpportunityRow } from "./skeleton-row";

import styles from "./styles.module.css";

interface OpportunitiesTableProps {
    opportunities: EnrichedOpportunity[];
    loading?: boolean;
    placeholderLoading?: boolean;
    skeletonRowCount?: number;
    emptyState?: ReactNode;
    sortable?: boolean;
    sort?: SortField;
    direction?: SortDirection;
    onSortChange?: (sort?: SortField, direction?: SortDirection) => void;
}

export function OpportunitiesTable({
    opportunities,
    loading = false,
    placeholderLoading = false,
    skeletonRowCount = DEFAULT_PAGE_LIMIT,
    emptyState = <EmptyOpportunities />,
    sortable = true,
    sort,
    direction,
    onSortChange = () => {},
}: OpportunitiesTableProps) {
    if (!loading && opportunities.length === 0) return <>{emptyState}</>;

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
                        sortable={sortable}
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
                            ? Array.from({ length: skeletonRowCount }).map(
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

import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { PieChartIcon } from "@/src/assets";
import { RemoteLogo } from "@/src/components/remote-logo";
import type { EnrichedOpportunityAllocation } from "@/src/types/opportunity";
import { formatPercentage, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

interface AllocationsTableProps {
    allocations: EnrichedOpportunityAllocation[];
    depositTokenSymbol: string;
}

export function AllocationsTable({
    allocations,
    depositTokenSymbol,
}: AllocationsTableProps) {
    const t = useTranslations("opportunity.exposureCard");
    if (
        allocations.length === 0 ||
        (allocations.length === 1 && allocations[0].amountUsd === 0)
    )
        return null;

    return (
        <div>
            <div className={styles.titleWrapper}>
                <PieChartIcon className={styles.chartIcon} />
                <Typography size={16} font="brand">
                    {t("allocations")}
                </Typography>
            </div>
            <table className={styles.table}>
                <colgroup>
                    <col className={styles.marketCol} />
                    <col className={styles.allocationCol} />
                    <col className={styles.shareCol} />
                </colgroup>
                <thead>
                    <tr>
                        <th className={styles.headerCell}>
                            <Typography as="span" size={12} variant="secondary">
                                {t("marketExposure")}
                            </Typography>
                        </th>
                        <th className={styles.headerCell}>
                            <Typography as="span" size={12} variant="secondary">
                                {t("allocation", { token: depositTokenSymbol })}
                            </Typography>
                        </th>
                        <th
                            className={classNames(
                                styles.headerCell,
                                styles.shareCell,
                            )}
                        >
                            <Typography as="span" size={12} variant="secondary">
                                {t("share")}
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allocations.map((allocation, index) => {
                        if (allocation.amountUsd === 0) return null;

                        return (
                            <tr
                                key={allocation.token?.address || index}
                                className={styles.row}
                            >
                                <td className={styles.cell}>
                                    {allocation.token ? (
                                        <span className={styles.market}>
                                            <RemoteLogo
                                                address={
                                                    allocation.token.address
                                                }
                                                chain={allocation.token.chain}
                                                size={16}
                                                defaultText={
                                                    allocation.token.symbol
                                                }
                                                className={styles.icon}
                                            />
                                            <Typography
                                                as="span"
                                                size={14}
                                                weight="bold"
                                            >
                                                {allocation.token.symbol}
                                            </Typography>
                                        </span>
                                    ) : (
                                        <Typography
                                            as="span"
                                            size={14}
                                            weight="bold"
                                            variant="secondary"
                                        >
                                            {t("notAllocated")}
                                        </Typography>
                                    )}
                                </td>
                                <td className={styles.cell}>
                                    <Typography
                                        as="span"
                                        size={14}
                                        weight="bold"
                                    >
                                        {allocation.amountUsd != null
                                            ? formatUsd(allocation.amountUsd)
                                            : "-"}
                                    </Typography>
                                </td>
                                <td
                                    className={classNames(
                                        styles.cell,
                                        styles.shareCell,
                                    )}
                                >
                                    <Typography
                                        as="span"
                                        font="brand"
                                        size={14}
                                    >
                                        {formatPercentage(allocation.share)}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

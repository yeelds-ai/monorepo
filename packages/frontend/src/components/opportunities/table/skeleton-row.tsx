import { Skeleton } from "@yeelds/ui";
import classNames from "classnames";

import { HEADER_KEYS } from "./header";

import styles from "./styles.module.css";

function renderSkeletonCell(key: (typeof HEADER_KEYS)[number]) {
    switch (key) {
        case "chain":
            return <Skeleton circular width={24} />;
        case "protocol":
            return (
                <span className={styles.protocolName}>
                    <Skeleton circular width={24} />
                    <Skeleton size={18} width="60%" />
                </span>
            );
        default:
            return <Skeleton size={16} width="75%" />;
    }
}

export function SkeletonOpportunityRow() {
    return (
        <tr className={classNames(styles.row, styles.loading)}>
            {HEADER_KEYS.map((key) => (
                <td
                    key={key}
                    className={classNames(styles.cell, styles.loading)}
                >
                    {renderSkeletonCell(key)}
                </td>
            ))}
        </tr>
    );
}

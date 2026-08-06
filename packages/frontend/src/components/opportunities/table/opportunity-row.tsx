import { SUPPORTED_CHAINS } from "@yeelds/registry";
import { Tag, Typography } from "@yeelds/ui";
import classNames from "classnames";

import { Link } from "@/src/i18n/routing";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatApy, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

interface OpportunityRowProps {
    opportunity: EnrichedOpportunity;
}

export function OpportunityRow({ opportunity }: OpportunityRowProps) {
    const chain = SUPPORTED_CHAINS[opportunity.chain];
    const href = `/opportunities/${opportunity.chain}/${opportunity.address}`;
    const protocolRegistry = opportunity.protocol.registry;

    return (
        <tr className={styles.row}>
            <td className={classNames(styles.cell, styles.linkCell)}>
                <Link
                    href={href}
                    prefetch
                    aria-label={`${opportunity.protocol.name} ${opportunity.strategy}`}
                    className={styles.link}
                />
                {chain && <chain.icon className={styles.logo} />}
            </td>
            <td className={styles.cell}>
                <span className={styles.protocolName}>
                    {protocolRegistry && (
                        <protocolRegistry.icon className={styles.logo} />
                    )}
                    <Typography
                        as="span"
                        size={18}
                        weight="bold"
                        className={styles.protocolNameText}
                    >
                        {opportunity.protocol.name}
                    </Typography>
                </span>
            </td>
            <td className={styles.cell}>
                <Tag>
                    <Typography
                        size={16}
                        weight="medium"
                        capitalize
                        variant="secondary"
                        className={styles.strategyChipText}
                    >
                        {opportunity.strategy}
                    </Typography>
                </Tag>
            </td>
            <td className={styles.cell}>
                <Typography size={18} weight="bold" className={styles.tvlCell}>
                    {opportunity.tvlUsd ? formatUsd(opportunity.tvlUsd) : "—"}
                </Typography>
            </td>
            <td className={styles.cell}>
                {/* TODO: implement stability badge */}-
            </td>
            <td className={styles.cell}>
                {/* TODO: implement grade badge */}-
            </td>
            <td className={styles.cell}>
                <Typography size={18} weight="bold">
                    {formatApy(opportunity.apy)}
                </Typography>
            </td>
            <td className={styles.cell}>
                {/* TODO: implement daily estimate */}-
            </td>
        </tr>
    );
}

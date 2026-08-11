import { SUPPORTED_CHAINS } from "@yeelds/registry";
import { GradeTag, Tag, Typography } from "@yeelds/ui";
import { type MouseEvent } from "react";

import { Link, useRouter } from "@/src/i18n/routing";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatApy, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

interface OpportunityRowProps {
    opportunity: EnrichedOpportunity;
}

export function OpportunityRow({ opportunity }: OpportunityRowProps) {
    const router = useRouter();
    const chain = SUPPORTED_CHAINS[opportunity.chain];
    const href = `/opportunities/${opportunity.chain}/${opportunity.address}`;
    const protocolRegistry = opportunity.protocol.registry;

    function handleOnRowClick(event: MouseEvent<HTMLTableRowElement>) {
        if ((event.target as HTMLElement).closest("a")) return;
        router.push(href);
    }

    return (
        <tr className={styles.row} onClick={handleOnRowClick}>
            <td className={styles.cell}>
                {chain && <chain.icon className={styles.logo} />}
            </td>
            <td className={styles.cell}>
                <Link
                    href={href}
                    prefetch
                    aria-label={`${opportunity.protocol.name} ${opportunity.strategy}`}
                    className={styles.protocolName}
                >
                    {protocolRegistry && (
                        <protocolRegistry.icon className={styles.logo} />
                    )}
                    <Typography as="span" size={18} weight="bold" truncate>
                        {opportunity.protocol.name}
                    </Typography>
                </Link>
            </td>
            <td className={styles.cell}>
                <div className={styles.strategy}>
                    <Tag>
                        <Typography
                            size={16}
                            weight="medium"
                            capitalize
                            variant="secondary"
                            truncate
                        >
                            {opportunity.strategy}
                        </Typography>
                    </Tag>
                    <Typography size={18} weight="bold" truncate>
                        {opportunity.name}
                    </Typography>
                </div>
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
                <GradeTag grade={opportunity.grade?.letter} />
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

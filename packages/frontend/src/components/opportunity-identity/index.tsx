import { SUPPORTED_CHAINS } from "@yeelds/registry";
import { GradeTag, Tag, Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";

import { ExternalLinkIcon } from "@/src/assets";
import { ChainDot } from "@/src/components/chain-dot";
import { ProtocolLogo } from "@/src/components/protocol-logo";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { formatApy, formatUsd } from "@/src/utils/format";

import styles from "./styles.module.css";

type OpportunityIdentitySize = "sm" | "lg";

const ICON_SIZES: Record<
    OpportunityIdentitySize,
    { protocol: number; chain: number }
> = {
    sm: { protocol: 32, chain: 16 },
    lg: { protocol: 48, chain: 24 },
};

interface OpportunityIdentityProps {
    opportunity: EnrichedOpportunity;
    size?: OpportunityIdentitySize;
    className?: string;
}

export function OpportunityIdentity({
    opportunity,
    size = "sm",
    className,
}: OpportunityIdentityProps) {
    const t = useTranslations("opportunityIdentity");
    const iconSizes = ICON_SIZES[size];
    const chain = SUPPORTED_CHAINS[opportunity.chain];

    return (
        <div
            className={classNames("root", styles.root, className, {
                [styles.lg]: size === "lg",
            })}
        >
            <div className={styles.topRow}>
                <span className={styles.logoWrapper}>
                    <ProtocolLogo
                        protocol={opportunity.protocol.slug}
                        symbol={opportunity.protocol.name}
                        size={iconSizes.protocol}
                    />
                    <span className={styles.chainDot}>
                        <ChainDot
                            chain={opportunity.chain}
                            size={iconSizes.chain}
                        />
                    </span>
                </span>
                <div className={styles.identityText}>
                    {size === "lg" ? (
                        <span className={styles.nameLine}>
                            <Typography size={28} font="brand">
                                {opportunity.protocol.name}
                            </Typography>
                            <Typography size={18} variant="secondary">
                                {opportunity.name}
                            </Typography>
                            {chain && (
                                <a
                                    href={`${chain.blockExplorerUrl}/address/${opportunity.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={t("viewOnExplorer")}
                                    className={styles.explorerLink}
                                >
                                    <ExternalLinkIcon
                                        className={styles.explorerIcon}
                                    />
                                </a>
                            )}
                        </span>
                    ) : (
                        <Typography size={16} weight="bold">
                            {opportunity.protocol.name}
                        </Typography>
                    )}
                    <span className={styles.strategyLine}>
                        <Typography
                            as="span"
                            size={12}
                            capitalize
                            truncate
                            weight="bold"
                            variant="secondary"
                        >
                            {opportunity.strategy}{" "}
                            {opportunity.name && (
                                <>
                                    <span aria-hidden="true">•</span>{" "}
                                    {opportunity.name}
                                </>
                            )}
                        </Typography>
                    </span>
                </div>
                {size === "sm" && (
                    <GradeTag
                        size="sm"
                        grade={opportunity.grade?.letter}
                        className={styles.gradeTag}
                    />
                )}
            </div>
            {size === "lg" && (
                <span className={styles.chipRow}>
                    {chain && (
                        <Tag padding="spaced" className={styles.tag}>
                            <span className={styles.chainChip}>
                                <ChainDot chain={opportunity.chain} size={14} />
                                <Typography as="span" size={16} weight="bold">
                                    {chain.name}
                                </Typography>
                            </span>
                        </Tag>
                    )}
                    <Tag padding="spaced" className={styles.tag}>
                        <Typography
                            as="span"
                            size={16}
                            font="brand"
                            color="brand"
                        >
                            {t("apy", { value: formatApy(opportunity.apy) })}
                        </Typography>
                    </Tag>
                    {opportunity.tvlUsd != null && (
                        <Tag padding="spaced" className={styles.tag}>
                            <Typography as="span" size={16} weight="bold">
                                {t("tvl", {
                                    value: formatUsd(opportunity.tvlUsd),
                                })}
                            </Typography>
                        </Tag>
                    )}
                </span>
            )}
        </div>
    );
}

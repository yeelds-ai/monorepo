import { isMorphoSourceData } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ClipboardCheckIcon } from "@/src/assets/clipboard-check-icon";
import type { EnrichedOpportunity } from "@/src/types/opportunity";
import { OneClickDeposit } from "./one-click-deposit";
import { YieldComposition } from "./yield-composition";

import styles from "./styles.module.css";

interface ReviewCardProps {
    opportunity: EnrichedOpportunity;
}

export function ReviewCard({ opportunity }: ReviewCardProps) {
    const t = useTranslations("opportunity");

    const protocolRegistry = opportunity.protocol.registry;
    if (!protocolRegistry) return null;

    const depositUrl = protocolRegistry.buildDepositUrl(opportunity);
    const depositDisabled =
        !depositUrl ||
        (isMorphoSourceData(opportunity.protocol.data) &&
            opportunity.protocol.data.depositDisabled);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <ClipboardCheckIcon className={styles.reviewIcon} />
                <Typography size={18} font="brand" color="brand">
                    {t("review.title")}
                </Typography>
            </div>
            <YieldComposition opportunity={opportunity} />
            <div className={styles.actions}>
                <OneClickDeposit
                    opportunity={opportunity}
                    protocolName={opportunity.protocol.name}
                    depositUrl={depositDisabled ? null : depositUrl}
                />
            </div>
        </div>
    );
}

import { Button, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { ClipboardCheckIcon } from "@/src/assets/clipboard-check-icon";
import { ExternalLinkIcon } from "@/src/assets/external-link-icon";
import type { EnrichedOpportunity } from "@/src/types/opportunity";

import styles from "./styles.module.css";

interface ReviewCardProps {
    opportunity: EnrichedOpportunity;
}

export function ReviewCard({ opportunity }: ReviewCardProps) {
    const t = useTranslations("opportunity");
    const protocolRegistry = opportunity.protocol.registry;
    if (!protocolRegistry) return null;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <ClipboardCheckIcon className={styles.reviewIcon} />
                <Typography size={18} font="brand" color="brand">
                    {t("review.title")}
                </Typography>
            </div>
            <Button
                icon={ExternalLinkIcon}
                href={protocolRegistry.buildDepositUrl(opportunity)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.depositButton}
            >
                {t("review.depositOn", { protocol: opportunity.protocol.name })}
            </Button>
        </div>
    );
}

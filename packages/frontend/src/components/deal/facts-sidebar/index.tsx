import { Button, Typography } from "@yeelds/ui";

import {
    BookIcon,
    ExternalLinkIcon,
    InfoIcon,
    TelegramLogo,
} from "@/src/assets";
import { ChainDot } from "@/src/components/chain-dot";
import { DetailRow } from "@/src/components/opportunity/detail-row";
import type { DealDetail } from "@/src/types/deal";

import styles from "./styles.module.css";

interface DealFactsSidebarProps {
    deal: DealDetail;
    documentsLabel: string;
}

export function DealFactsSidebar({
    deal,
    documentsLabel,
}: DealFactsSidebarProps) {
    const { facts, cta, ctaFootnote } = deal;

    return (
        <aside className={styles.root}>
            <div className={styles.metric}>
                <div className={styles.metricValue}>
                    <Typography
                        as="span"
                        font="brand"
                        className={styles.metricNumber}
                    >
                        {facts.metric}
                    </Typography>
                    <Typography as="span" size={20} font="brand">
                        {facts.metricUnit}
                    </Typography>
                </div>
                <Typography size={12} variant="secondary">
                    {facts.metricCaption}
                </Typography>
            </div>

            <div className={styles.rows}>
                {facts.rows.map((row) => (
                    <DetailRow
                        key={row.label}
                        label={
                            row.hint ? (
                                <span
                                    className={styles.rowLabel}
                                    title={row.hint}
                                >
                                    {row.label}
                                    <InfoIcon className={styles.hintIcon} />
                                </span>
                            ) : (
                                row.label
                            )
                        }
                    >
                        <span className={styles.rowValue}>
                            {row.chain && (
                                <ChainDot chain={row.chain} size={20} />
                            )}
                            <Typography as="span" size={14} weight="bold">
                                {row.value}
                            </Typography>
                        </span>
                    </DetailRow>
                ))}
            </div>

            {facts.documents.length > 0 && (
                <div className={styles.documents}>
                    <Typography
                        size={10}
                        weight="bold"
                        uppercase
                        variant="secondary"
                    >
                        {documentsLabel}
                    </Typography>
                    {facts.documents.map((document) => (
                        <a
                            key={document.href}
                            href={document.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.document}
                        >
                            <BookIcon className={styles.documentIcon} />
                            <Typography
                                as="span"
                                size={14}
                                weight="bold"
                                truncate
                                className={styles.documentLabel}
                            >
                                {document.label}
                            </Typography>
                            <ExternalLinkIcon className={styles.documentIcon} />
                        </a>
                    ))}
                </div>
            )}

            <div className={styles.cta}>
                <Button
                    href={cta.target}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={
                        cta.type === "telegram"
                            ? TelegramLogo
                            : ExternalLinkIcon
                    }
                >
                    {cta.label}
                </Button>
                {ctaFootnote && (
                    <Typography
                        size={12}
                        variant="secondary"
                        className={styles.ctaFootnote}
                    >
                        {ctaFootnote.split(/(@\w+)/g).map((part, index) =>
                            part.startsWith("@") ? (
                                <Typography
                                    key={index}
                                    as="span"
                                    size={12}
                                    color="brand"
                                >
                                    {part}
                                </Typography>
                            ) : (
                                part
                            ),
                        )}
                    </Typography>
                )}
            </div>
        </aside>
    );
}

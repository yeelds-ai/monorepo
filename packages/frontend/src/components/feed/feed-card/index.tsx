import type { FeedItem } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { BookIcon, ClockIcon } from "@/src/assets";
import { stringToColor } from "@/src/utils/color";
import { formatRelativeTime } from "@/src/utils/date";

import styles from "./styles.module.css";

interface FeedCardProps {
    item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
    const t = useTranslations("feed");

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
        >
            <div className={styles.header}>
                <div
                    className={styles.avatar}
                    style={{ backgroundColor: stringToColor(item.publication) }}
                    aria-hidden="true"
                >
                    <Typography size={14} weight="bold">
                        {item.publication.charAt(0).toUpperCase()}
                    </Typography>
                </div>
                <div className={styles.publicationMeta}>
                    <Typography
                        size={14}
                        weight="bold"
                        className={styles.truncate}
                    >
                        {item.publication}
                    </Typography>
                    <Typography
                        size={12}
                        variant="secondary"
                        className={styles.truncate}
                    >
                        {item.author}
                    </Typography>
                </div>
            </div>

            <Typography size={18} font="brand" className={styles.title}>
                {item.title}
            </Typography>
            <Typography
                size={14}
                variant="secondary"
                className={styles.excerpt}
            >
                {item.excerpt}
            </Typography>

            <div className={styles.footer}>
                <div className={styles.footerItem}>
                    <ClockIcon className={styles.footerIcon} />
                    <Typography size={12} weight="bold" variant="secondary">
                        {formatRelativeTime(item.publishedAt)}
                    </Typography>
                </div>
                <div className={styles.footerItem}>
                    <BookIcon className={styles.footerIcon} />
                    <Typography size={12} weight="bold" variant="secondary">
                        {t("readTime", { minutes: item.readTimeMin })}
                    </Typography>
                </div>
            </div>
        </a>
    );
}

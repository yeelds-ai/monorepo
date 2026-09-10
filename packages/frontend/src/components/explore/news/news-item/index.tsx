import type { FeedItem } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { BookIcon, ClockIcon } from "@/src/assets";
import { stringToColor } from "@/src/utils/color";
import { formatRelativeTime } from "@/src/utils/date";

import styles from "./styles.module.css";

interface NewsItemProps {
    item: FeedItem;
}

export function NewsItem({ item }: NewsItemProps) {
    const t = useTranslations("explore.news");

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
        >
            <div className={styles.itemHeader}>
                <div
                    className={styles.avatar}
                    style={{ backgroundColor: stringToColor(item.publication) }}
                    aria-hidden="true"
                >
                    <Typography size={14} weight="bold" uppercase>
                        {item.publication.charAt(0)}
                    </Typography>
                </div>
                <Typography
                    size={14}
                    weight="bold"
                    truncate
                    className={styles.publication}
                >
                    {item.publication}
                </Typography>
                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <BookIcon className={styles.metaIcon} />
                        <Typography size={12} weight="bold" variant="secondary">
                            {t("readTime", { minutes: item.readTimeMin })}
                        </Typography>
                    </div>
                    <div className={styles.metaItem}>
                        <ClockIcon className={styles.metaIcon} />
                        <Typography size={12} weight="bold" variant="secondary">
                            {formatRelativeTime(item.publishedAt)}
                        </Typography>
                    </div>
                </div>
            </div>
            <Typography size={18} font="brand" truncate>
                {item.title}
            </Typography>
            <Typography
                size={14}
                variant="secondary"
                truncate
                truncateTooltip={false}
            >
                {item.excerpt}
            </Typography>
        </a>
    );
}

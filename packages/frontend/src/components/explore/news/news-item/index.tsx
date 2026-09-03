import type { FeedItem } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";

import { ClockIcon } from "@/src/assets";
import { stringToColor } from "@/src/utils/color";
import { formatRelativeTime } from "@/src/utils/date";

import styles from "./styles.module.css";

interface NewsItemProps {
    item: FeedItem;
}

export function NewsItem({ item }: NewsItemProps) {
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
                <div className={styles.time}>
                    <ClockIcon className={styles.timeIcon} />
                    <Typography size={12} weight="bold" variant="secondary">
                        {formatRelativeTime(item.publishedAt)}
                    </Typography>
                </div>
            </div>
            <Typography size={16} font="brand" className={styles.title}>
                {item.title}
            </Typography>
            <Typography
                size={14}
                variant="secondary"
                className={styles.excerpt}
            >
                {item.excerpt}
            </Typography>
        </a>
    );
}

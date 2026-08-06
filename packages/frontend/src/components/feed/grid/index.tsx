import type { FeedItem } from "@yeelds/sdk";
import { Skeleton, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";

import { LoadingBar } from "@/src/components/loading-bar";
import { FeedCard } from "../feed-card";

import styles from "./styles.module.css";

const SKELETON_CARDS = 12;

interface FeedGridProps {
    feedItems: FeedItem[];
    loading?: boolean;
    placeholderLoading?: boolean;
}

export function FeedGrid({
    feedItems,
    loading = false,
    placeholderLoading = false,
}: FeedGridProps) {
    const t = useTranslations("feed");

    if (loading)
        return (
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    {Array.from({ length: SKELETON_CARDS }).map((_, index) => (
                        <Skeleton
                            key={index}
                            height={220}
                            className={styles.cardSkeleton}
                        />
                    ))}
                </div>
            </div>
        );

    if (feedItems.length === 0)
        return (
            <div className={styles.wrapper}>
                <div className={styles.empty}>
                    <Typography size={14} weight="medium" variant="secondary">
                        {t("empty")}
                    </Typography>
                </div>
            </div>
        );

    return (
        <div className={styles.wrapper}>
            <LoadingBar loading={placeholderLoading} />
            <div className={styles.grid}>
                {feedItems.map((item) => (
                    <FeedCard key={item.url} item={item} />
                ))}
            </div>
        </div>
    );
}

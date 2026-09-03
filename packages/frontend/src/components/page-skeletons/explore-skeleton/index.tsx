import { Skeleton } from "@yeelds/ui";

import { HotPickCardSkeleton } from "@/src/components/explore/hot-picks/hot-pick-card-skeleton";
import { NewsItemSkeleton } from "@/src/components/explore/news/news-item/news-item-skeleton";

import styles from "./styles.module.css";

const NEWS_ITEMS = 3;
const HOT_PICK_COLUMNS = 5;
const HOT_PICK_CARDS = 5;

export function ExploreSkeleton() {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Skeleton height={32} width={192} />
                <Skeleton
                    height={24}
                    width={288}
                    className={styles.subtitleBar}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.news}>
                    <div className={styles.newsCard}>
                        <div className={styles.newsHeader}>
                            <Skeleton height={28} width={120} />
                            <Skeleton height={20} width={72} />
                        </div>
                        {Array.from({ length: NEWS_ITEMS }).map((_, index) => (
                            <NewsItemSkeleton key={index} />
                        ))}
                    </div>
                </div>

                <div className={styles.hotPicks}>
                    <div className={styles.hotPicksHeader}>
                        <Skeleton height={28} width={120} />
                        <Skeleton height={20} width={140} />
                    </div>

                    <div className={styles.hotPicksContent}>
                        <div className={styles.grid}>
                            {Array.from({ length: HOT_PICK_COLUMNS }).map(
                                (_, columnIndex) => (
                                    <div
                                        key={columnIndex}
                                        className={styles.column}
                                    >
                                        <Skeleton height={20} width={110} />

                                        <div className={styles.columnList}>
                                            {Array.from({
                                                length: HOT_PICK_CARDS,
                                            }).map((_, cardIndex) => (
                                                <HotPickCardSkeleton
                                                    key={cardIndex}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Skeleton } from "@yeelds/ui";

import { HotPickCardSkeleton } from "@/src/components/explore/hot-picks/hot-pick-card-skeleton";

import styles from "./styles.module.css";

const HOT_PICK_COLUMNS = 5;
const SKELETON_CARDS = 5;

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
                <Skeleton height={530} className={styles.newsListBar} />

                <div className={styles.hotPicksHeader}>
                    <Skeleton height={28} width={120} />
                    <Skeleton height={20} width={140} />
                </div>

                <div className={styles.grid}>
                    {Array.from({ length: HOT_PICK_COLUMNS }).map(
                        (_, columnIndex) => (
                            <div key={columnIndex} className={styles.column}>
                                <Skeleton height={20} width={110} />

                                <div className={styles.columnList}>
                                    {Array.from({
                                        length: SKELETON_CARDS,
                                    }).map((_, cardIndex) => (
                                        <HotPickCardSkeleton key={cardIndex} />
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}

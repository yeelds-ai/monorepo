import { Tag, Typography } from "@yeelds/ui";

import { ChainDot } from "@/src/components/chain-dot";
import type { DealHero as DealHeroData } from "@/src/types/deal";

import styles from "./styles.module.css";

interface DealHeroProps {
    hero: DealHeroData;
}

export function DealHero({ hero }: DealHeroProps) {
    return (
        <header className={styles.root}>
            {hero.tags.length > 0 && (
                <div className={styles.tags}>
                    {hero.tags.map((tag) => (
                        <Tag
                            key={tag.label}
                            padding="compact"
                            className={styles.tag}
                        >
                            {tag.chain && (
                                <ChainDot chain={tag.chain} size={14} />
                            )}
                            {tag.icon && (
                                <tag.icon className={styles.tagIcon} />
                            )}
                            <Typography as="span" size={14} weight="bold">
                                {tag.label}
                            </Typography>
                        </Tag>
                    ))}
                </div>
            )}
            <Typography as="h1" font="brand" size={28}>
                {hero.title}
            </Typography>
            <Typography size={16} variant="secondary">
                {hero.subtitle}
            </Typography>
        </header>
    );
}

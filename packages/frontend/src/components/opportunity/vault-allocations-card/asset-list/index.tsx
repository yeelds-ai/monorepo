import type { OpportunityAsset } from "@yeelds/sdk";
import { Typography } from "@yeelds/ui";

import { RemoteLogo } from "@/src/components/remote-logo";

import styles from "./styles.module.css";

interface AssetListProps {
    assets: OpportunityAsset[];
}

export function AssetList({ assets }: AssetListProps) {
    return (
        <div className={styles.root}>
            {assets.map(({ token }) => (
                <span key={token.address} className={styles.asset}>
                    <RemoteLogo
                        address={token.address}
                        chain={token.chain}
                        size={16}
                        defaultText={token.symbol}
                        className={styles.icon}
                    />
                    <Typography as="span" size={14} weight="bold">
                        {token.symbol}
                    </Typography>
                </span>
            ))}
        </div>
    );
}

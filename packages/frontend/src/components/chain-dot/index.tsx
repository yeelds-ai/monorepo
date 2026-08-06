import { SUPPORTED_CHAINS } from "@yeelds/registry";
import classNames from "classnames";

import styles from "./styles.module.css";

interface ChainDotProps {
    chain: string;
    size?: number;
    className?: string;
}

export function ChainDot({ chain, size = 24, className }: ChainDotProps) {
    const chainData = SUPPORTED_CHAINS[chain];

    return (
        <span
            style={{ width: size, height: size }}
            className={classNames("root", styles.root, className)}
        >
            {chainData ? (
                <chainData.icon className={classNames("icon", styles.icon)} />
            ) : (
                <span
                    style={{ fontSize: size * 0.42 }}
                    className={classNames("initial", styles.initial)}
                >
                    {chain.charAt(0)}
                </span>
            )}
        </span>
    );
}

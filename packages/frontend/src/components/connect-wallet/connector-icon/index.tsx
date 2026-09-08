import classNames from "classnames";
import Image from "next/image";
import type { Connector } from "wagmi";

import { WalletIcon } from "@/src/assets";

import styles from "./styles.module.css";

const CONNECTOR_ICON_URLS: Record<string, string> = {
    injected: "/wallet-icons/injected.svg",
    metaMaskSDK: "/wallet-icons/metamask.webp",
    walletConnect: "/wallet-icons/wallet-connect.png",
};

interface ConnectorIconProps {
    connector: Connector;
    className?: string;
}

export function ConnectorIcon({ connector, className }: ConnectorIconProps) {
    const src = CONNECTOR_ICON_URLS[connector.id];

    if (!src)
        return (
            <WalletIcon
                className={classNames(
                    "connectorIcon",
                    styles.connectorIcon,
                    className,
                )}
            />
        );

    return (
        <Image
            src={src}
            alt={connector.name}
            width={32}
            height={32}
            unoptimized
            className={classNames(
                "connectorIcon",
                styles.connectorIcon,
                className,
            )}
        />
    );
}

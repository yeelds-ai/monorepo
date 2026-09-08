"use client";

import { Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { type Connector, useConnect } from "wagmi";

import { ConnectorIcon } from "../connector-icon";

import styles from "./styles.module.css";

// Connectors that don't rely on browser-injected detection are always ready.
const ALWAYS_READY_CONNECTOR_IDS = ["walletConnect"];

interface WalletOptionProps {
    connector: Connector;
}

export function WalletOption({ connector }: WalletOptionProps) {
    const connect = useConnect();
    const [ready, setReady] = useState(
        ALWAYS_READY_CONNECTOR_IDS.includes(connector.id),
    );

    useEffect(() => {
        if (ALWAYS_READY_CONNECTOR_IDS.includes(connector.id)) return;

        let cancelled = false;
        connector.getProvider().then((provider) => {
            if (!cancelled) setReady(!!provider);
        });

        return () => {
            cancelled = true;
        };
    }, [connector]);

    const loading =
        connect.isPending && connect.variables?.connector === connector;

    function handleOnClick() {
        connect.mutate({ connector });
    }

    return (
        <button
            disabled={!ready || loading}
            onClick={handleOnClick}
            className={classNames("walletOption", styles.walletOption)}
        >
            <ConnectorIcon connector={connector} />
            <Typography weight="bold">{connector.name}</Typography>
        </button>
    );
}

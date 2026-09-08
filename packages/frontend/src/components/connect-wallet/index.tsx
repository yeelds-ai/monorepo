"use client";

import { Button, Typography } from "@yeelds/ui";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useConnection, useDisconnect } from "wagmi";

import { ArrowRightIcon, LogoutIcon, WalletIcon } from "@/src/assets";
import { shortenAddress } from "@/src/utils/address";
import { WalletModal } from "./wallet-modal";

import styles from "./styles.module.css";

export function ConnectWallet() {
    const t = useTranslations("navigation");
    const { address, isConnected } = useConnection();
    const disconnect = useDisconnect();

    const [modalOpen, setModalOpen] = useState(false);

    function handleOnOpen() {
        setModalOpen(true);
    }

    function handleOnClose() {
        setModalOpen(false);
    }

    function handleOnDisconnect() {
        disconnect.mutate();
    }

    if (isConnected && address)
        return (
            <div className={classNames("connected", styles.connected)}>
                <div className={styles.wallet}>
                    <WalletIcon className={styles.walletIcon} />
                    <Typography size={16} truncate>
                        {shortenAddress(address)}
                    </Typography>
                </div>
                <button
                    onClick={handleOnDisconnect}
                    aria-label={t("wallets.disconnect")}
                    className={styles.disconnect}
                >
                    <LogoutIcon className={styles.disconnectIcon} />
                </button>
            </div>
        );

    return (
        <>
            <Button icon={ArrowRightIcon} onClick={handleOnOpen}>
                {t("connectWallet")}
            </Button>
            <WalletModal open={modalOpen} onDismiss={handleOnClose} />
        </>
    );
}

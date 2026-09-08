"use client";

import { Modal, Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { type Connector, useConnectionEffect, useConnectors } from "wagmi";

import { CloseIcon } from "@/src/assets";
import { EVM_CONNECTOR_IDS } from "@/src/context/evm-wallet-provider";
import { WalletOption } from "../wallet-option";

import styles from "./styles.module.css";

interface WalletModalProps {
    open: boolean;
    onDismiss: () => void;
}

export function WalletModal({ open, onDismiss }: WalletModalProps) {
    const t = useTranslations("navigation");
    const connectors = useConnectors();

    useConnectionEffect({
        onConnect({ isReconnected }) {
            if (!isReconnected) onDismiss();
        },
    });

    const orderedConnectors = EVM_CONNECTOR_IDS.map((id) =>
        connectors.find((connector) => connector.id === id),
    ).filter((connector): connector is Connector => !!connector);

    return (
        <Modal open={open} onDismiss={onDismiss} transition="fade-center">
            <div className={styles.modal}>
                <div className={styles.title}>
                    <Typography weight="bold">{t("wallets.title")}</Typography>
                    <button
                        onClick={onDismiss}
                        aria-label={t("wallets.close")}
                        className={styles.close}
                    >
                        <CloseIcon className={styles.closeIcon} />
                    </button>
                </div>
                <div className={styles.walletList}>
                    {orderedConnectors.map((connector) => (
                        <WalletOption
                            key={connector.id}
                            connector={connector}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
}

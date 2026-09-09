"use client";

import { SUPPORTED_CHAINS } from "@yeelds/registry";
import { Button, Modal } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useConnection } from "wagmi";

import { ConnectWallet } from "@/src/components/connect-wallet";
import { LifiDepositWidget } from "@/src/components/lifi-deposit-widget";
import type { EnrichedOpportunity } from "@/src/types/opportunity";

import styles from "./styles.module.css";

interface OneClickDepositProps {
    opportunity: EnrichedOpportunity;
}

export function OneClickDeposit({ opportunity }: OneClickDepositProps) {
    const t = useTranslations("opportunity");
    const { isConnected } = useConnection();
    const [open, setOpen] = useState(false);

    const chain = SUPPORTED_CHAINS[opportunity.chain];

    function handleOnOpen() {
        setOpen(true);
    }

    function handleOnClose() {
        setOpen(false);
    }

    if (!chain) return null;

    if (!isConnected) return <ConnectWallet />;

    return (
        <>
            <Button onClick={handleOnOpen}>
                {t("review.oneClickDeposit")}
            </Button>
            <Modal
                open={open}
                onDismiss={handleOnClose}
                transition="fade-center"
                noUnmount
                className={styles.modal}
            >
                <div className={styles.content}>
                    <LifiDepositWidget
                        fromToken={opportunity.assets[0].token.address}
                        toToken={opportunity.address}
                        fromChain={chain.id}
                        toChain={chain.id}
                    />
                </div>
            </Modal>
        </>
    );
}

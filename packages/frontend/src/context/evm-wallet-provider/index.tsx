"use client";

import type { ReactNode } from "react";
import type { EIP1193RequestFn, Transport } from "viem";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

import { SITE_URL } from "@/src/commons";
import { EVM_CHAINS } from "@/src/commons/chains";
import { WALLETCONNECT_PROJECT_ID } from "@/src/commons/env";

const APP_NAME = "Yeelds";
const APP_DESCRIPTION = "The onchain yield intelligence layer";
const APP_ICON = `${SITE_URL}/icon.svg`;

const transports = EVM_CHAINS.reduce(
    (prev, chain) => {
        prev[chain.id] = http(chain.rpcUrls.default.http[0], {
            batch: true,
            retryDelay: 500,
        });
        return prev;
    },
    {} as Record<
        number,
        Transport<string, Record<string, unknown>, EIP1193RequestFn>
    >,
);

// The MetaMask SDK and WalletConnect connectors initialize browser-only storage
// (IndexedDB) as soon as they are constructed, which throws during SSR. Only
// `injected` is built on the server; the full set is built in the browser. The
// server never renders the wallet UI, so the picker still sees every connector.
const connectors =
    typeof window === "undefined"
        ? [injected()]
        : [
              injected(),
              metaMask({
                  dapp: { name: APP_NAME, url: SITE_URL, iconUrl: APP_ICON },
              }),
              walletConnect({
                  projectId: WALLETCONNECT_PROJECT_ID,
                  metadata: {
                      name: APP_NAME,
                      description: APP_DESCRIPTION,
                      url: SITE_URL,
                      icons: [APP_ICON],
                  },
              }),
          ];

// Connector ids in display order, used to drive the wallet picker UI.
export const EVM_CONNECTOR_IDS = ["injected", "metaMaskSDK", "walletConnect"];

export const wagmiConfig = createConfig({
    chains: EVM_CHAINS,
    transports,
    connectors,
    ssr: true,
});

interface EvmWalletProviderProps {
    children: ReactNode;
}

export function EvmWalletProvider({ children }: EvmWalletProviderProps) {
    return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}

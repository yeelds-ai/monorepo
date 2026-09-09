"use client";

import type { WidgetConfig } from "@lifi/widget";
import { LiFiWidget } from "@lifi/widget";
import { EthereumProvider } from "@lifi/widget-provider-ethereum";

import type { LifiDepositWidgetProps } from ".";

export function Widget({
    fromToken,
    toToken,
    fromChain,
    toChain,
}: LifiDepositWidgetProps) {
    const config = {
        appearance: "dark",
        providers: [EthereumProvider()],
        theme: {
            colorSchemes: {
                dark: {
                    palette: {
                        primary: {
                            main: "#ffceeb",
                            contrastText: "#130d11",
                        },
                        background: {
                            default: "#1b1519",
                            paper: "#1b1519",
                        },
                        text: {
                            primary: "#ffffff",
                            secondary: "#b1afb1",
                        },
                        grey: { "300": "#282828" },
                    },
                },
            },
            shape: { borderRadius: 16 },
            typography: {
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        contained: {
                            "&:hover": {
                                color: "#130d11",
                                backgroundColor: "#ffceeb",
                                opacity: 0.9,
                            },
                        },
                    },
                },
            },
        },
        mode: "custom",
        modeOptions: {
            custom: { type: "deposit" },
        },
        fromToken,
        toToken,
        fromChain,
        toChain,
        disabledUI: { toAddress: true },
        hiddenUI: { appearance: true, language: true },
        showSingleRoute: true,
    } as Partial<WidgetConfig>;

    return <LiFiWidget config={config} integrator="Yeelds" />;
}

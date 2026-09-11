"use client";

import type { WidgetConfig } from "@lifi/widget";
import { LiFiWidget, WidgetEvent, useWidgetEvents } from "@lifi/widget";
import { EthereumProvider } from "@lifi/widget-provider-ethereum";
import { Typography } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { ExternalLinkIcon } from "@/src/assets/external-link-icon";
import { APP_NAME } from "@/src/commons";
import { trackUmamiEvent } from "@/src/utils/umami";
import type { LifiDepositWidgetProps } from ".";

import styles from "./styles.module.css";

export function Widget({
    fromToken,
    toToken,
    fromChain,
    toChain,
    protocolName,
    depositUrl,
}: LifiDepositWidgetProps) {
    const t = useTranslations("opportunity");
    const widgetEvents = useWidgetEvents();

    useEffect(() => {
        function handleOnRouteExecutionStarted() {
            trackUmamiEvent("route-execution-started", {
                opportunity: toToken,
            });
        }
        function handleOnRouteExecutionUpdated() {
            trackUmamiEvent("route-execution-updated", {
                opportunity: toToken,
            });
        }
        function handleOnRouteExecutionCompleted() {
            trackUmamiEvent("route-execution-completed", {
                opportunity: toToken,
            });
        }
        function handleOnRouteExecutionFailed() {
            trackUmamiEvent("route-execution-failed", {
                opportunity: toToken,
            });
        }

        widgetEvents.on(
            WidgetEvent.RouteExecutionStarted,
            handleOnRouteExecutionStarted,
        );
        widgetEvents.on(
            WidgetEvent.RouteExecutionUpdated,
            handleOnRouteExecutionUpdated,
        );
        widgetEvents.on(
            WidgetEvent.RouteExecutionCompleted,
            handleOnRouteExecutionCompleted,
        );
        widgetEvents.on(
            WidgetEvent.RouteExecutionFailed,
            handleOnRouteExecutionFailed,
        );

        return () => {
            widgetEvents.removeAllListeners();
        };
    }, [widgetEvents, toToken]);

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
        disabledUI: { toToken: true, toAddress: true },
        hiddenUI: { appearance: true, language: true },
        showSingleRoute: true,
    } as Partial<WidgetConfig>;

    return (
        <div className={styles.root}>
            <LiFiWidget config={config} integrator={APP_NAME} />
            {depositUrl && (
                <a
                    href={depositUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.depositLink}
                >
                    <Typography as="span" size={12} variant="secondary">
                        {t("review.depositOn", { protocol: protocolName })}
                    </Typography>
                    <ExternalLinkIcon className={styles.depositLinkIcon} />
                </a>
            )}
        </div>
    );
}

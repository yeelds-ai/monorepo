"use client";

import classNames from "classnames";
import { useCallback, useState } from "react";

import styles from "./styles.module.css";

// chain id -> trustwallet/assets blockchain-folder slug. Used only when no
// explicit `src` is given, as a fallback for tokens the caller's own icon
// source doesn't cover.
const TRUSTWALLET_CHAIN_SLUGS: Record<number, string> = {
    1: "ethereum",
    42161: "arbitrum",
    8453: "base",
};

function trustWalletLogoUrl(chain: number, address: string): string | null {
    const slug = TRUSTWALLET_CHAIN_SLUGS[chain];
    if (!slug) return null;
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${slug}/assets/${address}/logo.png`;
}

// Module-level: once a URL 404s, every RemoteLogo instance anywhere in the
// app skips straight to the fallback instead of flashing a broken image.
const BAD_SRC = new Set<string>();

export interface RemoteLogoProps {
    loading?: boolean;
    src?: string;
    address?: string;
    chain?: number;
    size?: number;
    defaultText?: string;
    className?: string;
}

export function RemoteLogo({
    loading,
    src,
    address,
    chain,
    size = 32,
    defaultText = "?",
    className,
}: RemoteLogoProps) {
    const [failed, setFailed] = useState(false);

    const resolvedSrc =
        src || (address && chain ? trustWalletLogoUrl(chain, address) : null);
    const showFallback =
        !loading && (!resolvedSrc || BAD_SRC.has(resolvedSrc) || failed);

    // Hydration-safe: an <img> that already 404'd before onError attached
    // (SSR'd broken src) is caught here via naturalWidth === 0, not just
    // onError.
    const detectAlreadyFailed = useCallback(
        (img: HTMLImageElement | null) => {
            if (!img?.complete || img.naturalWidth !== 0) return;
            if (resolvedSrc) BAD_SRC.add(resolvedSrc);
            setFailed(true);
        },
        [resolvedSrc],
    );

    function handleOnError() {
        if (resolvedSrc) BAD_SRC.add(resolvedSrc);
        setFailed(true);
    }

    if (loading)
        return (
            <span
                style={{ width: size, height: size }}
                className={classNames(
                    "root",
                    styles.root,
                    styles.loading,
                    className,
                )}
            />
        );

    if (showFallback)
        return (
            <span
                style={{ width: size, height: size }}
                className={classNames(
                    "root",
                    styles.root,
                    styles.fallback,
                    className,
                )}
            >
                <span
                    style={{ fontSize: size * 0.42 }}
                    className={classNames("initial", styles.initial)}
                >
                    {(defaultText.charAt(0) || "?").toUpperCase()}
                </span>
            </span>
        );

    return (
        <img
            ref={detectAlreadyFailed}
            src={resolvedSrc || undefined}
            alt={defaultText}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            onError={handleOnError}
            className={classNames("root", styles.root, className)}
        />
    );
}

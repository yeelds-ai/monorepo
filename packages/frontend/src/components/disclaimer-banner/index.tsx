"use client";

import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";

import { AlertIcon, CloseIcon } from "@/src/assets";

import styles from "./styles.module.css";

const DISMISSED_KEY = "yeelds-disclaimer-dismissed";

function subscribe() {
    return () => {};
}

function getSnapshot() {
    return localStorage.getItem(DISMISSED_KEY) === "true";
}

function getServerSnapshot() {
    return true;
}

export function DisclaimerBanner() {
    const t = useTranslations("disclaimer");
    const storedDismissed = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    const [dismissed, setDismissed] = useState(false);

    function handleOnDismiss() {
        localStorage.setItem(DISMISSED_KEY, "true");
        setDismissed(true);
    }

    if (storedDismissed || dismissed) return null;

    return (
        <div className={styles.root}>
            <AlertIcon className={styles.icon} />
            <p className={styles.text}>{t("text")}</p>
            <button
                onClick={handleOnDismiss}
                aria-label={t("dismiss")}
                className={styles.dismiss}
            >
                <CloseIcon className={styles.dismissIcon} />
            </button>
        </div>
    );
}

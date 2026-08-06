"use client";

import { useTranslations } from "next-intl";

import { ErrorState } from "@/src/components/error-state";

interface ErrorPageProps {
    reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
    const t = useTranslations("error");

    return (
        <ErrorState
            title={t("title")}
            description={t("description")}
            retryLabel={t("retry")}
            onRetry={reset}
        />
    );
}

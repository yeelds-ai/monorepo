"use client";

import { useTranslations } from "next-intl";
import { type ErrorInfo, catchError } from "next/error";

import { ErrorState } from "@/src/components/error-state";

function ErrorFallback(_props: object, { retry }: ErrorInfo) {
    const t = useTranslations("error");

    return (
        <ErrorState
            title={t("title")}
            description={t("description")}
            retryLabel={t("retry")}
            onRetry={() => retry()}
        />
    );
}

export default catchError(ErrorFallback);

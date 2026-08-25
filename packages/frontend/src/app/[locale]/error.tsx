"use client";

import { ErrorState } from "@yeelds/ui";
import { useTranslations } from "next-intl";
import { type ErrorInfo, catchError } from "next/error";

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

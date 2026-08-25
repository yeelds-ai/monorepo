import { MessagePage } from "../message-page";
import { Typography } from "../typography";

import styles from "./styles.module.css";

interface ErrorStateProps {
    title: string;
    description: string;
    retryLabel?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title,
    description,
    retryLabel,
    onRetry,
}: ErrorStateProps) {
    return (
        <MessagePage title={title} description={description}>
            {onRetry && (
                <button onClick={onRetry} className={styles.retry}>
                    <Typography
                        as="span"
                        size={14}
                        weight="bold"
                        className={styles.retryLabel}
                    >
                        {retryLabel}
                    </Typography>
                </button>
            )}
        </MessagePage>
    );
}

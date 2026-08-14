import classNames from "classnames";

import { InfoIcon } from "../../assets";
import { Typography } from "../typography";

import styles from "./styles.module.css";

export interface InfoBannerProps {
    text: string;
    className?: string;
}

export function InfoBanner({ text, className }: InfoBannerProps) {
    return (
        <div className={classNames("root", styles.root, className)}>
            <InfoIcon className={classNames("icon", styles.icon)} />
            <Typography size={12} variant="secondary">
                {text}
            </Typography>
        </div>
    );
}

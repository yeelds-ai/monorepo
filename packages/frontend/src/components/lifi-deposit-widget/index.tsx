"use client";

import { Skeleton } from "@yeelds/ui";
import dynamic from "next/dynamic";

const Widget = dynamic(() => import("./widget").then((mod) => mod.Widget), {
    ssr: false,
    loading: () => <Skeleton width="100%" height={640} />,
});

export interface LifiDepositWidgetProps {
    fromToken: string;
    toToken: string;
    fromChain: number;
    toChain: number;
}

export function LifiDepositWidget(props: LifiDepositWidgetProps) {
    return <Widget {...props} />;
}

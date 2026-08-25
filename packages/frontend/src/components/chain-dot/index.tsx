import { SUPPORTED_CHAINS } from "@yeelds/registry";
import { IconDot } from "@yeelds/ui";

interface ChainDotProps {
    chain: string;
    size?: number;
    className?: string;
}

export function ChainDot({ chain, size = 24, className }: ChainDotProps) {
    const chainData = SUPPORTED_CHAINS[chain];

    return (
        <IconDot
            icon={chainData?.icon}
            fallbackText={chain.charAt(0)}
            size={size}
            className={className}
        />
    );
}

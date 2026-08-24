import { RemoteLogo } from "@yeelds/ui";

function protocolIconUrl(protocol: string, size: number): string {
    const pixels = size * 2;
    return `https://icons.llamao.fi/icons/protocols/${protocol}?w=${pixels}&h=${pixels}`;
}

interface ProtocolLogoProps {
    protocol: string;
    symbol: string;
    size?: number;
    className?: string;
}

export function ProtocolLogo({
    protocol,
    symbol,
    size = 40,
    className,
}: ProtocolLogoProps) {
    return (
        <RemoteLogo
            src={protocolIconUrl(protocol, size)}
            defaultText={symbol}
            size={size}
            className={className}
        />
    );
}

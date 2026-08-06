import { RemoteLogo } from "@yeelds/ui";

// DeFi Llama's protocol-icon CDN — the endpoint their own UI uses. The older
// icons.llama.fi/{slug}.png 404s for about half of our curated protocols
// (pendle, sparklend, spark, sky, yearn, euler all miss there); this one resolves
// for every slug we pass. Requested at 2x for retina.
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

"use client";

import { SUPPORTED_CHAINS } from "@yeelds/registry";
import {
    RemoteLogo as UiRemoteLogo,
    type RemoteLogoProps as UiRemoteLogoProps,
} from "@yeelds/ui";

import { useTokenIconUris } from "@/src/hooks/useTokenIconUris";

export interface RemoteLogoProps extends Omit<UiRemoteLogoProps, "chain"> {
    chain?: string;
}

export function RemoteLogo({
    address,
    chain,
    src,
    loading,
    ...rest
}: RemoteLogoProps) {
    const chainId = chain ? SUPPORTED_CHAINS[chain]?.id : undefined;
    const { loading: loadingUris, uris } = useTokenIconUris(chainId, [address]);

    return (
        <UiRemoteLogo
            address={address}
            chain={chainId}
            loading={loading || loadingUris}
            {...rest}
            src={src ?? (address ? uris[address] : undefined)}
        />
    );
}

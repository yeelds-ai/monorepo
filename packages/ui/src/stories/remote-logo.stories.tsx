import type { Meta, StoryObj } from "@storybook/react-vite";

import { RemoteLogo } from "../components/remote-logo";

const SIZES = [16, 24, 32, 48, 64] as const;

const meta = {
    title: "Data display/Remote logo",
    component: RemoteLogo,
    tags: ["autodocs"],
} satisfies Meta<typeof RemoteLogo>;

export default meta;
type Story = StoryObj<typeof RemoteLogo>;

export const Base: Story = {
    args: {
        src: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        size: 32,
        defaultText: "WETH",
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        size: 32,
    },
};

export const Fallback: Story = {
    args: {
        src: "https://example.com/does-not-exist.png",
        size: 32,
        defaultText: "USDC",
    },
};

export const FromChainAddress: Story = {
    args: {
        chain: 1,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        size: 32,
        defaultText: "WETH",
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            {SIZES.map((size) => (
                <RemoteLogo
                    key={size}
                    src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                    size={size}
                    defaultText="WETH"
                />
            ))}
        </div>
    ),
};

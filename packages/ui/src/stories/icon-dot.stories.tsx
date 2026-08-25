import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckIcon } from "../assets";
import { IconDot } from "../components/icon-dot";

const SIZES = [16, 24, 32, 48] as const;

const meta = {
    title: "Data display/Icon dot",
    component: IconDot,
    tags: ["autodocs"],
} satisfies Meta<typeof IconDot>;

export default meta;
type Story = StoryObj<typeof IconDot>;

export const WithIcon: Story = {
    args: {
        icon: CheckIcon,
        fallbackText: "E",
        size: 32,
    },
};

export const Fallback: Story = {
    args: {
        fallbackText: "E",
        size: 32,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            {SIZES.map((size) => (
                <IconDot
                    key={size}
                    icon={CheckIcon}
                    fallbackText="E"
                    size={size}
                />
            ))}
        </div>
    ),
};

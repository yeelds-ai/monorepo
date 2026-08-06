import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "../components/tag";
import { Typography } from "../components/typography";

const meta = {
    title: "Data display/Tag",
    component: Tag,
    tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Base: Story = {
    args: {
        children: "Ethereum",
    },
};

export const WithTypography: Story = {
    render: () => (
        <Tag>
            <Typography
                size={16}
                weight="medium"
                capitalize
                variant="secondary"
            >
                Ethereum
            </Typography>
        </Tag>
    ),
};

export const Padding: Story = {
    render: () => (
        <div className="flex gap-3">
            <Tag padding="compact">compact</Tag>
            <Tag padding="spaced">spaced</Tag>
        </div>
    ),
};

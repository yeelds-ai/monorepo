import type { Meta, StoryObj } from "@storybook/react-vite";

import { CircledPlusIcon } from "../assets";
import { Card } from "../components/card";
import { Typography } from "../components/typography";

const meta = {
    title: "Data display/Card",
    component: Card,
    tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {
    args: {
        title: "Risk Signals",
        children: (
            <Typography size={14} variant="secondary">
                Risk grading is coming soon.
            </Typography>
        ),
    },
};

export const WithIcon: Story = {
    args: {
        icon: CircledPlusIcon,
        title: "Exposure",
        children: (
            <Typography size={14} variant="secondary">
                Single asset, stablecoin category.
            </Typography>
        ),
    },
};

export const WithRows: Story = {
    render: () => (
        <Card icon={CircledPlusIcon} title="Card title">
            <div className="flex items-center justify-between gap-3 py-2">
                <Typography as="span" size={14} variant="secondary">
                    Curator
                </Typography>
                <Typography as="span" size={14} weight="bold">
                    Gauntlet
                </Typography>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border-default py-2">
                <Typography as="span" size={14} variant="secondary">
                    Deposits
                </Typography>
                <Typography as="span" size={14} weight="bold">
                    USDC
                </Typography>
            </div>
        </Card>
    ),
};

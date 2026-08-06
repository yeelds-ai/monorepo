import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExternalLinkIcon } from "../assets";
import { Button } from "../components/button";

const meta = {
    title: "Input/Button",
    component: Button,
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "Yeelds button",
        onClick: () => {},
    },
};

export const AsLink: Story = {
    args: {
        children: "Yeelds button as link",
        icon: ExternalLinkIcon,
        href: "https://www.yeelds.ai",
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => {},
    },
};

export const Disabled: Story = {
    args: {
        ...Primary.args,
        disabled: true,
    },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoBanner } from "../components/info-banner";

const meta = {
    title: "Feedback/InfoBanner",
    component: InfoBanner,
    tags: ["autodocs"],
} satisfies Meta<typeof InfoBanner>;

export default meta;
type Story = StoryObj<typeof InfoBanner>;

export const Base: Story = {
    args: {
        text: "Yeelds info banner text",
    },
};

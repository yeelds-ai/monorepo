import type { Meta, StoryObj } from "@storybook/react-vite";

import { MessagePage } from "../components/message-page";
import { Typography } from "../components/typography";

const meta = {
    title: "Feedback/Message page",
    component: MessagePage,
    tags: ["autodocs"],
} satisfies Meta<typeof MessagePage>;

export default meta;
type Story = StoryObj<typeof MessagePage>;

export const Base: Story = {
    args: {
        title: "Page not found",
        description: "The page you're looking for doesn't exist.",
    },
};

export const WithChildren: Story = {
    render: () => (
        <MessagePage
            title="Deal not found"
            description="This deal may have been removed or the link is incorrect."
        >
            <a
                href="#"
                className="background-overlay stroke-divider rounded-full border px-4 py-2"
            >
                <Typography as="span" size={14} weight="medium">
                    Back to deals
                </Typography>
            </a>
        </MessagePage>
    ),
};

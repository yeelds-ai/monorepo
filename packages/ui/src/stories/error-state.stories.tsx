import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorState } from "../components/error-state";

const meta = {
    title: "Feedback/Error state",
    component: ErrorState,
    tags: ["autodocs"],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Base: Story = {
    args: {
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
    },
};

export const WithRetry: Story = {
    args: {
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
        retryLabel: "Try again",
        onRetry: () => {},
    },
};

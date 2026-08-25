import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { LoadingBar } from "../components/loading-bar";
import { Typography } from "../components/typography";

const meta = {
    title: "Feedback/Loading bar",
    component: LoadingBar,
    tags: ["autodocs"],
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Base: Story = {
    render: () => (
        <div className="w-80">
            <LoadingBar loading />
        </div>
    ),
};

export const Idle: Story = {
    render: () => (
        <div className="w-80">
            <LoadingBar loading={false} />
        </div>
    ),
};

function ToggleableLoadingBar() {
    const [loading, setLoading] = useState(false);

    function handleOnClick() {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    }

    return (
        <div className="flex w-80 flex-col gap-3">
            <LoadingBar loading={loading} />
            <button
                type="button"
                onClick={handleOnClick}
                className="background-overlay stroke-divider w-fit rounded-full border px-4 py-2"
            >
                <Typography as="span" size={14} weight="medium">
                    Trigger loading
                </Typography>
            </button>
        </div>
    );
}

export const Toggle: Story = {
    render: () => <ToggleableLoadingBar />,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Popover } from "../components/popover";
import { Typography } from "../components/typography";

const meta = {
    title: "Utils/Popover",
    component: Popover,
    tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

function ControlledPopover({
    variant,
    contained,
    triggerLabel = "Toggle popover",
}: {
    variant?: "primary" | "secondary";
    contained?: boolean;
    triggerLabel?: string;
}) {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    function handleOnClick() {
        setOpen((current) => !current);
    }

    return (
        <>
            <button
                ref={setAnchor}
                type="button"
                onClick={handleOnClick}
                className="background-overlay stroke-divider rounded-full border px-4 py-2"
            >
                <Typography as="span" size={14} weight="medium">
                    {triggerLabel}
                </Typography>
            </button>
            <Popover
                anchor={anchor}
                open={open}
                variant={variant}
                contained={contained}
                onOpenChange={setOpen}
                placement="bottom-start"
            >
                <Typography as="span" size={14}>
                    Popover content
                </Typography>
            </Popover>
        </>
    );
}

export const Base: Story = {
    render: () => <ControlledPopover />,
};

export const Secondary: Story = {
    render: () => <ControlledPopover variant="secondary" />,
};

export const Contained: Story = {
    render: () => (
        <ControlledPopover
            contained
            triggerLabel="A wider trigger to size against"
        />
    ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../components/button";
import { Modal } from "../components/modal";

const meta = {
    title: "Feedback/Modal",
    component: Modal,
    tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Base: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal open={open} onDismiss={() => setOpen(false)}>
                    <div className="px-8 text-text-primary">
                        Right-anchored panel content
                    </div>
                </Modal>
            </>
        );
    },
};

export const Centered: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal
                    open={open}
                    onDismiss={() => setOpen(false)}
                    transition="fade-center"
                    className="max-w-md"
                >
                    <div className="px-8 text-text-primary">
                        Centered fade-in panel content
                    </div>
                </Modal>
            </>
        );
    },
};

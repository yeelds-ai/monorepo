import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Input } from "../components/input";

const meta = {
    title: "Input/Input",
    component: Input,
    tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

function ControlledInput({
    initial = "",
    placeholder,
    disabled,
}: {
    initial?: string;
    placeholder?: string;
    disabled?: boolean;
}) {
    const [value, setValue] = useState(initial);
    return (
        <Input
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(event) => setValue(event.target.value)}
        />
    );
}

export const Base: Story = {
    render: () => <ControlledInput placeholder="Yeelds" />,
};

export const Filled: Story = {
    render: () => <ControlledInput initial="Yeelds" />,
};

export const Disabled: Story = {
    render: () => <ControlledInput initial="Yeelds" disabled />,
};

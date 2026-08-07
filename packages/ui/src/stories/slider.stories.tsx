import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Slider, type SliderValue } from "../components/slider";

const meta = {
    title: "Input/Slider",
    component: Slider,
    tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

function ControlledSlider({
    initial,
    min,
    max,
    step,
}: {
    initial: SliderValue;
    min?: number;
    max?: number;
    step?: number;
}) {
    const [value, setValue] = useState<SliderValue>(initial);
    return (
        <div style={{ width: 240 }}>
            <Slider
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={setValue}
            />
        </div>
    );
}

export const FullRange: Story = {
    render: () => <ControlledSlider initial={[0, 100]} />,
};

export const PartialRange: Story = {
    render: () => <ControlledSlider initial={[35, 100]} />,
};

export const SteppedApy: Story = {
    render: () => (
        <ControlledSlider initial={[2, 18]} min={0} max={20} step={0.5} />
    ),
};

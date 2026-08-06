import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography } from "../components/typography";

const BRAND_SIZES = [28, 24, 20, 18, 16, 14] as const;
const SYSTEM_SIZES = [20, 18, 16, 14, 12, 10] as const;
const SYSTEM_WEIGHTS = ["medium", "bold"] as const;

const meta = {
    title: "Data display/Typography",
    component: Typography,
    tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Base: Story = {
    args: {
        font: "system",
        size: 16,
        children: "Yeelds typography",
    },
};

export const Scale: Story = {
    render: () => (
        <div className="flex gap-12">
            <div className="flex flex-col gap-3">
                <Typography font="system" size={12} variant="secondary">
                    Brand / Clash Display — Semibold
                </Typography>
                {BRAND_SIZES.map((size) => (
                    <Typography key={size} font="brand" size={size}>
                        brand-{size} — The quick brown fox jumps over the lazy
                        dog
                    </Typography>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                <Typography font="system" size={12} variant="secondary">
                    System / Manrope
                </Typography>
                {SYSTEM_SIZES.map((size) =>
                    SYSTEM_WEIGHTS.map((weight) => (
                        <Typography
                            key={`${size}-${weight}`}
                            font="system"
                            size={size}
                            weight={weight}
                        >
                            system-{size}-{weight} — The quick brown fox jumps
                            over the lazy dog
                        </Typography>
                    )),
                )}
            </div>
        </div>
    ),
};

export const Variant: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Typography font="system" size={16} variant="primary">
                primary — #FFFFFF
            </Typography>
            <Typography font="system" size={16} variant="secondary">
                secondary — #B1AFB1
            </Typography>
        </div>
    ),
};

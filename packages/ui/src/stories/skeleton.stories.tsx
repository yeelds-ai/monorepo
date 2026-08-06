import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton, type SkeletonSize } from "../components/skeleton";

const SIZES: SkeletonSize[] = [10, 12, 14, 16, 18, 20, 24, 28];
const CIRCULAR_WIDTHS = [16, 24, 32, 48] as const;

const meta = {
    title: "Feedback/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Base: Story = {
    args: {
        size: 16,
        width: 160,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            {SIZES.map((size) => (
                <Skeleton key={size} size={size} width={160} />
            ))}
        </div>
    ),
};

export const Circular: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            {CIRCULAR_WIDTHS.map((width) => (
                <Skeleton key={width} circular width={width} />
            ))}
        </div>
    ),
};

export const CustomDimensions: Story = {
    args: {
        width: 144,
        height: 36,
    },
};

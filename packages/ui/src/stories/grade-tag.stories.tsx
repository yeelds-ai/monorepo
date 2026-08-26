import type { Meta, StoryObj } from "@storybook/react-vite";

import { type GradeLetter, GradeTag } from "../components/grade-tag";

const GRADES: GradeLetter[] = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D",
    "F",
];

const meta = {
    title: "Data display/Grade tag",
    component: GradeTag,
    tags: ["autodocs"],
} satisfies Meta<typeof GradeTag>;

export default meta;
type Story = StoryObj<typeof GradeTag>;

export const Base: Story = {
    args: {
        grade: "A+",
    },
};

export const Grades: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                {GRADES.map((grade) => (
                    <GradeTag key={grade} grade={grade} size="sm" />
                ))}
                <GradeTag size="sm" />
            </div>
            <div className="flex items-center gap-2">
                {GRADES.map((grade) => (
                    <GradeTag key={grade} grade={grade} size="base" />
                ))}
                <GradeTag size="base" />
            </div>
        </div>
    ),
};

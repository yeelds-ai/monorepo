import type { Preview } from "@storybook/react-vite";

import "./global.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <div data-theme="dark">
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: "centered",
        backgrounds: { disable: true },
        options: {
            storySort: {
                order: [
                    "Data display",
                    ["Typography", "Tag", "Grade tag", "Card", "Remote logo"],
                    "Input",
                    ["Button", "Multi select"],
                    "Surfaces",
                    "Feedback",
                    ["Skeleton"],
                    "Utils",
                    ["Popover"],
                ],
            },
        },
    },
};

export default preview;

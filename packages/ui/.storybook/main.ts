import { createRequire } from "module";
import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-docs"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
    build: {
        test: { disableSourcemaps: true },
    },
    typescript: { reactDocgen: "react-docgen-typescript" },
    staticDirs: ["../public"],
};

export default config;

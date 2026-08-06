import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
    ...nextVitals,
    prettierConfig,
    ...pluginQuery.configs["flat/recommended"],
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            next: { rootDir: import.meta.dirname },
            // FIXME: remove once this is solved https://github.com/vercel/next.js/issues/89764
            react: {
                version: "19.2",
            },
        },
    },
);

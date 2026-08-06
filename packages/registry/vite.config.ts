import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        emptyOutDir: false,
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: [/^react($|\/)/, /^react-dom($|\/)/],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
            },
        },
    },
});

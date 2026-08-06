import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
        },
        // Declarations are emitted by `tsc -b` (tsconfig.lib.json), so the Vite
        // pass must not wipe them.
        emptyOutDir: false,
    },
});

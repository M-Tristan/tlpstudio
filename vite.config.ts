import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@common": path.resolve(__dirname, "src/common"),
            "@components": path.resolve(__dirname, "src/components"),
        },
    },
});

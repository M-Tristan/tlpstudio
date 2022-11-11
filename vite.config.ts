import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
    base: "./",
    plugins: [vue(), DefineOptions()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@common": path.resolve(__dirname, "src/common"),
            "@components": path.resolve(__dirname, "src/components"),
        },
    },
    server: {
        host: "0.0.0.0",
    },
});

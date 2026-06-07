import { defineConfig } from "@solidjs/start/config";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
    ssr: false,
    server: {
        baseURL: "/",
        preset: "static"
    },
    vite: {
        plugins: [solidSvg()],
    },
});

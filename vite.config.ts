import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

/* eslint-disable @typescript-eslint/naming-convention */

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({ autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},
	css: {
		modules: {
			localsConvention: "dashes",
		},
	},
});

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/* eslint-disable @typescript-eslint/naming-convention */

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@helpers': path.resolve(__dirname, './src/helpers'),
			'@components': path.resolve(__dirname, './src/components'),
		},
	},
	css: {
		modules: {
			localsConvention: 'dashes',
		},
	},
});

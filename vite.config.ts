import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/adapter-auto';

export default defineConfig({
	plugins: [
		svelte({
			adapter: svelte()
		})
	],
});
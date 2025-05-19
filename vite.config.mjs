import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint2'

// https://vitejs.dev/config/
export default defineConfig({
	server: { port: 4000, open: true },
	preview: { port: 4001, open: true },
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.vue'],
			exclude: ['node_modules', 'dist'],
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use '@/styles/global.scss' as *;`,
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
		extensions: ['.js', '.json', '.mjs', '.vue', '.svg', '.scss'],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return path
							.dirname(id)
							.split('node_modules/')[1]
							.split('/')[0]
					}
				},
			},
		},
	},
})

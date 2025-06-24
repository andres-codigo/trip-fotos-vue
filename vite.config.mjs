import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'path'
import fs from 'fs'

import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint2'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getHttpsConfig = () => {
	const keyPath = './certs/localhost.key'
	const certPath = './certs/localhost.crt'
	if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
		return {
			key: fs.readFileSync(keyPath),
			cert: fs.readFileSync(certPath),
		}
	}
	return undefined
}

// Checks if Cypress is running to conditionally set HTTPS config
// If Cypress is not running, it will use the HTTPS configuration if available, otherwise it will fall back to HTTP.
const isCypress = !!process.env.CYPRESS
const httpsConfig = !isCypress ? getHttpsConfig() : undefined

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 4000,
		open: process.env.VITE_OPEN === 'true',
		https: httpsConfig,
	},
	preview: { port: 4001, open: true, https: httpsConfig },
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
		alias: {
			'@': resolve(__dirname, 'src'),
		},
		extensions: ['.js', '.json', '.mjs', '.vue', '.svg', '.scss'],
	},
	optimizeDeps: {
		force: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					const chunkMap = [
						{ test: /firebase\/auth/, name: 'firebase-auth' },
						{
							test: /firebase\/firestore/,
							name: 'firebase-firestore',
						},
						{ test: /firebase\/storage/, name: 'firebase-storage' },
						{ test: /firebase/, name: 'firebase-core' },
						{ test: /vue-router/, name: 'vue-router' },
						{ test: /vuex/, name: 'vuex' },
						{ test: /vuefire/, name: 'vuefire' },
						{ test: /vue-lazyload/, name: 'vue-lazyload' },
						{ test: /vue-multiselect/, name: 'vue-multiselect' },
						{ test: /moment/, name: 'moment' },
						{ test: /@vercel\/analytics/, name: 'analytics' },
						{
							test: /@vercel\/speed-insights/,
							name: 'speed-insights',
						},
						{
							test: /browser-image-compression/,
							name: 'image-compression',
						},
						{ test: /vue/, name: 'vue' },
					]
					if (id.includes('node_modules')) {
						for (const { test, name } of chunkMap) {
							if (test.test(id)) return name
						}
					}
				},
			},
		},
	},
})

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
					if (id.includes('node_modules')) {
						if (id.includes('firebase')) {
							if (id.includes('firebase/auth'))
								return 'firebase-auth'
							if (id.includes('firebase/firestore'))
								return 'firebase-firestore'
							if (id.includes('firebase/storage'))
								return 'firebase-storage'
							return 'firebase-core'
						}
						if (id.includes('vue')) return 'vue'
						if (id.includes('vue-router')) return 'vue-router'
						if (id.includes('vuex')) return 'vuex'
						if (id.includes('vuefire')) return 'vuefire'
						if (id.includes('vue-lazyload')) return 'vue-lazyload'
						if (id.includes('vue-multiselect'))
							return 'vue-multiselect'
						if (id.includes('moment')) return 'moment'
						if (id.includes('@vercel/analytics')) return 'analytics'
						if (id.includes('@vercel/speed-insights'))
							return 'speed-insights'
						if (id.includes('browser-image-compression'))
							return 'image-compression'
					}
				},
			},
		},
	},
})

import { defineConfig } from 'cypress'

import { APIConstants } from './src/constants/api.js'
import { PATHS } from './src/constants/paths.js'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4000',
		env: {
			// ENVIRONMENT VARIABLES
			FIREBASE_AUTH_URL: process.env.VITE_API_URL,
			FIREBASE_API_KEY: process.env.VITE_API_KEY,
			VITE_DATABASE_URL: process.env.VITE_BACKEND_BASE_URL,
			USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
			USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,
			// PATHS
			ROOT_URL: PATHS.HOME,
			AUTH_URL: PATHS.AUTHENTICATION,
			TRIPS_URL: PATHS.TRIPS,
			REGISTER_URL: PATHS.REGISTER,
			MESSAGES_URL: PATHS.MESSAGES,
			// API
			HTTP_METHOD_GET: APIConstants.GET,
			HTTP_METHOD_POST: APIConstants.POST,
			HTTP_METHOD_PUT: APIConstants.PUT,
			HTTP_METHOD_DELETE: APIConstants.DELETE,
		},
	},

	component: {
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
	},
})

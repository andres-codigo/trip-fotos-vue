import { defineConfig } from 'cypress'

import { APIConstants } from './src/constants/api.js'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4000',
		env: {
			FIREBASE_AUTH_URL: process.env.VITE_API_URL,
			FIREBASE_API_KEY: process.env.VITE_API_KEY,
			VITE_DATABASE_URL: process.env.VITE_BACKEND_BASE_URL,
			USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
			USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,
			ROOT_URL: '/',
			AUTH_URL: '/auth',
			TRIPS_URL: '/trips',
			REGISTER_URL: '/register',
			MESSAGES_URL: '/messages',
			HTTP_METHOD_GET: APIConstants.GET,
			HTTP_METHOD_POST: APIConstants.POST,
			HTTP_METHOD_PUT: APIConstants.PUT,
			HTTP_METHOD_DELETE: APIConstants.DELETE,
		},
	},
})

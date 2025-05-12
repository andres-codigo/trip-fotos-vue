import { defineConfig } from 'cypress'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4000',
		env: {
			firebase_auth_url: process.env.VITE_API_URL,
			firebase_api_key: process.env.VITE_API_KEY,
			vite_database_url: process.env.VITE_BACKEND_BASE_URL,
			user_email: process.env.CYPRESS_USER_EMAIL,
			user_password: process.env.CYPRESS_USER_PASSWORD,
			root_url: '/',
			auth_url: '/auth',
			trips_url: '/trips',
			register_url: '/register',
			messages_url: '/messages',
		},
	},
})

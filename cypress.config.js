import { defineConfig } from 'cypress'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		env: {
			auth_url: '/auth',
			trips_url: '/trips',
			register_url: '/register',
			messages_url: '/messages',
			user_email: process.env.CYPRESS_USER_EMAIL,
			user_password: process.env.CYPRESS_USER_PASSWORD,
			vite_database_url: process.env.VITE_BACKEND_BASE_URL,
		},
	},
})

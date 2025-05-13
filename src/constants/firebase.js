import { isNode } from '@/utils/env'

export const FirebaseConstants = Object.freeze({
	API_KEY: isNode()
		? process.env.VITE_FIREBASE_API_KEY
		: import.meta.env.VITE_FIREBASE_API_KEY,
	AUTH_DOMAIN: isNode()
		? process.env.VITE_FIREBASE_AUTH_DOMAIN
		: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	DATABASE_URL: isNode()
		? process.env.VITE_DATABASE_URL
		: import.meta.env.VITE_DATABASE_URL,
	PROJECT_ID: isNode()
		? process.env.VITE_FIREBASE_PROJECT_ID
		: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	STORAGE_BUCKET: isNode()
		? process.env.VITE_FIREBASE_STORAGE_BUCKET
		: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	MESSAGING_SENDER_ID: isNode()
		? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID
		: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	APP_ID: isNode()
		? process.env.VITE_FIREBASE_APP_ID
		: import.meta.env.VITE_FIREBASE_APP_ID,
})

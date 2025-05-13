const isNode = typeof process !== 'undefined' && process.env

export const GlobalConstants = Object.freeze({
	// ADMIN
	ADMIN_ID: isNode
		? process.env.VITE_ADMIN_ID
		: import.meta.env.VITE_ADMIN_ID,

	// DIALOG
	ERROR_DIALOG_TITLE: 'An error occurred',
	AUTHENTICATING_DIALOG_TITLE: 'Authenticating...',

	// IMAGE UPLOAD
	LOADING_IMAGE: 'loading',
})

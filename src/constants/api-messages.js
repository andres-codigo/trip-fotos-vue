export const APIErrorMessageConstants = Object.freeze({
	// GENERAL
	GENERIC_MESSAGE: 'Something went wrong!',
	CATCH_MESSAGE: 'A problem was encountered with the fetch operation.',
	RESPONSE_MESSAGE: 'Request failed with status: ',
	INVALID_PAYLOAD: 'Invalid payload.',

	// AUTHENTICATION
	LOGIN_TYPE_EMAIL_EXISTS: 'EMAIL_EXISTS',
	LOGIN_MESSAGE_EMAIL_EXISTS:
		'The email address is already in use by another account.',
	LOGIN_TYPE_OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
	LOGIN_MESSAGE_OPERATION_NOT_ALLOWED:
		'Password sign-in is disabled for this project.',
	LOGIN_TYPE_TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS_TRY_LATER',
	LOGIN_MESSAGE_TOO_MANY_ATTEMPTS:
		'We have blocked all messages from this device due to unusual activity. Try again later.',
	FAILED_TO_AUTHENTICATE:
		'Failed to authenticate. Check your login credentials.',

	// TRAVELLERS
	REGISTER_TRAVELLER: 'Failed to register traveller.',
	LOAD_TRAVELLER_NAME: 'Failed to load traveller name.',
	LOAD_TRAVELLER: 'Failed to register traveller.',
	DELETE_TRAVELLER: 'Failed to delete traveller.',
	LOAD_TRAVELLERS: 'Failed to load travellers.',

	// MESSAGES
	FETCH_MESSAGES: 'Failed to fetch messages.',
	CONTACT_TRAVELLER: 'Failed to send message.',
})

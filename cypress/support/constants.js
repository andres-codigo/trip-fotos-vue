export const firebase = {
	authUrl: Cypress.env('FIREBASE_AUTH_URL'),
	apiKey: Cypress.env('FIREBASE_API_KEY'),
}

export const user = {
	email: Cypress.env('USER_EMAIL'),
	password: Cypress.env('USER_PASSWORD'),
	validEmail: 'valid@email.com',
	invalidEmail: 'invalid@email',
}

export const baseUrl = Cypress.config('baseUrl')

export const urls = {
	cyAuth: baseUrl + Cypress.env('AUTH_URL'),
	loginRedirectUrl: baseUrl + Cypress.env('TRIPS_URL'),
	logoutRedirectUrl: baseUrl + Cypress.env('AUTH_URL'),
	trips: baseUrl + Cypress.env('TRIPS_URL'),
	messages: baseUrl + Cypress.env('MESSAGES_URL'),
}

export const domAttributeUrls = {
	root: Cypress.env('ROOT_URL'),
	trips: Cypress.env('TRIPS_URL'),
	messages: Cypress.env('MESSAGES_URL'),
}

export const authSelectors = {
	authContainer: '[data-cy="user-authentication"]',
	authEmail: '[data-cy="user-auth-email"]',
	authPassword: '[data-cy="user-auth-password"]',
	authLoginButton: '[data-cy="user-auth-login-button"]',
	authErrorMessageEmail: '[data-cy="user-auth-email-error"]',
	authErrorMessagePassword: '[data-cy="user-auth-password-error"]',
}

export const authErrorMessages = {
	authEmail: 'Please enter a valid email address.',
	authPassword:
		'Your password must be a minimum of 8 characters long! 8 characters left',
}

export const topNavigationSelectors = {
	navHeaderContainer: '[data-cy="nav-header-container"]',
	navHeaderTitleLink: '[data-cy="nav-header-title-link"]',
	navMenuItemMessages: '[data-cy="nav-menu-item-messages"]',
	totalMessages: '[data-cy="total-messages"]',
	navMenuItemAllTravellers: '[data-cy="nav-menu-item-all-travellers"]',
	navMenuItemLogin: '[data-cy="nav-menu-item-login"]',
	navMenuItemLogout: '[data-cy="nav-menu-item-logout"]',
}

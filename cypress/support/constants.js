export const appTestTypes = {
	appTitle: 'Trip Fotos',
	appMessagesButtonText: 'Messages',
	appAllTravellersButtonText: 'All Travellers',
	appLogoutButtonText: 'Logout ',
}

export const user = {
	email: Cypress.env('user_email'),
	password: Cypress.env('user_password'),
	userFirstAndLastName: 'Nick Bond',
	userTotalMessages: 1,
}

export const baseUrl = Cypress.config('baseUrl')

export const urls = {
	cyAuth: baseUrl + Cypress.env('auth_url'),
	loginRedirectUrl: baseUrl + Cypress.env('trips_url'),
	logoutRedirectUrl: baseUrl + Cypress.env('auth_url'),
	trips: baseUrl + Cypress.env('trips_url'),
	messages: baseUrl + Cypress.env('messages_url'),
}

export const domAttributeUrls = {
	root: Cypress.env('root_url'),
	trips: Cypress.env('trips_url'),
	messages: Cypress.env('messages_url'),
}

export const authSelectors = {
	authEmail: '[data-cy="user-auth-email"]',
	authPassword: '[data-cy="user-auth-password"]',
	authLoginButton: '[data-cy="user-auth-login-button"]',
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

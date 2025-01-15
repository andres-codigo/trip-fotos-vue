describe('Trip Fotos logged in interactions', () => {
	let logInUser

	const urls = {
		cyAuth: Cypress.env('auth_url'),
		base: Cypress.env('baseUrl'),
		loginRedirectUrl: Cypress.config('baseUrl') + Cypress.env('trips_url'),
		logoutRedirectUrl: Cypress.config('baseUrl') + Cypress.env('auth_url'),
		trips: Cypress.config('baseUrl') + Cypress.env('trips_url'),
		messages: Cypress.config('baseUrl') + Cypress.env('messages_url'),
	}

	const user = {
		email: Cypress.env('user_email'),
		password: Cypress.env('user_password'),
	}

	const selectors = {
		navHeaderContainer: '[data-cy="nav-header-container"]',
		navHeaderTitleLink: '[data-cy="nav-header-title-link"]',
		navMenuItemMessages: '[data-cy="nav-menu-item-messages"]',
		totalMessages: '[data-cy="total-messages"]',
		navMenuItemAllTravellers: '[data-cy="nav-menu-item-all-travellers"]',
		navMenuItemLogin: '[data-cy="nav-menu-item-login"]',
		navMenuItemLogout: '[data-cy="nav-menu-item-logout"]',
		authEmail: '[data-cy="user-auth-email"]',
		authPassword: '[data-cy="user-auth-password"]',
		authLoginButton: '[data-cy="user-auth-login-button"]',
	}

	beforeEach(() => {
		cy.visit(urls.cyAuth)

		// Aliases
		cy.get(selectors.authEmail).as('userAuthEmail')
		cy.get(selectors.authPassword).as('userAuthPassword')
		cy.get(selectors.authLoginButton).as('userAuthLoginButton')

		// Functions
		logInUser = (email, password) => {
			// Ensure the login elements are present
			cy.get('@userAuthEmail').should('be.visible')
			cy.get('@userAuthPassword').should('be.visible')
			cy.get('@userAuthLoginButton').should('be.visible')

			// Log in the user
			cy.get('@userAuthEmail').find('input').type(email)
			cy.get('@userAuthPassword').find('input').type(password)
			cy.get('@userAuthLoginButton').click()

			// Verify URL after login
			cy.url().should('eq', urls.loginRedirectUrl)
		}
	})

	it.only('Trip Fotos top container displays Messages, All Travellers, and Logout options', () => {
		logInUser(user.email, user.password)

		// Verify the banner is rendered
		cy.get(selectors.navHeaderContainer).should('be.visible')

		// Aliases
		cy.get(selectors.navHeaderTitleLink).as('navHeaderTitleLink')
		cy.get(selectors.navMenuItemMessages).as('navMenuItemMessages')
		cy.get(selectors.navMenuItemAllTravellers).as(
			'navMenuItemAllTravellers',
		)
		cy.get(selectors.navMenuItemLogout).as('navMenuItemLogout')

		// Verify clicking the Messages link redirects to the Messages page
		cy.get('@navMenuItemMessages').click()
		cy.url().should('eq', urls.messages)

		// Verify clicking the Trip Fotos link redirects back to the Home page
		cy.get('@navHeaderTitleLink').click()
		cy.url().then((url) => {
			expect(url).to.equal(urls.trips)
		})

		// Verify clicking the Messages link redirects back to the Messages page
		cy.get('@navMenuItemMessages').click()
		cy.url().should('eq', urls.messages)

		// Verify clicking the All Travellers link redirects to All Travellers page
		cy.get('@navMenuItemAllTravellers').click()
		cy.url().should('eq', urls.trips)

		// Verify clicking the Logout button logs user out and redirects to the Login page
		cy.get('@navMenuItemLogout').click()
		cy.url().should('eq', urls.logoutRedirectUrl)
	})
	it('Displays total messages counter on message button for user', () => {
		logInUser(user.email, user.password)

		cy.get(selectors.totalMessages).as('totalMessages')
		cy.get('@totalMessages')
			.should('have.class', 'total-messages')
			.and('contain.text', '1')
	})
})

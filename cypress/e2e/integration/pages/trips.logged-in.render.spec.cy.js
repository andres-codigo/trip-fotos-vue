describe('Trip Fotos logged in', () => {
	let logInUser

	const urls = {
		cyAuth: Cypress.env('auth_url'),
		root: Cypress.env('root_url'),
		loginRedirectUrl: Cypress.config('baseUrl') + Cypress.env('trips_url'),
		logoutRedirectUrl: Cypress.config('baseUrl') + Cypress.env('auth_url'),
		trips: Cypress.env('trips_url'),
		messages: Cypress.env('messages_url'),
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

	it('Trip Fotos top container displays Messages, All Travellers, and Logout options', () => {
		logInUser(user.email, user.password)

		// Intercept the fetch request
		cy.intercept(
			'GET',
			Cypress.env('vite_database_url') + '/travellers.json',
		).as('fetchData')

		// Visit the page that triggers the fetch request
		cy.visit(urls.trips)

		// Wait for the fetch request to complete
		cy.wait('@fetchData').its('response.statusCode').should('eq', 200)

		// Verify the banner is rendered
		cy.get(selectors.navHeaderContainer).should('be.visible')

		// Aliases
		cy.get(selectors.navHeaderTitleLink).as('navHeaderTitleLink')
		cy.get(selectors.navMenuItemMessages).as('navMenuItemMessages')
		cy.get(selectors.navMenuItemAllTravellers).as(
			'navMenuItemAllTravellers',
		)
		cy.get(selectors.navMenuItemLogout).as('navMenuItemLogout')

		// Verify the banner title is displayed and links to the root URL
		cy.get('@navHeaderTitleLink')
			.should('be.visible')
			.and('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal('Trip Fotos')
				expect($navHeaderTitleLink).to.have.attr('href', urls.root)
			})

		// Verify the Messages link is displayed and links to the messages URL
		cy.get('@navMenuItemMessages')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-messages')
			.find('a')
			.then(($navMenuItemMessages) => {
				expect($navMenuItemMessages.text()).to.include('Messages')
				expect($navMenuItemMessages).to.have.attr('href', urls.messages)
			})

		// Verify the All Travellers link is displayed and links to the trips URL
		cy.get('@navMenuItemAllTravellers')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-all-travellers')
			.find('a')
			.then(($navMenuItemAllTravellers) => {
				expect($navMenuItemAllTravellers.text()).to.equal(
					'All Travellers',
				)
				expect($navMenuItemAllTravellers).to.have.attr(
					'href',
					urls.trips,
				)
			})

		// Verify the Logout button is displayed and contains the user's name
		cy.get('@navMenuItemLogout')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-logout')
			.find('button')
			.should('contain.text', 'Logout Nick Bond')
	})
	it('Displays total messages counter on message button for user', () => {
		logInUser(user.email, user.password)

		cy.get(selectors.totalMessages).as('totalMessages')
		cy.get('@totalMessages')
			.should('have.class', 'total-messages')
			.and('contain.text', '1')
	})
})

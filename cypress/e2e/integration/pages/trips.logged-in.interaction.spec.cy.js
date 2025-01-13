describe('Trip Fotos logged in', () => {
	let logInUser

	const urls = {
		cyAuth: Cypress.env('auth_url'),
		trips: Cypress.config('baseUrl') + Cypress.env('trips_url'),
	}

	const user = {
		email: Cypress.env('user_email'),
		password: Cypress.env('user_password'),
	}

	const selectors = {
		navHeaderContainer: '[data-cy="nav-header-container"]',
		navHeaderTitle: '[data-cy="nav-header-title"]',
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
			cy.get('@userAuthEmail').find('input').type(email)
			cy.get('@userAuthPassword').find('input').type(password)
			cy.get('@userAuthLoginButton').click()

			// Verify URL after login
			cy.url().should('eq', urls.trips)
		}
	})

	it('Trip Fotos top container displays correct user options', () => {
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

		cy.get(selectors.navHeaderTitle).as('navHeaderTitle')

		cy.get('@navHeaderTitle')
			.should('have.class', 'nav-header')
			.find('a')
			.then(($navHeaderTitle) => {
				expect($navHeaderTitle.text()).to.equal('Trip Fotos')
			})
	})
})

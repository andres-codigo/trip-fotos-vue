describe('Trip Fotos user auth page > not logged in', () => {
	const urls = {
		cyAuth: Cypress.env('auth_url'),
		trips: Cypress.config('baseUrl') + Cypress.env('trips_url'),
	}

	const selectors = {
		navHeaderTitleLink: '[data-cy="nav-header-title-link"]',
		authEmail: '[data-cy="user-auth-email"]',
		authPassword: '[data-cy="user-auth-password"]',
		loginButton: '[data-cy="user-auth-login-button"]',
	}

	const labels = {
		email: 'E-Mail',
		password: 'Password',
		login: 'Login',
	}

	beforeEach(() => {
		cy.visit(urls.cyAuth)
	})

	it('Render banner', () => {
		cy.get(selectors.navHeaderTitleLink).as('navHeaderTitleLink')

		cy.get('@navHeaderTitleLink')
			.should('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal('Trip Fotos')
			})
	})

	it('Render login form', () => {
		cy.get('.user-authentication').as('userAuthentication')

		cy.get('@userAuthentication')
			.find(selectors.authEmail)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', labels.email)

		cy.get('@userAuthentication')
			.find(selectors.authPassword)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', labels.password)

		cy.get('@userAuthentication')
			.find(selectors.loginButton)
			.invoke('text')
			.should('equal', labels.login)
	})
})

import {
	urls,
	user,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('User Logged in and redirected to home page interactions tests ', () => {
	let logInUser

	beforeEach(() => {
		cy.visit(urls.cyAuth)

		// Aliases
		cy.get(authSelectors.authEmail).as('userAuthEmail')
		cy.get(authSelectors.authPassword).as('userAuthPassword')
		cy.get(authSelectors.authLoginButton).as('userAuthLoginButton')

		// Functions
		logInUser = (email, password) => {
			// Login elements are present
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

	it('Top navigation displays Title, Messages, All Travellers, and Logout options', () => {
		logInUser(user.email, user.password)

		// Aliases
		cy.get(topNavigationSelectors.navHeaderTitleLink).as(
			'navHeaderTitleLink',
		)
		cy.get(topNavigationSelectors.navMenuItemMessages).as(
			'navMenuItemMessages',
		)
		cy.get(topNavigationSelectors.navMenuItemAllTravellers).as(
			'navMenuItemAllTravellers',
		)
		cy.get(topNavigationSelectors.navMenuItemLogout).as('navMenuItemLogout')

		// Verify clicking the Messages link redirects to the Messages page
		cy.get('@navMenuItemMessages').click()
		cy.url().should('eq', urls.messages)

		// Verify clicking the Trip Fotos title link redirects back to the Home page
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

		// Verify clicking the Logout button logsthe user out and redirects to the Login page
		cy.get('@navMenuItemLogout').click()
		cy.url().should('eq', urls.logoutRedirectUrl)
	})
	it('Displays total messages counter on Messages button', () => {
		logInUser(user.email, user.password)

		cy.get(topNavigationSelectors.totalMessages).as('totalMessages')
		cy.get('@totalMessages')
			.should('have.class', 'total-messages')
			.and('contain.text', user.userTotalMessages)
	})
})

import {
	user,
	urls,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('User Login and Home Page Redirection Interaction Tests', () => {
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

	it('The top navigation displays the Title, Messages, Travelers, and Logout options, and user is able to interact with each option', () => {
		logInUser(user.email, user.password)

		// Aliases
		cy.get(topNavigationSelectors.navHeaderTitleLink).as(
			'navHeaderTitleLink',
		)
		cy.get(topNavigationSelectors.navMenuItemMessages).as(
			'navMenuItemMessages',
		)
		cy.get(topNavigationSelectors.navMenuItemTravellers).as(
			'navMenuItemTravellers',
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

		// Verify clicking the Travellers link redirects to Travellers page
		cy.get('@navMenuItemTravellers').click()
		cy.url().should('eq', urls.trips)

		// Verify clicking the Logout button logs the user out and redirects to the Login page
		cy.get('@navMenuItemLogout').click()
		cy.url().should('eq', urls.logoutRedirectUrl)
	})
})

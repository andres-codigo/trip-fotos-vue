import {
	urls,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('Desktop > User Login Render Tests', () => {
	beforeEach(() => {
		cy.visit(urls.cyAuth)
	})

	it('The top navigation container displays the app title as a link', () => {
		cy.get(topNavigationSelectors.navHeaderTitleLink).as(
			'navHeaderTitleLink',
		)

		cy.get('@navHeaderTitleLink')
			.should('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal(' Trip Fotos ')
			})
	})

	it('The login form is displayed', () => {
		cy.get('.user-authentication').as('userAuthentication')

		cy.get('@userAuthentication')
			.find(authSelectors.authEmail)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', 'E-Mail')

		cy.get('@userAuthentication')
			.find(authSelectors.authPassword)
			.should('have.class', 'form-control')
			.find('label')
			.invoke('text')
			.should('equal', 'Password')

		cy.get('@userAuthentication')
			.find(authSelectors.authLoginButton)
			.invoke('text')
			.should('equal', 'Login')
	})
})

describe('Mobile/Tablet > User Login Render Tests', () => {
	beforeEach(() => {
		cy.visit(urls.cyAuth)
	})
	it('The hamburger menu should not be displayed when the screen width is less than 768px and the user is not logged in', () => {
		cy.viewport(767, 667)

		cy.window().then((win) => {
			const clientWidth = win.document.documentElement.clientWidth
			expect(clientWidth).to.be.lessThan(768)
		})

		// Hamburger menu should not be visible
		cy.get('.hamburger').should('not.be.visible')
	})
})

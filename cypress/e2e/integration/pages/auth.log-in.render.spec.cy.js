import {
	urls,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('User Login Render Tests', () => {
	beforeEach(() => {
		cy.visit(urls.cyAuth)
	})

	it('The top navigation container displays the Application Title as a link', () => {
		cy.get(topNavigationSelectors.navHeaderTitleLink).as(
			'navHeaderTitleLink',
		)

		cy.get('@navHeaderTitleLink')
			.should('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal('Trip Fotos')
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

import {
	appTestTypes,
	user,
	urls,
	domAttributeUrls,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('User Logged in and redirected to home page render tests', () => {
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

	it('Trip Fotos top container displays Messages, All Travellers, and Logout options', () => {
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

		// Verify the banner is rendered
		cy.get(topNavigationSelectors.navHeaderContainer).should('be.visible')

		// Verify the banner title is displayed and links to the root URL
		cy.get('@navHeaderTitleLink')
			.should('be.visible')
			.and('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal(
					appTestTypes.appTitle,
				)
				expect($navHeaderTitleLink).to.have.attr(
					'href',
					domAttributeUrls.root,
				)
			})

		// Verify the Messages link is displayed and links to the messages URL
		cy.get('@navMenuItemMessages')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-messages')
			.find('a')
			.then(($navMenuItemMessages) => {
				expect($navMenuItemMessages.text()).to.include(
					appTestTypes.appMessagesButtonText,
				)
				expect($navMenuItemMessages).to.have.attr(
					'href',
					domAttributeUrls.messages,
				)
			})

		// Verify the All Travellers link is displayed and links to the trips URL
		cy.get('@navMenuItemAllTravellers')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-all-travellers')
			.find('a')
			.then(($navMenuItemAllTravellers) => {
				expect($navMenuItemAllTravellers.text()).to.equal(
					appTestTypes.appAllTravellersButtonText,
				)
				expect($navMenuItemAllTravellers).to.have.attr(
					'href',
					domAttributeUrls.trips,
				)
			})

		// Verify the Logout button is displayed and contains the user's name
		cy.get('@navMenuItemLogout')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-logout')
			.find('button')
			.should(
				'contain.text',
				appTestTypes.appLogoutButtonText + user.userFirstAndLastName,
			)
	})
	it('Displays total messages counter on message button for user', () => {
		logInUser(user.email, user.password)

		cy.get(topNavigationSelectors.totalMessages).as('totalMessages')
		cy.get('@totalMessages')
			.should('have.class', 'total-messages')
			.and('contain.text', user.userTotalMessages)
	})
})

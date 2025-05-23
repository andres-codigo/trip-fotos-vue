import {
	user,
	urls,
	domAttributeUrls,
	authSelectors,
	topNavigationSelectors,
} from '../../../support/constants'

describe('User Login and Home Page Redirection Render Tests', () => {
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

	it('The top navigation container displays the Messages, Travelers, and Logout options', () => {
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

		// Verify the banner is rendered
		cy.get(topNavigationSelectors.navHeaderContainer).should('be.visible')

		// Verify the banner title is displayed, has the right class, and links to the root URL
		cy.get('@navHeaderTitleLink')
			.should('be.visible')
			.and('have.class', 'nav-header-title-link')
			.find('a')
			.then(($navHeaderTitleLink) => {
				expect($navHeaderTitleLink.text()).to.equal(' Trip Fotos ')
				expect($navHeaderTitleLink).to.have.attr(
					'href',
					domAttributeUrls.root,
				)
			})

		// Verify the Messages link is displayed, has the right class, and links to the messages URL
		cy.get('@navMenuItemMessages')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-messages')
			.find('a')
			.then(($navMenuItemMessages) => {
				expect($navMenuItemMessages.text()).to.include('Messages')
				expect($navMenuItemMessages).to.have.attr(
					'href',
					domAttributeUrls.messages,
				)
			})

		// Verify the Travellers link is displayed, has the right class, and links to the trips URL
		cy.get('@navMenuItemTravellers')
			.should('be.visible')
			.and('have.class', 'nav-menu-item-travellers')
			.find('a')
			.then(($navMenuItemTravellers) => {
				expect($navMenuItemTravellers.text()).to.equal(' Travellers ')
				expect($navMenuItemTravellers).to.have.attr(
					'href',
					domAttributeUrls.trips,
				)
			})

		cy.window().then((window) => {
			// Get the travellers name from the window store
			let travellerName =
				window.$store.getters['travellers/travellerName']

			// Verify the Logout button is displayed , has the right class, and contains the travellers name
			cy.get('@navMenuItemLogout')
				.should('be.visible')
				.and('have.class', 'nav-menu-item-logout')
				.find('button')
				.should('contain.text', 'Logout ' + travellerName.toString())
		})
	})
	it('Displays the total message count on the Messages button', () => {
		logInUser(user.email, user.password)

		cy.window().then((window) => {
			cy.on('before-update-hook-complete', () => {
				// Get the messages count from the window store
				let messagesCount =
					window.$store.getters['messages/messagesCount']

				// Assert that the total messages element exists, has the right class, and displays the correct count
				cy.get(topNavigationSelectors.totalMessages)
					.should('have.class', 'total-messages')
					.and('contain.text', messagesCount.toString())
			})
		})
	})
})

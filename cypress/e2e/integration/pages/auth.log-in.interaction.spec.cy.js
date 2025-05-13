import {
	firebase,
	httpMethods,
	user,
	urls,
	authSelectors,
	authErrorMessages,
} from '../../../support/constants'

describe('User Login Interaction Tests', () => {
	let invalidInputTest

	beforeEach(() => {
		cy.visit(urls.cyAuth)

		// Aliases
		cy.get(authSelectors.authContainer).as('userAuthenticationContainer')
		cy.get(authSelectors.authEmail).as('userAuthEmail')
		cy.get(authSelectors.authPassword).as('userAuthPassword')
		cy.get(authSelectors.authLoginButton).as('userAuthLoginButton')

		// Functions
		invalidInputTest = (alias, errorMessageText, type) => {
			cy.get(alias)
				.should('have.class', 'form-control')
				.and('have.class', 'invalid')
				.find(type)
				.should('contain.text', errorMessageText)
		}
	})

	it('Displays an email error message when the input is empty', () => {
		cy.get('@userAuthEmail').find('input').focus().blur()
		invalidInputTest(
			'@userAuthEmail',
			authErrorMessages.authEmail,
			authSelectors.authErrorMessageEmail,
		)
	})

	it('Displays an email error message when the email is invalid', () => {
		cy.get('@userAuthEmail').find('input').type(user.invalidEmail)
		invalidInputTest(
			'@userAuthEmail',
			authErrorMessages.authEmail,
			authSelectors.authErrorMessageEmail,
		)
	})

	it('Displays no email error message when the email entered becomes valid', () => {
		cy.get('@userAuthEmail').find('input').type(user.validEmail)

		cy.get('@userAuthEmail')
			.should('have.class', 'form-control')
			.and('not.have.class', 'invalid')
			.find(authSelectors.authErrorMessageEmail)
			.should('not.exist')
	})

	it('Displays a password error message when the input is empty.', () => {
		cy.get('@userAuthPassword').find('input').focus().blur()
		invalidInputTest(
			'@userAuthPassword',
			authErrorMessages.authPassword,
			authSelectors.authErrorMessagePassword,
		)
	})

	it('Displays and counts down the remaining characters needed to meet the minimum password length requirement in the error message', () => {
		const minLength = 8
		const password = '12345678'

		cy.get('@userAuthPassword').find('input').focus().blur()

		cy.get(authSelectors.authErrorMessagePassword).should(
			'contain.text',
			`Your password must be a minimum of ${minLength} characters long! ${minLength} characters left.`,
		)

		for (let i = 0; i < password.length; i++) {
			cy.get('@userAuthPassword').find('input').type(password[i])
			const remainingChars = minLength - (i + 1)

			if (remainingChars > 0) {
				cy.get(authSelectors.authErrorMessagePassword).should(
					'contain.text',
					`Your password must be a minimum of ${minLength} characters long! ${remainingChars} characters left.`,
				)
			} else {
				cy.get(authSelectors.authErrorMessagePassword).should(
					'not.exist',
				)
			}
		}
	})

	it('Displays error messages for email and password when the inputs are empty and the login button is clicked', () => {
		cy.get('@userAuthLoginButton').click()
		invalidInputTest(
			'@userAuthEmail',
			authErrorMessages.authEmail,
			authSelectors.authErrorMessageEmail,
		)
		invalidInputTest(
			'@userAuthPassword',
			authErrorMessages.authPassword,
			authSelectors.authErrorMessagePassword,
		)
	})

	it('Displays the home page when valid email and password are entered and the login button is clicked', () => {
		cy.intercept(
			httpMethods.POST,
			`${firebase.authUrl}signInWithPassword?key=${firebase.apiKey}`,
		).as('userAuthLogin')

		cy.get('@userAuthEmail').find('input').type(user.email)
		cy.get('@userAuthPassword').find('input').type(user.password)
		cy.get('@userAuthLoginButton').click()

		cy.wait('@userAuthLogin')

		cy.url().should('eq', urls.trips)
	})
})

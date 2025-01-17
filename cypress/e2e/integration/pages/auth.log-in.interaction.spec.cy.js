import {
	urls,
	user,
	authSelectors,
	authErrorMessages,
} from '../../../support/constants'

describe('Trip Fotos user auth page > not logged in', () => {
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

	it('displays email error message when input is empty', () => {
		cy.get('@userAuthEmail').find('input').focus().blur()
		invalidInputTest(
			'@userAuthEmail',
			authErrorMessages.authEmail,
			authSelectors.authErrorMessageEmail,
		)
	})

	it('displays email error message when email is invalid', () => {
		cy.get('@userAuthEmail').find('input').type(user.invalidEmail)
		invalidInputTest(
			'@userAuthEmail',
			authErrorMessages.authEmail,
			authSelectors.authErrorMessageEmail,
		)
	})

	it('displays no email error message when email typed becomes valid', () => {
		cy.get('@userAuthEmail').find('input').type(user.validEmail)

		cy.get('@userAuthEmail')
			.should('have.class', 'form-control')
			.and('not.have.class', 'invalid')
			.find(authSelectors.authErrorMessageEmail)
			.should('not.exist')
	})

	it('displays password error message when input is empty', () => {
		cy.get('@userAuthPassword').find('input').focus().blur()
		invalidInputTest(
			'@userAuthPassword',
			authErrorMessages.authPassword,
			authSelectors.authErrorMessagePassword,
		)
	})

	it('displays and counts down remaining password characters needed to meet minimum password length requirement in error message', () => {
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

	it('displays email and password error messages when inputs are empty and login button clicked', () => {
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

	it('displays the home page when valid email and password details are entered and login button clicked', () => {
		cy.get('@userAuthEmail').find('input').type(user.email)
		cy.get('@userAuthPassword').find('input').type(user.password)
		cy.get('@userAuthLoginButton').click()

		cy.url().should('eq', urls.trips)
	})
})

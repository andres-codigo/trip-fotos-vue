describe('Trip Fotos user auth page > not logged in', () => {
	let invalidInputTest

	const urls = {
		cyAuth: Cypress.env('auth_url'),
		trips: Cypress.config('baseUrl') + Cypress.env('trips_url'),
	}

	const user = {
		email: Cypress.env('user_email'),
		password: Cypress.env('user_password'),
	}

	const selectors = {
		authContainer: '[data-cy="user-authentication"]',
		authEmail: '[data-cy="user-auth-email"]',
		authPassword: '[data-cy="user-auth-password"]',
		authLoginButton: '[data-cy="user-auth-login-button"]',
		errorMessageEmail: '[data-cy="user-auth-email-error"]',
		errorMessagePassword: '[data-cy="user-auth-password-error"]',
	}

	const errorMessage = {
		email: 'Please enter a valid email address.',
		password:
			'Your password must be a minimum of 8 characters long! 8 characters left',
	}

	beforeEach(() => {
		cy.visit(urls.cyAuth)

		// Aliases
		cy.get(selectors.authContainer).as('userAuthenticationContainer')
		cy.get(selectors.authEmail).as('userAuthEmail')
		cy.get(selectors.authPassword).as('userAuthPassword')
		cy.get(selectors.authLoginButton).as('userAuthLoginButton')

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
			errorMessage.email,
			selectors.errorMessageEmail,
		)
	})

	it('displays email error message when email is invalid', () => {
		cy.get('@userAuthEmail').find('input').type('invalid@email')
		invalidInputTest(
			'@userAuthEmail',
			errorMessage.email,
			selectors.errorMessageEmail,
		)
	})

	it('displays no email error message when email typed becomes valid', () => {
		const validEmail = 'valid@email.com'
		cy.get('@userAuthEmail').find('input').type(validEmail)

		cy.get('@userAuthEmail')
			.should('have.class', 'form-control')
			.and('not.have.class', 'invalid')
			.find(selectors.errorMessageEmail)
			.should('not.exist')
	})

	it('displays password error message when input is empty', () => {
		cy.get('@userAuthPassword').find('input').focus().blur()
		invalidInputTest(
			'@userAuthPassword',
			errorMessage.password,
			selectors.errorMessagePassword,
		)
	})

	it('displays and counts down remaining password characters needed to meet minimum password length requirement in error message', () => {
		const minLength = 8
		const password = '12345678'

		cy.get('@userAuthPassword').find('input').focus().blur()

		cy.get(selectors.errorMessagePassword).should(
			'contain.text',
			`Your password must be a minimum of ${minLength} characters long! ${minLength} characters left.`,
		)

		for (let i = 0; i < password.length; i++) {
			cy.get('@userAuthPassword').find('input').type(password[i])
			const remainingChars = minLength - (i + 1)

			if (remainingChars > 0) {
				cy.get(selectors.errorMessagePassword).should(
					'contain.text',
					`Your password must be a minimum of ${minLength} characters long! ${remainingChars} characters left.`,
				)
			} else {
				cy.get(selectors.errorMessagePassword).should('not.exist')
			}
		}
	})

	it('displays email and password error messages when inputs are empty and login button clicked', () => {
		cy.get('@userAuthLoginButton').click()
		invalidInputTest(
			'@userAuthEmail',
			errorMessage.email,
			selectors.errorMessageEmail,
		)
		invalidInputTest(
			'@userAuthPassword',
			errorMessage.password,
			selectors.errorMessagePassword,
		)
	})

	it('displays the home page when valid email and password details are entered and login button clicked', () => {
		cy.get('@userAuthEmail').find('input').type(user.email)
		cy.get('@userAuthPassword').find('input').type(user.password)
		cy.get('@userAuthLoginButton').click()

		cy.url().should('eq', urls.trips)
	})
})

<template>
	<section class="user-authentication-container">
		<base-dialog
			:show="!!error"
			:is-error="!!error"
			:title="dialogTitle"
			@close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<form
				autocomplete="on"
				class="user-authentication"
				data-cy="user-authentication"
				@submit.prevent="submitForm">
				<div
					:class="['form-control', { invalid: !email.isValid }]"
					data-cy="user-auth-email">
					<label for="email">{{ email.label }}</label>
					<input
						id="email"
						v-model.trim="email.value"
						:type="email.type"
						@blur="clearValidity('email')" />
					<p v-if="!email.isValid" data-cy="user-auth-email-error">
						{{ email.message }}
					</p>
				</div>
				<div
					:class="['form-control', { invalid: !password.isValid }]"
					data-cy="user-auth-password">
					<label for="password">{{ password.label }}</label>
					<input
						id="password"
						v-model.trim="password.value"
						:type="password.type"
						@blur="clearValidity('password')" />
					<p
						v-if="!password.isValid"
						data-cy="user-auth-password-error">
						{{ password.message }}
					</p>
				</div>
				<base-button data-cy="user-auth-login-button">{{
					submitButtonCaption
				}}</base-button>
				<!-- TODO: Switching temporarily removed -->
				<!-- <base-button
					type="button"
					mode="flat"
					@click="switchAuthMode"
					>{{ switchModeButtonCaption }}</base-button
				> -->
			</form>
		</base-card>
	</section>
</template>

<script>
import { APIConstants } from '@/constants/api'
import { APIErrorMessageConstants } from '@/constants/api-messages'
import { GlobalConstants } from '@/constants/global'

export default {
	data() {
		return {
			test: '',
			email: {
				label: 'E-Mail',
				type: 'email',
				value: '',
				isValid: true,
				message: '',
			},
			password: {
				label: 'Password',
				type: 'password',
				value: '',
				isValid: true,
				message: '',
			},
			message: [],
			formIsValid: true,
			mode: APIConstants.API_AUTH_LOGIN_MODE,
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		submitButtonCaption() {
			if (this.mode === APIConstants.API_AUTH_LOGIN_MODE) {
				return 'Login'
			} else {
				return 'Sign-up'
			}
		},
		switchModeButtonCaption() {
			if (this.mode === APIConstants.API_AUTH_LOGIN_MODE) {
				return 'Sign-up'
			} else {
				return 'Login'
			}
		},
	},
	watch: {
		'email.value'(value) {
			this.email.value = value
			this.validateEmail(value)
		},
		'password.value'(value) {
			this.password.value = value
			this.validatePassword(value)
		},
	},
	methods: {
		validateEmail(value) {
			if (
				/^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}$/.test(
					value,
				)
			) {
				this.email.isValid = true
				this.formIsValid = true
				this.email.message = ''
			} else {
				this.email.isValid = false
				this.formIsValid = false
				this.email.message = 'Please enter a valid email address.'
			}
		},
		validatePassword(value) {
			let difference = 8 - value.length
			if (value.length < 8) {
				this.password.isValid = false
				this.formIsValid = false
				this.password.message =
					'Your password must be a minimum of 8 characters long! ' +
					difference +
					' characters left.'
			} else {
				this.password.isValid = true
				this.formIsValid = true
				this.password.message = ''
			}
		},
		clearValidity(input) {
			if (input === 'email') {
				this.validateEmail(this.email.value)
			} else {
				this.validatePassword(this.password.value)
			}
		},
		validateForm() {
			this.formIsValid = true

			if (this.email.value === '') {
				this.validateEmail(this.email.value)
			}
			if (this.password.value === '') {
				this.validatePassword(this.password.value)
			}
		},
		async submitForm() {
			this.validateForm()

			if (!this.formIsValid) {
				return
			}

			this.isLoading = true

			const actionPayload = {
				email: this.email.value,
				password: this.password.value,
			}

			try {
				if (this.mode === APIConstants.API_AUTH_LOGIN_MODE) {
					await this.$store.dispatch(
						APIConstants.API_AUTH_LOGIN_MODE,
						actionPayload,
					)

					await this.$store.dispatch('travellers/loadTravellers', {
						forceRefresh: true,
					})
				} else {
					await this.$store.dispatch(
						APIConstants.API_AUTH_SIGNUP_MODE,
						actionPayload,
					)
				}

				const redirectUrl =
					'/' + (this.$route.query.redirect || 'trips')
				this.$router.replace(redirectUrl)
			} catch (err) {
				this.error =
					err.message ||
					APIErrorMessageConstants.FAILED_TO_AUTHENTICATE
			}

			this.isLoading = false
		},
		switchAuthMode() {
			if (this.mode === APIConstants.API_AUTH_LOGIN_MODE) {
				this.mode = 'signup'
			} else {
				this.mode = APIConstants.API_AUTH_LOGIN_MODE
			}
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/mixins/mixins';
@use '../../styles/setup/mixins/form/valid/valid';
@use '../../styles/setup/mixins/form/invalid/invalid';

.user-authentication-container {
	display: inline-block;
	padding: 0 20px;
	position: relative;
	top: 80px;
	.user-authentication {
		margin: 1rem;
		padding: 1rem;

		.form-control {
			margin: 0.5rem 0;

			@include valid.input;

			&.invalid {
				p {
					@include invalid.error-message;
				}

				input {
					@include invalid.invalid-border;
				}
			}
		}
	}
}
</style>

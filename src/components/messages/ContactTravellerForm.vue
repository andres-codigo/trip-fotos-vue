<template>
	<base-dialog
		:show="!!error"
		:is-error="!!error"
		title="An error occurred!"
		@close="handleError"
	>
		<p>{{ error }}</p>
	</base-dialog>
	<form
		autocomplete="on"
		@submit.prevent="submitForm"
	>
		<div :class="['form-control', { invalid: !name.isValid }]">
			<label for="name">{{ name.label }}</label>
			<input
				id="name"
				v-model.trim="name.val"
				:type="name.type"
				:disabled="disableField('name', $store.getters.userName)"
				@blur="clearValidity('name')"
			/>
			<p v-if="!name.isValid">Please enter your name.</p>
		</div>
		<div :class="['form-control', { invalid: !email.isValid }]">
			<label for="email">{{ email.label }}</label>
			<input
				id="email"
				v-model.trim="email.val"
				:type="email.type"
				:disabled="disableField('email', $store.getters.userEmail)"
				@blur="clearValidity('email')"
			/>
			<p v-if="!email.isValid">Please enter a valid email address.</p>
		</div>
		<div :class="['form-control', { invalid: !message.isValid }]">
			<label for="message">{{ message.label }}</label>
			<textarea
				id="message"
				v-model.trim="message.val"
				:type="message.type"
				rows="5"
				@blur="clearValidity('message')"
			></textarea>
			<p v-if="!message.isValid">Message must not be empty.</p>
		</div>
		<div class="actions">
			<base-button>Send Message</base-button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			name: {
				label: 'Name',
				type: 'text',
				val: '',
				isValid: true,
			},
			email: {
				label: 'E-Mail',
				type: 'email',
				val: '',
				isValid: true,
			},
			message: {
				label: 'Message',
				type: 'textarea',
				val: '',
				isValid: true,
			},
			formIsValid: true,
			error: null,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		userName() {
			return this.$store.getters.userName
		},
		userEmail() {
			return this.$store.getters.userEmail
		},
	},
	created() {
		if (this.isLoggedIn) {
			this.setUser()
		}
	},
	methods: {
		handleError() {
			this.error = null
		},
		setUser() {
			let userName = this.$store.getters.userName
			let userEmail = this.$store.getters.userEmail

			if (userName && userName.length > 0) {
				this.name.val = userName
			}

			if (userEmail && userEmail.length > 0) {
				this.email.val = userEmail
			}
		},
		disableField(input, getter) {
			if (this.isLoggedIn) {
				if (
					this[input].val &&
					this[input].val.length > 0 &&
					this[input].val === getter
				) {
					return true
				}
			}
			return false
		},
		clearValidity(input) {
			if (
				this[input].val === '' ||
				(this[input].type === 'email' && !this[input].val.includes('@'))
			) {
				this[input].isValid = false
			} else {
				this[input].isValid = true
			}
		},
		validateForm() {
			this.formIsValid = true

			if (this.name.val === '') {
				this.name.isValid = false
				this.formIsValid = false
			}
			if (this.email.val === '') {
				this.email.isValid = false
				this.formIsValid = false
			}
			if (this.message.val === '') {
				this.message.isValid = false
				this.formIsValid = false
			}
		},
		async submitForm() {
			try {
				this.validateForm()

				if (!this.formIsValid) {
					return
				}

				await this.$store
					.dispatch('messages/contactTraveller', {
						name: this.name.val,
						email: this.email.val,
						message: this.message.val,
						travellerId: this.$route.params.id,
					})
					.then(() => {
						this.$router.replace('/trips')
					})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/mixins/form/valid/valid';
@use '../../styles/setup/mixins/form/invalid/invalid';

form {
	.form-control {
		margin: 0.5rem 0;

		@include valid.input-textarea;

		&.invalid {
			p {
				@include invalid.error-message;
			}

			input,
			textarea {
				@include invalid.invalid-border;
			}
		}
	}
	.actions {
		justify-content: center;
		margin: 0 auto;
		text-align: center;
	}
}
</style>

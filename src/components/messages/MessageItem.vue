<template>
	<base-dialog
		:show="!!error"
		:is-error="!!error"
		:title="dialogTitle"
		@close="handleError"
	>
		<p>{{ error }}</p>
	</base-dialog>
	<div
		v-if="isLoading"
		class="spinner-container"
	>
		<base-spinner />
	</div>
	<li
		v-else
		class="message"
	>
		<div class="container">
			<h4>From</h4>
			<p>{{ name }}</p>
		</div>
		<div class="container">
			<h4>Email</h4>
			<p>
				<a :href="emailLink">{{ email }}</a>
			</p>
		</div>
		<div class="container">
			<h4>Message</h4>
			<p>{{ message }}</p>
		</div>
		<div class="actions">
			<base-button
				mode="outline"
				class="actions delete"
				@click="deleteMessage()"
			>
				Delete
			</base-button>
		</div>
	</li>
</template>

<script>
import { StoreMessagesConstants } from '@/constants/store-messages'
import { GlobalConstants } from '@/constants/global'
import { delayLoading } from '@/utils/globalFunctions'

export default {
	props: {
		id: {
			type: String,
			default: null,
		},
		name: {
			type: String,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
		message: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		emailLink() {
			return 'mailto:' + this.email
		},
	},
	methods: {
		async deleteMessage() {
			const numberOfSeconds = 2000
			this.isLoading = true

			const deleteMessage = Promise.resolve(
				this.$store.dispatch('messages/deleteMessage', {
					messageId: this.id,
				}),
			)

			const loadMessages = delayLoading(numberOfSeconds).then(
				this.$store.dispatch('messages/loadMessages'),
			)

			await Promise.all([deleteMessage, loadMessages])
				.then(() => {
					this.isLoading = false
				})
				.catch((error) => {
					this.error =
						error.message || StoreMessagesConstants.GENERIC_MESSAGE
				})
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/variables';
@use '../../styles/setup/mixins/form/valid/valid';
@use '../../styles/setup/mixins/form/invalid/invalid';

.message {
	border: 1px solid variables.$color-tundora;
	border-radius: 12px;
	margin: 1rem 0;
	padding: 1rem;

	.container {
		margin-bottom: 0.75rem;

		h4 {
			margin: 0.25rem 0;
		}

		p {
			margin: 0 0 0.25rem 0;
			a {
				color: variables.$color-pigment-indigo;
				text-decoration: none;
				font-weight: bold;

				&:hover,
				&:active {
					color: variables.$color-fresh-eggplant;
				}
			}
		}
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		&.delete {
			background-color: variables.$color-white;
			@include invalid.error-text;
			@include invalid.invalid-border;
			&:hover {
				background-color: variables.$color-mojo;
				color: variables.$color-white;
			}
		}
	}
}
</style>

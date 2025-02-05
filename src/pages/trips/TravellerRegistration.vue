<template>
	<section class="traveller-registration-container">
		<base-dialog
			:show="!!error"
			:is-error="!!error"
			:title="dialogTitle"
			@close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog
			:show="registeringUser"
			title="Completing registration"
			fixed>
			<p>
				Registering you as a traveller<span v-if="fullName"
					>, {{ fullName }}</span
				>, one moment please as we review and compress your newly
				images.
			</p>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<div>
				<h2>Register as a traveller now!</h2>
				<traveller-form
					@register-traveller="registerTraveller"></traveller-form>
			</div>
		</base-card>
	</section>
</template>

<script>
import { StoreMessagesConstants } from '@/constants/store-messages'
import { GlobalConstants } from '@/constants/global'

import TravellerForm from '@/components/trips/TravellerForm.vue'

export default {
	components: {
		TravellerForm,
	},
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			registeringUser: false,
			fullName: '',
			error: null,
		}
	},
	methods: {
		async registerTraveller(data) {
			this.fullName = data.first + ' ' + data.last
			this.registeringUser = true

			const registerTraveller = Promise.resolve(
				this.$store.dispatch('travellers/registerTraveller', data),
			)

			const setTravellerName = Promise.resolve(
				this.$store.dispatch('travellers/travellerName', data),
			)

			await Promise.all([registerTraveller, setTravellerName])
				.then(() => {
					this.$store.dispatch('travellers/loadTravellers', {
						forceRefresh: true,
					})
				})
				.then(() => {
					this.$router.replace('/trips')
				})
				.catch((error) => {
					this.error =
						error.message || StoreMessagesConstants.GENERIC_MESSAGE
				})
				.finally(() => {
					this.registeringUser = false
				})
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.traveller-registration-container {
	display: inline-block;
	padding: 0 20px;
	position: relative;
	top: 80px;
}
</style>

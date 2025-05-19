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
		:class="[
			'traveller',
			{
				isLoggedInUser: isLoggedInUser(id, $store.getters.userId),
			},
		]"
	>
		<h3 class="name">
			{{ fullName }}
		</h3>
		<p class="registered">
			{{ registeredDate }}
		</p>
		<p class="description">
			{{ shortenedDescription }}
		</p>
		<p class="days"><strong>Days in city:</strong> {{ days }} days</p>
		<div class="badges">
			<base-badge
				v-for="area in areas"
				:key="area"
				:type="area"
				:title="area"
			/>
		</div>
		<div class="images">
			<ul
				v-if="!!files"
				class="images-list"
			>
				<base-image
					v-for="file in files.slice(0, 5)"
					:key="file"
					:url="file"
					:title="fullName"
				/>
				<li
					v-show="files.length > 5"
					class="image-counter"
				>
					<router-link :to="travellerDetailsLink">
						<span> See all {{ files.length }} photos</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="actions">
			<base-button
				v-if="!isLoggedInUser(id, $store.getters.userId) && isTraveller"
				mode="outline"
				link
				:to="travellerContactLink"
			>
				Contact
			</base-button>
			<base-button
				link
				:to="travellerDetailsLink"
			>
				Details
			</base-button>
			<!--
				TODO: 	Added to ease deletion of items during development
						Look to incorporate into working flow dependent on
						extension of sign-up.
			-->
			<base-button
				v-if="
					fullName !== userName && $store.getters.userId === adminId
				"
				mode="outline"
				class="actions delete"
				@click="deleteTraveller()"
			>
				Delete
			</base-button>
		</div>
	</li>
</template>

<script>
import { StoreMessagesConstants } from '@/constants/store-messages'
import { DataConstants } from '@/constants/data'
import { GlobalConstants } from '@/constants/global'
import { PATHS } from '@/constants/paths'

import { formatDate, isLoggedInUser, delayLoading } from '@/utils/global'

export default {
	props: {
		id: {
			type: String,
			default: null,
		},
		firstName: {
			type: String,
			default: null,
		},
		lastName: {
			type: String,
			default: null,
		},
		description: {
			type: String,
			default: null,
		},
		days: {
			type: Number,
			default: null,
		},
		areas: {
			type: Array,
			default: null,
		},
		files: {
			type: Array,
			default: null,
		},
		registered: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			adminId: GlobalConstants.ADMIN_ID,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		registeredDate() {
			return formatDate(this.registered, DataConstants.DD_MMM_YYYY)
		},
		fullName() {
			return this.firstName + ' ' + this.lastName
		},
		shortenedDescription() {
			let description = this.description.substr(0, 250)

			if (description && description.length === 250) {
				return description + '...'
			}
			return description
		},
		travellerContactLink() {
			return this.$route.path + '/' + this.id + PATHS.CONTACT // /trips/c1/contact
		},
		travellerDetailsLink() {
			return this.$route.path + '/' + this.id // /trips/c1
		},
		userName() {
			return this.$store.getters['travellers/travellerName']
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
	},
	methods: {
		formatDate,
		isLoggedInUser,
		async deleteTraveller() {
			this.isLoading = true
			const numberOfSeconds = 2000

			const deleteTraveller = Promise.resolve(
				this.$store.dispatch('travellers/deleteTraveller', {
					travellerId: this.id,
					files: this.files,
				}),
			)

			const loadTravellers = delayLoading(numberOfSeconds).then(
				this.$store.dispatch('travellers/loadTravellers', {
					forceRefresh: true,
				}),
			)

			await Promise.all([deleteTraveller, loadTravellers])
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
@use '../../styles/setup/mixins/mixins';
@use '../../styles/setup/mixins/form/invalid/invalid';

.spinner-container {
	margin: 0.5rem 0;
}

.spinner-container-images {
	height: 146.797px;
	@include mixins.fadeIn(ease, 2s, 1, forwards);
}

.traveller {
	border: 1px solid variables.$color-tundora;
	border-radius: 12px;
	margin: 1rem 0;
	padding: 1rem;

	.registered {
		font-size: 0.75rem;
		display: inline;
	}
	.name {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0;
	}

	.description {
		font-style: italic;
	}
	.badges {
		padding: 0.25rem 0 0.5rem 0;
	}

	.images {
		.images-list {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			padding: 0;

			@include mixins.fadeIn(ease, 2s, 1, forwards);

			.image-counter {
				@include mixins.background-opacity(
					variables.$color-ripe-eggplant,
					0.75
				);
				color: variables.$color-white;
				margin: 1rem 2.5%;
				overflow: hidden;
				position: relative;
				width: 28%;
				a {
					span {
						align-items: center;
						color: variables.$color-white;
						display: flex;
						height: 100%;
						justify-content: center;
						padding: 20px;
						text-align: center;
					}
				}
			}
		}
	}

	.actions {
		display: flex;
		margin-right: 11px;
		justify-content: flex-end;
		&.delete {
			background-color: variables.$color-mojo;
			color: variables.$color-white;
			@include invalid.invalid-border;
			&:hover {
				background-color: variables.$color-mojo-otro;
				color: variables.$color-white;
			}
		}
	}
}

@media only screen and (max-width: 480px) {
	.traveller {
		.images {
			.images-list {
				margin-bottom: 15px;
				.image-counter {
					margin: 0.5rem 2.5%;
					width: 45%;
				}
			}
		}
		.actions {
			margin-right: 0;
		}
	}
}
</style>

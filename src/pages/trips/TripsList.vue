<template>
	<section class="page-section traveller-list-container">
		<base-dialog
			:show="!!error"
			:is-error="!!error"
			title="An error occurred!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<trip-filter @change-filter="setFilters" />
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button
						:mode="
							(!hasTravellers && !isLoading) ||
							(filteredTravellers &&
								filteredTravellers.length === 0)
								? 'disabled'
								: 'outline'
						"
						:disabled="!isLoading && !hasTravellers ? true : false"
						:class="{ hide: !hasTravellers && !isLoading }"
						@click="loadTravellers(true)"
					>
						Refresh
					</base-button>
					<base-button
						v-if="isLoggedIn && !isTraveller && !isLoading"
						link
						:to="PATHS.REGISTER"
					>
						Register as a Traveller
					</base-button>
				</div>
				<div
					v-if="isLoading"
					class="spinner-container"
				>
					<base-spinner />
				</div>
				<ul
					v-else-if="!isLoading && hasTravellers"
					class="travellers"
				>
					<trip-item
						v-for="traveller in filteredTravellers"
						:id="traveller.id"
						:key="traveller.id"
						:first-name="traveller.firstName"
						:last-name="traveller.lastName"
						:description="traveller.description"
						:days="traveller.daysInCity"
						:areas="traveller.areas"
						:files="traveller.files"
						:registered="traveller.registered"
					/>
				</ul>
				<div
					v-if="!isLoading && !hasTravellers"
					class="no-travellers-container"
				>
					<h3>No travellers listed.</h3>
				</div>
			</base-card>
		</section>
	</section>
</template>

<script>
import TripItem from '@/components/trips/TripItem.vue'
import TripFilter from '@/components/trips/TripFilter.vue'
import { PATHS } from '@/constants/paths.js'

export default {
	components: {
		TripItem,
		TripFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				tokyo: {
					isActive: true,
				},
				prague: {
					isActive: true,
				},
				sydney: {
					isActive: true,
				},
				canberra: {
					isActive: true,
				},
			},
			PATHS,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
		travellers() {
			return this.$store.getters['travellers/travellers']
		},
		filteredTravellers() {
			const travellers = this.travellers

			return travellers.filter((traveller) => {
				if (
					this.activeFilters.tokyo.isActive &&
					traveller.areas.includes('tokyo')
				) {
					return true
				}
				if (
					this.activeFilters.prague.isActive &&
					traveller.areas.includes('prague')
				) {
					return true
				}
				if (
					this.activeFilters.sydney.isActive &&
					traveller.areas.includes('sydney')
				) {
					return true
				}
				if (
					this.activeFilters.canberra.isActive &&
					traveller.areas.includes('canberra')
				) {
					return true
				}
				return false
			})
		},
		hasTravellers() {
			return this.$store.getters['travellers/hasTravellers']
		},
	},
	created() {
		if (Array.isArray(this.travellers) && this.travellers.length === 0) {
			this.loadTravellers()
		}
	},
	methods: {
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters
		},
		async loadTravellers(refresh = false) {
			try {
				this.isLoading = true
				await this.$store
					.dispatch('travellers/loadTravellers', {
						forceRefresh: refresh,
					})
					.then(() => {
						this.isLoading = false
					})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.traveller-list-container {
	.controls {
		display: flex;
		justify-content: space-between;
		.hide {
			display: none;
		}
	}
	h3 {
		text-align: center;
	}

	.spinner-container,
	.no-travellers-container {
		margin: 5rem 0;
		min-height: 60px;
	}

	.no-travellers-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.travellers {
		list-style: none;
		margin: 0;
		padding: 0;
	}
}

@media only screen and (max-width: 768px) {
	.traveller-list-container {
		display: inline-block;
	}
}
</style>

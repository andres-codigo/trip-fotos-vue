<template>
	<section class="traveller-detail-container">
		<section>
			<base-card
				:class="{
					isLoggedInUser: isLoggedInUser(id, $store.getters.userId),
				}"
			>
				<div
					v-if="isLoading"
					class="spinner-container"
				>
					<base-spinner />
				</div>
				<div v-else>
					<h2>{{ fullName }}</h2>
					<p>{{ selectedTraveller.description }}</p>
					<p class="days">
						<strong>Days in city:</strong>
						{{ selectedTraveller.daysInCity }} days
					</p>
					<div>
						<base-badge
							v-for="area in selectedTraveller.areas"
							:key="area"
							:type="area"
							:title="area"
						/>
					</div>
				</div>
			</base-card>
		</section>
		<section
			:class="
				isNotLoggedIn || isLoggedInUser(id, $store.getters.userId)
					? 'hide'
					: 'show'
			"
		>
			<base-card
				:class="{
					isLoggedInUser: isLoggedInUser(id, $store.getters.userId),
				}"
			>
				<div
					v-if="isLoading"
					class="spinner-container"
				>
					<base-spinner />
				</div>
				<header v-else>
					<h2>Send {{ selectedTraveller.firstName }} a message</h2>
					<base-button
						v-if="$route.name !== 'contact-traveller'"
						link
						:to="contactLink"
					>
						Contact
					</base-button>
				</header>
				<router-view />
			</base-card>
		</section>
		<section v-if="!!selectedTraveller.files">
			<base-card
				:class="{
					isLoggedInUser: isLoggedInUser(id, $store.getters.userId),
				}"
			>
				<div
					v-if="isLoading"
					class="spinner-container"
				>
					<base-spinner />
				</div>
				<div
					v-else
					class="images"
				>
					<ul
						v-show="!!selectedTraveller.files"
						class="images-list"
					>
						<base-image
							v-for="file in selectedTraveller.files"
							:key="file"
							:url="file"
							:title="fullName"
						/>
					</ul>
				</div>
			</base-card>
		</section>
	</section>
</template>

<script>
import { isLoggedInUser } from '@/utils/global'
import { PATHS } from '@/constants/paths'

export default {
	props: {
		id: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			isNotLoggedIn: true,
			isLoading: false,
			selectedTraveller: {},
			error: '',
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		fullName() {
			return (
				this.selectedTraveller.firstName +
				' ' +
				this.selectedTraveller.lastName
			)
		},
		contactLink() {
			return this.$route.path + PATHS.CONTACT
		},
		traveller() {
			return this.$store.getters['travellers/traveller']
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
	},
	watch: {
		traveller(details) {
			this.selectedTraveller = details
		},
	},
	created() {
		if (this.isLoggedIn) {
			this.isNotLoggedIn = false
		}
		this.loadTraveller()
	},
	methods: {
		isLoggedInUser,
		async loadTraveller() {
			this.isLoading = true
			try {
				await this.$store.dispatch('travellers/loadTraveller', {
					travellerId: this.id,
				})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
			this.isLoading = false
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/mixins/mixins';

.traveller-detail-container {
	display: inline-block;
	padding: 0 20px;
	position: relative;
	top: 80px;
	.hide {
		display: none;
	}
	.show {
		display: block;
	}

	.spinner-container-images {
		height: 146.797px;
		@include mixins.fadeIn(ease, 2s, 1, forwards);
	}

	.images {
		.images-list {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			padding: 0;

			@include mixins.fadeIn(ease, 2s, 1, forwards);
		}
	}
}

@media only screen and (max-width: 768px) {
	.traveller-detail-container {
		display: inline-block;
	}
}
</style>

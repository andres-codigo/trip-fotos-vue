<template>
	<header
		class="header"
		data-cy="nav-header-container"
	>
		<nav class="navbar">
			<h1
				class="nav-header-title-link"
				data-cy="nav-header-title-link"
			>
				<router-link :to="{ name: 'trips-root' }">
					Trip Fotos
				</router-link>
			</h1>
			<ul
				v-click-outside="closeHamburgerMenu"
				class="nav-menu-items-container"
				data-cy="nav-menu-items-container"
			>
				<li
					v-if="isLoggedIn"
					class="nav-menu-item"
				>
					<ul>
						<li
							v-if="isTraveller"
							class="nav-menu-item-messages"
							data-cy="nav-menu-item-messages"
							@click.prevent="toggleHamburgerMenuActiveClass()"
						>
							<router-link
								:to="{ name: 'messages' }"
								class="nav-link"
							>
								Messages
								<span
									v-if="!!totalMessages && totalMessages > 0"
									class="total-messages-container"
									><span
										class="total-messages"
										data-cy="total-messages"
										>{{ totalMessages }}</span
									></span
								>
							</router-link>
						</li>
						<li
							class="nav-menu-item-travellers"
							data-cy="nav-menu-item-travellers"
							@click.prevent="toggleHamburgerMenuActiveClass()"
						>
							<router-link
								:to="{ name: 'trips-list' }"
								class="nav-link"
							>
								Travellers
							</router-link>
						</li>
					</ul>
				</li>
				<!-- <li
					v-if="!isLoggedIn"
					class="nav-menu-item nav-menu-item-login"
					data-cy="nav-menu-item-login"
					@click.prevent="toggleHamburgerMenuActiveClass()"
				>
					<router-link
						:to="{name" 'auth'}"
						class="nav-link"
						data-cy="nav-login-link"
						>Login</router-link
					>
				</li> -->
				<li
					v-if="isLoggedIn"
					class="nav-menu-item nav-menu-item-logout"
					data-cy="nav-menu-item-logout"
				>
					<base-button @click="logout">
						Logout {{ travellerName }}
					</base-button>
				</li>
			</ul>
			<div
				v-show="isLoggedIn && $route.name !== 'auth'"
				class="hamburger"
				@click="closeHamburgerMenu"
			>
				<span class="bar" />
				<span class="bar" />
				<span class="bar" />
			</div>
		</nav>
	</header>
</template>

<script>
import { ref } from 'vue'

import { PATHS } from '@/constants/paths'

export default {
	emits: ['before-update-hook-complete'],
	data() {
		return {
			travellerName: '',
			totalMessages: null,
			beforeUpdateHookCompleted: false,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		usersName() {
			return this.$store.getters['travellers/travellerName']
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
		messagesCount() {
			return this.$store.getters['messages/messagesCount']
		},
	},
	watch: {
		usersName(name) {
			this.travellerName = name
		},
		messagesCount(count) {
			this.totalMessages = count
		},
	},
	mounted() {
		this.navBarMenu()
	},
	beforeUpdate() {
		if (this.isLoggedIn) {
			this.setTravellerName()
			if (this.totalMessages === null) {
				this.setMessageCount()
			}
			this.beforeUpdateHookCompleted = true
			this.$emit('before-update-hook-complete')
		}
	},
	methods: {
		toggleHamburgerMenuActiveClass() {
			if (document.documentElement.clientWidth <= 768) {
				const hamburger = document.querySelector('.hamburger')
				const navMenu = document.querySelector(
					'.nav-menu-items-container',
				)

				hamburger.classList.toggle('active')
				navMenu.classList.toggle('active')
			}
		},
		navBarMenu() {
			const hamburger = document.querySelector('.hamburger')
			const navMenu = document.querySelector('.nav-menu-items-container')

			hamburger.addEventListener('click', mobileMenu)

			function mobileMenu() {
				hamburger.classList.toggle('active')
				navMenu.classList.toggle('active')
			}
		},
		setTravellerName() {
			let localStorageTravellerName = localStorage.getItem('userName')

			if (
				localStorageTravellerName &&
				localStorageTravellerName.length > 0
			) {
				this.travellerName = localStorageTravellerName

				this.$watch(
					() => localStorage.getItem('userName'),
					(newValue) => {
						this.travellerName = newValue
					},
				)
			}
		},
		setMessageCount() {
			this.$store.dispatch('messages/loadMessages').then(() => {
				this.totalMessages = this.messagesCount
			})
		},
		async logout() {
			this.travellerName = ''
			this.totalMessages = null
			this.toggleHamburgerMenuActiveClass()

			await this.$store.dispatch('logout').then(() => {
				this.$router.push(PATHS.AUTHENTICATION)
			})
		},
		closeHamburgerMenu(event) {
			const open = ref(true)

			if (document.documentElement.clientWidth <= 768) {
				const eventClassList = event.target.classList

				if (!eventClassList.contains('backdrop')) {
					const eventParentClassList =
						event.target.parentElement.classList

					const containsHamburgerClass =
						eventClassList.contains('hamburger')
					const containsBarClass = eventClassList.contains('bar')
					const parentContainsHamburgerClass =
						eventParentClassList.contains('hamburger')

					if (eventClassList !== null) {
						if (
							(containsBarClass &&
								parentContainsHamburgerClass) ||
							containsHamburgerClass
						) {
							open.value = true
						}

						if (!containsHamburgerClass) {
							if (
								!containsBarClass &&
								!parentContainsHamburgerClass
							) {
								const hamburger =
									document.querySelector('.hamburger')
								const navMenu = document.querySelector(
									'.nav-menu-items-container',
								)

								if (
									hamburger.classList.contains('active') &&
									navMenu.classList.contains('active')
								) {
									hamburger.classList.toggle('active')
									navMenu.classList.toggle('active')
									open.value = false
								}
							}
						}
					}
				}
			}
		},
	},
}
</script>

<style scoped lang="scss">
header {
	align-items: center;
	background-color: $color-pigment-indigo;
	display: flex;
	height: 5rem;
	position: fixed;
	justify-content: center;
	width: 100%;
	z-index: 1;

	.navbar {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: auto;
		width: 90%;

		h1 {
			margin: 0;

			a {
				color: $color-white;
				margin: 0;
				text-decoration: none;
			}
		}

		.nav-menu-items-container {
			align-items: center;
			display: flex;
			list-style: none;
			justify-content: space-between;
			margin: 0;
			padding: 0;

			.nav-menu-item {
				margin: 0 0.5rem;

				ul {
					align-items: center;
					display: flex;
					justify-content: center;
					list-style: none;
					margin: 0;
					padding: 0;
					li {
						margin: 0 0.5rem;
					}
				}
				a {
					border: 1px solid transparent;
					color: $color-white;
					display: inline-block;
					padding: 0.75rem 1.5rem;
					position: relative;
					text-decoration: none;

					.total-messages-container {
						--size: 1.4rem;
						--font-size: 0.75rem;
						appearance: none;
						border: 1px solid $color-pigment-indigo;
						color: inherit;
						cursor: pointer;
						height: var(--size);
						line-height: var(--size);
						padding: 0;
						position: absolute;
						top: 0rem;
						width: var(--size);

						@include fadeIn(ease, 2s, 1, forwards);

						.total-messages {
							display: inline-block;
							font-size: var(--font-size);
							position: relative;
							text-align: center;
							width: 100%;
						}
					}

					&:hover {
						color: $color-lavender-magenta;
						.total-messages-container {
							border: 1px solid $color-pigment-indigo;
						}
					}

					&.router-link-active {
						border: 1px solid $color-white;
						color: $color-white;

						.total-messages-container {
							border: 1px solid $color-pigment-indigo;
						}
						&:hover {
							border: 1px solid $color-lavender-magenta;
							color: $color-lavender-magenta;

							.total-messages-container {
								border: 1px solid $color-pigment-indigo;
							}
						}
					}
				}
			}
		}

		.hamburger {
			display: none;
		}

		.bar {
			background-color: $color-white;
			display: block;
			height: 3px;
			margin: 5px auto;
			width: 25px;
			-webkit-transition: all 0.3s ease-in-out;
			transition: all 0.3s ease-in-out;
		}
	}
}

@media only screen and (max-width: 768px) {
	header {
		.navbar {
			.nav-menu-items-container {
				position: absolute;
				left: -100%;
				top: 4.9rem;
				flex-direction: column;
				background-color: $color-pigment-indigo;
				width: 100%;
				text-align: center;
				box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

				&.active {
					left: 0;
					.nav-menu-item {
						margin: 0;
						width: 100%;
						ul {
							display: block;
							padding-inline-start: 0;
							li {
								margin: 0;
								a {
									padding: 1.25rem 0;
									width: 100%;
									&.router-link-active {
										background-color: $color-ripe-eggplant;
										border: none;
										width: 100%;
										&:hover {
											border: none;
										}
									}
								}
							}
						}
						a {
							padding: 1.25rem 0;
							width: 100%;

							.total-messages-container {
								--size: 2rem;
								--font-size: 1rem;
								appearance: none;
								border: none;
								border-radius: var(--size);

								@include fadeIn(ease, 2s, 1, forwards);

								.total-messages {
									bottom: 1px;
									display: inline-block;
									font-size: var(--font-size);
									position: relative;
									text-align: center;
									width: 100%;
								}
							}

							&:active,
							&:hover {
								color: $color-lavender-magenta;
								.total-messages-container {
									border: none;
								}
							}
							&.router-link-active {
								background-color: $color-ripe-eggplant;
								border: none;
								width: 100%;
								&:hover {
									border: none;
								}
							}
						}
						button {
							background-color: $color-pigment-indigo;
							border: 1px solid $color-pigment-indigo;
							border-radius: 0;
							margin: 0;
							padding: 1.25rem 0;
							width: inherit;
							&:active,
							&:hover {
								color: $color-lavender-magenta;
							}
						}
					}
				}
			}

			.hamburger {
				display: block;
				cursor: pointer;

				&.active .bar:nth-child(2) {
					opacity: 0;
				}

				&.active .bar:nth-child(1) {
					transform: translateY(8px) rotate(45deg);
				}

				&.active .bar:nth-child(3) {
					transform: translateY(-8px) rotate(-45deg);
				}
			}
		}
	}
}
</style>

<template>
	<the-header />
	<router-view v-slot="slotProps">
		<transition
			name="route"
			mode="out-in"
		>
			<component :is="slotProps.Component" />
		</transition>
	</router-view>
	<SpeedInsights />
</template>

<script>
import { PATHS } from './constants/paths'

import TheHeader from './components/layout/TheHeader.vue'

export default {
	components: {
		TheHeader,
	},
	computed: {
		didAutoLogout() {
			return this.$store.getters.didAutoLogout
		},
	},
	watch: {
		didAutoLogout(curValue, oldValue) {
			if (curValue && curValue !== oldValue) {
				// When user logs out or Local Storage tokens expire
				// user is redirected to login page
				this.$router.replace(PATHS.AUTHENTICATION)
			}
		},
	},
	created() {
		this.$store.dispatch('tryLogin')
	},
}
</script>

<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<style lang="scss">
@use './styles/setup/typography.scss';
</style>

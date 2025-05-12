<template>
	<button
		v-if="!link"
		ref="baseButton"
		:class="mode"
		:disabled="disabled"
		:isError="isError"
	>
		<slot />
	</button>
	<router-link
		v-else
		:to="to"
		:class="mode"
	>
		<slot />
	</router-link>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: '/',
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		isError: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	mounted() {
		this.isErrorDialog()
	},
	methods: {
		isErrorDialog() {
			if (this.isError) {
				this.$refs.baseButton.focus()
			}
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/variables';

button,
a {
	background-color: variables.$color-ripe-plum;
	border: 1px solid variables.$color-ripe-plum;
	border-radius: 30px;
	color: variables.$color-white;
	cursor: pointer;
	display: inline-block;
	font: inherit;
	padding: 0.75rem 1.5rem;
	margin-right: 0.5rem;
	text-decoration: none;

	&:hover,
	&:active {
		background-color: variables.$color-ripe-eggplant;
		border-color: variables.$color-ripe-eggplant;
	}

	&.flat {
		background-color: transparent;
		color: variables.$color-ripe-plum;
		border: none;

		&:hover,
		&:active {
			background-color: variables.$color-blue-chalk;
		}
	}

	&.outline,
	&.disabled {
		border-color: variables.$color-ripe-eggplant;
		color: variables.$color-ripe-eggplant;
	}
	&.outline {
		background-color: transparent;

		&:hover,
		&:active {
			background-color: variables.$color-blue-chalk;
		}
	}
	&.disabled {
		background-color: variables.$color-silver;
		cursor: default;

		&:hover,
		&:active {
			background-color: variables.$color-silver;
		}
	}
}

@media only screen and (max-width: 768px) {
	button,
	a {
		padding: 0.5rem 1rem;
	}
}
</style>

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
button,
a {
	background-color: $color-ripe-plum;
	border: 1px solid $color-ripe-plum;
	border-radius: 30px;
	color: $color-white;
	cursor: pointer;
	display: inline-block;
	font: inherit;
	padding: 0.75rem 1.5rem;
	margin-right: 0.5rem;
	text-decoration: none;

	&:hover,
	&:active {
		background-color: $color-ripe-eggplant;
		border-color: $color-ripe-eggplant;
	}

	&.flat {
		background-color: transparent;
		color: $color-ripe-plum;
		border: none;

		&:hover,
		&:active {
			background-color: $color-blue-chalk;
		}
	}

	&.outline,
	&.disabled {
		border-color: $color-ripe-eggplant;
		color: $color-ripe-eggplant;
	}
	&.outline {
		background-color: transparent;

		&:hover,
		&:active {
			background-color: $color-blue-chalk;
		}
	}
	&.disabled {
		background-color: $color-silver;
		cursor: default;

		&:hover,
		&:active {
			background-color: $color-silver;
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

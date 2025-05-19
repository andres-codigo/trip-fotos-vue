<template>
	<span
		class="badge"
		:class="type"
	>
		{{ text }}
	</span>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: null,
		},
		title: {
			type: String,
			default: null,
		},
	},
	computed: {
		text() {
			return this.title.toUpperCase()
		},
	},
}
</script>

<style scoped lang="scss">
.badge {
	background-color: $color-silver;
	border-radius: 30px;
	color: $color-mine-shaft;
	display: inline-block;
	margin-bottom: 0.5rem;
	margin-right: 0.5rem;
	padding: 0.5rem 1.5rem;
	@include user-select(none);

	&.tokyo,
	&.prague,
	&.sydney,
	&.canberra {
		color: $color-white;
	}

	&.tokyo {
		background-color: $color-pigment-indigo;
	}

	&.prague {
		background-color: $color-purple;
	}

	&.sydney {
		background-color: $color-fresh-eggplant;
	}
	&.canberra {
		background-color: $color-mine-shaft;
	}
}

@media only screen and (max-width: 768px) {
	.badge {
		padding: 0.5rem 0.75rem;
	}
}
</style>

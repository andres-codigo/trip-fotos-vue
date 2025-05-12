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
@use '../../styles/setup/variables';
@use '../../styles/setup/mixins/mixins';

.badge {
	background-color: variables.$color-silver;
	border-radius: 30px;
	color: variables.$color-mine-shaft;
	display: inline-block;
	margin-bottom: 0.5rem;
	margin-right: 0.5rem;
	padding: 0.5rem 1.5rem;
	@include mixins.user-select(none);

	&.tokyo,
	&.prague,
	&.sydney,
	&.canberra {
		color: variables.$color-white;
	}

	&.tokyo {
		background-color: variables.$color-pigment-indigo;
	}

	&.prague {
		background-color: variables.$color-purple;
	}

	&.sydney {
		background-color: variables.$color-fresh-eggplant;
	}
	&.canberra {
		background-color: variables.$color-mine-shaft;
	}
}

@media only screen and (max-width: 768px) {
	.badge {
		padding: 0.5rem 0.75rem;
	}
}
</style>

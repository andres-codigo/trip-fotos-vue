<template>
	<base-card>
		<h2 class="filter-header">Filter by city</h2>
		<div class="checkbox-container">
			<!-- <multiselect
				v-model="options"
				:multiple="true"
				:close-on-select="false"
				:spellcheck="true"
				:options="options"></multiselect> -->
			<span
				v-for="(v, key) in filters"
				:key="key"
				:class="['filter-option', { active: v.isActive }]"
			>
				<input
					:id="key"
					type="checkbox"
					checked
					@change="setFilter"
				/>
				<label :for="key">{{ key }}</label>
			</span>
		</div>
	</base-card>
</template>

<script>
// import Multiselect from 'vue-multiselect'

export default {
	// components: { Multiselect },
	emits: ['change-filter'],
	data() {
		return {
			value: null,
			filters: {
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
			options: ['tokyo', 'prague', 'sydney', 'canberra'],
		}
	},
	methods: {
		setFilter(event) {
			const inputId = event.target.id
			const isChecked = event.target.checked
			const updatedFilters = {
				...this.filters,
				[inputId]: {
					isActive: isChecked,
				},
			}
			this.filters = updatedFilters
			this.$emit('change-filter', updatedFilters)
		},
	},
}
</script>
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->

<style scoped lang="scss">
@use '../../styles/setup/mixins/mixins';

.filter-header {
	margin: 0.5rem 0;
}
.checkbox-container {
	display: flex;
	flex-wrap: wrap;
	.filter-option {
		width: auto;
		margin: 0 1rem 10px 0;

		label,
		input {
			vertical-align: middle;
		}

		label {
			display: inline-block;
			margin-left: 0.25rem;
			text-transform: capitalize;
			width: 4rem;

			@include mixins.user-select(none);
		}

		&.active label {
			font-weight: bold;
		}
	}
}

@media only screen and (max-width: 440px) {
	.checkbox-container {
		.filter-option {
			width: 50%;
			margin: 0 0 10px 0;
		}
	}
}
</style>

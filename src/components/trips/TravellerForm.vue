<template>
	<form
		autocomplete="on"
		@submit.prevent="submitForm"
	>
		<div
			v-for="(field, key) in fields"
			:key="key"
		>
			<div
				v-if="field.type === 'text'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<input
					:id="key"
					v-model.trim="field.val"
					:type="field.type"
					@blur="clearValidity(key)"
				/>

				<p
					v-if="!field.isValid"
					:class="{ invalid: !field.isValid }"
				>
					{{ field.label }} must not be empty.
				</p>
			</div>
			<div
				v-else-if="field.type === 'textarea'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<textarea
					:id="key"
					v-model.trim="field.val"
					:type="field.type"
					rows="5"
					@blur="clearValidity(key)"
				></textarea>
				<p
					v-if="!field.isValid"
					:class="{ invalid: !field.isValid }"
				>
					{{ field.label }} must not be empty.
				</p>
			</div>
			<div
				v-else-if="field.type === 'number'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<label :for="key">{{ field.label }}</label>
				<input
					:id="key"
					v-model.number="field.val"
					:type="field.type"
					@blur="clearValidity(key)"
				/>
				<p
					v-if="!field.isValid"
					:class="{ invalid: !field.isValid }"
				>
					Number of days spent in the city cannot be empty.
				</p>
			</div>
			<div
				v-else-if="field.type === 'checkbox'"
				:class="['form-control', { invalid: !field.isValid }]"
			>
				<h3 class="checkbox-label">
					{{ field.label }}
				</h3>
				<div
					v-for="(expertiseItem, key2) in field.areaTypes"
					:key="key2"
				>
					<input
						:id="expertiseItem.area"
						v-model="field.val"
						:type="field.type"
						:value="expertiseItem.area"
						@blur="clearValidity('areas')"
					/>
					<label :for="expertiseItem.area">{{
						expertiseItem.label
					}}</label>
				</div>
				<p v-if="!field.isValid">At least one city must be selected.</p>
			</div>
		</div>
		<AddFile
			ref="child"
			@updated-files-list="updateFilesList"
		/>
		<p
			v-if="!formIsValid"
			:class="{ 'invalid-form': !formIsValid }"
		>
			Please fix the above errors and submit again.
		</p>
		<base-button>Register</base-button>
	</form>
</template>

<script>
import AddFile from '../file-uploader/AddFile.vue'

export default {
	components: {
		AddFile,
	},
	emits: ['register-traveller', 'has-attachments'],
	data() {
		return {
			fields: {
				firstName: {
					label: 'First name',
					type: 'text',
					val: '',
					isValid: true,
				},
				lastName: {
					label: 'Last name',
					type: 'text',
					val: '',
					isValid: true,
				},
				description: {
					label: 'Description',
					type: 'textarea',
					val: '',
					isValid: true,
				},
				days: {
					label: 'Number of days spent in the city?',
					type: 'number',
					val: null,
					isValid: true,
				},
				areas: {
					label: 'Cities visited',
					type: 'checkbox',
					val: [],
					isValid: true,
					areaTypes: {
						0: {
							area: 'tokyo',
							label: 'Tokyo, Japan',
						},
						1: {
							area: 'prague',
							label: 'Prague, Czechia',
						},
						2: {
							area: 'sydney',
							label: 'Sydney, Australia',
						},
						3: {
							area: 'canberra',
							label: 'Canberra, Australia',
						},
					},
				},
			},
			files: {
				val: [],
			},
			formIsValid: true,
		}
	},
	methods: {
		clearValidity(input) {
			if (
				this.fields[input].val === '' ||
				(this.fields[input].type === 'number' &&
					!this.fields[input].val) ||
				(this.fields[input].type === 'number' &&
					this.fields[input].val < 0)
			) {
				this.fields[input].isValid = false
			} else {
				this.fields[input].isValid = true
			}
		},
		validateForm() {
			this.formIsValid = true

			if (this.fields.firstName.val === '') {
				this.fields.firstName.isValid = false
				this.formIsValid = false
			}
			if (this.fields.lastName.val === '') {
				this.fields.lastName.isValid = false
				this.formIsValid = false
			}
			if (this.fields.description.val === '') {
				this.fields.description.isValid = false
				this.formIsValid = false
			}
			if (!this.fields.days.val || this.fields.days.val < 0) {
				this.fields.days.isValid = false
				this.formIsValid = false
			}
			if (this.fields.areas.val.length === 0) {
				this.fields.areas.isValid = false
				this.formIsValid = false
			}
		},
		updateFilesList() {
			this.files.val = this.$refs.child.files
		},
		submitForm() {
			this.validateForm()

			if (!this.formIsValid) {
				return
			}

			const formData = {
				first: this.fields.firstName.val,
				last: this.fields.lastName.val,
				desc: this.fields.description.val,
				days: this.fields.days.val,
				areas: this.fields.areas.val,
				files: this.files.val,
			}

			this.$emit('register-traveller', formData)
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/mixins/form/valid/valid';
@use '../../styles/setup/mixins/form/invalid/invalid';

form {
	.form-control {
		margin: 0.5rem 0;

		@include valid.input-textarea;

		.checkbox-label {
			font-size: 1rem;
			margin: 0.5rem 0;
		}

		@include valid.checkbox;

		&.invalid {
			p {
				@include invalid.error-message;
			}

			input,
			textarea {
				@include invalid.invalid-border;
			}

			@include invalid.invalid-checkbox;
		}
	}

	.invalid-form {
		@include invalid.error-message;
	}
}
</style>

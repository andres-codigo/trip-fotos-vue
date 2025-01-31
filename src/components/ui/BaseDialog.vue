<template>
	<teleport to="body">
		<div v-if="show" class="backdrop" @click="tryClose"></div>
		<transition name="dialog">
			<dialog v-if="show" open>
				<header>
					<slot name="header">
						<h2>{{ title }}</h2>
					</slot>
				</header>
				<section
					:class="
						sectionClasses ? 'image-section' : 'general-section'
					">
					<slot></slot>
				</section>
				<menu v-if="!fixed">
					<slot name="actions">
						<base-button :is-error="isError" @click="tryClose"
							>Close</base-button
						>
					</slot>
				</menu>
			</dialog>
		</transition>
	</teleport>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		isError: {
			type: Boolean,
			required: false,
		},
		title: {
			type: String,
			default: null,
			required: false,
		},
		sectionClasses: {
			type: Boolean,
			required: false,
		},
		fixed: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	emits: ['close'],
	methods: {
		tryClose() {
			if (this.fixed) {
				return
			}
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/variables';

.backdrop {
	background-color: rgba(0, 0, 0, 0.75);
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
}

dialog {
	background-color: variables.$color-white;
	border: none;
	border-radius: 12px;
	bottom: 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	left: 0;
	overflow: hidden;
	padding: 0;
	position: fixed;
	right: 0;
	top: 0;
	width: 80%;
	z-index: 100;

	header {
		background-color: variables.$color-ripe-plum;
		color: variables.$color-white;
		padding: 1rem;
		width: 100%;

		h2 {
			margin: 0;
		}
	}

	section {
		&.image-section {
			align-items: center;
			display: flex;
			min-height: 396px;
			padding: 2.5rem 0 1rem 0;
		}
		&.general-section {
			padding: 1rem;
			:slotted(p) {
				text-align: center;
			}
		}
		:slotted(img) {
			display: block;
			margin: 0 auto;
			object-fit: cover;
			padding: 10px;
		}
	}

	menu {
		display: flex;
		justify-content: flex-end;
		margin: 0;
		padding: 1rem;
	}

	&.dialog-enter-from,
	&.dialog-leave-to {
		opacity: 0;
		transform: scale(0.8);
	}

	&.dialog-enter-active {
		transition: all 0.3s ease-out;
	}

	&.dialog-leave-active {
		transition: all 0.3s ease-in;
	}

	&.dialog-enter-to,
	&.dialog-leave-from {
		opacity: 1;
		transform: scale(1);
	}
}
</style>

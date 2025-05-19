<template>
	<component
		:is="tag"
		class="file-preview"
	>
		<button
			class="close-icon"
			@click="$emit('remove', file)"
		>
			&times;
		</button>
		<img
			:src="file.url"
			:alt="file.file.name"
			:title="file.file.name"
		/>

		<span
			v-show="file.status == GlobalConstants.LOADING_IMAGE"
			class="status-indicator loading-indicator"
			>In Progress</span
		>
		<span
			v-show="file.status == true"
			class="status-indicator success-indicator"
			>Uploaded</span
		>
		<span
			v-show="file.status == false"
			class="status-indicator failure-indicator"
			>Error</span
		>
	</component>
</template>

<script setup>
import { GlobalConstants } from '@/constants/global'

defineProps({
	file: { type: Object, required: true },
	tag: { type: String, default: 'li' },
})

defineEmits(['remove'])
</script>

<style scoped lang="scss">
.file-preview {
	aspect-ratio: 1/1;
	margin: 1rem 2.5%;
	overflow: hidden;
	position: relative;
	min-width: 100px;
	width: 20%;

	img {
		display: block;
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.close-icon,
	.status-indicator {
		--size: 20px;
		appearance: none;
		border: 0;
		border-radius: var(--size);
		box-shadow: 0 0 5px currentColor;
		height: var(--size);
		line-height: var(--size);
		padding: 0;
		position: absolute;
		right: 0.25rem;
	}

	.close-icon {
		background: $color-el-salva;
		color: $color-white;
		cursor: pointer;
		font-size: var(--size);
		top: 0.25rem;
		width: var(--size);
	}

	.status-indicator {
		bottom: 0.5rem;
		font-size: calc(0.7 * var(--size));
		padding: 3px 10px;
		position: sticky;
	}

	.loading-indicator {
		animation: pulse 1.5s linear 0s infinite;
		color: $color-black;
	}

	.success-indicator {
		background: $color-mantis;
		color: $color-black;
	}

	.failure-indicator {
		background: $color-el-salva;
		color: $color-white;
	}
}

@keyframes pulse {
	0% {
		background: $color-white;
	}

	50% {
		background: $color-alto;
	}

	100% {
		background: $color-white;
	}
}

@media only screen and (max-width: 440px) {
	.file-preview {
		width: 45%;
	}
}
</style>

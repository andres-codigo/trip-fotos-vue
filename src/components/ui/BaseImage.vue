<template>
	<base-dialog
		:show="!!show"
		:title="title + `'s photos`"
		:section-classes="addImageClasses"
		@close="toggleDialog"
	>
		<img
			v-lazy="url"
			:class="imageOrientation"
			@load="onImageLoad"
		/>
		<!-- TODO: temporary enabled v-lazy load component to test performance once deployed to vercel; will reverse is performance slow -->
		<!-- <img :src="url" /> -->
	</base-dialog>
	<li
		class="image-preview"
		@click="toggleDialog"
	>
		<img v-lazy="url" />
		<!-- TODO: temporary enabled v-lazy load component to test performance once deployed to vercel; will reverse is performance slow -->
		<!-- <img :src="url" /> -->
	</li>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		url: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			show: false,
			addImageClasses: true,
			imageOrientation: '',
		}
	},
	methods: {
		onImageLoad(event) {
			const img = event.target
			if (img.width > img.height) {
				this.imageOrientation = 'landscape'
			} else if (img.width < img.height) {
				this.imageOrientation = 'portrait'
			} else {
				this.imageOrientation = 'square'
			}
		},
		toggleDialog() {
			this.show = !this.show
		},
	},
}
</script>

<style scoped lang="scss">
@use '../../styles/setup/mixins/mixins';

.image-preview {
	margin: 1rem 2.5%;
	overflow: hidden;
	position: relative;
	width: 28%;

	img {
		cursor: pointer;
		display: block;
		height: 100%;
		object-fit: scale-down;
		width: 100%;
	}
}

@media only screen and (max-width: 480px) {
	.traveller {
		.images {
			.images-list {
				padding: 15px;
				.image-preview {
					margin: 0.5rem 2.5%;
					width: 45%;
				}
			}
		}
	}
}

@media only screen and (max-height: 430px) {
	.image-section {
		img {
			padding: 0;
			&.portrait {
				width: 120px;
			}
			&.landscape {
				height: 180px;
			}
		}
	}
}

// min/max width media resizing
@include mixins.dialog-min-max-width-image-resizing(
	0px,
	410px,
	250px,
	'portrait'
);
@include mixins.dialog-min-max-width-image-resizing(
	411px,
	667px,
	300px,
	'portrait'
);
@include mixins.dialog-min-max-width-image-resizing(
	668px,
	2000px,
	350px,
	'portrait'
);

@include mixins.dialog-min-max-width-image-resizing(
	0px,
	2048px,
	90%,
	'landscape'
);
</style>

<template>
	<div class="file-drop">
		<DropZone
			v-slot="{ dropZoneActive }"
			class="drop-area"
			@files-dropped="addFiles"
		>
			<label for="file-input">
				<span v-if="dropZoneActive">
					<span>Drop your files here</span>
					<span>to add them</span>
				</span>
				<span v-else>
					<span>Drag and drop your files here</span>
					<span>
						or <strong><em>click here</em></strong> to select your
						files
					</span>
				</span>

				<input
					id="file-input"
					type="file"
					multiple
					@change="onInputChange"
				/>
			</label>
			<ul
				v-show="files && files.length > 0"
				id="sss"
				class="image-list"
			>
				<FilePreview
					v-for="file of files"
					:key="file.id"
					:file="file"
					tag="li"
					@remove="removeFile"
				/>
			</ul>
		</DropZone>
	</div>
</template>

<script setup>
// Components
import DropZone from './DropZone.vue'
import FilePreview from './FilePreview.vue'

// File Management
import useFileList from '@/composables/file-list'
const { files, addFiles, removeFile } = useFileList()

const emit = defineEmits(['updated-files-list'])

function onInputChange(e) {
	addFiles(e.target.files)
	e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
	emit('updated-files-list', e.target.files)
}

defineExpose({
	files,
})
</script>

<style scoped lang="scss">
.file-drop {
	height: 100%;
	justify-content: center;
	margin: 0 auto;
	text-align: center;

	.drop-area {
		border: 1px dashed $color-silver;
		margin: 0 auto;
		margin-bottom: 15px;
		max-width: 800px;
		transition: 0.2s ease;
		width: 100%;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		&:hover {
			background-color: $color-alto;
			border: 1px dashed $color-pigment-indigo;
		}

		label {
			cursor: pointer;
			display: block;
			padding: 3rem;

			span {
				display: block;
			}

			input[type='file']:not(:focus-visible) {
				// Visually Hidden Styles taken from Bootstrap 5
				position: absolute !important;
				width: 1px !important;
				height: 1px !important;
				padding: 0 !important;
				margin: -1px !important;
				overflow: hidden !important;
				clip: rect(0, 0, 0, 0) !important;
				white-space: nowrap !important;
				border: 0 !important;
			}
		}
		.image-list {
			background-color: $color-azure;
			border: 1px solid $color-white;
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			margin: 10px;
			padding: 0;
		}
	}
}
</style>

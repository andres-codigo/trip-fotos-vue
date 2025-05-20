<template>
	<section class="page-section messages-received-container">
		<base-dialog
			:show="!!error"
			:is-error="!!error"
			:title="dialogTitle"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header class="messages-header">
					<h2>Messages</h2>
				</header>
				<base-spinner v-if="isLoading" />
				<ul
					v-else-if="hasMessages && !isLoading"
					class="messages"
				>
					<message-item
						v-for="req in receivedMessages"
						:id="req.id"
						:key="req.id"
						:name="req.userName"
						:email="req.userEmail"
						:message="req.message"
					/>
				</ul>
				<h3
					v-else
					class="no-messages"
				>
					You don't have any messages yet!
				</h3>
			</base-card>
		</section>
	</section>
</template>

<script>
import { GlobalConstants } from '@/constants/global'
import MessageItem from '@/components/messages/MessageItem.vue'

export default {
	components: {
		MessageItem,
	},
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		receivedMessages() {
			return this.$store.getters['messages/messages']
		},
		hasMessages() {
			return this.$store.getters['messages/hasMessages']
		},
	},
	created() {
		this.loadMessages()
	},
	methods: {
		async loadMessages() {
			this.isLoading = true
			try {
				await this.$store.dispatch('messages/loadMessages')
			} catch (error) {
				this.error = error.message || 'Something failed!'
			}
			this.isLoading = false
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.messages-received-container {
	.messages-header {
		text-align: center;
	}

	.messages {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.no-messages {
		text-align: center;
		font-weight: 100;
	}
}
</style>

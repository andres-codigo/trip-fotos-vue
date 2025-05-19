import { APIConstants } from '@/constants/api'
import { APIErrorMessageConstants } from '@/constants/api-messages'

const validatePayload = (payload) => {
	if (
		!payload.name ||
		!payload.email ||
		!payload.message ||
		!payload.travellerId
	) {
		throw new Error(APIErrorMessageConstants.INVALID_PAYLOAD)
	}
}

const createMessage = (payload) => ({
	userName: payload.name,
	userEmail: payload.email,
	message: payload.message,
})

export default {
	async contactTraveller(context, payload) {
		try {
			validatePayload(payload)

			const newMessage = createMessage(payload)
			const response = await fetch(
				`${APIConstants.BASE_URL}/messages/${payload.travellerId}.json`,
				{
					method: APIConstants.POST,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newMessage),
				},
			)

			const responseData = await response.json()

			if (response.ok) {
				newMessage.id = responseData.name
				newMessage.travellerId = payload.travellerId

				context.commit('addMessage', newMessage)
			} else {
				throw new Error(
					APIErrorMessageConstants.RESPONSE_MESSAGE + response.status,
				)
			}
		} catch {
			throw new Error(APIErrorMessageConstants.CONTACT_TRAVELLER)
		}
	},
	async loadMessages(context) {
		try {
			const travellerId = context.rootGetters.userId
			const token = context.rootGetters.token
			const response = await fetch(
				`${APIConstants.BASE_URL}/messages/${travellerId}.json?auth=${token}`,
				{
					method: APIConstants.GET,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			const responseData = await response.json()

			if (response.ok) {
				const messages = []

				for (const key in responseData) {
					const message = {
						id: key,
						travellerId: travellerId,
						userName: responseData[key].userName,
						userEmail: responseData[key].userEmail,
						message: responseData[key].message,
					}
					messages.push(message)
				}

				context.commit('setMessages', messages)
				context.commit('setMessagesCount', messages.length)
			} else {
				throw new Error(
					APIErrorMessageConstants.RESPONSE_MESSAGE + response.status,
				)
			}
		} catch {
			throw new Error(APIErrorMessageConstants.FETCH_MESSAGES)
		}
	},
	async deleteMessage(context, data) {
		try {
			const travellerId = context.rootGetters.userId
			const messageId = data.messageId
			const token = context.rootGetters.token

			const response = await fetch(
				`${APIConstants.BASE_URL}/messages/${travellerId}/${messageId}.json?auth=${token}`,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (response.ok) {
				const responseData = await response.json()

				context.commit('deleteMessage', {
					...responseData,
					id: travellerId,
				})

				await context.dispatch('loadMessages')
			} else {
				throw new Error(
					APIErrorMessageConstants.RESPONSE_MESSAGE + response.status,
				)
			}
		} catch {
			throw new Error(APIErrorMessageConstants.CATCH_MESSAGE)
		}
	},
}

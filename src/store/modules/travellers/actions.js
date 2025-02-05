import imageCompression from 'browser-image-compression'
import {
	getStorage,
	getDownloadURL,
	ref,
	uploadBytesResumable,
	deleteObject,
} from 'firebase/storage'

import { APIConstants } from '../../../constants/api'
import { GlobalConstants } from '../../../constants/global'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async registerTraveller(context, data) {
		try {
			const userId = context.rootGetters.userId
			const token = context.rootGetters.token

			const MAX_CONCURRENT_UPLOADS = 5
			const imageQueue = [...data.files]
			const imageUrls = []

			const uploadImage = async (image) => {
				image.status = GlobalConstants.LOADING_IMAGE
				const storage = getStorage()
				const storageRef = ref(
					storage,
					`/images/${userId}/${image.name}`,
				)

				const metadata = {
					customMetadata: {
						userId: userId,
					},
				}

				// Compress the image
				const compressedFile = await imageCompression(image.file, {
					maxSizeMB: 1,
					maxWidthOrHeight: 1920,
					useWebWorker: true,
				})

				const uploadTask = uploadBytesResumable(
					storageRef,
					compressedFile,
					metadata,
				)

				return new Promise((resolve, reject) => {
					uploadTask.on(
						'state_changed',
						null,
						() => {
							reject(
								new Error(
									`Failed to upload image: ${image.name}`,
								),
							)
						},
						async () => {
							const url = await getDownloadURL(
								uploadTask.snapshot.ref,
							)
							image.status = true
							resolve(url)
						},
					)
				})
			}

			const uploadNextBatch = async () => {
				const batch = imageQueue.splice(0, MAX_CONCURRENT_UPLOADS)
				const batchPromises = batch.map(uploadImage)
				const batchResults = await Promise.all(batchPromises)
				imageUrls.push(...batchResults)
			}

			while (imageQueue.length > 0) {
				await uploadNextBatch()
			}

			const travellerData = {
				firstName: data.first,
				lastName: data.last,
				description: data.desc,
				daysInCity: data.days,
				areas: data.areas,
				files: imageUrls,
				registered: new Date(),
			}

			const response = await fetch(
				`${APIConstants.BASE_URL}/travellers/${userId}.json?auth=${token}`,
				{
					method: APIConstants.PUT,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(travellerData),
				},
			)

			if (!response.ok) {
				throw new Error(
					`${APIErrorMessageConstants.REGISTER_TRAVELLER}${userId}.`,
				)
			}

			context.commit('registerTraveller', {
				...travellerData,
				id: userId,
			})
		} catch {
			throw new Error(
				`${APIErrorMessageConstants.REGISTER_TRAVELLER_CATCH}${context.rootGetters.userId}.`,
			)
		}
	},

	async travellerName(context, data) {
		try {
			const fullName = data.first + ' ' + data.last

			const response = await fetch(
				`${APIConstants.API_URL}update?key=${APIConstants.API_KEY}`,
				{
					method: APIConstants.POST,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						idToken: context.rootGetters.token,
						displayName: fullName,
					}),
				},
			)

			const updateResponse = await response.json()

			if (response.ok) {
				localStorage.setItem('userName', updateResponse.displayName)
				context.commit('setTravellerName', updateResponse.displayName)
			} else {
				throw new Error(
					`${APIErrorMessageConstants.UPDATE_TRAVELLER_NAME}${fullName}.`,
				)
			}
		} catch {
			throw new Error(
				`${APIErrorMessageConstants.UPDATE_TRAVELLER_NAME_CATCH} ${data.first} ${data.last}.`,
			)
		}
	},

	async loadTraveller(context, data) {
		try {
			const travellerId = data.travellerId

			const response = await fetch(
				`${APIConstants.BASE_URL}/travellers/${travellerId}.json`,
				{
					method: APIConstants.GET,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			const responseData = await response.json()

			if (response.ok) {
				context.commit('setTraveller', {
					...responseData,
					id: travellerId,
				})
			} else {
				throw new Error(
					`${APIErrorMessageConstants.LOAD_TRAVELLER}${travellerId}.`,
				)
			}
		} catch {
			throw new Error(
				`${APIErrorMessageConstants.LOAD_TRAVELLER_CATCH}${data.travellerId}.`,
			)
		}
	},

	async updateTravellers(context) {
		try {
			const response = await fetch(
				`${APIConstants.BASE_URL}/travellers.json`,
				{
					method: APIConstants.GET,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.UPDATE_TRAVELLERS)
			}

			const responseData = await response.json()

			const travellers = Object.keys(responseData).map((key) => ({
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				description: responseData[key].description,
				daysInCity: responseData[key].daysInCity,
				areas: responseData[key].areas,
				files: responseData[key].files,
				registered: responseData[key].registered,
			}))

			const loggedInTraveller = travellers.find(
				(traveller) => traveller.id === localStorage.userId,
			)

			const filteredTraveller = travellers.filter(
				(traveller) => traveller.id !== localStorage.userId,
			)

			if (loggedInTraveller) {
				filteredTraveller.unshift(loggedInTraveller)
				context.commit(
					'setTravellerName',
					`${loggedInTraveller.firstName} ${loggedInTraveller.lastName}`,
				)
				context.commit('setTravellers', filteredTraveller)
			} else {
				context.commit('setTravellers', travellers)
			}
		} catch {
			throw new Error(APIErrorMessageConstants.UPDATE_TRAVELLERS_CATCH)
		}
	},

	async deleteTraveller(context, data) {
		try {
			const travellerId = data.travellerId
			const token = context.rootGetters.token

			const response = await fetch(
				`${APIConstants.BASE_URL}/travellers/${travellerId}.json?auth=${token}`,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (response.ok) {
				if (data.files && data.files.length > 0) {
					// Delete images in Firebase Storage
					await Promise.all(
						data.files.map(async (image) => {
							const storage = getStorage()
							const desertRef = ref(storage, image)

							// Delete the file
							try {
								await deleteObject(desertRef)
							} catch (error) {
								console.error('Error deleting file:', error)
								throw new Error(
									APIErrorMessageConstants.CATCH_MESSAGE,
								)
							}
						}),
					)
				}

				context.commit('deleteTraveller', {
					id: travellerId,
				})

				await context.dispatch('deleteTravellerMessages', travellerId)
				await context.dispatch('updateTravellers')
			} else {
				throw new Error(
					`${APIErrorMessageConstants.DELETE_TRAVELLER}${travellerId}.`,
				)
			}
		} catch {
			throw new Error(
				`${APIErrorMessageConstants.DELETE_TRAVELLER_CATCH}${data.travellerId}.`,
			)
		}
	},

	async deleteTravellerMessages(context, travellerId) {
		try {
			const token = context.rootGetters.token

			const response = await fetch(
				`${APIConstants.BASE_URL}/messages/${travellerId}.json?auth=${token}`,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)

			if (response.ok) {
				context.commit('deleteTravellerMessages', {
					id: travellerId,
				})
			} else {
				throw new Error(
					`${APIErrorMessageConstants.DELETE_TRAVELLER_MESSAGES}${travellerId}.`,
				)
			}
		} catch {
			throw new Error(
				`${APIErrorMessageConstants.DELETE_TRAVELLER_MESSAGES_CATCH}${travellerId}.`,
			)
		}
	},

	async loadTravellers(context, payload) {
		try {
			if (!payload.forceRefresh && !context.getters.shouldUpdate) {
				return
			}

			await context.dispatch('updateTravellers')
			context.commit('setFetchTimestamp')
		} catch {
			throw new Error(APIErrorMessageConstants.LOAD_TRAVELLERS_CATCH)
		}
	},
}

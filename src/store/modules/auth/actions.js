import { APIConstants } from '@/constants/api'
import { APIErrorMessageConstants } from '@/constants/api-messages'

let timer

export default {
	async login(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: APIConstants.API_AUTH_LOGIN_MODE,
		})
	},
	async signup(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: APIConstants.API_AUTH_SIGNUP_MODE,
		})
	},
	async auth(context, payload) {
		const mode = payload.mode
		let url =
			APIConstants.API_URL +
			'signInWithPassword?key=' +
			APIConstants.API_KEY

		if (mode === APIConstants.API_AUTH_SIGNUP_MODE) {
			url = APIConstants.API_URL + 'signUp?key=' + APIConstants.API_KEY
		}

		const response = await fetch(url, {
			method: APIConstants.POST,
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}),
		})

		const responseData = await response.json()

		if (response.ok) {
			const expiresIn = +responseData.expiresIn * 1000
			const expirationDate = new Date().getTime() + expiresIn

			let displayName = ''
			if (mode === APIConstants.API_AUTH_SIGNUP_MODE) {
				displayName
			} else {
				displayName = responseData.displayName
			}

			localStorage.setItem('token', responseData.idToken)
			localStorage.setItem('userId', responseData.localId)
			localStorage.setItem('userName', displayName)
			localStorage.setItem('userEmail', responseData.email)
			localStorage.setItem('tokenExpiration', expirationDate)

			timer = setTimeout(function () {
				context.dispatch('autoLogout')
			}, expiresIn)

			context.commit('setUser', {
				token: responseData.idToken,
				userId: responseData.localId,
				userName: displayName,
				userEmail: responseData.email,
			})
		} else {
			let errorMessage = ''

			if (
				responseData.error.message ===
				APIErrorMessageConstants.LOGIN_TYPE_EMAIL_EXISTS
			) {
				errorMessage =
					APIErrorMessageConstants.LOGIN_MESSAGE_EMAIL_EXISTS
			} else if (
				responseData.error.message ===
				APIErrorMessageConstants.LOGIN_TYPE_OPERATION_NOT_ALLOWED
			) {
				errorMessage =
					APIErrorMessageConstants.LOGIN_MESSAGE_OPERATION_NOT_ALLOWED
			} else if (
				responseData.error.message ===
				APIErrorMessageConstants.LOGIN_TYPE_TOO_MANY_ATTEMPTS
			) {
				errorMessage =
					APIErrorMessageConstants.LOGIN_MESSAGE_TOO_MANY_ATTEMPTS
			}
			const error = new Error(
				errorMessage || APIErrorMessageConstants.FAILED_TO_AUTHENTICATE,
			)
			throw error
		}
	},
	tryLogin(context) {
		const token = localStorage.getItem('token')
		const userId = localStorage.getItem('userId')
		const userName = localStorage.getItem('userName')
		const userEmail = localStorage.getItem('userEmail')
		const tokenExpiration = localStorage.getItem('tokenExpiration')

		const expiresIn = +tokenExpiration - new Date().getTime()

		if (expiresIn < 0) {
			return
		}

		timer = setTimeout(function () {
			context.dispatch('autoLogout')
		}, expiresIn)

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
				userName: userName,
				userEmail: userEmail,
			})
		}
	},
	logout(context) {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		localStorage.removeItem('userName')
		localStorage.removeItem('userEmail')
		localStorage.removeItem('tokenExpiration')

		clearTimeout(timer)

		context.commit('setUser', {
			token: null,
			userId: null,
			userName: null,
			userEmail: null,
		})
	},
	autoLogout(context) {
		context.dispatch('logout')
		context.commit('setAutoLogout')
	},
}

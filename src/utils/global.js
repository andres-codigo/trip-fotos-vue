import moment from 'moment'

export const isLoggedInUser = (id, userId) => {
	if (id !== userId) {
		return false
	}
	return true
}

export const formatDate = (value, format) => {
	return moment(value).format(format)
}

export const delayLoading = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

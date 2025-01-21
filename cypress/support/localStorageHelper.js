// Set a value in local storage
export const setLocalStorageItem = (key, value) => {
	window.localStorage.setItem(key, value)
}

// Get a value from local storage
export const getLocalStorageItem = (key) => {
	return window.localStorage.getItem(key)
}

// Clear a specific item from local storage
export const clearLocalStorageItem = (key) => {
	window.localStorage.removeItem(key)
}

// Clear all items from local storage
export const clearAllLocalStorage = () => {
	window.localStorage.clear()
}

// Set a value in local storage
export const setLocalStorageItem = (key, value) => {
	cy.window().then((win) => {
		win.localStorage.setItem(key, value)
	})
}

// Get a value from local storage
export const getLocalStorageItem = (key) => {
	return cy.window().then((win) => {
		return win.localStorage.getItem(key)
	})
}

// Clear a specific item from local storage
export const clearLocalStorageItem = (key) => {
	cy.window().then((win) => {
		win.localStorage.removeItem(key)
	})
}

// Clear all items from local storage
export const clearAllLocalStorage = () => {
	cy.window().then((win) => {
		win.localStorage.clear()
	})
}

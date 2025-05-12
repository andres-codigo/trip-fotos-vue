import globals from 'globals'

export default {
	ecmaVersion: 2022,
	sourceType: 'module',
	globals: {
		...globals.browser,
		...globals.node,
		defineProps: 'readonly',
		defineEmits: 'readonly',
	},
}

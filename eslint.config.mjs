import eslintJs from '@eslint/js'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import { includeIgnoreFile } from '@eslint/compat'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import pluginCypress from 'eslint-plugin-cypress/flat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: eslintJs.configs.recommended,
	allConfig: eslintJs.configs.all,
})
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
	pluginCypress.configs.globals,
	includeIgnoreFile(gitignorePath),
	...compat.extends(
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
	),
	...compat.env({
		es2020: true,
		node: true,
	}),
	{
		//---- GLOBAL IGNORES
		ignores: ['**/dist/', '*.config.js'],
	},
	// general
	{
		files: ['**/*.{js,ts,jsx,tsx,vue}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				defineProps: 'readonly',
				defineEmits: 'readonly',
			},
		},
		rules: {
			'no-console': 'warn',
			'no-debugger': 'warn',
			'vue/multi-word-component-names': 'off',
			'prettier/prettier': 'error',
			quotes: ['error', 'single'],
		},
	},
	// vue defaults
	...pluginVue.configs['flat/essential'],
	// vue
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
				ecmaFeatures: {
					globalReturn: false,
					impliedStrict: false,
					jsx: false,
				},
			},
		},
	},
	// cypress
	{
		plugins: {
			pluginCypress,
		},
		files: ['**/*.spec.cy.js'],
		ignores: ['cypress.config.js'],
		languageOptions: {
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.amd,
			},
		},
		rules: {
			// https://github.com/cypress-io/eslint-plugin-cypress
			'cypress/no-assigning-return-values': 'error',
			'cypress/no-unnecessary-waiting': 'error',
			'cypress/assertion-before-screenshot': 'warn',
			'cypress/no-force': 'warn',
			'cypress/no-async-tests': 'error',
			'cypress/no-async-before': 'error',
			'cypress/no-pause': 'error',
		},
	},
]

import eslintJs from '@eslint/js'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import path from 'node:path'

import vue from 'eslint-plugin-vue'

import prettierPlugin from 'eslint-plugin-prettier'

import pluginCypress from 'eslint-plugin-cypress/flat'

import vueRules from './rules/vue.js'
import languageOptions from './rules/language-options.js'
import vueLanguageOptions from './rules/vue-language-options.js'
import cypressRules from './rules/cypress.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: eslintJs.configs.recommended,
	allConfig: eslintJs.configs.all,
})

const resolvePath = (file) => path.resolve(__dirname, file)
const gitignorePath = resolvePath('.gitignore')

export default [
	// Cypress global configurations
	pluginCypress.configs.globals,

	// Include `.gitignore` for ignored files
	includeIgnoreFile(gitignorePath),

	// Base ESLint and Prettier configurations
	...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),

	// Environment settings
	...compat.env({ es2020: true, node: true }),

	// Global ignores
	{
		ignores: [
			'**/dist/',
			'**/node_modules/',
			'**/public/',
			'**/build/',
			'**/.cache/',
			'**/.vscode/',
			'**/*.min.js',
			'**/*.bundle.js',
		],
	},

	// General JavaScript and Vue configurations
	{
		files: ['**/*.{js,vue}'],
		languageOptions,
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-debugger': 'warn',
			quotes: ['error', 'single'],
			...vueRules,
		},
	},

	// Prettier-specific configurations
	{
		files: ['**/*.{js,vue,ts}'],
		plugins: { prettier: prettierPlugin },
		rules: {
			'prettier/prettier': 'error',
		},
	},

	// Vue-specific configurations
	...vue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		plugins: {
			vue,
		},
		languageOptions: vueLanguageOptions,
		rules: vueRules,
	},

	// Cypress-specific configurations
	{
		plugins: { pluginCypress },
		files: ['**/*.spec.cy.js'],
		ignores: ['cypress.config.js'],
		languageOptions: {
			sourceType: 'module',
			globals: { ...globals.node, ...globals.amd },
		},
		rules: cypressRules,
	},
]

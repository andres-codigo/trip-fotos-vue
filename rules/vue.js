export default {
	'vue/multi-word-component-names': 'off',
	'vue/html-indent': 'off',
	'vue/max-attributes-per-line': [
		'error',
		{
			singleline: 1,
			multiline: 1,
		},
	],
	'vue/html-self-closing': 'off',
	'vue/html-closing-bracket-newline': 'off',
	'vue/singleline-html-element-content-newline': [
		'error',
		{
			ignoreWhenNoAttributes: true,
			ignoreWhenEmpty: true,
			ignores: ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
	],
}

import vueParser from 'vue-eslint-parser'

import languageOptions from './language-options.js'

export default {
	parser: vueParser,
	...languageOptions,
}

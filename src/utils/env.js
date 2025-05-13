export const isNode = () => {
	return typeof process !== 'undefined' && typeof process.env !== 'undefined'
}

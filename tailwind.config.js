/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.tsx',
		'./slices/**/*.tsx'
	],
	theme: {
		extend: {
			colors: {
				greenBrand: '#6D8B74',
			}
		},
	},
	plugins: [],
}

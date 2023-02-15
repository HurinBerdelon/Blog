/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.tsx',
		'./slices/**/*.tsx'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				greenBrand: '#6D8B74',
				greenBrandDark: '#3D4D3E',
				textDark: '#2B332C',
				textLight: '#FFF9F2',
				backgroundDark: '#242525',
				grayBrand: '#DDD8D1'
			},
			fontFamily: {
				poppins: 'Poppins'
			}
		},
	},
	plugins: [],
}

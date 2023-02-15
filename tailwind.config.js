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
				greenBrandDark: '#3D4D3E',
				textDark: '#2B332C',
				textLight: '#FFF9F2',
				backgroundDark: '#242525',
				grayBrand: '#525254'
			},
			fontFamily: {
				poppins: 'Poppins'
			}
		},
	},
	plugins: [],
}

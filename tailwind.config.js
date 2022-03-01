module.exports = {
	mode: 'jit',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				Montserrat: [`'Montserrat', sans-serif`],
			},
			colors: {
				'airbnb-red': '#213053',
				'airbnb-black': '#222222',
			},
			backgroundImage: {
				'home-bg-image': "url('/home-bg-image.webp')",
			},
		},
	},
	plugins: [],
}

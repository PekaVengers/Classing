export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			bgBlack: '#212325',
  			lightBlue: '#9CDAF1',
  			darkBlue: '#368186',
  			lightRed: '#F4CBB2',
  			lightGrey: '#ABABAB',
  			darkGrey: '#2E3136'
  		},
  		fontFamily: {
  			primary: 'Inter',
  			secondary: 'Borel'
  		},
  		screens: {
  			xxl: '1751px',
  			mmd: '851px',
  			gsm: '571px',
  			msm: '491px',
  			vsm: '441px',
  			vvsm: '351px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
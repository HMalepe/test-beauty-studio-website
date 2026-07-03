import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: '#CCE600',
        coral: '#FF5C54',
        offwhite: '#E9E9E9',
        ink: '#000000',
        paper: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-display': {
          fontSize: 'clamp(2.25rem, 8vw, 3.5rem)',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          fontWeight: '700',
          '@media (min-width: 1024px)': {
            fontSize: '56px',
          },
        },
        '.text-hero': {
          fontSize: 'clamp(3rem, 11vw, 9rem)',
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
          fontWeight: '800',
        },
        '.text-play': {
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          lineHeight: '0.9',
          letterSpacing: '-0.04em',
          fontWeight: '800',
        },
      })
    }),
  ],
}

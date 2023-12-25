import colors from './colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
    },
    colors,
    borderRadius: {
      none: 0,
      DEFAULT: '8px',
      md: '10px',
      lg: '12px',
      xl: '14px',
      xxl: '20px',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        'sf-pro': ['var(--font-sfpro)'],
        'sf-pro-expanded': ['var(--font-sfpro-expanded)'],
      },
      fontSize: {
        large: '54px',
        'mb-large': '32px',
      },
    },

    variants: {
      textColor: ['responsive', 'hover', 'focus', 'focus-within'],
    },
  },
  plugins: [require('tailwindcss-animated')],
};

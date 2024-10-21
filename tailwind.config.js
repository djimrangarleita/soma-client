/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Times New Roman', 'serif'],
    },
    extend: {
      colors: {
        'primary': '#003A9B',
        'primary-dark': '#003072',
        'primary-light': '#2760be',
        'secondary': '#505050',
        'soft-white': '#f7f7f7',
      },
    },
  },
  plugins: [],
}


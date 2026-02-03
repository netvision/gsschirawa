/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fde6e4',
          200: '#fad1cd',
          300: '#f7aca8',
          400: '#f17e77',
          500: '#e8544c',
          600: '#d53a31',
          700: '#b32f27',
          800: '#942a24',
          900: '#7b2824',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e5fe',
          300: '#7cd0fd',
          400: '#36b8fa',
          500: '#0c9feb',
          600: '#0180c9',
          700: '#0266a3',
          800: '#065586',
          900: '#0b476f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

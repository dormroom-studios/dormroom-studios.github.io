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
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d6cbff',
          300: '#b9a3ff',
          400: '#9a71ff',
          500: '#8a2be2', // Main primary color
          600: '#7c18d4',
          700: '#6b14b8',
          800: '#591496',
          900: '#4b137a',
          950: '#2e0b4d',
        },
        secondary: {
          50: '#ecfdfd',
          100: '#d0f7f7',
          200: '#a8eeef',
          300: '#70e2e3',
          400: '#3ad1d4',
          500: '#14b8a6', // Main secondary color
          600: '#0b9c9c',
          700: '#0e7c7c',
          800: '#116464',
          900: '#135353',
          950: '#032f2f',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd3',
          200: '#ffdca5',
          300: '#ffc26b',
          400: '#ffa033',
          500: '#f97316', // Main accent color
          600: '#e85d0a',
          700: '#c14a08',
          800: '#9a3b0c',
          900: '#7e320f',
          950: '#441705',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#121212', // Dark background
          950: '#0d0d0d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(138, 43, 226, 0.3)',
      },
    },
  },
  plugins: [],
}
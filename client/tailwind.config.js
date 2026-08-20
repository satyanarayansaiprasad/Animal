/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          dark: '#351809',
          header: '#4A230F',
          light: '#5C2D15',
          border: '#6B381C',
        },
        brand: {
          orange: '#E87722',
          'orange-hover': '#D66611',
          gold: '#D4AF37',
          cream: '#FBF8F3',
          sand: '#F4ECE1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          sand: '#FBF8F3',
          bordered: '#EFE6D8',
        },
        bodytext: {
          DEFAULT: '#2A1F19',
          muted: '#7A6B63',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Cairo', 'sans-serif'],
        display: ['Cairo', 'IBM Plex Sans Arabic', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(74, 35, 15, 0.08)',
        'warm-hover': '0 10px 30px -4px rgba(232, 119, 34, 0.2)',
      }
    },
  },
  plugins: [],
}

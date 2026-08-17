/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#F6F1E7',
          light: '#FAF7F2',
          dark: '#EAE3D2',
        },
        surface: {
          DEFAULT: '#FFFDF9',
          card: '#FFFFFF',
          bordered: '#EFE7DA',
        },
        charcoal: {
          DEFAULT: '#16302B',
          light: '#23443D',
          dark: '#0E211D',
        },
        clay: {
          DEFAULT: '#B85C2E',
          hover: '#A04E24',
          light: '#F5E8E1',
        },
        teal: {
          DEFAULT: '#2E6F63',
          hover: '#24594E',
          light: '#E6F0EE',
        },
        bodytext: {
          DEFAULT: '#2A241E',
          muted: '#8B8175',
          light: '#A3998C',
        },
        gold: {
          DEFAULT: '#B8862E',
          light: '#F8F1E3',
        },
      },
      fontFamily: {
        display: ['Cairo', 'sans-serif'],
        body: ['IBM Plex Sans Arabic', 'IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        warm: '0 4px 20px -2px rgba(42, 36, 30, 0.06)',
        'warm-hover': '0 10px 30px -4px rgba(42, 36, 30, 0.12)',
        'card': '0 2px 12px 0 rgba(22, 48, 43, 0.04)',
      },
    },
  },
  plugins: [],
};

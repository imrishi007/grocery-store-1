/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#42A5F5',
          500: '#1E88E5',
          700: '#1565C0',
        },
        accent: '#FF7043',
        success: '#2E7D32',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce': 'bounce 0.6s ease-in-out',
      },
      aspectRatio: {
        'square': '1 / 1',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
      }
    },
  },
  plugins: [],
};
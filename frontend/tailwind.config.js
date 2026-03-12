/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './layouts/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
    './services/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dbe5ff',
          200: '#9bb9ff',
          400: '#4890ff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#162c8f'
        },
        accent: '#10b981'
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.25)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(37,99,235,0.12), transparent 35%), linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0))'
      }
    }
  },
  plugins: []
};

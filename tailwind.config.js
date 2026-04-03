/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#1a1d27',
        'surface-hover': '#232733',
        'accent-primary': '#6366f1',
        'accent-hover': '#4f46e5',
        'success': '#10b981',
        'success-bg': 'rgba(16, 185, 129, 0.15)',
        'danger': '#ef4444',
        'danger-bg': 'rgba(239, 68, 68, 0.15)',
        'warning': '#f59e0b',
        'warning-bg': 'rgba(245, 158, 11, 0.15)',
        'border-color': '#334155'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

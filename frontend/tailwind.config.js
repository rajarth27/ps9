/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mining: {
          950: '#070a0f',
          900: '#0d121c',
          850: '#111724',
          800: '#182133',
          700: '#222f47',
          600: '#324463',
          500: '#486088',
        },
        manganese: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        satellite: {
          light: '#7dd3fc',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          glow: 'rgba(56, 189, 248, 0.15)',
        },
        amber: {
          DEFAULT: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        critical: {
          DEFAULT: '#ef4444',
          glow: 'rgba(239, 68, 68, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'panel-hover': '0 8px 30px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(16, 185, 129, 0.2)',
        'glow-green': '0 0 25px rgba(16, 185, 129, 0.2)',
        'glow-blue': '0 0 25px rgba(56, 189, 248, 0.2)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.2)',
        'glow-red': '0 0 25px rgba(239, 68, 68, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}

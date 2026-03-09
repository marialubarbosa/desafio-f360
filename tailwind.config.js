/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/style.css',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '40px',
      },
    },
    extend: {
      colors: {
        primary: '#1313EC',
        secondary: '#1E1E9C',
        terciary: '#F0F0FF',
        quaternary: '#DBDBFF',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F59E0B',
        neutral: {
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#475569',
          700: '#1E293B',
          800: '#0F172A',
          900: '#101022',
        }
      },
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
    }
  },
  safelist: [
    'font-manrope',
  ],
  plugins: []
};

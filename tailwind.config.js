/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: '#22d3ee', dark: '#06b6d4', light: '#67e8f9' },
        dark: { DEFAULT: '#0a0a0a', 2: '#111111', 3: '#1a1a1a', 4: '#222222' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: { 'grid': '60px 60px' },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'marquee': 'marquee 20s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
}

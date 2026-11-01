/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F4EE',
        ledger: '#EBE7DF',
        'ledger-light': '#F0ECE4',
        ink: '#141413',
        'ink-muted': '#57554E',
        'ink-light': '#8E8A7F',
        ochre: '#D94E1F',
        'ochre-bg': '#FBECE8',
        'stamp-green': '#1B5E20',
        'stamp-green-bg': '#EAF3EB',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

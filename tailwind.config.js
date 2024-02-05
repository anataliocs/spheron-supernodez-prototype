module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B4A',
      },
      screens: {
        tablet: '768px',
        desktop: '1440px',
        short: { raw: '(max-height: 1024px)' },
        shorter: { raw: '(max-height: 900px)' },
      },
      boxShadow: {
        custom: '0px 26px 69px rgba(0, 0, 0, 0.46)',
      },
      backgroundImage: {
        // eslint-disable-next-line
        'gradient-border-to-b': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23fff' stop-opacity='100%25'/%3E%3Cstop offset='100%25' stop-color='%23fff' stop-opacity='12%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='1'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'gradient-border-to-t': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23fff' stop-opacity='10%25'/%3E%3Cstop offset='100%25' stop-color='%23fff' stop-opacity='40%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='1'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'gradient-border-error-to-b': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FF6B4A%0A' stop-opacity='100%25'/%3E%3Cstop offset='100%25' stop-color='%23FF6B4A%0A' stop-opacity='12%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='4'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'gradient-border-error-to-t': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FF6B4A%0A' stop-opacity='10%25'/%3E%3Cstop offset='100%25' stop-color='%23FF6B4A%0A' stop-opacity='40%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='4'/%3E%3C/svg%3E")`,
      },
      fontFamily: {
        mono: ['Lineto Akkurat Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

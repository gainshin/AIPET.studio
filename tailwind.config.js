/** @type {import('tailwindcss').Config} */
// 色值一律走 CSS 變數（src/index.css :root），真相源在 stylepacks/aipet-loyal-shadow/DESIGN.md
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        raised: 'var(--c-raised)',
        line: 'var(--c-border)',
        'line-strong': 'var(--c-border-strong)',
        ink: 'var(--c-text)',
        muted: 'var(--c-muted)',
        faint: 'var(--c-faint)',
        accent: 'var(--c-accent)',
        'accent-dim': 'rgba(255, 154, 60, 0.45)',
        'accent-hover': 'var(--c-accent-hover)',
        'on-accent': 'var(--c-on-accent)',
        sage: 'var(--c-sage)',
        rust: 'var(--c-rust)',
        fern: 'var(--c-fern)',
      },
      fontFamily: {
        display: ['EB Garamond', 'Noto Serif TC', 'Georgia', 'serif'],
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        card: '24px',
        portrait: '18px',
      },
      letterSpacing: {
        kicker: '0.22em',
      },
    },
  },
  plugins: [],
}

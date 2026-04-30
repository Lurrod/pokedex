/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          pink: '#ec4899',
          purple: '#a855f7',
          green: '#22c55e',
          yellow: '#facc15',
          red: '#ef4444',
        },
        hud: {
          bg: '#020617',
          panel: '#0b1220',
          panelLight: '#111c33',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 12px rgba(34, 211, 238, 0.7), 0 0 24px rgba(34, 211, 238, 0.35)',
        'neon-pink': '0 0 12px rgba(236, 72, 153, 0.7), 0 0 24px rgba(236, 72, 153, 0.35)',
        'inner-glow': 'inset 0 0 30px rgba(34, 211, 238, 0.15)',
      },
      backgroundImage: {
        'shimmer': 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 18s linear infinite',
        'spin-reverse': 'spin 12s linear infinite reverse',
        'blink': 'blink 1.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scanline': 'scanline 3s ease-in-out infinite',
        'scan-h': 'scanH 2.4s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'grid-pan': 'gridPan 12s linear infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { top: '0%', transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', transform: 'translateY(0%)', opacity: '0' },
        },
        scanH: {
          '0%': { left: '0%', transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridPan: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(0, 60px, 0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '47%, 49%': { opacity: '0.65' },
          '48%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

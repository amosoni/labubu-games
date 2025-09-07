import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1', // Light pink
        secondary: '#98FB98', // Mint green
        accent: '#F97316', // Orange
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        'cute-purple': '#DDA0DD',
        'cute-blue': '#87CEEB',
        'cute-yellow': '#F0E68C',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(45deg, #FFB6C1, #98FB98, #87CEEB, #DDA0DD)',
        'gradient-cute': 'linear-gradient(135deg, #FFB6C1 0%, #98FB98 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
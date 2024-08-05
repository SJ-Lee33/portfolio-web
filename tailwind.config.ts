import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      soft: '#E6F0FA',

      primary: '#1E90FF',
      primarDark: '##0056b3',
      primaryDarker: '##003d80',
      primaryLight: '#63B8FF',
      primaryLighter: '#B0E0E6',

      neutral: '#333333',
      neutralLight: '#666666',
    },
    fontSize: {
      'display-l': `clamp(3.0rem, 2.5vw, 5.0rem)`,
      'display-m': `clamp(2.5rem, 2.0vw, 4.0rem)`,
      'display-s': `clamp(2.0rem, 1.75vw, 3.0rem)`,
      'headline-l': `clamp(2.0rem, 1.5vw, 3.0rem)`,
      'headline-m': `clamp(1.75rem, 1.25vw, 2.5rem)`,
      'headline-s': `clamp(1.5rem, 1.0vw, 2.0rem)`,
      'title-l': `clamp(1.5rem, 1.0vw, 2.0rem)`,
      'title-m': `clamp(1.25rem, 0.9vw, 1.75rem)`,
      'title-s': `clamp(1.0rem, 0.8vw, 1.5rem)`,
      'body-l': `clamp(1.0rem, 0.75vw, 1.25rem)`,
      'body-m': `clamp(0.875rem, 0.65vw, 1.125rem)`,
      'body-s': `clamp(0.75rem, 0.6vw, 1.0rem)`,
    },
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
  },
  plugins: [],
}
export default config

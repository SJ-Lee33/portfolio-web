import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px', // 사용자 정의 브레이크포인트
      },
    },
    colors: {
      soft: '#E6F0FA',

      primary: '#1E90FF',
      primaryDark: '#0056b3',
      primaryDarker: '#003d80',
      primaryLight: '#63B8FF',
      primaryLighter: '#B0E0E6',

      secondary: '#5E78FF',

      red: '#FF4500',

      neutral: '#333333',
      neutralLight: '#666666',
      neutralLighter: '#f3f3f3',

      black: '#000000',
      white: '#ffffff',
    },
    fontSize: {
      'display-l': `clamp(3.0rem, 2.5vw, 5.0rem)`,
      'display-m': `clamp(2.5rem, 2.0vw, 4.0rem)`,
      'display-s': `clamp(2.2rem, 1.75vw, 3.0rem)`,
      'headline-l': `clamp(2.0rem, 1.5vw, 3.0rem)`,
      'headline-m': `clamp(1.75rem, 1.25vw, 2.5rem)`,
      'headline-s': `clamp(1.6rem, 1.0vw, 2.0rem)`,
      'title-l': `clamp(1.5rem, 1.0vw, 2.0rem)`,
      'title-m': `clamp(1.3rem, 0.9vw, 1.75rem)`,
      'title-s': `clamp(1.1rem, 0.8vw, 1.5rem)`,
      'body-l': `clamp(1.0rem, 0.75vw, 1.25rem)`,
      'body-m': `clamp(0.94rem, 0.65vw, 1.2rem)`,
      'body-s': `clamp(0.75rem, 0.6vw, 1.0rem)`,
      caption: `clamp(0.6rem, 0.6vw, 0.8rem)`,
    },
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
  },
  plugins: [],
}
export default config

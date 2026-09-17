/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nx: {
          ink: {
            950: '#040506',
            900: '#07090b',
            800: '#0e1216',
            700: '#161c23',
            600: '#212933',
            500: '#323d4b',
          },
          paper: {
            0: '#ffffff',
            100: '#f7f4ee',
            200: '#eeeae2',
            300: '#e3ded3',
          },
          yellow: {
            300: '#fff066',
            400: '#fbe052',
            500: '#f2d02f',
            600: '#d4b31a',
          },
          stone: {
            200: '#ded9ce',
            300: '#c5bfb2',
            400: '#948e82',
            500: '#676258',
            600: '#47433c',
          },
          line: {
            dark: 'rgba(247, 244, 238, 0.18)',
            light: 'rgba(7, 9, 11, 0.16)',
          }
        }
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.12em',
        ultra: '0.22em',
      },
    },
  },
  plugins: [],
}

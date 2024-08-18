/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // cursor: {
      //   pointer: 'url("/src/assets/cursor/Pointer2.cur"), pointer',
      //   default: 'url("/src/assets/cursor/Normal.cur"), auto',
      //   grab: 'url("/src/assets/cursor/Move.cur"), grab',
      // }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,vue,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 6px 40px 0px #00000040',
      }
    },
  },
  plugins: [],
}

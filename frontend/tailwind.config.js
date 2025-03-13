/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#F9FAFB",
        primary: "#409EFF",
        "gray-custom": "#6F7882"
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #0072ff, #00c6ff)",
      },
    },
  },
  plugins: [],
};

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
        primary: "#0e8aff",
        secondary: "#FF7979",
        "gray-custom": "#6F7882",
      },
      backgroundImage: {
        // "primary-gradient": "linear-gradient(to right, #0072ff, #00c6ff)",
        "primary-gradient":
          "linear-gradient(to right, #00c6fb 0%, #005bea 100%);",

        "secondary-gradient":
          "linear-gradient(90deg, #FC9D44 -20%, #FF4969 115%)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
    screens: {
      xs: "470px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["Fira Code"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      grey: "#D1D5DB",
      dark: "#252334",
      darker: "#241b2f",
      green: "#91e7b8",
      pink: "#ee84d6",
      yellow: "#f7dd71",
    },
    extend: {},
  },
  plugins: [],
};

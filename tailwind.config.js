module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#0F766E",
        primary: "#86393c",
        secondary: "#a4686a",
        error: "#cc0000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

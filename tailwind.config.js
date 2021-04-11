module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#223344",
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

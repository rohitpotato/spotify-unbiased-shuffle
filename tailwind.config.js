module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  // mode: "jit",
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "spotify-green": "#1ed760",
        "spotify-dark-green": "#1db954",
        light: "#ffffff",
        dark: "#191414",
        "dark-mode-gray": "#212121",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary_100: "#4CBFBF",
        primary_800: "#004B4B",
        primary: "#1ABAB9",
        darker_grey: "#343443",
        grey_light: "#737373",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

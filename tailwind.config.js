const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      spartan: ["Spartan", "Segoe UI Semibold", "sans-serif"],
    },
    extend: {
      colors: {
        "body-color": "#F2F2F2",
        "title-color": "#373B53",
        "nav-base": "#494E6E",
        "purple-base": "#7C5DFA",
        "purple-light": "#9277FF",
        "muted-color": "#888EB0",
        "moon-color": "#7E88C3",
        "moon-hover": "#DFE3FA",
        "sun-color": "#858BB2",
        "light-gray": "#F9FAFE",

        paid: {
          bg: "hsl(var(--paid) / 0.15)",
          text: "hsl(var(--paid))",
          dark: "hsl(var(--paid))",
        },
        pending: {
          bg: "hsl(var(--pending) / 0.15)",
          text: "hsl(var(--pending))",
          dark: "hsl(var(--pending))",
        },
        draft: {
          bg: "hsl(var(--draft) / 0.15)",
          text: "hsl(var(--draft-light))",
          dark: "hsl(var(--draft-dark))",
        },

        "body-color-dark": "#1E2139",
        "title-color-dark": "var(--title-color)",
        "nav-dark": "#252945",
        "purple-dark": "#7C5DFA",
        "purple-light-dark": "#9277FF",
        "muted-color-dark": "#DFE3FA",
        "moon-color-dark": "#7E88C3",
        "moon-hover-dark": "#DFE3FA",
        "sun-color-dark": "#858BB2",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({});
      addComponents({
        ".custom-checkbox": {
          position: "relative",
          appearance: "none",
          backgroundColor: "#DFE3FA",
          width: "16px",
          height: "16px",
          border: "1px solid transparent",
          borderRadius: "2px",
          "&:hover": {
            border: "1px solid #7C5DFA",
          },
          "&:checked": {
            backgroundColor: "#7C5DFA",
          },
          "&::after": {
            content: `url('./src/assets/icons/icon-check.svg')`,
            display: "block",
            position: "absolute",
            top: "-3px",
            left: "2px",
            opacity: "0",
          },
          "&:checked::after": {
            opacity: " 1",
          },
        },
      });
      addUtilities({});
    }),
  ],
};

const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        notif: {
          primary: {
            red: "hsl(1,90%,64%)",
            blue: "hsl(219,85%,26%)",
          },
          neutral: {
            100: "hsl(0,0%,100%)",
            200: "hsl(210,60%,98%)",
            300: "hsl(211,68%,94%)",
            400: "hsl(205,33%,90%)",
            500: "hsl(219,14%,63%)",
            600: "hsl(219,12%,42%)",
            700: "hsl(224,21%,14%)",
          },
        },
      },
      fontFamily: {
        "plus-jakarta": ["var(--font-plus-jakarta)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

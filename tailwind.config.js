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
        expenses: {
          primary: {
            red: "hsl(10,79%,65%)",
            cyan: "hsl(186,34%,60%)",
          },
          neutral: {
            100: "hsl(33,100%,98%)",
            200: "hsl(27,66%,92%)",
            300: "hsl(28,10%,53%)",
            400: "hsl(25,47%,15%)",
          },
        },
        introdrop: {
          neutral: {
            100: "hsl(0,0%,98%)",
            200: "hsl(0,0%,41%)",
            300: "hsl(0,0%,8%)",
          },
        },
        advice: {
          primary: {
            cyan: "hsl(193,38%,86%)",
            green: "hsl(150,100%,66%)",
          },
          neutral: {
            100: "hsl(217,19%,38%)",
            200: "hsl(217,19%,24%)",
            300: "hsl(218,23%,16%)",
          },
        },
        tracking: {
          primary: {
            blue: "hsl(246,80%,60%)",
            work: "hsl(15,100%,70%)",
            play: "hsl(195,74%,62%)",
            study: "hsl(348,100%,68%)",
            exercise: "hsl(145,58%,55%)",
            social: "hsl(264,64%,52%)",
            selfcare: "hsl(43,84%,65%)",
          },
          neutral: {
            100: "hsl(236,100%,87%)",
            200: "hsl(235,45%,61%)",
            300: "hsl(235,46%,20%)",
            400: "hsl(226,43%,10%)",
          },
        },
      },
      fontFamily: {
        "plus-jakarta": ["var(--font-plus-jakarta)", ...fontFamily.sans],
        "dm-sans": ["var(--font-dm-sans)", ...fontFamily.sans],
        epilogue: ["var(--font-epilogue)", ...fontFamily.sans],
        manrope: ["var(--font-manrope)", ...fontFamily.sans],
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

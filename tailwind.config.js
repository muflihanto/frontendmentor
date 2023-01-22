const { fontFamily } = require("tailwindcss/defaultTheme");
let plugin = require("tailwindcss/plugin");

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
        tip: {
          primary: "hsl(172,67%,45%)",
          neutral: {
            600: "hsl(183,100%,15%)",
            500: "hsl(186,14%,43%)",
            400: "hsl(184,14%,56%)",
            300: "hsl(185,41%,84%)",
            200: "hsl(189,41%,97%)",
            100: "hsl(0,0%,100%)",
          },
        },
        sunny: {
          primary: {
            red: "hsl(7,99%,70%)",
            yellow: "hsl(51,100%,49%)",
            "cyan-200": "hsl(167,40%,24%)",
            blue: "hsl(198,62%,26%)",
            "cyan-100": "hsl(168,34%,41%)",
          },
          neutral: {
            500: "hsl(212,27%,19%)",
            400: "hsl(213,9%,39%)",
            300: "hsl(232,10%,55%)",
            200: "hsl(210,4%,67%)",
            100: "hsl(0,0%,100%)",
          },
        },
        blogr: {
          primary: {
            red: {
              200: "hsl(356,100%,66%)",
              100: "hsl(355,100%,74%)",
            },
            blue: "hsl(208,49%,24%)",
          },
          neutral: {
            100: "hsl(0,0%,100%)",
            200: "hsl(240,2%,79%)",
            300: "hsl(207,13%,34%)",
            400: "hsl(240,10%,16%)",
          },
          gradient: {
            red: {
              100: "hsl(13,100%,72%)",
              200: "hsl(353,100%,62%)",
            },
            blue: {
              100: "hsl(237,23%,32%)",
              200: "hsl(237,17%,21%)",
            },
          },
        },
        testimonials: {
          primary: {
            violet: "hsl(263,55%,52%)",
            "gray-blue": "hsl(217,19%,35%)",
            "dark-blue": "hsl(219,29%,14%)",
            white: "hsl(0,0%,100%)",
          },
          neutral: {
            gray: "hsl(0,0%,81%)",
            grayblue: "hsl(210,46%,95%)",
          },
        },
        crowdfunding: {
          primary: {
            100: "hsl(176,50%,47%)",
            200: "hsl(176,72%,28%)",
          },
          neutral: {
            100: "hsl(0,0%,48%)",
            200: "hsl(0,0%,0%)",
          },
        },
        pricing: {
          primary: {
            cyan: {
              100: "hsl(174,77%,80%)",
              200: "hsl(174,86%,45%)",
            },
            red: {
              100: "hsl(14,92%,95%)",
              200: "hsl(15,100%,70%)",
            },
            blue: "hsl(226,100%,87%)",
          },
          neutral: {
            50: "hsl(0,0%,100%)",
            100: "hsl(230,100%,99%)",
            200: "hsl(224,65%,95%)",
            300: "hsl(223,50%,87%)",
            400: "hsl(225,20%,60%)",
            500: "hsl(227,35%,25%)",
          },
        },
        loopstudios: {
          primary: {
            white: "hsl(0,0%,100%)",
            black: "hsl(0,0%,0%)",
            grey: {
              100: "hsl(0,0%,55%)",
              200: "hsl(0,0%,41%)",
            },
          },
        },
      },
      fontFamily: {
        "plus-jakarta": ["var(--font-plus-jakarta)", ...fontFamily.sans],
        "dm-sans": ["var(--font-dm-sans)", ...fontFamily.sans],
        // epilogue: ["var(--font-epilogue)", ...fontFamily.sans],
        // manrope: ["var(--font-manrope)", ...fontFamily.sans],
        epilogue: ["Epilogue", ...fontFamily.sans],
        manrope: ["Manrope", ...fontFamily.sans],
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
        "space-mono": ["var(--font-space-mono)", ...fontFamily.mono],
        barlow: ["Barlow", ...fontFamily.sans],
        fraunces: ["Fraunces", ...fontFamily.serif],
        ubuntu: ["Ubuntu", ...fontFamily.sans],
        overpass: ["Overpass", ...fontFamily.sans],
        "barlow-semi-condensed": ["Barlow Semi Condensed", ...fontFamily.sans],
        commissioner: ["Commissioner", ...fontFamily.sans],
        josefin: ["Josefin Sans", ...fontFamily.sans],
        alata: ["Alata", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("thumb", ["&[type='range']::-webkit-slider-thumb", "&[type='range']::-moz-range-thumb", "&[type='range']::-ms-thumb"]);
      addVariant("track", ["&[type='range']::-webkit-slider-runnable-track", "&[type='range']::-moz-range-track", "&[type='range']::-ms-track"]);
    }),
  ],
};

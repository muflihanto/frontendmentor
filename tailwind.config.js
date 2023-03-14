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
        "huddle-curve": {
          primary: {
            pink: {
              200: "hsl(322,100%,66%)",
              100: "hsl(321,100%,78%)",
            },
            red: "hsl(0,100%,63%)",
          },
          neutral: {
            700: "hsl(192,100%,9%)",
            100: "hsl(207,100%,98%)",
          },
        },
        "huddle-alternate": {
          primary: "hsl(322,100%,66%)",
          neutral: {
            100: "hsl(193,100%,96%)",
            200: "hsl(208,11%,55%)",
            300: "hsl(192,100%,9%)",
          },
        },
        coding: {
          primary: {
            200: "hsl(240,38%,20%)",
            100: "hsl(240,18%,77%)",
          },
        },
        social: {
          primary: {
            green: "hsl(163,72%,41%)",
            red: "hsl(356,69%,56%)",
            facebook: "hsl(208,92%,53%)",
            twitter: "hsl(203,89%,53%)",
            instagram: {
              yellow: "hsl(37,97%,70%)",
              pink: "hsl(329,70%,58%)",
            },
            youtube: "hsl(348,97%,39%)",
          },
          toggle: {
            dark: {
              blue: "hsl(210,78%,56%)",
              green: "hsl(146,68%,55%)",
            },
            light: "hsl(230,22%,74%)",
          },
          neutral: {
            dark: {
              500: "hsl(230,17%,14%)",
              400: "hsl(232,19%,15%)",
              300: "hsl(228,28%,20%)",
              200: "hsl(228,34%,66%)",
              100: "hsl(0,0%,100%)",
            },
            light: {
              100: "hsl(0,0%,100%)",
              200: "hsl(225,100%,98%)",
              300: "hsl(227,47%,96%)",
              400: "hsl(228,12%,44%)",
              500: "hsl(230,17%,14%)",
            },
          },
        },
        insure: {
          primary: {
            200: "hsl(256,26%,20%)",
            100: "hsl(216,30%,68%)",
          },
          neutral: {
            300: "hsl(270,9%,17%)",
            200: "hsl(273,4%,51%)",
            100: "hsl(0,0%,98%)",
          },
        },
        "pricing-toggle": {
          primary: {
            gradient: {
              100: "hsl(236,72%,79%)",
              200: "hsl(237,63%,64%)",
            },
          },
          neutral: {
            100: "hsl(240,78%,98%)",
            200: "hsl(234,14%,74%)",
            300: "hsl(233,13%,49%)",
            400: "hsl(232,13%,33%)",
          },
        },
        "project-tracking": {
          "primary-red": "hsl(0,100%,68%)",
          neutral: {
            400: "hsl(230,29%,20%)",
            300: "hsl(230,11%,40%)",
            200: "hsl(231,7%,65%)",
            100: "hsl(207,33%,95%)",
          },
        },
        "product-review": {
          primary: {
            cyan: "hsl(158,36%,37%)",
            cream: "hsl(30,38%,92%)",
          },
          neutral: {
            300: "hsl(212,21%,14%)",
            200: "hsl(228,12%,48%)",
            100: "hsl(0,0%,100%)",
          },
        },
        rating: {
          "primary-orange": "hsl(25,97%,53%)",
          neutral: {
            100: "hsl(0,0%,100%)",
            200: "hsl(217,12%,63%)",
            300: "hsl(216,12%,54%)",
            400: "hsl(213,19%,18%)",
            500: "hsl(216,12%,8%)",
          },
        },
        qr: {
          100: "hsl(0,0%,100%)",
          200: "hsl(212,45%,89%)",
          300: "hsl(220,15%,55%)",
          400: "hsl(218,44%,22%)",
        },
        nft: {
          primary: {
            blue: "hsl(215,51%,70%)",
            cyan: "hsl(178,100%,50%)",
          },
          neutral: {
            400: "hsl(217,54%,11%)",
            300: "hsl(216,50%,16%)",
            200: "hsl(215,32%,27%)",
            100: "hsl(0,0%,100%)",
          },
        },
        "order-summary": {
          primary: {
            100: "hsl(225,100%,94%)",
            200: "hsl(245,75%,52%)",
          },
          neutral: {
            100: "hsl(225,100%,98%)",
            200: "hsl(224,23%,55%)",
            300: "hsl(223,47%,23%)",
          },
        },
        "stats-preview": {
          primary: {
            blue: {
              200: "hsl(233,47%,7%)",
              100: "hsl(244,38%,16%)",
            },
            violet: "hsl(277,64%,61%)",
          },
          neutral: {
            100: "hsl(0,0%,100%)",
            200: "hsla(0,0%,100%,0.75)",
            300: "hsla(0,0%,100%,0.6)",
          },
        },
        "3-column": {
          primary: {
            orange: "hsl(31,77%,52%)",
            cyan: {
              100: "hsl(184,100%,22%)",
              200: "hsl(179,100%,13%)",
            },
          },
          neutral: {
            100: "hsla(0,0%,100%,0.75)",
            200: "hsl(0,0%,95%)",
          },
        },
        "intro-signup": {
          primary: {
            red: "hsl(0,100%,74%) ",
            green: "hsl(154,59%,51%)",
          },
          "accent-blue": "hsl(248,32%,49%)",
          neutral: {
            200: "hsl(249,10%,26%) ",
            100: "hsl(246,25%,77%)",
          },
        },
        "four-card": {
          primary: {
            red: "hsl(0,78%,62%)",
            cyan: "hsl(180,62%,55%)",
            orange: "hsl(34,97%,64%)",
            blue: "hsl(212,86%,64%)",
          },
          neutral: {
            300: "hsl(234,12%,34%)",
            200: "hsl(229,6%,66%)",
            100: "hsl(0,0%,98%)",
          },
        },
        "profile-card": {
          primary: {
            cyan: "hsl(185,75%,39%)",
            "dark-blue": {
              200: "hsl(229,23%,23%)",
              100: "hsl(227,10%,46%)",
            },
          },
          neutral: "hsl(0,0%,59%)",
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
        "open-sans": ["Open Sans", ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
        karla: ["Karla", ...fontFamily.sans],
        "dm-serif-display": ["DM Serif Display", ...fontFamily.serif],
        montserrat: ["Montserrat", ...fontFamily.sans],
        "barlow-condensed": ["Barlow Condensed", ...fontFamily.sans],
        outfit: ["Outfit", ...fontFamily.sans],
        "red-hat-display": ["Red Hat Display", ...fontFamily.sans],
        "lexend-deca": ["Lexend Deca", ...fontFamily.sans],
        "big-shoulders-display": ["Big Shoulders Display", ...fontFamily.sans],
        "kumbh-sans": ["Kumbh Sans", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("thumb", ["&[type='range']::-webkit-slider-thumb", "&[type='range']::-moz-range-thumb", "&[type='range']::-ms-thumb"]);
      addVariant("track", ["&[type='range']::-webkit-slider-runnable-track", "&[type='range']::-moz-range-track", "&[type='range']::-ms-track"]);
    }),
    require("@tailwindcss/line-clamp"),
  ],
  darkMode: "class",
};

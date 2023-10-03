import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "../../public/huddle-landing-page-with-curved-sections/fonts/Poppins-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/huddle-landing-page-with-curved-sections/fonts/Poppins-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/age-calculator-app/assets/fonts/Poppins-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../../public/age-calculator-app/assets/fonts/Poppins-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/age-calculator-app/assets/fonts/Poppins-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../../public/age-calculator-app/assets/fonts/Poppins-ExtraBoldItalic.ttf",
      style: "italic",
      weight: "800",
    },
  ],
  variable: "--font-poppins",
});

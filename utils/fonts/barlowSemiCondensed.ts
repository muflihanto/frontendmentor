import localFont from "next/font/local";

export const barlowSemiCondensed = localFont({
  src: [
    {
      path: "../../public/testimonials-grid-section/fonts/BarlowSemiCondensed-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/testimonials-grid-section/fonts/BarlowSemiCondensed-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/testimonials-grid-section/fonts/BarlowSemiCondensed-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/testimonials-grid-section/fonts/BarlowSemiCondensed-MediumItalic.ttf",
      style: "italic",
      weight: "500",
    },
    {
      path: "../../public/testimonials-grid-section/fonts/BarlowSemiCondensed-SemiBoldItalic.ttf",
      style: "italic",
      weight: "600",
    },
  ],
  variable: "--font-barlow-semi-condensed",
});

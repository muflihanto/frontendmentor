import localFont from "next/font/local";

export const barlowCondensed = localFont({
  src: [
    {
      path: "../../public/project-tracking-intro-component/fonts/BarlowCondensed-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/project-tracking-intro-component/fonts/BarlowCondensed-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-barlow-condensed",
});

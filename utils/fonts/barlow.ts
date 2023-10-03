import localFont from "next/font/local";

export const barlow = localFont({
  src: [
    {
      path: "../../public/sunnyside-agency-landing-page/fonts/Barlow-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/sunnyside-agency-landing-page/fonts/Barlow-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/sunnyside-agency-landing-page/fonts/Barlow-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-barlow",
});

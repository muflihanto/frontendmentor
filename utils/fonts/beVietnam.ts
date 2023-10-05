import localFont from "next/font/local";

export const beVietnam = localFont({
  src: [
    {
      path: "../../public/manage-landing-page/fonts/BeVietnam-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../public/manage-landing-page/fonts/BeVietnam-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/manage-landing-page/fonts/BeVietnam-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/manage-landing-page/fonts/BeVietnam-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-be-vietnam",
});

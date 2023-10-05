import localFont from "next/font/local";

const _beVietnamPro = localFont({
  src: [
    {
      path: "../public/manage-landing-page/fonts/BeVietnamPro-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnamPro-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnamPro-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnamPro-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-be-vietnam-pro",
});

export const beVietnamPro = `${_beVietnamPro.variable} font-be-vietnam-pro`;

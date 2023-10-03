import localFont from "next/font/local";

export const ubuntu = localFont({
  src: [
    {
      path: "../../public/blogr-landing-page/fonts/Ubuntu-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/blogr-landing-page/fonts/Ubuntu-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/blogr-landing-page/fonts/Ubuntu-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-ubuntu",
});

import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "../../public/newsletter-sign-up-with-success-message/assets/fonts/Roboto-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/newsletter-sign-up-with-success-message/assets/fonts/Roboto-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-roboto",
});

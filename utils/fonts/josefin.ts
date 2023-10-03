import localFont from "next/font/local";

export const josefin = localFont({
  src: [
    {
      path: "../../public/loopstudios-landing-page/fonts/JosefinSans-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../public/base-apparel-coming-soon/fonts/JosefinSans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/base-apparel-coming-soon/fonts/JosefinSans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/todo-app/fonts/JosefinSans-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-josefin",
});

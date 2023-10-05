import localFont from "next/font/local";

export const baiJamjuree = localFont({
  src: [
    {
      path: "../../public/clipboard-landing-page/fonts/BaiJamjuree-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/clipboard-landing-page/fonts/BaiJamjuree-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-bai-jamjuree",
});

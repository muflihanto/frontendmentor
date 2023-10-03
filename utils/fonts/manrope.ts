import localFont from "next/font/local";

const _manrope = localFont({
  src: "../../public/advice-generator-app/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
});

export const manrope = `${_manrope.variable} font-manrope`;

import localFont from "next/font/local";

const _epilogue = localFont({
  src: "../../public/intro-section-with-dropdown-navigation/fonts/Epilogue-VariableFont_wght.ttf",
  variable: "--font-epilogue",
});

export const epilogue = `${_epilogue.variable} font-epilogue`;

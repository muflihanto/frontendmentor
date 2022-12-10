import localFont from "@next/font/local";
import { DM_Sans, Epilogue } from "@next/font/google";

const plusJakartaSans = localFont({ src: "../public/notifications-page/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf", variable: "--font-plus-jakarta" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "700"] });
const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-epilogue", weight: ["400", "500", "700"] });

export const plusJakartaSansVar = plusJakartaSans.variable;
export const dmSansVar = dmSans.variable;
export const epilogueVar = epilogue.variable;

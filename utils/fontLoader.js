import localFont from "@next/font/local";
import { DM_Sans } from "@next/font/google";

const plusJakartaSans = localFont({ src: "../public/notifications-page/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf", variable: "--font-plus-jakarta" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "700"] });
// const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-epilogue", weight: ["400", "500", "700"] });
const epilogue = localFont({ src: "../public/intro-section-with-dropdown-navigation/fonts/Epilogue-VariableFont_wght.ttf", variable: "--font-epilogue" });
const manrope = localFont({ src: "../public/advice-generator-app/fonts/Manrope-VariableFont_wght.ttf", variable: "--font-manrope" });
const rubik = localFont({ src: "../public/time-tracking-dashboard/fonts/Rubik-VariableFont_wght.ttf", variable: "--font-rubik" });
const spaceMono = localFont({ src: "../public/tip-calculator-app/fonts/SpaceMono-Bold.ttf", variable: "--font-space-mono" });

export const plusJakartaSansVar = plusJakartaSans.variable;
export const dmSansVar = dmSans.variable;
export const epilogueVar = epilogue.variable;
export const manropeVar = manrope.variable;
export const rubikVar = rubik.variable;
export const spaceMonoVar = spaceMono.variable;

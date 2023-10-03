import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";

/* -------------------------------------------------------------------------- */
/*                                Google Fonts                                */
/* -------------------------------------------------------------------------- */

const _dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

/* -------------------------------------------------------------------------- */
/*                                 Local Fonts                                */
/* -------------------------------------------------------------------------- */

const _plusJakartaSans = localFont({
  src: "../public/notifications-page/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
});

const _epilogue = localFont({
  src: "../public/intro-section-with-dropdown-navigation/fonts/Epilogue-VariableFont_wght.ttf",
  variable: "--font-epilogue",
});

const _manrope = localFont({
  src: "../public/advice-generator-app/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
});

const _rubik = localFont({
  src: "../public/time-tracking-dashboard/fonts/Rubik-VariableFont_wght.ttf",
  variable: "--font-rubik",
});

const _spaceMono = localFont({
  src: "../public/tip-calculator-app/fonts/SpaceMono-Bold.ttf",
  variable: "--font-space-mono",
});

const _barlow = localFont({
  src: [
    {
      path: "../public/sunnyside-agency-landing-page/fonts/Barlow-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/sunnyside-agency-landing-page/fonts/Barlow-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/sunnyside-agency-landing-page/fonts/Barlow-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-barlow",
});

const _fraunces = localFont({
  src: "../public/sunnyside-agency-landing-page/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  style: "normal",
  variable: "--font-fraunces",
});

const _ubuntu = localFont({
  src: [
    {
      path: "../public/blogr-landing-page/fonts/Ubuntu-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/blogr-landing-page/fonts/Ubuntu-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/blogr-landing-page/fonts/Ubuntu-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-ubuntu",
});

const _overpass = localFont({
  src: "../public/blogr-landing-page/fonts/Overpass-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-overpass",
});

const _barlowSemiCondensed = localFont({
  src: [
    {
      path: "../public/testimonials-grid-section/fonts/BarlowSemiCondensed-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/testimonials-grid-section/fonts/BarlowSemiCondensed-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/testimonials-grid-section/fonts/BarlowSemiCondensed-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/testimonials-grid-section/fonts/BarlowSemiCondensed-MediumItalic.ttf",
      style: "italic",
      weight: "500",
    },
    {
      path: "../public/testimonials-grid-section/fonts/BarlowSemiCondensed-SemiBoldItalic.ttf",
      style: "italic",
      weight: "600",
    },
  ],
  variable: "--font-barlow-condensed",
});

const _commissioner = localFont({
  src: "../public/crowdfunding-product-page/fonts/Commissioner-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-commissioner",
});

const _josefin = localFont({
  src: [
    {
      path: "../public/loopstudios-landing-page/fonts/JosefinSans-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/base-apparel-coming-soon/fonts/JosefinSans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/base-apparel-coming-soon/fonts/JosefinSans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/todo-app/fonts/JosefinSans-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-josefin",
});

const _alata = localFont({
  src: "../public/loopstudios-landing-page/fonts/Alata-Regular.ttf",
  style: "normal",
  weight: "400",
  variable: "--font-alata",
});

const _openSans = localFont({
  src: "../public/huddle-landing-page-with-curved-sections/fonts/OpenSans-VariableFont_wdth,wght.ttf",
  style: "normal",
  variable: "--font-open-sans",
});

const _poppins = localFont({
  src: [
    {
      path: "../public/huddle-landing-page-with-curved-sections/fonts/Poppins-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/age-calculator-app/assets/fonts/Poppins-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/huddle-landing-page-with-curved-sections/fonts/Poppins-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/huddle-landing-page-with-curved-sections/fonts/Poppins-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/age-calculator-app/assets/fonts/Poppins-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../public/age-calculator-app/assets/fonts/Poppins-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../public/age-calculator-app/assets/fonts/Poppins-ExtraBoldItalic.ttf",
      style: "italic",
      weight: "800",
    },
  ],
  variable: "--font-poppins",
});

const _inter = localFont({
  src: "../public/coding-bootcamp-testimonials-slider/fonts/Inter-VariableFont.ttf",
  style: "normal",
  variable: "--font-inter",
});

const _karla = localFont({
  src: "../public/insure-landing-page/fonts/Karla-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-karla",
});

const _dmSerifDisplay = localFont({
  src: "../public/insure-landing-page/fonts/DMSerifDisplay-Regular.ttf",
  style: "normal",
  weight: "400",
  variable: "--font-dm-serif-display",
});

const _montserrat = localFont({
  src: "../public/pricing-component-with-toggle/fonts/Montserrat-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-montserrat",
});

const _barlowCondensed = localFont({
  src: [
    {
      path: "../public/project-tracking-intro-component/fonts/BarlowCondensed-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/project-tracking-intro-component/fonts/BarlowCondensed-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-barlow-condensed",
});

const _outfit = localFont({
  src: "../public/qr-code-component/fonts/Outfit-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-outfit",
});

const _redHatDisplay = localFont({
  src: "../public/order-summary-component/fonts/RedHatDisplay-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-red-hat-display",
});

const _lexendDeca = localFont({
  src: "../public/stats-preview-card-component/fonts/LexendDeca-VariableFont_wght.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-lexend-deca",
});

const _bigShouldersDisplay = localFont({
  src: "../public/3-column-preview-card-component/fonts/BigShouldersDisplay-VariableFont_wght.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-big-shoulders-display",
});

const _kumbhSans = localFont({
  src: "../public/profile-card-component/fonts/KumbhSans-VariableFont_YOPQ,wght.ttf",
  style: "normal",
  variable: "--font-kumbh-sans",
});

const _leagueSpartan = localFont({
  src: "../public/social-proof-section/fonts/LeagueSpartan-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-league-spartan",
});

const _libreFranklin = localFont({
  src: "../public/ping-coming-soon-page/fonts/LibreFranklin-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-libre-franklin",
});

const _spaceGrotesk = localFont({
  src: "../public/interactive-card-details-form/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-space-grotesk",
});

const _raleway = localFont({
  src: "../public/fylo-data-storage-component/fonts/Raleway-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-raleway",
});

const _baiJamjuree = localFont({
  src: [
    {
      path: "../public/clipboard-landing-page/fonts/BaiJamjuree-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/clipboard-landing-page/fonts/BaiJamjuree-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-bai-jamjuree",
});

const _hankenGrotesk = localFont({
  src: "../public/results-summary-component/assets/fonts/HankenGrotesk-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-hanken-grotesk",
});

const _redHatText = localFont({
  src: "../public/launch-countdown-timer/fonts/RedHatText-VariableFont_wght.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-red-hat-text",
});

const _roboto = localFont({
  src: [
    {
      path: "../public/newsletter-sign-up-with-success-message/assets/fonts/Roboto-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/newsletter-sign-up-with-success-message/assets/fonts/Roboto-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-roboto",
});

const _publicSans = localFont({
  src: "../public/easybank-landing-page/fonts/PublicSans-VariableFont_wght.ttf",
  style: "normal",
  variable: "--font-public",
});

const _beVietnam = localFont({
  src: [
    {
      path: "../public/manage-landing-page/fonts/BeVietnam-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnam-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnam-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/manage-landing-page/fonts/BeVietnam-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-be-vietnam",
});

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

const _bellefair = localFont({
  src: "../public/space-tourism-website/assets/fonts/Bellefair-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-bellefair",
});

const _nunitoSans = localFont({
  src: "../public/rest-countries-api-with-color-theme-switcher/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  style: "normal",
  variable: "--font-nunito-sans",
});

// export const plusJakartaSans = `${_plusJakartaSans.variable} font-plus-jakarta`;
// export const dmSans = `${_dmSans.variable} font-dm-sans`;
// export const epilogue = `${_epilogue.variable} font-epilogue`;
// export const manrope = `${_manrope.variable} font-manrope`;
// export const rubik = `${_rubik.variable} font-rubik`;
// export const spaceMono = `${_spaceMono.variable} font-space-mono`;
// export const barlow = `${_barlow.variable} font-barlow`;
// export const fraunces = `${_fraunces.variable} font-fraunces`;
// export const ubuntu = `${_ubuntu.variable} font-ubuntu`;
// export const overpass = `${_overpass.variable} font-overpass`;
// export const barlowSemiCondensed = `${_barlowSemiCondensed.variable} font-barlow-semi-condensed`;
// export const commissioner = `${_commissioner.variable} font-commissioner`;
// export const josefin = `${_josefin.variable} font-josefin`;
// export const alata = `${_alata.variable} font-alata`;
// export const openSans = `${_openSans.variable} font-open-sans`;
// export const poppins = `${_poppins.variable} font-poppins`;
// export const inter = `${_inter.variable} font-inter`;
// export const karla = `${_karla.variable} font-karla`;
// export const dmSerifDisplay = `${_dmSerifDisplay.variable} font-dm-serif-display`;
// export const montserrat = `${_montserrat.variable} font-montserrat`;
// export const barlowCondensed = `${_barlowCondensed.variable} font-barlow-condensed`;
// export const outfit = `${_outfit.variable} font-outfit`;
// export const redHatDisplay = `${_redHatDisplay.variable} font-red-hat-display`;
// export const lexendDeca = `${_lexendDeca.variable} font-lexend-deca`;
// export const bigShouldersDisplay = `${_bigShouldersDisplay.variable} font-big-shoulders-display`;
// export const kumbhSans = `${_kumbhSans.variable} font-kumbh-sans`;
// export const leagueSpartan = `${_leagueSpartan.variable} font-league-spartan`;
// export const libreFranklin = `${_libreFranklin.variable} font-libre-franklin`;
// export const spaceGrotesk = `${_spaceGrotesk.variable} font-space-grotesk`;
// export const raleway = `${_raleway.variable} font-raleway`;
// export const baiJamjuree = `${_baiJamjuree.variable} font-bai-jamjuree`;
// export const hankenGrotesk = `${_hankenGrotesk.variable} font-hanken-grotesk`;
// export const redHatText = `${_redHatText.variable} font-red-hat-text`;
// export const roboto = `${_roboto.variable} font-roboto`;
// export const publicSans = `${_publicSans.variable} font-public`;
// export const beVietnam = `${_beVietnam.variable} font-be-vietnam`;
// export const beVietnamPro = `${_beVietnamPro.variable} font-be-vietnam-pro`;
// export const bellefair = `${_bellefair.variable} font-bellefair`;
// export const nunitoSans = `${_nunitoSans.variable} font-nunito-sans`;

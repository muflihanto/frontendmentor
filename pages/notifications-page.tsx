import Head from "next/head";
import Main from "../components/notifications-page/Main";
import Footer from "../components/notifications-page/Footer";
import localFont from "next/font/local";

const _plusJakartaSans = localFont({
  src: "../public/notifications-page/assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta",
});

const plusJakartaSans = `${_plusJakartaSans.variable} font-plus-jakarta`;

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function NotificationPage() {
  return (
    <div
      className={`${plusJakartaSans} App md:bg-notif-neutral-200 md:pt-[8vh]`}
    >
      <Head>
        <title>Notifications Page</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath="/notifications-page/design" /> */}
    </div>
  );
}

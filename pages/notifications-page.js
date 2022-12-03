import Head from "next/head";
import Main from "../components/notifications-page/Main";
import Footer from "../components/notifications-page/Footer";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/notifications-page/Slider"), {
  ssr: false,
});

export default function NotificationPage(props) {
  return (
    <>
      <Head>
        <title>Notifications Page</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath="/notifications-page/design" /> */}
    </>
  );
}

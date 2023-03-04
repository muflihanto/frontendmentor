import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const QrCodeComponent = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | QR code component</title>
      </Head>

      <div className="App font-outfit relative pb-8">
        <Main />
        <Footer />
        <Slider basePath="/qr-code-component/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Improve your front-end skills by building projects

        Scan the QR code to visit Frontend Mentor and take your coding skills to the next level
      `}
    </>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-red-600 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}

export default QrCodeComponent;

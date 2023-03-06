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

      <div className="App font-outfit bg-qr-200 relative flex min-h-screen flex-col items-center justify-center pb-8">
        <Main />
        <Footer />
        {/* <Slider basePath="/qr-code-component/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  return (
    <main className="shadow-qr-300/20 mt-8 h-[497px] w-[calc(100%-55px)] max-w-[320px] rounded-[20px] bg-white px-[16px] py-4 shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden rounded-[10px]">
        <Image
          src="/qr-code-component/images/image-qr-code.png"
          alt="QR code Image"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-qr-400 mt-6 px-4 text-center text-[22px] font-bold leading-[28px] tracking-[.1px]">Improve your front-end skills by building projects</h1>
      <p className="text-qr-300 mt-4 px-3 text-center text-[15px] leading-[1.275] tracking-[.25px]">Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-red-600 [&_a]:decoration-wavy">
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
    </footer>
  );
}

export default QrCodeComponent;

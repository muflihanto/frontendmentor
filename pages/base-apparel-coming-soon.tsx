import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function BaseApparelComingSoon() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Base Apparel coming soon page</title>
      </Head>
      <div className="App font-josefin relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/base-apparel-coming-soon/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        We're coming soon

        Hello fellow shoppers! We're currently building our new fashion store. 
        Add your email below to stay up-to-date with announcements and our launch deals.
      
        Email Address
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

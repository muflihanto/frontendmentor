import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function FyloDataStorageComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Fylo data storage component</title>
      </Head>
      <div className="App font-raleway relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/fylo-data-storage-component/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         You’ve used 815 GB of your storage

         185 GB Left
         
         0 GB
         1000 GB
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

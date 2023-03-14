import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function ProfileCardComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Profile card component</title>
      </Head>
      <div className="App font-kumbh-sans relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/profile-card-component/design/" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        Victor Crest
        26
        London

        80K
        Followers

        803K
        Likes

        1.4K
        Photos
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-indigo-600 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </footer>
  );
}

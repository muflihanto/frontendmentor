import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BentoGrid() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Bento grid</title>
      </Head>
      <div className="App min-h-[100svh] relative">
        <Main />
        <Footer />
        <Slider basePath="/bento-grid/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
        Social Media 10x Faster with AI
        Over 4,000 5-star reviews

        Manage multiple accounts and platforms.

        Maintain a consistent posting schedule.

        Schedule to social media.
        Optimize post timings to publish content at the perfect time for your audience.
        
        Grow followers with non-stop content.

        >56% faster audience growth
        
        Create and schedule content quicker.

        Write your content using AI.
      `} */}
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
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}

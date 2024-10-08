import Head from "next/head";
import Image from "next/image";
import { kumbhSans } from "../utils/fonts/kumbhSans";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ProfileCardComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Profile card component</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center justify-center bg-profile-card-primary-cyan font-kumbh-sans before:absolute before:left-0 before:top-0 before:z-10 before:h-screen before:w-screen before:bg-[url('/profile-card-component/images/bg-pattern-top.svg'),url('/profile-card-component/images/bg-pattern-bottom.svg')] before:bg-[length:978px_978px,978px_978px] before:bg-[position:calc(45%-492px)_calc(12%-482px),calc(44%+489px)_calc(45%+492px)] before:bg-no-repeat before:opacity-50 before:content-[''] max-lg:before:bg-[length:978px_860px,978px_700px] max-lg:before:bg-[position:calc(44%-495px)_calc(40%-425px),_calc(56%+504px)_calc(64%+330px)] lg:before:opacity-90 ${kumbhSans.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/profile-card-component/design/" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="z-20 mt-[1px] flex h-[374px] w-[calc(100vw-50px)] max-w-[351px] flex-col items-center overflow-hidden rounded-[14px] bg-white shadow-2xl shadow-profile-card-primary-dark-blue-200/40">
      <header className="relative h-[140px] w-full">
        <Image
          className="object-cover"
          fill
          alt="Header Image"
          src="/profile-card-component/images/bg-pattern-card.svg"
        />
      </header>
      <div className="relative -mt-12 aspect-square w-24 overflow-hidden rounded-full ring-[5px] ring-white">
        <Image
          className="object-contain"
          fill
          alt="Avatar"
          src="/profile-card-component/images/image-victor.jpg"
        />
      </div>
      <h1 className="mt-[26px] text-lg font-bold leading-none text-profile-card-primary-dark-blue-200">
        Victor Crest
        <span className="ml-2 font-normal text-profile-card-primary-dark-blue-100">
          26
        </span>
      </h1>
      <p className="mt-[9px] text-[14px] text-profile-card-primary-dark-blue-100">
        London
      </p>
      <div className="mt-auto grid h-[89px] w-full grid-cols-3 grid-rows-1 items-center gap-[14px] border-t border-t-profile-card-neutral/20 pb-[2px] md:gap-[17px]">
        <p className="flex flex-col items-center justify-self-end text-[18px] font-bold tracking-[0.5px] text-profile-card-primary-dark-blue-200">
          80K
          <span className="mt-[1px] text-[10px] font-normal tracking-[1.3px] text-profile-card-primary-dark-blue-100 md:tracking-[1.5px]">
            {" "}
            Followers
          </span>
        </p>
        <p className="flex flex-col items-center text-[18px] font-bold tracking-[0.5px] text-profile-card-primary-dark-blue-200">
          803K
          <span className="mt-[1px] text-[10px] font-normal tracking-[1.3px] text-profile-card-primary-dark-blue-100 md:tracking-[1.5px]">
            {" "}
            Likes
          </span>
        </p>
        <p className="ml-[6px] flex flex-col items-center justify-self-start text-[18px] font-bold tracking-[0.5px] text-profile-card-primary-dark-blue-200 md:ml-[8px]">
          1.4K
          <span className="mt-[1px] text-[10px] font-normal tracking-[1.3px] text-profile-card-primary-dark-blue-100 md:tracking-[1.5px]">
            {" "}
            Photos
          </span>
        </p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 z-20 w-full text-center text-[11px] text-profile-card-primary-dark-blue-200 [&_a]:font-bold [&_a]:text-white [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" rel="noreferrer" target="_blank">
        Muflihanto
      </a>
      .
    </footer>
  );
}

import Head from "next/head";
import Image from "next/image";
import { outfit } from "../utils/fonts/outfit";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * TODO: View the optimal layout for the interface depending on their device's screen size
 */

const NftPreviewCard = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | NFT preview card component</title>
      </Head>
      <div
        className={`${outfit.variable} relative flex h-[100svh] w-screen items-center justify-center bg-nft-neutral-400 font-outfit text-nft-neutral-100`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/nft-preview-card-component/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  return (
    <main className="h-[543px] max-w-[calc(375px-48px)] rounded-2xl bg-nft-neutral-300 p-6 pr-[25px]">
      <header className="group relative aspect-square w-full overflow-hidden rounded-lg hover:cursor-pointer">
        <a className="group relative z-10 flex h-full w-full items-center justify-center bg-nft-primary-cyan opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100">
          <svg
            viewBox="0 0 48 48"
            className="z-20 w-12 transition-all duration-150 group-active:scale-90"
          >
            <use href="/nft-preview-card-component/images/icon-view.svg#icon-view" />
          </svg>
        </a>
        <Image
          fill
          alt="Equilibrium Image"
          src="/nft-preview-card-component/images/image-equilibrium.jpg"
          className="object-contain"
        />
      </header>
      <h1 className="mt-[27px] w-fit text-[22px] font-semibold leading-none transition-all duration-150 hover:cursor-pointer hover:text-nft-primary-cyan active:scale-90">
        <a>Equilibrium #3429</a>
      </h1>
      <p className="mt-[15px] font-light leading-[26px] text-nft-primary-blue">
        Our Equilibrium collection promotes balance and calm.
      </p>
      <div className="mt-[14px] flex justify-between">
        <p className="flex items-center gap-[7px] text-nft-primary-cyan">
          <span>
            <svg viewBox="0 0 11 18" className="h-[18px]">
              <use href="/nft-preview-card-component/images/icon-ethereum.svg#icon-ethereum" />
            </svg>
          </span>
          <span className="pb-[1px] text-[15px] font-semibold">0.041 ETH</span>
        </p>
        <p className="flex items-center gap-[8px]">
          <span>
            <svg className="w-[17px]" viewBox="0 0 17 17">
              <use href="/nft-preview-card-component/images/icon-clock.svg#icon-clock" />
            </svg>
          </span>
          <span className="text-[15px] text-nft-primary-blue">3 days left</span>
        </p>
      </div>
      <hr className="mt-[14px] border-t-nft-primary-blue/25" />
      <div className="mt-4 flex items-center gap-4">
        <p className="relative aspect-square h-[33px] rounded-full border-[1.5px] border-nft-neutral-100">
          <Image
            src="/nft-preview-card-component/images/image-avatar.png"
            alt="Jules Wyvern Avatar"
            className="object-contain"
            fill
          />
        </p>
        <p className="flex gap-[5px] pb-[1px] text-[15px] text-nft-primary-blue">
          <span>Creation of</span>
          <span className="font-medium text-nft-neutral-100 transition-all duration-150 hover:cursor-pointer hover:text-nft-primary-cyan active:scale-90">
            <a>Jules Wyvern</a>
          </span>
        </p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:text-nft-primary-cyan [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

export default NftPreviewCard;

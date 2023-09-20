import Head from "next/head";
import Image from "next/image";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const NftPreviewCard = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | NFT preview card component</title>
      </Head>
      <div className="font-outfit bg-nft-neutral-400 text-nft-neutral-100 relative flex h-[100svh] w-screen items-center justify-center">
        <Main />
        <Footer />
        {/* <Slider basePath="/nft-preview-card-component/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  return (
    <main className="bg-nft-neutral-300 h-[543px] max-w-[calc(375px-48px)] rounded-2xl p-6 pr-[25px]">
      <header className="group relative aspect-square w-full overflow-hidden rounded-lg hover:cursor-pointer">
        <a className="bg-nft-primary-cyan group relative z-10 flex h-full w-full items-center justify-center opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100">
          <svg
            viewBox="0 0 48 48"
            className="z-20 w-12 transition-all duration-150 group-active:scale-90"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
            >
              <path d="M0 0h48v48H0z" />
              <path
                d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15Zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10Zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </a>
        <Image
          fill
          alt="Equilibrium Image"
          src="/nft-preview-card-component/images/image-equilibrium.jpg"
          className="object-contain"
        />
      </header>
      <h1 className="hover:text-nft-primary-cyan mt-[27px] w-fit text-[22px] font-semibold leading-none transition-all duration-150 hover:cursor-pointer active:scale-90">
        <a>Equilibrium #3429</a>
      </h1>
      <p className="text-nft-primary-blue mt-[15px] font-light leading-[26px]">Our Equilibrium collection promotes balance and calm.</p>
      <div className="mt-[14px] flex justify-between">
        <p className="text-nft-primary-cyan flex items-center gap-[7px]">
          <span>
            <svg
              viewBox="0 0 11 18"
              className="h-[18px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z"
                fill="#00FFF8"
              />
            </svg>
          </span>
          <span className="pb-[1px] text-[15px] font-semibold">0.041 ETH</span>
        </p>
        <p className="flex items-center gap-[8px]">
          <span>
            <svg
              className="w-[17px]"
              viewBox="0 0 17 17"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z"
                fill="#8BACD9"
              />
            </svg>
          </span>
          <span className="text-nft-primary-blue text-[15px]">3 days left</span>
        </p>
      </div>
      <hr className="border-t-nft-primary-blue/25 mt-[14px]" />
      <div className="mt-4 flex items-center gap-4">
        <p className="border-nft-neutral-100 relative aspect-square h-[33px] rounded-full border-[1.5px]">
          <Image
            src="/nft-preview-card-component/images/image-avatar.png"
            alt="Jules Wyvern Avatar"
            className="object-contain"
            fill
          />
        </p>
        <p className="text-nft-primary-blue flex gap-[5px] pb-[1px] text-[15px]">
          <span>Creation of</span>
          <span className="text-nft-neutral-100 hover:text-nft-primary-cyan font-medium transition-all duration-150 hover:cursor-pointer active:scale-90">
            <a>Jules Wyvern</a>
          </span>
        </p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:text-nft-primary-cyan absolute bottom-3 w-full text-center text-[11px] [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
        rel="noreferrer"
        target="_blank"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}

export default NftPreviewCard;

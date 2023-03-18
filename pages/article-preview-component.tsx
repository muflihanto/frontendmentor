import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function ArticlePreviewComponent() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Article preview component</title>
      </Head>
      <div className="App font-manrope bg-article-preview-100 relative flex min-h-[100svh] flex-col items-center justify-center pb-[7px] font-medium">
        <Main />
        <Footer />
        {/* <Slider basePath="/article-preview-component/design/" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="shadow-article-preview-300/10 h-[512px] w-[calc(100vw-48px)] max-w-[calc(375px-48px)] overflow-hidden rounded-md bg-white shadow-xl">
      <div className="relative aspect-[327/200] w-full">
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-white/[.175] mix-blend-overlay" />
        <Image
          alt="Drawer"
          src="/article-preview-component/images/drawers.jpg"
          fill
          className="object-cover object-[center_25%]"
        />
      </div>
      <main className="flex h-[312px] flex-col px-8 pt-9 pb-5">
        <h1 className="text-article-preview-400 font-bold tracking-[.2px]">Shift the overall look and feel by adding these wonderful touches to furniture in your home</h1>
        <p className="text-article-preview-300 mt-[12px] text-[13px] leading-[20px] tracking-[.12px]">Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I’ve got some simple tips to help you make any room feel complete.</p>
        <div className="mt-auto flex h-10 items-center">
          <Image
            src="/article-preview-component/images/avatar-michelle.jpg"
            alt="Michelle Appleton's Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="ml-4 flex flex-col gap-[7px] pb-[1px] text-[13px] tracking-[.1px]">
            <span className="text-article-preview-400 font-bold leading-none">Michelle Appleton</span>
            <span className="text-article-preview-200 leading-none">28 Jun 2020</span>
          </p>
          <button className="bg-article-preview-100 ml-auto flex h-8 w-8 items-center justify-center rounded-full pb-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 13"
              className="w-[15px]"
            >
              <path
                fill="#6E8098"
                d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"
              />
            </svg>
          </button>
        </div>
      </main>
      {`
        
      `}
    </div>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:text-article-preview-400 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

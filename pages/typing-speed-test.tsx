import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { sora } from "../utils/fonts/sora";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function TypingSpeedTest() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-typing-speed-test-neutral-900 text-typing-speed-test-neutral-0 ${sora.variable} font-sora`}
      >
        <Main />
        <Footer />
        <Slider
          basePath="/typing-speed-test/design"
          absolutePath="/typing-speed-test/design/mobile-not-started.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-4 pb-[0px] pt-4">
      <header className="flex w-full items-center justify-between">
        <Image
          src="/typing-speed-test/assets/images/logo-small.svg"
          alt="Logo"
          width={100}
          height={32}
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-2">
          <Image
            src="/typing-speed-test/assets/images/icon-personal-best.svg"
            alt="Personal best"
            width={16}
            height={16}
            className="h-4 w-auto"
          />
          <p className="text-[16px] text-typing-speed-test-neutral-400">
            Best:{" "}
            <span className="text-typing-speed-test-neutral-0">92 WPM</span>
          </p>
        </div>
      </header>

      <div className="mt-[30px] grid w-full grid-cols-[1fr_0.4fr_1fr_0.4fr_1fr] items-center">
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-medium text-typing-speed-test-neutral-400">
            WPM:
          </p>
          <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0">
            0
          </p>
        </div>
        <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500"></div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-medium text-typing-speed-test-neutral-400">
            Accuracy:
          </p>
          <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0">
            100%
          </p>
        </div>
        <div className="h-12 w-px place-self-center bg-typing-speed-test-neutral-500"></div>
        <div className="flex flex-col items-center">
          <p className="text-[15px] font-medium text-typing-speed-test-neutral-400">
            Time:
          </p>
          <p className="mt-1.5 text-2xl font-bold leading-none text-typing-speed-test-neutral-0">
            0:60
          </p>
        </div>
      </div>

      <div className="mt-4 flex w-full gap-2 border-b border-typing-speed-test-neutral-800 pb-[15px]">
        <button
          type="button"
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-500 bg-transparent px-4 text-[15px] font-medium text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-neutral-800"
        >
          Hard
          <Image
            src="/typing-speed-test/assets/images/icon-down-arrow.svg"
            alt=""
            width={12}
            height={8}
            className="h-auto w-3"
          />
        </button>
        <button
          type="button"
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-typing-speed-test-neutral-500 bg-transparent px-4 text-[15px] font-medium text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-neutral-800"
        >
          Timed (60s)
          <Image
            src="/typing-speed-test/assets/images/icon-down-arrow.svg"
            alt=""
            width={12}
            height={8}
            className="h-auto w-3"
          />
        </button>
      </div>

      <div className="relative mt-8">
        <p className="text-[28px] font-semibold leading-[1.575] text-typing-speed-test-neutral-400 opacity-70 blur-[8px]">
          The archaeological expedition unearthed artifacts that complicated
          prevailing theories about human trade networks. Anatolia, lapis lazuli
          from Afghanistan, and amber from the Baltic—all found together in a
          single tomb near the ancient city.
        </p>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[30px]">
          <button
            type="button"
            className="h-[56px] w-[220px] rounded-xl bg-typing-speed-test-blue-400 text-[20px] font-semibold tracking-[-0.02em] text-typing-speed-test-neutral-0 transition-colors hover:bg-typing-speed-test-blue-600"
          >
            Start Typing Test
          </button>
          <p className="mt-[18px] text-center text-[20px] font-semibold tracking-[-0.02875em] text-typing-speed-test-neutral-0">
            Or click the text and start typing
          </p>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-typing-speed-test-neutral-400 [&_a]:font-bold [&_a]:text-typing-speed-test-blue-400 [&_a]:underline [&_a]:decoration-typing-speed-test-blue-400 [&_a]:decoration-wavy">
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

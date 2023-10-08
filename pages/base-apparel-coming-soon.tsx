import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { josefin } from "../utils/fonts/josefin";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const inputSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
});

type InputSchema = z.infer<typeof inputSchema>;

export default function BaseApparelComingSoon() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Base Apparel coming soon page</title>
      </Head>
      <div
        className={`App relative min-h-[800px] bg-base-apparel-gradient-white-200 font-josefin lg:min-h-[100svh] lg:bg-[url('/base-apparel-coming-soon/images/bg-pattern-desktop.svg')] lg:bg-[length:auto_100%] lg:bg-left lg:bg-no-repeat ${josefin.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/base-apparel-coming-soon/design"
          absolutePath="/base-apparel-coming-soon/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex h-[84px] w-full items-center bg-white px-8 lg:h-[calc(164/800*100svh)] lg:w-[calc(100vw-min(45vw,61/80*100svh))] lg:bg-transparent lg:px-[min(calc(165/1440*100vw),165px)]">
      <div className="relative mb-[1px] aspect-[158/33] h-[21px] lg:h-[33px]">
        <Image
          src="/base-apparel-coming-soon/images/logo.svg"
          fill
          alt="Base Apparel Logo"
        />
      </div>
    </header>
  );
}

function Main() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InputSchema>({ resolver: zodResolver(inputSchema) });

  const onSubmit = handleSubmit((e) => {
    console.log(e);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <main className="flex flex-col items-center lg:w-[calc(100vw-min(45vw,61/80*100svh))] lg:items-start lg:px-[min(calc(165/1440*100vw),165px)]">
      <div className="relative aspect-[375/250] h-[250px] lg:absolute lg:right-0 lg:top-0 lg:aspect-[61/80] lg:h-full lg:max-w-[45vw]">
        <Image
          src="/base-apparel-coming-soon/images/"
          loader={({ src, width }) => {
            return `${src}hero-${width > 1023 ? "desktop" : "mobile"}.jpg`;
          }}
          fill
          alt="Hero Image"
          className="lg:object-cover lg:object-left"
        />
      </div>
      <h1 className="mt-[64px] flex w-[250px] flex-col text-center text-[40px] uppercase leading-[42px] tracking-[11px] lg:mt-[calc(7/80*100svh)] lg:text-left lg:text-[min(64px,8vh)] lg:tracking-[17px]">
        <span className="font-thin text-base-apparel-primary-100 lg:leading-[calc(min(64px,8vh)-1px)]">
          We&apos;re
        </span>
        <span className="pr-[2px] font-semibold text-base-apparel-neutral lg:leading-[calc(min(64px,8vh)+7px)]">
          coming
        </span>
        <span className="font-semibold text-base-apparel-neutral lg:leading-[calc(min(64px,8vh)+7px)]">
          soon
        </span>
      </h1>
      <p className="mt-[15px] px-9 text-center text-[14px] leading-[22px] text-base-apparel-primary-100 lg:mt-[19px] lg:pl-[1px] lg:pr-[50px] lg:text-left lg:text-[16px] lg:leading-[28px] lg:tracking-[.05px]">
        Hello fellow shoppers! We&apos;re currently building our new fashion
        store. Add your email below to stay up-to-date with announcements and
        our launch deals.
      </p>
      <form
        className="relative mt-[33px] h-12 w-[calc(100vw-64px)] lg:mt-[40px] lg:h-14 lg:w-[445px]"
        onSubmit={onSubmit}
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email Address"
          className={`${
            errors.email
              ? "border-2 border-base-apparel-primary-200 bg-[url('/base-apparel-coming-soon/images/icon-error.svg')] bg-[position:center_right_70px] bg-no-repeat lg:bg-[position:top_53%_right_114px]"
              : "border-base-apparel-primary-100/50"
          } h-full w-full rounded-full border bg-transparent px-6 text-base-apparel-neutral placeholder:text-[14px] placeholder:text-base-apparel-primary-100/50 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-transparent lg:px-8 lg:pt-[1px] lg:placeholder:text-[16px]`}
        />
        <button className="absolute right-0 top-0 flex h-full w-[64px] items-center justify-center rounded-full bg-[linear-gradient(135deg,_var(--tw-gradient-stops))] from-base-apparel-gradient-red-100 to-base-apparel-gradient-red-200 shadow-xl shadow-base-apparel-neutral/10 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:transition-colors before:content-[''] before:duration-75 hover:shadow-[hsl(358,47%,83%)]/90 hover:before:bg-white/50 focus-visible:outline focus-visible:outline-transparent lg:w-[100px]">
          <svg viewBox="0 0 12 20" className="h-5">
            <use href="/base-apparel-coming-soon/images/icon-arrow.svg#icon-arrow" />
          </svg>
        </button>
        {errors.email ? (
          <p className="mt-2 w-full px-8 text-left text-[12px] text-base-apparel-gradient-red-200 lg:text-[13px]">
            {errors.email.message}
          </p>
        ) : null}
      </form>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] lg:px-[min(calc(165/1440*100vw),165px)] lg:text-left [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

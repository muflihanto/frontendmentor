import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

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
      <div className="App font-josefin bg-base-apparel-gradient-white-200 relative min-h-[800px]">
        <Header />
        <Main />
        <Footer />
        {/* <Slider basePath="/base-apparel-coming-soon/design" /> */}
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex h-[84px] w-full items-center bg-white px-8">
      <div className="relative mb-[1px] aspect-[158/33] h-[21px]">
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
    <main className="flex flex-col items-center">
      <div className="relative aspect-[375/250] h-[250px]">
        <Image
          src="/base-apparel-coming-soon/images/"
          loader={({ src, width }) => {
            return `${src}hero-${width > 1023 ? "desktop" : "mobile"}.jpg`;
          }}
          fill
          alt="Hero Image"
        />
      </div>
      <h1 className="mt-[64px] flex w-[250px] flex-col text-center text-[40px] uppercase leading-[42px] tracking-[11px]">
        <span className="text-base-apparel-primary-100 font-thin">We&apos;re</span>
        <span className="text-base-apparel-neutral pr-[2px] font-semibold">coming</span>
        <span className="text-base-apparel-neutral font-semibold">soon</span>
      </h1>
      <p className="text-base-apparel-primary-100 mt-[15px] px-9 text-center text-[14px] leading-[22px]">Hello fellow shoppers! We&apos;re currently building our new fashion store. Add your email below to stay up-to-date with announcements and our launch deals.</p>
      <form
        className="relative mt-[33px] h-12 w-[calc(100vw-64px)]"
        onSubmit={onSubmit}
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email Address"
          className={`${
            errors.email ? "border-base-apparel-primary-200 border-2 bg-[url('/base-apparel-coming-soon/images/icon-error.svg')] bg-[position:center_right_70px] bg-no-repeat" : "border-base-apparel-primary-100/50"
          } placeholder:text-base-apparel-primary-100/50 h-full w-full rounded-full border bg-transparent px-6 placeholder:text-[14px] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-transparent`}
        />
        <button className="from-base-apparel-gradient-red-100 to-base-apparel-gradient-red-200 shadow-base-apparel-neutral/10 absolute top-0 right-0 flex h-full w-[64px] items-center justify-center rounded-full bg-[linear-gradient(135deg,_var(--tw-gradient-stops))] shadow-xl focus-visible:outline focus-visible:outline-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 20"
            className="h-5"
          >
            <path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="M1 1l8.836 8.836L1 18.671"
            />
          </svg>
        </button>
        {errors.email ? <p className="text-base-apparel-primary-200 mt-1 w-full px-6 text-left text-[12px]">{errors.email.message}</p> : null}
      </form>
    </main>
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

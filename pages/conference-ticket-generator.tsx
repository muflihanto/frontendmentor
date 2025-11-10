import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { z } from "zod";
import { inconsolata } from "../utils/fonts/inconsolata";
import { cn } from "../utils/cn";
import { ComponentProps, useRef } from "react";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const inputSchema = z.object({
  avatar: z
    .custom<FileList | null>()
    .transform((fileList) => (fileList ? fileList[0] : null))
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file",
    })
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(file.type);
      },
      {
        message: "File must be JPG or PNG format",
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 500 * 1024;
      },
      {
        message: "File too large. Please upload photo under 500KB",
      },
    )
    .nullable()
    .optional(),
  fullname: z
    .string()
    .min(1, { message: "Fullname cannot be empty" })
    .refine((val) => val.trim().length > 0, {
      message: "Fullname cannot be empty",
    })
    .transform((el) => el.trim()),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .transform((el) => el.trim()),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty" })
    .refine((val) => val.trim().length > 0, {
      message: "Username cannot be empty",
    })
    .transform((el) => el.trim()),
});

export default function ConferenceTicketGenerator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Conference ticket generator</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-x-hidden bg-white bg-[url('/conference-ticket-generator/assets/images/background-mobile.png')] bg-cover bg-top font-inconsolata md:bg-[url('/conference-ticket-generator/assets/images/background-tablet.png')] lg:bg-[url('/conference-ticket-generator/assets/images/background-desktop.png')] ${inconsolata.variable}`}
      >
        <Ornament />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/conference-ticket-generator/design"
          // absolutePath="/conference-ticket-generator/design/mobile-design-form.jpg"
          absolutePath="/conference-ticket-generator/design/state-focus.jpg"
        /> */}
      </div>
    </>
  );
}

function Ornament() {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
      <div className="pointer-events-none absolute -left-[22px] -top-8 aspect-square h-[109px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute -right-[46px] top-[548px] aspect-square h-[108px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle bottom"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 aspect-[1459/1024] w-[264%] -translate-x-[calc(50%+28px)]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-lines.svg"
          fill
          className="object-contain"
          alt="Pattern lines"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-6 aspect-[446/208] h-[52px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-top.svg"
          fill
          className="object-contain"
          alt="Pattern squiggly line top"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 aspect-[760/530] h-[210px] lg:hidden">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
          fill
          className="object-contain"
          alt="Pattern squiggly line bottom tablet"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "mt-3 h-[54px] w-full rounded-[10px] border border-conference-ticket-generator-neutral-500 bg-conference-ticket-generator-neutral-700/30 px-[14px] py-2 text-[18px] hover:bg-conference-ticket-generator-neutral-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-conference-ticket-generator-neutral-500",
        className,
      )}
      {...props}
    />
  );
}

function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="mt-10 flex w-full max-w-[460px] flex-1 flex-col items-center">
      <div className="w-full">
        <label htmlFor="avatar" className="tracking-tight">
          Upload Avatar
        </label>
        <label
          htmlFor="avatar"
          className="mt-3 flex h-[126px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-conference-ticket-generator-neutral-500 bg-conference-ticket-generator-neutral-700/30 hover:border-conference-ticket-generator-neutral-300 hover:bg-conference-ticket-generator-neutral-700/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-conference-ticket-generator-neutral-500"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: onKeyDown handle interactivity
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div className="flex flex-col items-center justify-start gap-[15px]">
            <svg
              viewBox="0 0 30 30"
              className="box-content w-[30px] rounded-xl border border-conference-ticket-generator-neutral-700 bg-conference-ticket-generator-neutral-700/50 p-[9px]"
              role="graphics-symbol"
              aria-label="Upload avatar"
            >
              <use href="/conference-ticket-generator/assets/images/icon-upload.svg#icon-upload" />
            </svg>
            <p className="text-[18px] text-conference-ticket-generator-neutral-300">
              Drag and drop or click to upload
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            className="hidden"
            ref={inputRef}
          />
        </label>
        <p className="mt-3 flex items-center gap-2 text-xs tracking-[-0.0175em] text-conference-ticket-generator-neutral-500">
          <svg viewBox="0 0 16 16" className="w-4" role="graphics-symbol">
            <use href="/conference-ticket-generator/assets/images/icon-info.svg#icon-info" />
          </svg>
          <span>Upload your photo (JPG or PNG, max size: 500KB).</span>
        </p>
      </div>
      <label htmlFor="fullname" className="mt-6 w-full">
        <p className="tracking-tight">Full Name</p>
        <Input type="text" name="fullname" id="fullname" />
      </label>
      <label htmlFor="email" className="mt-6 w-full">
        <p className="tracking-tight">Email Address</p>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
        />
      </label>
      <label htmlFor="username" className="mt-6 w-full">
        <p className="tracking-tight">GitHub Username</p>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="@yourusername"
        />
      </label>
      <button
        className="mt-[24px] h-[54px] w-full rounded-xl bg-conference-ticket-generator-orange-500 font-extrabold tracking-tight text-conference-ticket-generator-neutral-900 focus-visible:border-[3px] focus-visible:border-conference-ticket-generator-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-conference-ticket-generator-neutral-500"
        type="submit"
      >
        Generate My Ticket
      </button>
    </form>
  );
}

function Main() {
  return (
    <main className="relative z-20 flex h-full w-full flex-col items-center px-4 py-[30px] text-[20px] leading-6 text-conference-ticket-generator-neutral-0">
      <Image
        src={"/conference-ticket-generator/assets/images/logo-full.svg"}
        width={209}
        height={30}
        alt="Coding Conf"
        className="scale-[80%]"
      />

      <h1 className="mt-[38px] text-center text-[30px] font-extrabold leading-8 tracking-[-0.035em]">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>

      <p className="mt-[21px] text-center tracking-tight text-conference-ticket-generator-neutral-300">
        Secure your spot at next year&rsquo;s biggest coding conference.
      </p>

      <Form />

      {/* 
        <!-- Form starts -->

        <!-- Form ends -->

        <!-- Generated tickets starts -->

        Congrats, <!-- Full Name -->! Your ticket is ready.

        We've emailed your ticket to <!-- Email Address --> and will send updates in the run up to the event.

        Coding Conf
        Jan 31, 2025 / Austin, TX

        <!-- Generated tickets ends -->
      */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-conference-ticket-generator-neutral-0 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

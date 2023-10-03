import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const inputSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
});

type InputSchema = z.infer<typeof inputSchema>;

export default function PingComingSoonPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Ping coming soon page</title>
      </Head>
      <div className="App relative pb-[16px] pt-[84.5px] font-libre-franklin font-light max-lg:min-h-[812px] lg:min-h-[1024px] lg:pt-[86px]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/ping-coming-soon-page/design"
          absolutePath="/ping-coming-soon-page/design/desktop-hover-error-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const {
    reset,
    formState: { errors, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <main className="flex flex-col items-center">
      <header className="relative aspect-[86/26] h-[16px] lg:h-[26px]">
        <Image
          src="/ping-coming-soon-page/images/logo.svg"
          fill
          className="object-contain"
          alt="Ping Logo"
        />
      </header>
      <h1 className="mt-9 text-center text-[22px] text-ping-coming-soon-neutral-gray first-letter:mr-[3px] lg:mt-[41px] lg:text-[48px]">
        We are launching{" "}
        <span className="font-bold text-ping-coming-soon-neutral-blue">
          soon!
        </span>
      </h1>
      <p className="mt-[13px] text-center text-[12px] text-ping-coming-soon-neutral-blue lg:mt-[7px] lg:text-[20px]">
        Subscribe and get notified
      </p>
      <form
        className="lg:flow-row mt-[30.5px] flex max-lg:w-[min(calc(100vw-93px),282px)] max-lg:flex-col max-lg:gap-[10px] lg:relative lg:mt-[37px] lg:h-[56px] lg:gap-4"
        onSubmit={onSubmit}
        noValidate
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Your email address..."
          className={`h-10 w-full rounded-full border px-[33px] pb-[1px] text-[12px] font-normal leading-none text-ping-coming-soon-neutral-blue placeholder:text-ping-coming-soon-primary-blue/30 focus-visible:outline focus-visible:outline-1 lg:h-full lg:w-[422px] lg:px-[30px] lg:pb-0 lg:text-[16px] ${
            errors.email
              ? "border-[hsl(352,30%,60%)] focus-visible:outline-[hsl(352,30%,60%)]"
              : "border-ping-coming-soon-primary-blue/30 focus-visible:outline-ping-coming-soon-primary-blue"
          }`}
        />
        {errors.email ? (
          <p className="mb-3 -translate-y-[3px] skew-x-[-6deg] text-center text-[10px] font-normal leading-none tracking-[0.15px] text-[hsl(352,40%,60%)] lg:absolute lg:left-0 lg:top-[68px] lg:w-full lg:px-8 lg:text-left lg:text-[12px]">
            {errors.email.message}
          </p>
        ) : null}
        <button className="h-10 w-full rounded-full bg-ping-coming-soon-primary-blue pb-[2px] text-[12px] font-semibold text-white/75 shadow-md shadow-ping-coming-soon-primary-blue/30 hover:opacity-80 lg:h-full lg:w-[200px] lg:pb-0 lg:text-[16px]">
          Notify Me
        </button>
      </form>
      <IllustrationDashboard />
      <SocialIcons />
    </main>
  );
}

function IllustrationDashboard() {
  return (
    <div className="relative ml-[1px] mt-[68px] aspect-[1280/782] w-[calc(100%-54px)] max-lg:max-w-[480px] lg:ml-0 lg:mt-[86px] lg:max-w-[640px]">
      <Image
        src="/ping-coming-soon-page/images/illustration-dashboard.png"
        fill
        alt="Illustration Dashboard"
        className="object-contain"
      />
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="mt-[120px] flex items-center justify-center gap-[13px] text-ping-coming-soon-primary-blue lg:mt-[72px]">
      <a
        href=""
        className="group flex aspect-square w-[31px] items-center justify-center rounded-full border border-ping-coming-soon-neutral-gray/10 hover:bg-ping-coming-soon-primary-blue"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="mb-[1px] w-[9px] group-hover:text-white"
        />
      </a>
      <a
        href=""
        className="group flex aspect-square w-[31px] items-center justify-center rounded-full border border-ping-coming-soon-neutral-gray/10 hover:bg-ping-coming-soon-primary-blue"
      >
        <FontAwesomeIcon
          icon={faTwitter}
          className="mb-[1px] w-[13.5px] group-hover:text-white"
        />
      </a>
      <a
        href=""
        className="group flex aspect-square w-[31px] items-center justify-center rounded-full border border-ping-coming-soon-neutral-gray/10 hover:bg-ping-coming-soon-primary-blue"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="mb-[1px] mr-[1px] h-[17px] group-hover:text-white"
        />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-[25px] pb-[0.883px] text-center text-[10px] text-ping-coming-soon-neutral-blue lg:mt-[23px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      <p className="text-ping-coming-soon-neutral-gray lg:text-[12px]">
        &copy; Copyright Ping. All rights reserved.
      </p>
      <p className="mt-1">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ping-coming-soon-primary-blue"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ping-coming-soon-primary-blue"
        >
          Muflihanto
        </a>
        .
      </p>
    </footer>
  );
}

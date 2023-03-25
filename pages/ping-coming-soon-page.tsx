import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

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
      <div className="App font-libre-franklin relative pt-[84.5px] pb-[72px] font-light max-lg:min-h-[812px]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/ping-coming-soon-page/design"
          // absolutePath="/ping-coming-soon-page/design/mobile-error-state.jpg"
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
      <header className="relative aspect-[86/26] h-[16px]">
        <Image
          src="/ping-coming-soon-page/images/logo.svg"
          fill
          className="object-contain"
          alt="Ping Logo"
        />
      </header>
      <h1 className="text-ping-coming-soon-neutral-gray mt-9 text-center text-[22px]">
        We are launching <span className="text-ping-coming-soon-neutral-blue font-bold">soon!</span>
      </h1>
      <p className="text-ping-coming-soon-neutral-blue mt-[13px] text-center text-[12px]">Subscribe and get notified</p>
      <form
        className="mt-[30.5px] max-lg:flex max-lg:w-[min(calc(100vw-93px),282px)] max-lg:flex-col max-lg:gap-[10px]"
        onSubmit={onSubmit}
        noValidate
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Your email address..."
          className={`placeholder:text-ping-coming-soon-neutral-gray/30 text-ping-coming-soon-neutral-blue h-10 w-full rounded-full border px-[33px] pb-[1px] text-[12px] font-normal leading-none focus-visible:outline focus-visible:outline-1 ${
            errors.email ? "border-[hsl(352,30%,60%)] focus-visible:outline-[hsl(352,30%,60%)]" : "border-ping-coming-soon-neutral-gray/30 focus-visible:outline-ping-coming-soon-primary-blue"
          }`}
        />
        {errors.email ? <p className="mb-3 -translate-y-[3px] skew-x-[-6deg] text-center text-[10px] font-normal leading-none tracking-[0.15px] text-[hsl(352,40%,60%)]">{errors.email.message}</p> : null}
        <button className="bg-ping-coming-soon-primary-blue shadow-ping-coming-soon-primary-blue/30 h-10 w-full rounded-full pb-[2px] text-[12px] font-semibold text-white/75 shadow-md">Notify Me</button>
      </form>
      <IllustrationDashboard />
      <SocialIcons />
    </main>
  );
}

function IllustrationDashboard() {
  return (
    <div className="relative mt-[68px] ml-[1px] aspect-[1280/782] w-[calc(100%-54px)] max-lg:max-w-[480px]">
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
    <div className="text-ping-coming-soon-primary-blue mt-[120px] flex items-center justify-center gap-[13px]">
      <a
        href=""
        className="border-ping-coming-soon-neutral-gray/10 flex aspect-square w-[31px] items-center justify-center rounded-full border"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="mb-[1px] w-[11px]"
        />
      </a>
      <a
        href=""
        className="border-ping-coming-soon-neutral-gray/10 flex aspect-square w-[31px] items-center justify-center rounded-full border"
      >
        <FontAwesomeIcon
          icon={faTwitter}
          className="mb-[1px] w-[13.5px]"
        />
      </a>
      <a
        href=""
        className="border-ping-coming-soon-neutral-gray/10 flex aspect-square w-[31px] items-center justify-center rounded-full border"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="mb-[1px] mr-[1px] h-[17px]"
        />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-[17px] w-full text-center text-[10px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      <p className="text-ping-coming-soon-neutral-gray">&copy; Copyright Ping. All rights reserved.</p>
      <p className="mt-1">
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
      </p>
    </footer>
  );
}

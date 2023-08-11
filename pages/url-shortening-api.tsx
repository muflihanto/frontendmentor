import Head from "next/head";
import Image from "next/image";
import { ComponentProps } from "react";
import { cn } from "../utils/cn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

/**
 * TODOS:
 * Build out this landing page, integrate with the [shrtcode API](https://app.shrtco.de/) and get it looking as close to the design as possible.
 * Your users should be able to:
 * - View the optimal layout for the site depending on their device's screen size
 * - Shorten any valid URL
 * - See a list of their shortened links, even after refreshing the browser
 * - Copy the shortened link to their clipboard in a single click
 * - Receive an error message when the `form` is submitted if:
 *    - The `input` field is empty
 */

export default function UrlShorteningApi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Shortly URL shortening API Challenge</title>
      </Head>
      <div className="App font-poppins relative min-h-[100svh] pb-10 font-medium">
        <Header />
        <Main />
        <Footer />
        {/* <Slider basePath="/url-shortening-api/design" /> */}
      </div>
    </>
  );
}

function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 121 33"
      {...props}
      className={cn([
        "w-[121px]", //
        props.className,
      ])}
    >
      <use href="/url-shortening-api/images/logo.svg#shortly-logo" />
    </svg>
  );
}

function Header() {
  return (
    <header className="flex h-[96px] w-full items-center justify-between bg-transparent px-6 pt-4">
      <Logo className="text-url-shortening-neutral-300" />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 21"
          className="text-url-shortening-neutral-200 w-6"
        >
          <g
            fill="currentColor"
            fillRule="evenodd"
          >
            <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
          </g>
        </svg>
      </button>
    </header>
  );
}

function Intro() {
  return (
    <div>
      <div className="relative mt-[15px] h-fit max-w-[100vw] overflow-hidden pl-6">
        <div className="relative aspect-[733/482] h-[327.5px]">
          <Image
            fill
            alt="Illustration Working"
            src="/url-shortening-api/images/illustration-working.svg"
            className="left-0 h-[733px] w-[482px]"
          />
        </div>
      </div>
      <div className="mt-9 flex flex-col items-center px-6">
        <h1 className="text-url-shortening-neutral-300 text-center text-[40px] font-bold leading-[48px]">More than just shorter links</h1>
        <p className="text-url-shortening-neutral-200 mt-[13px] text-center text-[18px] leading-[30px] tracking-[.1px]">Build your brand’s recognition and get detailed insights on how your links are performing.</p>
        <button className="text-cente bg-url-shortening-primary-cyan mt-[30px] flex h-[56px] w-[198px] items-center justify-center rounded-full text-[20px] font-bold text-white">Get Started</button>
      </div>
    </div>
  );
}

const FormInput = z.object({
  link: z.string().min(1, "Field required").url("Input not valid"),
});
type FormInput = z.infer<typeof FormInput>;

function Shorten() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({ resolver: zodResolver(FormInput) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="bg-url-shortening-primary-violet mx-auto h-[160px] w-[calc(100vw-48px)] max-w-md -translate-y-[80px] rounded-[10px] bg-[url('/url-shortening-api/images/bg-shorten-mobile.svg')] bg-right-top bg-no-repeat p-6">
      <input
        type="text"
        className="h-12 w-full rounded-[5px] px-4 pt-[3px]"
        placeholder="Shorten a link here..."
        {...register("link")}
      />
      <button className="bg-url-shortening-primary-cyan mt-4 flex h-12 w-full items-center justify-center rounded-[5px] pb-px text-[18px] font-bold text-white">Shorten It!</button>
    </form>
  );
}

function Main() {
  return (
    <div>
      <Intro />
      <div className="bg-url-shortening-neutral-100/20 mt-[167.25px]">
        <Shorten />
      </div>
      {/* {`
         Features
         Pricing
         Resources
       
         Login
         Sign Up
       
         More than just shorter links
       
         Build your brand’s recognition and get detailed insights 
         on how your links are performing.
       
         Get Started
         
         Shorten a link here...
       
         Shorten It!
       
         Advanced Statistics
       
         Track how your links are performing across the web with our 
         advanced statistics dashboard.
       
         Brand Recognition
       
         Boost your brand recognition with each click. Generic links don’t 
         mean a thing. Branded links help instil confidence in your content.
       
         Detailed Records
       
         Gain insights into who is clicking your links. Knowing when and where 
         people engage with your content helps inform better decisions.
       
         Fully Customizable
       
         Improve brand awareness and content discoverability through customizable 
         links, supercharging audience engagement.
       
         Boost your links today
       
         Get Started
       
         Features
       
         Link Shortening
         Branded Links
         Analytics
       
         Resources
       
         Blog
         Developers
         Support
       
         Company
       
         About
         Our Team
         Careers
         Contact
      `} */}
    </div>
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

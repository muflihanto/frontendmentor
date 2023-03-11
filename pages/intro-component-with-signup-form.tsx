import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

interface Inputs {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const IntroWithSignup = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Intro component with sign up form</title>
      </Head>
      <div className="App font-poppins bg-intro-signup-primary-red relative flex h-[1000px] min-h-[100svh] flex-col items-center bg-[url('/intro-component-with-signup-form/images/bg-intro-mobile.png')] bg-cover px-6 pt-[91px] pb-[68px] lg:bg-[url('/intro-component-with-signup-form/images/bg-intro-desktop.png')]">
        <Main />
        <Footer />
        {/* <Slider basePath="/intro-component-with-signup-form/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    reset();
  };

  return (
    <main>
      <h1 className="text-center text-[28px] font-bold leading-[36px] tracking-[-.2px] text-white">Learn to code by watching others</h1>
      <p className="mt-[22px] text-center font-medium leading-[26px] text-white">See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.</p>
      <div className="bg-intro-signup-accent-blue mt-[63px] flex h-[88px] w-full flex-col items-center justify-center rounded-[10px] px-14 text-white shadow-[0px_8px_rgba(0,0,0,.15)]">
        <p className="mt-[4px] text-center text-[15px] leading-[26px] tracking-[.1px]">
          <span className="font-bold">Try it free 7 days </span>
          <span className="text-white/75">then $20/mo. thereafter</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-full rounded-[10px] bg-white p-6 shadow-[0px_8px_rgba(0,0,0,.15)]"
      >
        <fieldset className="flex flex-col gap-4">
          <input
            {...register("firstName", { required: true })}
            className="text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 border-introdrop-neutral-200/30 focus-visible:border-introdrop-neutral-200 h-[56px] w-full rounded border px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold focus:placeholder:opacity-30 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent"
            type="text"
            placeholder="First Name"
          />
          <input
            {...register("lastName", { required: true })}
            className="text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 border-introdrop-neutral-200/30 focus-visible:border-introdrop-neutral-200 h-[56px] w-full rounded border px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold focus:placeholder:opacity-30 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent"
            type="text"
            placeholder="Last Name"
          />
          <input
            {...register("email", { required: true })}
            className="text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 border-introdrop-neutral-200/30 focus-visible:border-introdrop-neutral-200 h-[56px] w-full rounded border px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold focus:placeholder:opacity-30 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent"
            type="email"
            placeholder="Email Address"
          />
          <input
            {...register("password", { required: true })}
            className="text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 border-introdrop-neutral-200/30 focus-visible:border-introdrop-neutral-200 h-[56px] w-full rounded border px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold focus:placeholder:opacity-30 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent"
            type="password"
            placeholder="Password"
          />
          <button className="bg-intro-signup-primary-green flex h-[52px] items-center justify-center rounded-md pt-[6px] text-center font-medium uppercase tracking-[.4px] text-white shadow-[0px_4px_hsl(154,59%,46%)] hover:opacity-75 focus-visible:opacity-80 focus-visible:outline focus-visible:outline-transparent">Claim your free trial</button>
        </fieldset>
        <p className="text-introdrop-neutral-200/30 mt-[13px] px-5 text-center text-[11px] font-semibold leading-[20.5px] tracking-[-0.1px]">
          By clicking the button, you are agreeing to our{" "}
          <a
            href=""
            className="text-intro-signup-primary-red font-bold"
          >
            Terms and Services
          </a>
        </p>
      </form>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-white">
      <p className="[&_a]:decoration-intro-signup-primary-green [&_a]:text-introdrop-neutral-100 text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
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

export default IntroWithSignup;

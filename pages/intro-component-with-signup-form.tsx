// import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { type FieldError, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const inputSchema = z.object({
  firstName: z.string().min(1, { message: "First Name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last Name cannot be empty" }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(6, { message: "Password must be atleast 6 characters" }),
  email: z.string().email({ message: "Looks like this is not an email" }),
});

type Inputs = z.infer<typeof inputSchema>;

const IntroWithSignup = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Intro component with sign up form</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center bg-intro-signup-primary-red bg-[url('/intro-component-with-signup-form/images/bg-intro-mobile.png')] bg-[length:375px_1000px] bg-center px-6 pb-[68px] pt-[91px] font-poppins max-lg:min-h-[1000px] lg:justify-center lg:bg-[url('/intro-component-with-signup-form/images/bg-intro-desktop.png')] lg:bg-[length:1412px_800px] lg:px-[min(165px,calc(165/1440*100vw))] lg:py-[32px] ${poppins.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/intro-component-with-signup-form/design/"
          // absolutePath="/intro-component-with-signup-form/design/active-states.jpg"
        /> */}
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
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <main className="max-w-screen-sm lg:grid lg:max-w-none lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:justify-items-center">
      <div className="lg:pt-[6px]">
        <h1 className="text-center text-[28px] font-bold leading-[36px] tracking-[-.2px] text-white lg:text-left lg:text-[50px] lg:leading-[1.1] lg:tracking-[-0.5px]">
          Learn to code by watching others
        </h1>
        <p className="mt-[22px] text-center font-medium leading-[26px] text-introdrop-neutral-100 lg:mt-[28px] lg:text-left lg:tracking-[-0.05px]">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <div className="lg:w-[540px] lg:justify-self-end">
        <div className="mt-[63px] flex h-[88px] w-full flex-col items-center justify-center rounded-[10px] bg-intro-signup-accent-blue px-14 text-white shadow-[0px_8px_rgba(0,0,0,.15)] lg:mt-0 lg:h-[60px]">
          <p className="mt-[4px] text-center text-[15px] leading-[26px] tracking-[.1px]">
            <span className="font-bold">Try it free 7 days </span>
            <span className="text-white/75">then $20/mo. thereafter</span>
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full rounded-[10px] bg-white p-6 shadow-[0px_8px_rgba(0,0,0,.15)] lg:p-10"
        >
          <fieldset className="flex flex-col gap-4 lg:gap-5">
            <input
              {...register("firstName", { required: true })}
              className={`h-[56px] w-full rounded border bg-white px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold placeholder:tracking-[.2px] focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent lg:px-[31px] ${
                errors.firstName
                  ? "border-red-500 bg-[url('/intro-component-with-signup-form/images/icon-error.svg')] bg-[length:24px_24px] bg-[right_26px_center] bg-no-repeat text-red-500 placeholder:opacity-0 focus-visible:border-red-300"
                  : "border-introdrop-neutral-200/30  text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 focus:placeholder:opacity-30 focus-visible:border-introdrop-neutral-200"
              }`}
              type="text"
              placeholder="First Name"
            />
            <ErrorMessage field={errors.firstName} />
            <input
              {...register("lastName", { required: true })}
              className={`h-[56px] w-full rounded border bg-white px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold placeholder:tracking-[.2px] focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent lg:px-[31px] ${
                errors.lastName
                  ? "border-red-500 bg-[url('/intro-component-with-signup-form/images/icon-error.svg')] bg-[length:24px_24px] bg-[right_26px_center] bg-no-repeat text-red-500 placeholder:opacity-0 focus-visible:border-red-300"
                  : "border-introdrop-neutral-200/30  text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 focus:placeholder:opacity-30 focus-visible:border-introdrop-neutral-200"
              }`}
              type="text"
              placeholder="Last Name"
            />
            <ErrorMessage field={errors.lastName} />
            <input
              {...register("email", { required: true })}
              className={`h-[56px] w-full rounded border bg-white px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold placeholder:tracking-[.2px] focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent lg:px-[31px] ${
                errors.email
                  ? "border-red-500 bg-[url('/intro-component-with-signup-form/images/icon-error.svg')] bg-[length:24px_24px] bg-[right_26px_center] bg-no-repeat text-red-500 placeholder:opacity-0 focus-visible:border-red-300"
                  : "border-introdrop-neutral-200/30  text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 focus:placeholder:opacity-30 focus-visible:border-introdrop-neutral-200"
              }`}
              type="email"
              placeholder="Email Address"
            />
            <ErrorMessage field={errors.email} />
            <input
              {...register("password", { required: true })}
              className={`h-[56px] w-full rounded border bg-white px-[19px] pt-[1px] text-[14px] font-semibold placeholder:text-[14px] placeholder:font-semibold placeholder:tracking-[.2px] focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-transparent lg:px-[31px] ${
                errors.password
                  ? "border-red-500 bg-[url('/intro-component-with-signup-form/images/icon-error.svg')] bg-[length:24px_24px] bg-[right_26px_center] bg-no-repeat text-red-500 placeholder:opacity-0 focus-visible:border-red-300"
                  : "border-introdrop-neutral-200/30  text-introdrop-neutral-300 placeholder:text-introdrop-neutral-200 focus:placeholder:opacity-30 focus-visible:border-introdrop-neutral-200"
              }`}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage field={errors.password} />
            <button
              className="flex h-[52px] items-center justify-center rounded-md bg-intro-signup-primary-green pt-[6px] text-center font-medium uppercase tracking-[.4px] text-white shadow-[0px_4px_hsl(154,59%,46%)] hover:opacity-75 focus-visible:opacity-80 focus-visible:outline focus-visible:outline-transparent"
              type="submit"
            >
              Claim your free trial
            </button>
          </fieldset>
          <p className="mt-[13px] px-5 text-center text-[11px] font-semibold leading-[20.5px] tracking-[-0.1px] text-introdrop-neutral-200/30 lg:mt-[14px] lg:leading-[24px]">
            By clicking the button, you are agreeing to our{" "}
            <a href="" className="font-bold text-intro-signup-primary-red">
              Terms and Services
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

function ErrorMessage({ field }: { field?: FieldError }) {
  if (!field) return null;
  return (
    <p
      role="alert"
      aria-live="polite"
      className="-mt-[14.5px] text-right text-[11px] font-medium italic text-red-500/75"
    >
      {field.message}
    </p>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-white">
      <p className="text-center text-[11px] [&_a]:font-bold [&_a]:text-introdrop-neutral-100 [&_a]:underline [&_a]:decoration-intro-signup-primary-green [&_a]:decoration-wavy">
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

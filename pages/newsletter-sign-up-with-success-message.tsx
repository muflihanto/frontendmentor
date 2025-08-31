import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import Head from "next/head";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "usehooks-ts";
import { z } from "zod";
import { cn } from "../utils/cn";
import { roboto } from "../utils/fonts/roboto";

// import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const zInputSchema = z.object({
  email: z.string().min(1, "Email required").email("Valid email required"),
});
type InputSchema = z.infer<typeof zInputSchema>;

const isSuccessOpenAtom = atom(false);
const emailAtom = atom("");

export default function NewsletterSignUpWithSuccessMessage() {
  const isSuccessOpen = useAtomValue(isSuccessOpenAtom);

  useEffect(() => {
    if (isSuccessOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSuccessOpen]);

  return (
    <>
      <Head>
        <title>
          Frontend Mentor | Newsletter sign-up form with success message
        </title>
      </Head>
      <div
        className={cn(
          `App relative min-h-[100dvh] bg-newsletter-neutral-300 font-roboto sm:py-10 sm:max-lg:py-10 ${roboto.variable}`,
          isSuccessOpen
            ? "sm:flex sm:items-center sm:justify-center"
            : "lg:flex lg:items-center lg:justify-center",
        )}
      >
        {isSuccessOpen ? (
          <SuccessScreen />
        ) : (
          <div className="flex flex-col bg-newsletter-neutral-100 sm:rounded-[36px] sm:shadow-[0px_20px_10px_theme(colors.newsletter.neutral.400/50%),0px_30px_20px_30px_theme(colors.newsletter.neutral.400/25%)] sm:max-lg:mx-auto sm:max-lg:max-w-screen-sm sm:max-lg:overflow-hidden lg:-mt-[1px] lg:h-[641px] lg:w-[926px] lg:flex-row-reverse lg:justify-between lg:p-6">
            <IllustrationSignUp />
            <Main />
          </div>
        )}
        <Footer />
        {/* <Slider
          basePath="/newsletter-sign-up-with-success-message/design"
          absolutePath="/newsletter-sign-up-with-success-message/design/error-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InputSchema>({
    resolver: zodResolver(zInputSchema),
  });

  const setScreen = useSetAtom(isSuccessOpenAtom);
  const setEmail = useSetAtom(emailAtom);

  const onSubmit = handleSubmit((data) => {
    setEmail(data.email);
    // console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setScreen(true);
    }
  }, [reset, isSubmitSuccessful, setScreen]);

  return (
    <div className="w-full lg:flex lg:flex-1 lg:items-center lg:justify-center">
      <main
        className="px-6 pb-10 pt-[30px] lg:pl-[39px] lg:pt-[24px]"
        aria-labelledby="stay-updated"
      >
        <h1
          className="text-[40px] font-bold text-newsletter-neutral-400 lg:text-[56px]"
          id="stay-updated"
        >
          Stay updated!
        </h1>
        <p className="mt-[13px] text-newsletter-neutral-300 lg:mt-[10px]">
          Join 60,000+ product managers receiving monthly updates on:
        </p>
        <ul className="mt-[26px] flex flex-col gap-3 text-newsletter-neutral-300">
          <li className="flex items-start gap-4">
            <IconList className="w-[23px] lg:w-[21px]" />
            <p className="-mt-[2px]">
              Product discovery and building what matters
            </p>
          </li>
          <li className="flex items-start gap-4">
            <IconList className="w-[22px] lg:w-[21px]" />
            <p className="-mt-[2px]">
              Measuring to ensure updates are a success
            </p>
          </li>
          <li className="mt-[1px] flex items-start gap-4">
            <IconList />
            <p className="-mt-[2px]">And much more!</p>
          </li>
        </ul>
        <form className="mt-10 w-full bg-white" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">
            <div className="flex">
              <p className="text-[12px] font-bold text-newsletter-neutral-400">
                Email address
              </p>
              {errors.email ? (
                <p className="ml-auto text-[12px] font-bold text-newsletter-primary">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <input
              type="email"
              id="email"
              placeholder="email@company.com"
              className={`mt-2 h-[56px] w-full rounded-[8px] border px-[23px] focus-visible:outline focus-visible:outline-transparent ${
                errors.email
                  ? "border-newsletter-primary bg-newsletter-primary/[15%] text-newsletter-primary placeholder:text-newsletter-primary/50"
                  : "border-newsletter-neutral-200/75 bg-white text-newsletter-neutral-300 focus:border-newsletter-neutral-300"
              }`}
              {...register("email", { required: true })}
            />
            <button
              className="mt-6 flex h-[56px] w-full items-center justify-center rounded-lg bg-newsletter-neutral-400 pt-[2px] font-bold text-newsletter-neutral-100 hover:bg-gradient-to-r hover:from-[#FF527B] hover:to-[#FF6A3A] hover:shadow-[0px_10px_10px_theme(colors.newsletter.primary/25%),0px_20px_20px_10px_theme(colors.newsletter.primary/20%)]"
              type="submit"
            >
              Subscribe to monthly newsletter
            </button>
          </label>
        </form>
      </main>
    </div>
  );
}

function IconList({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("w-[21px]", className)}
      viewBox="0 0 21 21"
      role="graphics-symbol"
      aria-label="List"
    >
      <use href="/newsletter-sign-up-with-success-message/assets/images/icon-list.svg#icon-list" />
    </svg>
  );
}

function IllustrationSignUp() {
  const { width } = useWindowSize();

  console.log({ width });

  return (
    <header className="contents">
      {width < 1024 ? (
        <svg
          className="w-full sm:max-lg:rounded-t-[36px] sm:max-lg:p-6 sm:max-lg:pb-0"
          viewBox="0 0 375 284"
          aria-labelledby="illustration-sign-up-mobile-title"
        >
          <title id="illustration-sign-up-mobile-title">
            Illustration Sign Up Mobile
          </title>
          <use href="/newsletter-sign-up-with-success-message/assets/images/illustration-sign-up-mobile.svg#illustration-mobile" />
        </svg>
      ) : (
        <svg
          className="w-full flex-1 translate-x-5"
          viewBox="0 0 400 593"
          aria-labelledby="illustration-desktop-title"
        >
          <title id="illustration-desktop-title">Illustration Desktop</title>
          <use href="/newsletter-sign-up-with-success-message/assets/images/illustration-sign-up-desktop.svg#illustration-desktop" />
        </svg>
      )}
    </header>
  );
}

function SuccessScreen() {
  const setScreen = useSetAtom(isSuccessOpenAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const closeMenu = () => {
    setEmail("");
    setScreen(false);
  };

  return (
    <main
      className="fixed left-0 top-0 z-50 grid h-screen w-screen grid-cols-1 grid-rows-[auto,56px] gap-[155px] overflow-scroll bg-news-homepage-neutral-100 px-6 py-10 sm:static sm:h-[520px] sm:w-[505px] sm:gap-0 sm:rounded-[36px] sm:p-16 sm:pt-[48px] sm:shadow-[0px_20px_10px_theme(colors.newsletter.neutral.400/50%),0px_20px_20px_30px_theme(colors.newsletter.neutral.400/25%)]"
      aria-labelledby="thank-you"
    >
      <div className="flex flex-col place-self-center sm:place-self-start">
        <svg
          className="w-16"
          viewBox="0 0 64 64"
          aria-label="Success"
          role="graphics-symbol"
        >
          <use href="/newsletter-sign-up-with-success-message/assets/images/icon-success.svg#icon-success" />
        </svg>
        <h1
          className="mt-10 text-[40px] font-bold leading-none text-newsletter-neutral-400 sm:-translate-y-[1px] sm:text-[56px]"
          id="thank-you"
        >
          Thanks for subscribing!
        </h1>
        <p className="mt-[23px] text-newsletter-neutral-300">
          A confirmation email has been sent to{" "}
          <span className="font-bold text-newsletter-neutral-400">{email}</span>
          . Please open it and click the button inside to confirm your
          subscription.
        </p>
      </div>
      <button
        className="h-[56px] w-full rounded-lg bg-newsletter-neutral-400 pl-[2px] pt-[2px] font-bold text-news-homepage-neutral-100 hover:bg-gradient-to-r hover:from-[#FF527B] hover:to-[#FF6A3A] hover:shadow-[0px_10px_10px_theme(colors.newsletter.primary/25%),0px_20px_20px_10px_theme(colors.newsletter.primary/20%)]"
        onClick={closeMenu}
        type="button"
      >
        Dismiss message
      </button>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-newsletter-neutral-400 sm:text-newsletter-neutral-100 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

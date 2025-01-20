import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { overpass } from "../utils/fonts/overpass";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

interface Input {
  rating: 1 | 2 | 3 | 4 | 5 | null;
}

const InteractiveRating = () => {
  const [parent] = useAutoAnimate({ duration: 100 });
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive rating component</title>
      </Head>
      <div
        className={`App relative flex h-[100svh] w-screen items-center justify-center bg-rating-neutral-500 py-8 font-overpass ${overpass.variable}`}
        ref={parent}
      >
        <Main />
        <Footer />
        {/* <Slider
          // absolutePath="/interactive-rating-component/design/desktop-thank-you-state.jpg"
          basePath="/interactive-rating-component/design/"
        /> */}
      </div>
    </>
  );
};

function Main() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState<Input["rating"]>(null);

  const onSubmit: SubmitHandler<Input> = ({ rating }) => {
    setRating(rating);
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <ThankYouState rating={rating} />
      ) : (
        <RatingState onSubmit={onSubmit} />
      )}
    </>
  );
}

function RatingState({ onSubmit }: { onSubmit: SubmitHandler<Input> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<Input>();
  const [main] = useAutoAnimate({ duration: 150 });
  const currentRating = watch("rating");
  const onClick = () => clearErrors();
  return (
    <main
      className="relative mt-[5px] flex h-[416px] w-[calc(100vw-48px)] max-w-[413px] flex-col justify-center rounded-[32px] bg-[radial-gradient(circle_at_top,hsl(213,19%,18%)_0,_hsl(213,30%,12%)_100%)] pb-[31px] pl-7 pr-10 pt-8 text-rating-neutral-100 max-[375px]:mt-[2px] max-[375px]:h-[360px] max-[375px]:rounded-2xl max-[375px]:pb-[32px] max-[375px]:pl-5 max-[375px]:pr-[22px] max-[375px]:pt-[24px]"
      ref={main}
    >
      <div className="ml-1 flex aspect-square w-12 items-center justify-center rounded-full bg-rating-neutral-400 max-[375px]:w-10">
        <div className="relative aspect-[17/16] h-4 w-auto max-[375px]:h-[13px]">
          <Image
            src="/interactive-rating-component/images/icon-star.svg"
            alt="Star icon"
            className="object-contain"
            fill
          />
        </div>
      </div>
      <h1 className="mt-9 px-1 text-[28px] font-bold leading-none tracking-[-0.1px] max-[375px]:mt-[21px] max-[375px]:text-[24px]">
        How did we do?
      </h1>
      <p className="mt-[14px] px-1 text-[15px] leading-6 text-rating-neutral-300 max-[375px]:mt-[15px] max-[375px]:text-[14px] max-[375px]:leading-[22px]">
        Please let us know how we did with your support request. All feedback is
        appreciated to help us improve our offering!
      </p>
      <form
        id="rating-form"
        className="mt-[26px] flex w-full flex-col items-center max-[375px]:mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          id="inputs"
          className="flex w-full justify-between [&_label>input]:absolute [&_label>input]:opacity-0 [&_label>span]:ml-1 [&_label>span]:flex [&_label>span]:aspect-square [&_label>span]:h-[52px] [&_label>span]:items-center [&_label>span]:justify-center [&_label>span]:rounded-full [&_label>span]:bg-rating-neutral-400 [&_label>span]:text-center [&_label>span]:text-[16px] [&_label>span]:font-bold [&_label>span]:text-rating-neutral-200 [&_label>span]:hover:cursor-pointer max-[375px]:[&_label>span]:h-[41px] max-[375px]:[&_label>span]:text-[14px]"
        >
          {["1", "2", "3", "4", "5"].map((el) => {
            return (
              <RatingInput
                key={`rating-${el}`}
                ratingValue={el}
                register={register}
                onClick={onClick}
                currentRating={`${currentRating}`}
              />
            );
          })}
        </fieldset>
        <button
          id="submit"
          className="ml-[6px] mt-[31.5px] h-[45px] w-[calc(100%-4px)] rounded-full bg-rating-primary-orange pt-[4px] text-[15px] font-bold uppercase leading-none tracking-[2px] text-rating-neutral-100 max-[375px]:ml-[2px] max-[375px]:mt-[23.5px] max-[375px]:w-[calc(100%-6px)] max-[375px]:text-[14px]"
          type="submit"
        >
          Submit
        </button>
      </form>

      {errors.rating ? (
        <div
          id="required-tooltip"
          className="absolute -bottom-10 left-0 right-0 z-10 mx-auto w-40 rounded-[10px] bg-rating-primary-orange px-2 py-1 text-center text-[12px] uppercase tracking-[1px] text-rating-neutral-100"
        >
          Select a number!
        </div>
      ) : null}
    </main>
  );
}

interface RatingProps {
  ratingValue: string;
  register: UseFormRegister<Input>;
  onClick: () => void;
  currentRating: string;
}

function RatingInput({
  ratingValue,
  register,
  onClick,
  currentRating,
}: RatingProps) {
  return (
    <label className="group" htmlFor={`rate-${ratingValue}`}>
      <input
        onClick={onClick}
        id={`rate-${ratingValue}`}
        type="radio"
        className="peer"
        {...register("rating", { required: true })}
        value={ratingValue}
        role="radio"
        aria-checked={currentRating === ratingValue}
        aria-labelledby={`rating-label-${ratingValue}`}
      />
      <span
        className="group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100 peer-checked:bg-rating-primary-orange peer-checked:text-rating-neutral-100 peer-checked:hover:bg-rating-primary-orange/50 peer-focus-visible:ring peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-1"
        id={`rating-label-${ratingValue}`}
      >
        {ratingValue}
      </span>
    </label>
  );
}

function ThankYouState({ rating }: Input) {
  return (
    <main
      id="thank-you-modal"
      className="relative mt-[5px] flex h-[416px] w-[calc(100vw-48px)] max-w-[413px] flex-col items-center justify-center rounded-[32px] bg-[radial-gradient(circle_at_top,hsl(213,19%,18%)_0,_hsl(213,30%,12%)_100%)] pb-[47px] pl-8 pr-10 pt-[45.5px] text-center text-rating-neutral-100 max-[375px]:h-[360px] max-[375px]:rounded-2xl max-[375px]:px-6 max-[375px]:py-[33px]"
    >
      <div className="relative aspect-[162/108] h-[108px]">
        <Image
          src="/interactive-rating-component/images/illustration-thank-you.svg"
          alt="Thank you illustration"
          className="object-contain"
          fill
        />
      </div>
      <p className="ml-2 mt-8 flex h-[32px] w-[192px] items-center justify-center rounded-full bg-rating-neutral-400 pt-[2px] text-[15px] text-rating-primary-orange max-[375px]:px-[11px] max-[375px]:py-[9px] max-[375px]:text-[14px] max-[375px]:leading-[14px]">
        You selected {rating} out of 5
      </p>
      <h1 className="ml-2 mt-[38px] text-[28px] font-bold leading-none tracking-[-0.1px] max-[375px]:text-[24px]">
        Thank you!
      </h1>
      <p className="mt-[13px] text-[15px] leading-[24px] text-rating-neutral-300 max-[375px]:text-[14px]">
        We appreciate you taking the time to give a rating. If you ever need
        more support, don’t hesitate to get in touch!
      </p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-rating-neutral-100 [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-rating-primary-orange [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="https://github.com/muflihanto">Muflihanto</a>.
    </footer>
  );
}

export default InteractiveRating;

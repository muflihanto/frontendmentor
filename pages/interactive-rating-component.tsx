import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
        className="App font-overpass bg-rating-neutral-500 relative flex h-[100svh] w-screen items-center justify-center py-8"
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

  return <>{isSubmitted ? <ThankYouState rating={rating} /> : <RatingState onSubmit={onSubmit} />}</>;
}

function RatingState({ onSubmit }: { onSubmit: SubmitHandler<Input> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Input>();
  const [main] = useAutoAnimate({ duration: 150 });
  return (
    <main
      className="text-rating-neutral-100 relative mt-[5px] flex
    h-[416px] w-[calc(100vw-48px)] max-w-[413px] flex-col justify-center rounded-[32px] bg-[radial-gradient(circle_at_top,hsl(213,19%,18%)_0,_hsl(213,30%,12%)_100%)] pl-7 pr-10 pt-8 pb-[31px] max-[375px]:mt-[2px] max-[375px]:h-[360px] max-[375px]:rounded-2xl max-[375px]:pl-5 max-[375px]:pr-[22px] max-[375px]:pt-[24px] max-[375px]:pb-[32px]"
      ref={main}
    >
      <div className="bg-rating-neutral-400 ml-1 flex aspect-square w-12 items-center justify-center rounded-full max-[375px]:w-10">
        <div className="relative aspect-[17/16] h-4 w-auto max-[375px]:h-[13px]">
          <Image
            src="/interactive-rating-component/images/icon-star.svg"
            alt="Star icon"
            className="object-contain"
            fill
          />
        </div>
      </div>
      <h1 className="mt-9 px-1 text-[28px] font-bold leading-none tracking-[-0.1px] max-[375px]:mt-[21px] max-[375px]:text-[24px]">How did we do?</h1>
      <p className="text-rating-neutral-300 mt-[14px] px-1 text-[15px] leading-6 max-[375px]:mt-[15px] max-[375px]:text-[14px] max-[375px]:leading-[22px]">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
      <form
        id="rating-form"
        className="mt-[26px] flex w-full flex-col items-center max-[375px]:mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          id="inputs"
          className="[&_label>span]:text-rating-neutral-200 [&_label>span]:bg-rating-neutral-400 flex w-full justify-between [&_label>span]:ml-1 [&_label>span]:flex [&_label>span]:aspect-square [&_label>span]:h-[52px] [&_label>span]:items-center [&_label>span]:justify-center [&_label>span]:rounded-full [&_label>span]:text-center [&_label>span]:text-[16px] [&_label>span]:font-bold [&_label>span]:hover:cursor-pointer max-[375px]:[&_label>span]:h-[41px] max-[375px]:[&_label>span]:text-[14px] [&_label>input]:absolute [&_label>input]:opacity-0"
        >
          <label
            className="group"
            htmlFor="rate-1"
          >
            <input
              onClick={() => clearErrors()}
              id="rate-1"
              type="radio"
              className="[&:checked~span]:text-rating-neutral-100 [&:checked~span]:bg-rating-primary-orange peer"
              {...register("rating", { required: true })}
              value="1"
            />
            <span className="peer-checked:hover:bg-rating-primary-orange/50 group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100">1</span>
          </label>
          <label
            className="group"
            htmlFor="rate-2"
          >
            <input
              onClick={() => clearErrors()}
              id="rate-2"
              type="radio"
              className="[&:checked~span]:text-rating-neutral-100 [&:checked~span]:bg-rating-primary-orange peer"
              {...register("rating", { required: true })}
              value="2"
            />
            <span className="peer-checked:hover:bg-rating-primary-orange/50 group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100">2</span>
          </label>
          <label
            className="group"
            htmlFor="rate-3"
          >
            <input
              onClick={() => clearErrors()}
              id="rate-3"
              type="radio"
              className="[&:checked~span]:text-rating-neutral-100 [&:checked~span]:bg-rating-primary-orange peer"
              {...register("rating", { required: true })}
              value="3"
            />
            <span className="peer-checked:hover:bg-rating-primary-orange/50 group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100">3</span>
          </label>
          <label
            className="group"
            htmlFor="rate-4"
          >
            <input
              onClick={() => clearErrors()}
              id="rate-4"
              type="radio"
              className="[&:checked~span]:text-rating-neutral-100 [&:checked~span]:bg-rating-primary-orange peer"
              {...register("rating", { required: true })}
              value="4"
            />
            <span className="peer-checked:hover:bg-rating-primary-orange/50 group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100">4</span>
          </label>
          <label
            className="group"
            htmlFor="rate-5"
          >
            <input
              onClick={() => clearErrors()}
              id="rate-5"
              type="radio"
              className="[&:checked~span]:text-rating-neutral-100 [&:checked~span]:bg-rating-primary-orange peer"
              {...register("rating", { required: true })}
              value="5"
            />
            <span className="peer-checked:hover:bg-rating-primary-orange/50 group-hover:bg-rating-neutral-300 group-hover:text-rating-neutral-100">5</span>
          </label>
        </fieldset>
        <button
          id="submit"
          className="text-rating-neutral-100 bg-rating-primary-orange mt-[31.5px] ml-[6px] h-[45px] w-[calc(100%-4px)] rounded-full pt-[4px] text-[15px] font-bold uppercase leading-none tracking-[2px] max-[375px]:ml-[2px] max-[375px]:mt-[23.5px] max-[375px]:w-[calc(100%-6px)] max-[375px]:text-[14px]"
        >
          Submit
        </button>
      </form>

      {errors.rating ? (
        <div
          id="required-tooltip"
          className="text-rating-neutral-100 bg-rating-primary-orange absolute left-0 right-0 -bottom-10 z-10 mx-auto w-40 rounded-[10px] px-2 py-1 text-center text-[12px] uppercase tracking-[1px]"
        >
          Select a number!
        </div>
      ) : null}
    </main>
  );
}

function ThankYouState({ rating }: Input) {
  return (
    <main
      id="thank-you-modal"
      className="text-rating-neutral-100 relative mt-[5px]
      flex h-[416px] w-[calc(100vw-48px)] max-w-[413px] flex-col items-center justify-center rounded-[32px] bg-[radial-gradient(circle_at_top,hsl(213,19%,18%)_0,_hsl(213,30%,12%)_100%)] pt-[45.5px] pb-[47px] pl-8 pr-10 text-center max-[375px]:h-[360px] max-[375px]:rounded-2xl max-[375px]:px-6 max-[375px]:py-[33px]"
    >
      <div className="relative aspect-[162/108] h-[108px]">
        <Image
          src="/interactive-rating-component/images/illustration-thank-you.svg"
          alt="Thank you illustration"
          className="object-contain"
          fill
        />
      </div>
      <p className="bg-rating-neutral-400 text-rating-primary-orange mt-8 ml-2 flex h-[32px] w-[192px] items-center justify-center rounded-full pt-[2px] text-[15px] max-[375px]:px-[11px] max-[375px]:py-[9px] max-[375px]:text-[14px] max-[375px]:leading-[14px]">You selected {rating} out of 5</p>
      <h1 className="mt-[38px] ml-2 text-[28px] font-bold leading-none tracking-[-0.1px] max-[375px]:text-[24px]">Thank you!</h1>
      <p className="text-rating-neutral-300 mt-[13px] text-[15px] leading-[24px] max-[375px]:text-[14px]">We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="[&_a]:decoration-rating-primary-orange text-rating-neutral-100 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-wavy">
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

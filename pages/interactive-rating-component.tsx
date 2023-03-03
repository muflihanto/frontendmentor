import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

interface Input {
  rating: 1 | 2 | 3 | 4 | 5 | null;
}

const InteractiveRating = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive rating component</title>
      </Head>
      <div className="App font-overpass">
        <Main />
        <Footer />
        {/* <Slider basePath="/interactive-rating-component/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit: SubmitHandler<Input> = () => {
    setIsSubmitted(true);
  };

  return <>{isSubmitted ? <ThankYouState /> : <RatingState onSubmit={onSubmit} />}</>;
}

function RatingState({ onSubmit }: { onSubmit: SubmitHandler<Input> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  return (
    <main className="flex flex-col items-center">
      <header className="w-fit">
        <div id="header-logo">
          <div className="relative aspect-[17/16] h-4">
            <Image
              src="/interactive-rating-component/images/icon-star.svg"
              alt="Star icon"
              className="object-contain"
              fill
            />
          </div>
        </div>
      </header>
      <article
        id="container"
        className="flex flex-col items-center"
      >
        <h1 className="title text-center">How did we do?</h1>
        <p className="description text-center">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        <form
          id="rating-form"
          className="flex w-full flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            id="inputs"
            className="grid w-4/5 grid-cols-5 grid-rows-1 place-items-center justify-center [&_label>span]:ml-1"
          >
            <label htmlFor="rate-1">
              <input
                id="rate-1"
                type="radio"
                {...register("rating", { required: true })}
                value="1"
              />
              <span>1</span>
            </label>
            <label htmlFor="rate-2">
              <input
                id="rate-2"
                type="radio"
                {...register("rating", { required: true })}
                value="2"
              />
              <span>2</span>
            </label>
            <label htmlFor="rate-3">
              <input
                id="rate-3"
                type="radio"
                {...register("rating", { required: true })}
                value="3"
              />
              <span>3</span>
            </label>
            <label htmlFor="rate-4">
              <input
                id="rate-4"
                type="radio"
                {...register("rating", { required: true })}
                value="4"
              />
              <span>4</span>
            </label>
            <label htmlFor="rate-5">
              <input
                id="rate-5"
                type="radio"
                {...register("rating", { required: true })}
                value="5"
              />
              <span>5</span>
            </label>
          </div>
          <button id="submit">Submit</button>
        </form>
      </article>

      {errors.rating ? <div id="required-tooltip">Select a number!</div> : null}
    </main>
  );
}

function ThankYouState() {
  return (
    <aside
      id="thank-you-modal"
      className="flex flex-col items-center text-center"
    >
      <div className="relative aspect-[162/108] w-[108px]">
        <Image
          src="/interactive-rating-component/images/illustration-thank-you.svg"
          alt="Thank you illustration"
          className="object-contain"
          fill
        />
      </div>
      <p id="rating-info">
        You selected <span id="user-rating"></span> out of 5
      </p>
      <p className="title">Thank you!</p>
      <p className="description">We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
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

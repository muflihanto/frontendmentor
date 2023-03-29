import Head from "next/head";
import dynamic from "next/dynamic";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form/dist/types";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const inputSchema = z.object({
  cardholderName: z.string().min(1, "Can't be blank"),
  cardNumber: z
    .string()
    .min(1, "Can't be blank")
    .regex(new RegExp(/^([0-9]{4}\s){3}[0-9]{4}$/, "i"), "Wrong format, numbers only"),
  expMonth: z.number({ invalid_type_error: "Wrong format, numbers only", required_error: "Can't be blank" }).gte(1).lte(12).min(1, "Can't be blank"),
  expYear: z
    .number({ invalid_type_error: "Wrong format, numbers only", required_error: "Can't be blank" })
    .gte(parseInt(new Date().getFullYear().toString().substring(2)))
    .min(1, "Can't be blank"),
  cvc: z
    .string()
    .regex(/[0-9]{3}/, "Wrong format, numbers only")
    .min(1, "Can't be blank"),
});

type InputSchema = z.infer<typeof inputSchema>;

const inputAtom = atom<InputSchema | null>(null);
const modalAtom = atom(false);

export default function InteractiveCardDetailsForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive card details form</title>
      </Head>
      <div className="App font-space-grotesk relative min-h-[704px] font-medium lg:grid lg:min-h-screen lg:grid-cols-[483px,auto] lg:grid-rows-1">
        <CardPreview />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/interactive-card-details-form/design"
          // absolutePath="/interactive-card-details-form/design/complete-state-mobile.jpg"
        /> */}
      </div>
    </>
  );
}

function CardPreview() {
  const inputval = useAtomValue(inputAtom);

  return (
    <div className="flex h-[240px] w-full flex-col items-center bg-[url('/interactive-card-details-form/images/bg-main-mobile.png')] bg-cover bg-no-repeat lg:h-full lg:w-[min(calc(483/1440*100vw),483px)] lg:items-start lg:justify-center lg:bg-[url('/interactive-card-details-form/images/bg-main-desktop.png')] lg:py-10">
      <div className="relative h-full w-full max-w-[calc(375px-32px)] translate-y-8 lg:h-[527px] lg:w-[541px] lg:max-w-none lg:translate-y-0 lg:translate-x-[222px] lg:self-end">
        <div className="shadow-interactive-card-neutral-400/25 absolute right-0 top-0 z-[1] aspect-[447/245] w-[286px] rounded bg-[url('/interactive-card-details-form/images/bg-card-back.png')] bg-contain shadow-2xl lg:top-auto lg:bottom-0 lg:right-0 lg:z-0 lg:w-[447px]">
          <p className="text-interactive-card-neutral-100 absolute right-[calc(26/286*100%)] top-[calc(64/156.75*100%)] flex h-6 w-11 items-center justify-end pr-[12px] text-[10px] tracking-[.12px] lg:top-[101px] lg:h-[38px] lg:w-[360px] lg:px-[17px] lg:text-[14px] lg:tracking-[1.75px]">{!!inputval?.cvc ? inputval.cvc : "000"}</p>
        </div>
        <div className="shadow-interactive-card-neutral-400/25 absolute bottom-0 left-0 z-[2] aspect-[447/245] w-[286px] translate-y-[11px] bg-[url('/interactive-card-details-form/images/bg-card-front.png')] bg-contain shadow-2xl lg:left-0 lg:bottom-auto lg:top-0 lg:w-[447px] lg:translate-y-0">
          <div className="flex h-full w-full flex-col px-[20px] py-[18px] lg:px-[32px] lg:py-[28px]">
            <div className="flex items-center gap-[10px] lg:gap-4">
              <div className="bg-interactive-card-neutral-100 aspect-square w-[30px] rounded-full lg:w-[47px]" />
              <div className="border-interactive-card-neutral-200 aspect-square w-[14px] rounded-full border bg-transparent lg:w-[21px]" />
            </div>
            <p className="text-interactive-card-neutral-100 mt-[35px] text-[18px] tracking-[2.17px] lg:mt-[62px] lg:text-[27px] lg:tracking-[4px]">{!!inputval?.cardNumber ? inputval.cardNumber : "0000 0000 0000 0000"}</p>
            <div className="text-interactive-card-neutral-100 mt-[13px] flex justify-between text-[10px] uppercase lg:mt-[21.5px] lg:text-[14px]">
              <p className="tracking-[0.7px] lg:tracking-[2px]">{!!inputval?.cardholderName ? inputval.cardholderName : "Jane Appleseed"}</p>
              <p className="tracking-[1px] lg:tracking-[2px]">
                {!!inputval?.expMonth && !isNaN(inputval.expMonth) ? inputval?.expMonth : "00"}/{!!inputval?.expYear && !isNaN(inputval.expYear) ? inputval?.expYear : "00"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompleteModal({ reset }: { reset: UseFormReset<InputSchema> }) {
  const setOpen = useSetAtom(modalAtom);

  const handleClick = () => {
    reset();
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center pt-[.5px]">
      <svg
        className="w-20"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="40"
          cy="40"
          r="40"
          fill="url(#a)"
        />
        <path
          d="M28 39.92 36.08 48l16-16"
          stroke="#fff"
          strokeWidth="3"
        />
        <defs>
          <linearGradient
            id="a"
            x1="-23.014"
            y1="11.507"
            x2="0"
            y2="91.507"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6348FE" />
            <stop
              offset="1"
              stopColor="#610595"
            />
          </linearGradient>
        </defs>
      </svg>
      <h1 className="text-interactive-card-neutral-400 mt-[32px] text-[28px] uppercase tracking-[3.5px]">Thank you!</h1>
      <p className="text-interactive-card-neutral-300 mt-[11px] text-[18px]">We&apos;ve added your card details</p>
      <button
        onClick={handleClick}
        className="bg-interactive-card-neutral-400 text-interactive-card-neutral-100 mt-[46.5px] flex h-[53px] w-full items-center justify-center rounded-lg text-[18px]"
      >
        Continue
      </button>
    </div>
  );
}

function Main() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  });

  const setInputVal = useSetAtom(inputAtom);

  const [modalOpen, setModalOpen] = useAtom(modalAtom);

  useEffect(() => {
    const subs = watch((value) => {
      setInputVal(value as InputSchema);
    });
    return () => subs.unsubscribe();
  }, [watch, setInputVal]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setModalOpen(true);
    }
  }, [isSubmitSuccessful, setModalOpen]);

  return (
    <div className="mx-auto mt-[90px] w-full max-w-[429px] px-6 lg:mt-0 lg:translate-x-[calc(61/1440*100vw)] lg:self-center">
      {modalOpen ? (
        <CompleteModal reset={reset} />
      ) : (
        <form
          onSubmit={onSubmit}
          className="[&_span]:text-interactive-card-neutral-400 [&_input::placeholder]:text-interactive-card-neutral-300/50 grid w-full grid-cols-2 grid-rows-[repeat(4,auto)] gap-y-[19px] lg:gap-y-[25px] [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[2px] [&_input]:h-[45px] [&_input]:rounded-lg [&_input]:border [&_input]:px-[15px] [&_input]:text-[18px] [&_input:focus-visible]:outline [&_input:focus-visible]:outline-transparent"
        >
          <label
            className="col-span-2 flex w-full flex-col gap-[7px]"
            htmlFor="cardholderName"
          >
            <span>Cardholder Name</span>
            <input
              id="cardholderName"
              type="text"
              {...register("cardholderName")}
              placeholder="e.g. Jane Appleseed"
              className={`${!!errors.cardholderName ? "border-interactive-card-primary-red" : "border-interactive-card-neutral-200"}`}
            />
            {!!errors.cardholderName && <p className="text-interactive-card-primary-red text-[10px]">{errors.cardholderName.message}</p>}
          </label>
          <label
            className="col-span-2 flex w-full flex-col gap-[7px]"
            htmlFor="cardNumber"
          >
            <span>Card Number</span>
            <input
              id="cardNumber"
              type="text"
              {...register("cardNumber")}
              placeholder="e.g. 1234 5678 9123 0000"
              maxLength={19}
              className={`${!!errors.cardNumber ? "border-interactive-card-primary-red" : "border-interactive-card-neutral-200"}`}
            />
            {!!errors.cardNumber && <p className="text-interactive-card-primary-red text-[10px]">{errors.cardNumber.message}</p>}
          </label>
          <label
            className="flex w-full flex-col gap-[7px] pr-3 lg:pr-5"
            htmlFor="expMonth"
          >
            <span>Exp. Date (MM/YY)</span>
            <fieldset className="grid grid-cols-2 grid-rows-1 gap-2 lg:gap-[10px]">
              <div>
                <input
                  className={`${!!errors.expMonth ? "border-interactive-card-primary-red" : "border-interactive-card-neutral-200"} w-full`}
                  id="expMonth"
                  type="text"
                  {...register("expMonth", { valueAsNumber: true, required: true })}
                  placeholder="MM"
                  minLength={2}
                  maxLength={2}
                />
                {!!errors.expMonth && <p className="text-interactive-card-primary-red text-[10px]">{errors.expMonth.message}</p>}
              </div>
              <div>
                <input
                  className={`${!!errors.expYear ? "border-interactive-card-primary-red" : "border-interactive-card-neutral-200"} w-full`}
                  id="expYear"
                  type="text"
                  {...register("expYear", { valueAsNumber: true, required: true })}
                  placeholder="YY"
                  minLength={2}
                  maxLength={2}
                />
                {!!errors.expYear && <p className="text-interactive-card-primary-red text-[10px]">{errors.expYear.message}</p>}
              </div>
            </fieldset>
          </label>
          <label
            className="flex w-full flex-col gap-[7px]"
            htmlFor="cvc"
          >
            <span>CVC</span>
            <input
              id="cvc"
              type="text"
              {...register("cvc", { required: true })}
              placeholder="e.g. 123"
              minLength={3}
              maxLength={3}
              className={`${!!errors.cvc ? "border-interactive-card-primary-red" : "border-interactive-card-neutral-200"}`}
            />
            {!!errors.cvc && <p className="text-interactive-card-primary-red text-[10px]">{errors.cvc.message}</p>}
          </label>
          <button className="bg-interactive-card-neutral-400 col-span-2 mt-[9px] flex h-[53px] items-center justify-center rounded-lg text-[18px] text-white lg:mt-[15px]">Confirm</button>
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] lg:right-0 lg:flex lg:w-[calc(100vw-483px)] lg:justify-center [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      <p className="lg:w-fit lg:translate-x-[calc(61/1440*100vw)]">
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

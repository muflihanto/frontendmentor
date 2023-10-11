import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReset, useForm } from "react-hook-form";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { spaceGrotesk } from "../utils/fonts/spaceGrotesk";
import Image from "next/image";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: Fix validation rules
const inputSchema = z.object({
  cardholderName: z.string().min(1, "Can't be blank"),
  cardNumber: z
    .string()
    .min(1, "Can't be blank")
    .regex(
      new RegExp(/^([0-9]{4}\s){3}[0-9]{4}$/, "i"),
      "Wrong format, numbers only",
    ),
  expMonth: z
    .string()
    .min(1, "Can't be blank")
    .regex(/[0-9]{2}/, "Wrong format, numbers only")
    .refine(
      (value) => parseInt(value) <= 12 && parseInt(value) >= 1,
      "Invalid month",
    ),
  // .number({ invalid_type_error: "Wrong format, numbers only", required_error: "Can't be blank" })
  //   .gte(1)
  //   .lte(12)
  expYear: z
    .string()
    .min(1, "Can't be blank")
    .regex(/[0-9]{2}/, "Wrong format, numbers only")
    .refine(
      (value) =>
        parseInt(value) <=
          parseInt(new Date().getFullYear().toString().substring(2) + 5) &&
        parseInt(value) >=
          parseInt(new Date().getFullYear().toString().substring(2)),
      "Invalid year",
    ),
  // .number({ invalid_type_error: "Wrong format, numbers only", required_error: "Can't be blank" })
  // .gte(parseInt(new Date().getFullYear().toString().substring(2))),
  cvc: z
    .string()
    .min(1, "Can't be blank")
    .regex(/[0-9]{3}/, "Wrong format, numbers only"),
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
      <div
        className={`App relative min-h-[704px] font-space-grotesk font-medium lg:grid lg:min-h-screen lg:grid-cols-[483px,auto] lg:grid-rows-1 ${spaceGrotesk.variable}`}
      >
        <CardPreview />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/interactive-card-details-form/design"
          // absolutePath="/interactive-card-details-form/design/active-states.jpg"
          // absolutePath="/interactive-card-details-form/design/complete-state-desktop.jpg"
        /> */}
      </div>
    </>
  );
}

function CardPreview() {
  const inputval = useAtomValue(inputAtom);

  return (
    <div className="flex h-[240px] w-full flex-col items-center bg-[url('/interactive-card-details-form/images/bg-main-mobile.png')] bg-cover bg-no-repeat lg:h-full lg:w-[min(calc(483/1440*100vw),483px)] lg:items-start lg:justify-center lg:bg-[url('/interactive-card-details-form/images/bg-main-desktop.png')] lg:py-10">
      <div className="relative h-full w-full max-w-[calc(375px-32px)] translate-y-8 lg:h-[527px] lg:w-[541px] lg:max-w-none lg:translate-x-[222px] lg:translate-y-0 lg:self-end">
        <div className="absolute right-0 top-0 z-[1] aspect-[447/245] w-[286px] rounded bg-[url('/interactive-card-details-form/images/bg-card-back.png')] bg-contain shadow-2xl shadow-interactive-card-neutral-400/25 lg:bottom-0 lg:right-0 lg:top-auto lg:z-0 lg:w-[447px]">
          <p className="absolute right-[calc(26/286*100%)] top-[calc(64/156.75*100%)] flex h-6 w-11 items-center justify-end pr-[12px] text-[10px] tracking-[.12px] text-interactive-card-neutral-100 lg:top-[101px] lg:h-[38px] lg:w-[360px] lg:px-[17px] lg:text-[14px] lg:tracking-[1.75px]">
            {!!inputval?.cvc ? inputval.cvc : "000"}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-[2] aspect-[447/245] w-[286px] translate-y-[11px] bg-[url('/interactive-card-details-form/images/bg-card-front.png')] bg-contain shadow-2xl shadow-interactive-card-neutral-400/25 lg:bottom-auto lg:left-0 lg:top-0 lg:w-[447px] lg:translate-y-0">
          <div className="flex h-full w-full flex-col px-[20px] py-[18px] lg:px-[32px] lg:py-[28px]">
            <div className="flex items-center gap-[10px] lg:gap-4">
              <div className="aspect-square w-[30px] rounded-full bg-interactive-card-neutral-100 lg:w-[47px]" />
              <div className="aspect-square w-[14px] rounded-full border border-interactive-card-neutral-200 bg-transparent lg:w-[21px]" />
            </div>
            <p className="mt-[35px] text-[18px] tracking-[2.17px] text-interactive-card-neutral-100 lg:mt-[62px] lg:text-[27px] lg:tracking-[4px]">
              {!!inputval?.cardNumber
                ? inputval.cardNumber
                : "0000 0000 0000 0000"}
            </p>
            <div className="mt-[13px] flex justify-between text-[10px] uppercase text-interactive-card-neutral-100 lg:mt-[21.5px] lg:text-[14px]">
              <p className="tracking-[0.7px] lg:tracking-[2px]">
                {!!inputval?.cardholderName
                  ? inputval.cardholderName
                  : "Jane Appleseed"}
              </p>
              <p className="tracking-[1px] lg:tracking-[2px]">
                {inputval?.expMonth ? inputval.expMonth : "00"}/
                {inputval?.expYear ? inputval.expYear : "00"}
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
    <div className="flex flex-col items-center pt-[.5px] lg:mb-[72px]">
      <Image
        src="/interactive-card-details-form/images/icon-complete.svg"
        alt="White Check Mark"
        width={80}
        height={80}
      />
      <h1 className="mt-[32px] text-[28px] uppercase tracking-[3.5px] text-interactive-card-neutral-400">
        Thank you!
      </h1>
      <p className="mt-[11px] text-[18px] text-interactive-card-neutral-300">
        We&apos;ve added your card details
      </p>
      <button
        onClick={handleClick}
        className="mt-[46.5px] flex h-[53px] w-full items-center justify-center rounded-lg bg-interactive-card-neutral-400 text-[18px] text-interactive-card-neutral-100"
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
    <div className="mx-auto mt-[90px] w-full max-w-[429px] px-6 lg:mt-0 lg:translate-x-[calc(61/1440*100vw)] lg:self-center lg:pt-[71px]">
      {modalOpen ? (
        <CompleteModal reset={reset} />
      ) : (
        <form
          onSubmit={onSubmit}
          className="grid w-full grid-cols-2 grid-rows-[repeat(4,auto)] gap-y-[19px] lg:h-[423.5px] lg:place-content-start lg:gap-y-[25px] [&_input::placeholder]:text-interactive-card-neutral-300/50 [&_input:focus-visible]:border-interactive-card-neutral-400 [&_input:focus-visible]:outline [&_input:focus-visible]:outline-1 [&_input:focus-visible]:outline-transparent [&_input]:h-[45px] [&_input]:rounded-lg [&_input]:border [&_input]:px-[15px] [&_input]:text-[18px] [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[2px] [&_span]:text-interactive-card-neutral-400"
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
              className={`${
                !!errors.cardholderName
                  ? "border-interactive-card-primary-red"
                  : "border-interactive-card-neutral-200"
              }`}
            />
            {!!errors.cardholderName && (
              <p className="translate-y-[1px] text-[12px] leading-[16.5px] text-interactive-card-primary-red">
                {errors.cardholderName.message}
              </p>
            )}
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
              className={`${
                !!errors.cardNumber
                  ? "border-interactive-card-primary-red"
                  : "border-interactive-card-neutral-200"
              }`}
            />
            {!!errors.cardNumber && (
              <p className="translate-y-[1px] text-[12px] leading-[16.5px] text-interactive-card-primary-red">
                {errors.cardNumber.message}
              </p>
            )}
          </label>
          <label
            className="flex w-full flex-col gap-[7px] pr-3 lg:pr-5"
            htmlFor="expMonth"
          >
            <span>Exp. Date (MM/YY)</span>
            <fieldset className="grid grid-cols-2 grid-rows-1 gap-2 lg:gap-[10px]">
              <div>
                <input
                  className={`${
                    !!errors.expMonth
                      ? "border-interactive-card-primary-red"
                      : "border-interactive-card-neutral-200"
                  } w-full`}
                  id="expMonth"
                  type="text"
                  {...register("expMonth", { required: true })}
                  placeholder="MM"
                  minLength={2}
                  maxLength={2}
                />
                {/* {!!errors.expMonth && <p className="text-interactive-card-primary-red translate-y-[1px] text-[12px] leading-[16.5px]">{errors.expMonth.message}</p>} */}
              </div>
              <div>
                <input
                  className={`${
                    !!errors.expYear
                      ? "border-interactive-card-primary-red"
                      : "border-interactive-card-neutral-200"
                  } w-full`}
                  id="expYear"
                  type="text"
                  {...register("expYear", { required: true })}
                  placeholder="YY"
                  minLength={2}
                  maxLength={2}
                />
              </div>
            </fieldset>
            {!!errors.expYear && (
              <p className="translate-y-[1px] text-[12px] leading-[16.5px] text-interactive-card-primary-red">
                {errors.expYear.message}
              </p>
            )}
            {/*
             // TODO: Fix error message
            */}
          </label>
          <label className="flex w-full flex-col gap-[7px]" htmlFor="cvc">
            <span>CVC</span>
            <input
              id="cvc"
              type="text"
              {...register("cvc", { required: true })}
              placeholder="e.g. 123"
              minLength={3}
              maxLength={3}
              className={`${
                !!errors.cvc
                  ? "border-interactive-card-primary-red"
                  : "border-interactive-card-neutral-200"
              }`}
            />
            {!!errors.cvc && (
              <p className="translate-y-[1px] text-[12px] leading-[16.5px] text-interactive-card-primary-red">
                {errors.cvc.message}
              </p>
            )}
          </label>
          <button
            className={`col-span-2 mt-[9px] flex h-[53px] items-center justify-center rounded-lg bg-interactive-card-neutral-400 text-[18px] text-white ${
              !!errors.cvc || !!errors.expMonth || !!errors.expYear
                ? "lg:mt-[2px]"
                : "lg:mt-[15px]"
            }`}
          >
            Confirm
          </button>
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

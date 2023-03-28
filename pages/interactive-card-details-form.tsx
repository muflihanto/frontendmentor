import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
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
  cvc: z.number({ invalid_type_error: "Wrong format, numbers only", required_error: "Can't be blank" }).gte(0).lte(999).min(1, "Can't be blank"),
});

type InputSchema = z.infer<typeof inputSchema>;

const inputAtom = atom<InputSchema | null>(null);

const labelAtom = atom(["Cardholder Name", "Card Number", "Exp. Date (MM/YY)", "Exp. Date (MM/YY)", "CVC"]);

export default function InteractiveCardDetailsForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive card details form</title>
      </Head>
      <div className="App font-space-grotesk relative min-h-[100svh] pb-[45px] font-medium">
        <CardPreview />
        <Main />
        <Footer />
        {/* <Slider basePath="/interactive-card-details-form/design" /> */}
      </div>
    </>
  );
}

function CardPreview() {
  const inputval = useAtomValue(inputAtom);

  return (
    <div className="flex h-[240px] w-full flex-col items-center bg-[url('/interactive-card-details-form/images/bg-main-mobile.png')] bg-cover bg-no-repeat">
      <div className="relative h-full w-full max-w-[calc(375px-32px)] translate-y-8">
        <div className="shadow-interactive-card-neutral-400/25 absolute right-0 top-0 z-[-1] aspect-[447/245] w-[286px] bg-[url('/interactive-card-details-form/images/bg-card-back.png')] bg-contain shadow-2xl">
          <p className="text-interactive-card-neutral-100 absolute right-[calc(26/286*100%)] top-[calc(64/156.75*100%)] flex h-6 w-11 items-center justify-end pr-[12px] text-[10px] tracking-[.12px]">{inputval?.cvc && !isNaN(inputval.cvc) ? inputval.cvc : "000"}</p>
        </div>
        <div className="shadow-interactive-card-neutral-400/25 absolute bottom-0 left-0 aspect-[447/245] w-[286px] translate-y-[11px] bg-[url('/interactive-card-details-form/images/bg-card-front.png')] bg-contain shadow-2xl">
          <div className="flex h-full w-full flex-col px-[calc(20/286*100%)] pt-[calc(10/156.75*100%)]">
            <div className="flex items-center gap-[10px]">
              <div className="bg-interactive-card-neutral-100 aspect-square w-[30px] rounded-full" />
              <div className="border-interactive-card-neutral-200 aspect-square h-[14px] w-[14px] rounded-full border bg-transparent" />
            </div>
            <p className="text-interactive-card-neutral-100 mt-[calc(14%)] text-[18px] tracking-[2.17px]">{!!inputval?.cardNumber ? inputval.cardNumber : "0000 0000 0000 0000"}</p>
            <div className="text-interactive-card-neutral-100 mt-[5.5%] flex justify-between text-[10px] uppercase">
              <p className="tracking-[0.7px]">{!!inputval?.cardholderName ? inputval.cardholderName : "Jane Appleseed"}</p>
              <p className="tracking-[1px]">
                {!!inputval?.expMonth && !isNaN(inputval.expMonth) ? inputval?.expMonth : "00"}/{!!inputval?.expYear && !isNaN(inputval.expYear) ? inputval?.expYear : "00"}
              </p>
            </div>
          </div>
        </div>
      </div>
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

  useEffect(() => {
    const subs = watch((value) => {
      setInputVal(value as InputSchema);
    });
    return () => subs.unsubscribe();
  }, [watch, setInputVal]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="mx-auto mt-[90px] w-full max-w-screen-sm px-6">
      <form
        onSubmit={onSubmit}
        className="[&_span]:text-interactive-card-neutral-400 [&_input]:border-interactive-card-neutral-200 [&_input::placeholder]:text-interactive-card-neutral-300/50 grid w-full grid-cols-2 grid-rows-[repeat(4,auto)] gap-y-[19px] [&_span]:text-[12px] [&_span]:uppercase [&_span]:tracking-[2px] [&_input]:h-[45px] [&_input]:rounded-lg [&_input]:border [&_input]:px-[15px] [&_input]:text-[18px] [&_input:focus-visible]:outline [&_input:focus-visible]:outline-transparent"
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
          />
          {!!errors.cardholderName && <p>{errors.cardholderName.message}</p>}
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
          />
          {!!errors.cardNumber && <p>{errors.cardNumber.message}</p>}
        </label>
        <label
          className="flex w-full flex-col gap-[7px] pr-3"
          htmlFor="expMonth"
        >
          <span>Exp. Date (MM/YY)</span>
          <fieldset className="grid grid-cols-2 grid-rows-1 gap-2">
            <div>
              <input
                className="w-full"
                id="expMonth"
                type="text"
                {...register("expMonth", { valueAsNumber: true, required: true })}
                placeholder="MM"
                minLength={2}
                maxLength={2}
              />
              {!!errors.expMonth && <p>{errors.expMonth.message}</p>}
            </div>
            <div>
              <input
                className="w-full"
                id="expYear"
                type="text"
                {...register("expYear", { valueAsNumber: true, required: true })}
                placeholder="YY"
                minLength={2}
                maxLength={2}
              />
              {!!errors.expYear && <p>{errors.expYear.message}</p>}
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
            {...register("cvc", { valueAsNumber: true, required: true })}
            placeholder="e.g. 123"
            minLength={3}
            maxLength={3}
          />
          {!!errors.cvc && <p>{errors.cvc.message}</p>}
        </label>
        <button className="bg-interactive-card-neutral-400 col-span-2 mt-[9px] flex h-[53px] items-center justify-center rounded-lg text-[18px] text-white">Confirm</button>
      </form>
      {/* {`
         <!-- Completed state start -->

         Thank you!
         We've added your card details
         Continue
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

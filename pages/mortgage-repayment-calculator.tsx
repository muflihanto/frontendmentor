import { useForm, type ValidationError } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { atom, useAtom } from "jotai";
import Head from "next/head";
import { type ComponentProps, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { cn } from "../utils/cn";
// import Image from "next/image";
import {
  PlusJakartaSans,
  // PlusJakartaSansItalic,
} from "../utils/fonts/plusJakartaSans";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

type MortgageData = {
  amount: string;
  term: string;
  interestRate: string;
  mortgageType: MortgageType;
};
const mortgageAtom = atom<null | MortgageData>(null);
// const mortgageAtom = atom<null | MortgageData>({
//   amount: "300000",
//   term: "25",
//   interestRate: "5.25",
//   mortgageType: "repayment",
// });

export default function MortgageRepaymentCalculator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Mortgage Repayment Calculator</title>
      </Head>
      <div
        className={cn(
          "App relative min-h-[100svh] font-medium",
          PlusJakartaSans.variable,
          "font-plus-jakarta",
          "overflow-x-hidden",
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/mortgage-repayment-calculator/design"
          absolutePath="/mortgage-repayment-calculator/design/error-states.jpg"
        /> */}
      </div>
    </>
  );
}

function RadioIndicator() {
  return (
    <div
      className={cn(
        "absolute left-[18px] top-1/2 flex aspect-square w-[19px] -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-mortgage-neutral-slate-700",
        "peer-checked:border-[1.5px] peer-checked:border-mortgage-primary-lime peer-checked:[&>div]:block peer-checked:[&>div]:bg-mortgage-primary-lime",
      )}
    >
      <div className="hidden aspect-square w-[10px] rounded-full" />
    </div>
  );
}

const mortgageType = z
  .enum(["repayment", "interest-only"], {
    message: "This field is required",
  })
  .optional()
  .refine((val) => val !== undefined, {
    message: "This field is required",
  });
type MortgageType = z.infer<typeof mortgageType>;

const defaultValues = {
  amount: "",
  term: "",
  interestRate: "",
  mortgageType: undefined as unknown as MortgageType,
};

function FieldErrorMessage({
  errors,
  ...props
}: { errors: ValidationError[] } & ComponentProps<"p">) {
  return errors.length > 0 ? (
    <p className="mb-[3px] text-sm text-red-600" {...props}>
      {errors.join(", ")}
    </p>
  ) : null;
}

function MortgageForm() {
  const [, setMortgage] = useAtom(mortgageAtom);
  const form = useForm({
    defaultValues,
    onSubmit: ({ value, formApi }) => {
      console.log(value);
      setMortgage(value);
      formApi.reset();
    },
    validatorAdapter: zodValidator({
      transformErrors: (errors) => {
        return errors[0].message;
      },
    }),
  });

  const clearFields = () => {
    form.reset();
    setMortgage(null);
  };

  return (
    <form
      className="w-full bg-mortgage-neutral-white px-6 py-[31px] pb-8 text-mortgage-neutral-slate-700 md:h-full md:px-10 md:pb-10 md:pt-[39px]"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div className="md:flex md:justify-between">
        <h1 className="text-2xl font-bold text-mortgage-neutral-slate-900">
          Mortgage Calculator
        </h1>
        <button
          className="mt-2 underline md:mt-0"
          type="reset"
          onClick={clearFields}
        >
          Clear All
        </button>
      </div>
      <div className="mt-[23px] flex w-full flex-col gap-[23px] md:mt-[39px] md:grid md:grid-cols-2 lg:gap-[22px]">
        <form.Field
          name="amount"
          validators={{
            onSubmit: z.coerce.number().min(1, "This field is required"),
          }}
        >
          {(field) => {
            return (
              <label
                htmlFor={field.name}
                className="flex flex-col gap-[11px] md:col-span-2"
              >
                <span>Mortgage Amount</span>
                <div className="relative">
                  <NumericFormat
                    className={cn(
                      "peer h-[50px] w-full rounded border bg-white pl-[59px] text-lg font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-neutral-slate-900 focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500"
                        : "border-red-600 ",
                    )}
                    type="text"
                    thousandSeparator=","
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val.value)}
                  />
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-0 left-0 flex h-[50px] w-11 flex-col items-center justify-center rounded-l border border-r-0 text-lg font-bold peer-hover:border-mortgage-neutral-slate-900 peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100"
                        : "border-red-600 bg-red-600 text-mortgage-neutral-white",
                    )}
                  >
                    &pound;
                  </span>
                </div>
                <FieldErrorMessage errors={field.state.meta.errors} />
              </label>
            );
          }}
        </form.Field>
        <form.Field
          name="term"
          validators={{
            onSubmit: z.coerce.number().min(1, "This field is required"),
          }}
        >
          {(field) => {
            return (
              <label
                htmlFor={field.name}
                className="relative flex flex-col gap-[11px]"
              >
                <span>Mortgage Term</span>
                <div className="relative">
                  <NumericFormat
                    className={cn(
                      "peer h-[50px] w-full rounded border border-mortgage-neutral-slate-500 bg-white p-[15px] pr-[59px] text-lg font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-neutral-slate-900 focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500"
                        : "border-red-600 ",
                    )}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val.value)}
                  />
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-0 right-0 flex h-[50px] w-20 flex-col items-center justify-center rounded-r border border-l-0 border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100 text-lg font-bold peer-hover:border-mortgage-neutral-slate-900 peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100"
                        : "border-red-600 bg-red-600 text-mortgage-neutral-white",
                    )}
                  >
                    years
                  </span>
                </div>
                <FieldErrorMessage errors={field.state.meta.errors} />
              </label>
            );
          }}
        </form.Field>
        <form.Field
          name="interestRate"
          validators={{
            onSubmit: z.coerce.number().min(1, "This field is required"),
          }}
        >
          {(field) => {
            return (
              <label
                htmlFor={field.name}
                className="relative flex flex-col gap-[11px]"
              >
                <span>Interest Rate</span>
                <div className="relative">
                  <NumericFormat
                    className={cn(
                      "peer h-[50px] w-full rounded border border-mortgage-neutral-slate-500 bg-white p-[15px] pr-16 text-lg font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-neutral-slate-900 focus-visible:border-mortgage-primary-lime focus-visible:outline focus-visible:outline-transparent",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500"
                        : "border-red-600 ",
                    )}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val.value)}
                  />
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-0 right-0 flex h-[50px] w-[50px] flex-col items-center justify-center rounded-r border border-l-0 border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100 text-lg font-bold peer-hover:border-mortgage-neutral-slate-900 peer-focus-visible:border-mortgage-primary-lime peer-focus-visible:bg-mortgage-primary-lime peer-focus-visible:text-mortgage-neutral-slate-900",
                      field.state.meta.errors.length === 0
                        ? "border-mortgage-neutral-slate-500 bg-mortgage-neutral-slate-100"
                        : "border-red-600 bg-red-600 text-mortgage-neutral-white",
                    )}
                  >
                    %
                  </span>
                </div>
                <FieldErrorMessage errors={field.state.meta.errors} />
              </label>
            );
          }}
        </form.Field>
        <fieldset className="md:col-span-2">
          <legend>Mortgage Type</legend>
          <div className="mt-[11px] flex flex-col gap-[10px]">
            <form.Field
              name="mortgageType"
              validators={{
                onChange: mortgageType,
              }}
            >
              {(field) => {
                return (
                  <div className="relative w-full md:flex-1">
                    <input
                      type="radio"
                      className="peer sr-only"
                      id="repayment"
                      value="repayment"
                      name={field.name}
                      onBlur={field.handleBlur}
                      checked={field.getValue() === "repayment"}
                      onChange={(e) =>
                        field.handleChange(e.target.value as MortgageType)
                      }
                    />
                    <RadioIndicator />
                    <label
                      htmlFor="repayment"
                      className={cn(
                        "group/label flex h-[50px] w-full cursor-pointer items-center gap-4 rounded border border-mortgage-neutral-slate-500 pl-[55px] text-lg/none font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-primary-lime",
                        "peer-checked:border-mortgage-primary-lime peer-checked:bg-mortgage-primary-lime/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-mortgage-primary-lime",
                      )}
                    >
                      Repayment
                    </label>
                  </div>
                );
              }}
            </form.Field>
            <form.Field
              name="mortgageType"
              validators={{
                onChange: mortgageType,
              }}
            >
              {(field) => {
                return (
                  <div className="relative w-full md:flex-1">
                    <input
                      type="radio"
                      value="interest-only"
                      id="interest-only"
                      className="peer sr-only"
                      name={field.name}
                      onBlur={field.handleBlur}
                      checked={field.getValue() === "interest-only"}
                      onChange={(e) =>
                        field.handleChange(e.target.value as MortgageType)
                      }
                    />
                    <RadioIndicator />
                    <label
                      htmlFor="interest-only"
                      className={cn(
                        "group/label flex h-[50px] w-full cursor-pointer items-center gap-4 rounded border border-mortgage-neutral-slate-500 pl-[55px] text-lg/none font-bold text-mortgage-neutral-slate-900 hover:border-mortgage-primary-lime",
                        "peer-checked:border-mortgage-primary-lime peer-checked:bg-mortgage-primary-lime/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-mortgage-primary-lime",
                      )}
                    >
                      Interest Only
                    </label>
                  </div>
                );
              }}
            </form.Field>
          </div>
          <form.Subscribe selector={(state) => state.fieldMeta.mortgageType}>
            {(fieldMeta) => {
              const queryFieldError = fieldMeta?.errorMap?.onChange;
              return queryFieldError ? (
                <p className="mb-[3px] mt-[11px] text-sm text-red-600">
                  {queryFieldError}
                </p>
              ) : null;
            }}
          </form.Subscribe>
        </fieldset>
        <button
          type="submit"
          className="flex h-[56px] w-full items-center justify-center gap-[13px] rounded-full bg-mortgage-primary-lime text-lg/none font-bold text-mortgage-neutral-slate-900 hover:bg-opacity-50 hover:text-opacity-90 md:col-span-2 md:mt-4 md:w-[314px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#133041"
              d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
            />
          </svg>
          <span>Calculate Repayments</span>
        </button>
      </div>
    </form>
  );
}

function Results() {
  const [input] = useAtom(mortgageAtom);

  const mortgage = useMemo(() => {
    if (input === null) return null;
    const [p, n_year, i_year] = Object.values(input).map(
      (val) => Number(val) ?? 0,
    );
    const n = n_year * 12;
    const i = i_year / 100 / 12;
    const monthly = i !== 0 ? (i * p) / (1 - 1 / (1 + i) ** n) : p / n;
    const total = monthly * n;
    const format = (n: number): string =>
      Number(n.toFixed(2)).toLocaleString("en-US");

    if (input.mortgageType === "repayment") {
      return {
        monthly: format(monthly),
        total: format(total),
      };
    }

    const total_i = total - p;
    const monthly_i = total_i / n;

    return {
      monthly: format(monthly_i),
      total: format(total_i),
    };
  }, [input]);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center bg-mortgage-neutral-slate-900 px-6 text-mortgage-neutral-white lg:h-[606px] lg:w-[504px] lg:shrink-0 lg:rounded-bl-[81px]",
        mortgage === null
          ? "h-[390px] md:h-[382px] md:px-8"
          : "h-[455px] justify-start py-4 md:h-[507px] md:px-10 md:py-6",
      )}
    >
      {mortgage === null ? (
        <>
          <svg
            className="aspect-square w-[192px]"
            viewBox="0 0 192 192"
            aria-labelledby="illustration-title"
          >
            <title id="illustration-title">Empty results illutration</title>
            <use href="/mortgage-repayment-calculator/assets/images/illustration-empty.svg#illustration-empty" />
          </svg>
          <h2 className="mt-[15px] text-center text-2xl font-bold">
            Results shown here
          </h2>
          <p className="mt-4 text-center text-mortgage-neutral-slate-300">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </>
      ) : (
        <>
          <h2 className="mt-[15px] w-full text-left text-2xl font-bold">
            Your results
          </h2>
          <p className="mt-4 w-full text-left text-mortgage-neutral-slate-300">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="mt-[23px] w-full rounded-lg border-t-4 border-t-mortgage-primary-lime bg-[hsl(202,56%,12%)] p-4 pb-[27px] pt-[20px] md:mt-[39px] md:px-8 md:pb-[35px] md:pt-[29px]">
            <div className="space-y-3 md:space-y-[14px]">
              <p className="text-mortgage-neutral-slate-300">
                Your monthly{" "}
                {input?.mortgageType === "repayment"
                  ? "repayments"
                  : "interests"}
              </p>
              <p className="text-[40px]/none font-bold text-mortgage-primary-lime md:text-[56px]/none">
                &pound;{mortgage.monthly}
              </p>
            </div>
            <hr className="mb-[15px] mt-[22px] border-mortgage-neutral-slate-700 md:mb-[33px] md:mt-[39px]" />
            <div className="space-y-3 md:space-y-[10px]">
              <p className="text-mortgage-neutral-slate-300">
                Total{" "}
                {input?.mortgageType === "repayment"
                  ? "you'll repay"
                  : "interests"}{" "}
                over the term
              </p>
              <p className="text-[24px]/none font-bold">
                &pound;{mortgage.total}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Main() {
  return (
    <main className="flex w-full items-center justify-center bg-mortgage-neutral-slate-100 md:p-10 lg:min-h-[100svh] lg:py-16">
      <div className="shadow-mortgage-neutral-slate-200/20 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-mortgage-neutral-white md:rounded-3xl md:shadow-xl lg:w-[1008px] lg:flex-row lg:shadow-2xl lg:shadow-mortgage-neutral-slate-300/50">
        <MortgageForm />
        <Results />
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-2 w-full text-center text-[11px] text-mortgage-neutral-slate-100 md:bottom-3 md:text-mortgage-neutral-slate-900 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

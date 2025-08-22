import Head from "next/head";
// import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CountUp } from "use-count-up";
import { z } from "zod";
import dayjs from "../utils/dayjs";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const dateInputsSchema = z
  .object({
    day: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "Must be a valid day",
      })
      .min(1, "Must be a valid day")
      .max(31, "Must be a valid day"),
    month: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "Must be a valid month",
      })
      .min(1, "Must be a valid month")
      .max(12, "Must be a valid month"),
    year: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "Must be a valid year",
      })
      .min(0, "Must be a valid year")
      .max(new Date().getFullYear(), "Must be in the past"),
  })
  .required()
  .superRefine((val, ctx) => {
    const now = dayjs();
    const inputDate = dayjs(new Date(0, val.month - 1, val.day)).set(
      "year",
      val.year,
    );

    if (
      inputDate.year() !== val.year ||
      inputDate.month() + 1 !== val.month ||
      inputDate.date() !== val.day
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid date",
        path: ["day"],
      });
      return;
    }

    if (inputDate.isAfter(now)) {
      if (val.year > now.year()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be in the past",
          path: ["year"],
        });
      } else {
        if (val.month > now.month() + 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be in the past",
            path: ["month"],
          });
        } else if (val.day > now.date()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be in the past",
            path: ["day"],
          });
        }
      }
    }
  });

type DateInput = z.infer<typeof dateInputsSchema>;

export default function AgeCalculatorApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Age calculator app</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center bg-age-calculator-neutral-200 py-[88px] lg:justify-center lg:py-[80px] ${poppins.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/age-calculator-app/design"
          absolutePath="/age-calculator-app/design/desktop-error-empty.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateInput>({ resolver: zodResolver(dateInputsSchema) });
  const [diff, setDiff] = useState({ year: "- -", month: "- -", day: "- -" });

  const onSubmit = handleSubmit((data) => {
    const { year, month, day } = data;
    const inputDate = dayjs(new Date(0, month - 1, day)).set("year", year);
    const now = dayjs();

    if (!inputDate.isValid() || inputDate.isAfter(now)) {
      setDiff({ year: "- -", month: "- -", day: "- -" });
      return;
    }

    const yearDiff = now.diff(inputDate, "year");
    const monthDiff = now.diff(inputDate.add(yearDiff, "year"), "month");
    const dayDiff = now.diff(
      inputDate.add(yearDiff, "year").add(monthDiff, "month"),
      "day",
    );

    setDiff({
      year: yearDiff.toString(),
      month: monthDiff.toString(),
      day: dayDiff.toString(),
    });
  });

  const setValueAs = (value: string) =>
    value === "" ? undefined : Number.parseInt(value);

  return (
    <main
      className={`h-[486px] w-[calc(100vw-32px)] max-w-md rounded-[24px] rounded-br-[100px] bg-age-calculator-neutral-100 px-6 pt-[47px] md:h-[540px] md:max-w-screen-sm md:rounded-br-[128px] lg:max-w-[840px] lg:rounded-br-[200px] lg:px-[56px] lg:pt-[55px] ${
        !!errors.day || !!errors.month || !!errors.year
          ? "h-[680px] translate-y-[31px]"
          : "lg:h-[652px]"
      }`}
    >
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center lg:relative"
        noValidate
        aria-labelledby="form-title"
      >
        <h1 id="form-title" className="sr-only">
          Age Calculator App
        </h1>
        <fieldset
          className="grid grid-cols-3 grid-rows-1 gap-4 lg:w-auto lg:gap-8 lg:self-start"
          aria-labelledby="date-inputs-label"
        >
          <p id="date-inputs-label" className="sr-only">
            Enter your birth date
          </p>
          <div className="contents">
            <label
              className="flex flex-col gap-[5px] lg:gap-[9px]"
              htmlFor="day"
            >
              <p
                className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "text-age-calculator-primary-red"
                    : "text-age-calculator-neutral-400"
                }`}
              >
                Day
              </p>
              <input
                id="day"
                placeholder="DD"
                className={`h-[54px] w-full rounded-md border bg-white px-[15px] font-poppins text-[20px] font-extrabold text-age-calculator-neutral-500 focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "border-age-calculator-primary-red focus-visible:border-age-calculator-primary-red"
                    : "border-age-calculator-neutral-300 focus-visible:border-age-calculator-primary-purple "
                }`}
                type="number"
                aria-invalid={!!errors.day}
                aria-describedby="day-error"
                {...register("day", {
                  required: true,
                  setValueAs,
                  min: 1,
                  minLength: 1,
                })}
              />
              {!!errors.day && (
                <p
                  id="day-error"
                  role="alert"
                  aria-live="assertive"
                  className="-mt-[2px] mb-[1px] w-full font-poppins text-[14px] italic text-age-calculator-primary-red lg:max-w-[160px]"
                >
                  {errors.day.message}
                </p>
              )}
            </label>
            <label
              className="flex flex-col gap-[5px] lg:gap-[9px]"
              htmlFor="month"
            >
              <p
                className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "text-age-calculator-primary-red"
                    : "text-age-calculator-neutral-400"
                }`}
              >
                Month
              </p>
              <input
                id="month"
                placeholder="MM"
                className={`h-[54px] w-full rounded-md border bg-white px-[15px] font-poppins text-[20px] font-extrabold text-age-calculator-neutral-500 focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "border-age-calculator-primary-red focus-visible:border-age-calculator-primary-red"
                    : "border-age-calculator-neutral-300 focus-visible:border-age-calculator-primary-purple "
                }`}
                type="number"
                aria-invalid={!!errors.month}
                aria-describedby="month-error"
                {...register("month", {
                  required: true,
                  setValueAs,
                  min: 1,
                  minLength: 1,
                })}
              />
              {!!errors.month && (
                <p
                  id="month-error"
                  role="alert"
                  aria-live="assertive"
                  className="-mt-[2px] mb-[1px] w-full font-poppins text-[14px] italic text-age-calculator-primary-red lg:max-w-[160px]"
                >
                  {errors.month.message}
                </p>
              )}
            </label>
            <label
              className="flex flex-col gap-[5px] lg:gap-[9px]"
              htmlFor="year"
            >
              <p
                className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "text-age-calculator-primary-red"
                    : "text-age-calculator-neutral-400"
                }`}
              >
                Year
              </p>
              <input
                id="year"
                placeholder="YYYY"
                className={`h-[54px] w-full rounded-md border bg-white px-[15px] font-poppins text-[20px] font-extrabold text-age-calculator-neutral-500 focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                  !!errors.day || !!errors.month || !!errors.year
                    ? "border-age-calculator-primary-red focus-visible:border-age-calculator-primary-red"
                    : "border-age-calculator-neutral-300 focus-visible:border-age-calculator-primary-purple "
                }`}
                type="number"
                min={1}
                max={new Date().getFullYear()}
                aria-invalid={!!errors.year}
                aria-describedby="year-error"
                {...register("year", {
                  required: true,
                  setValueAs,
                  min: 1,
                  minLength: 1,
                })}
              />
              {!!errors.year && (
                <p
                  id="year-error"
                  role="alert"
                  aria-live="assertive"
                  className="-mt-[2px] mb-[1px] w-full font-poppins text-[14px] italic text-age-calculator-primary-red lg:max-w-[160px]"
                >
                  {errors.year.message}
                </p>
              )}
            </label>
          </div>
        </fieldset>
        <button
          className="flex h-16 w-16 translate-y-[calc(50%-1px)] items-center justify-center rounded-full bg-age-calculator-primary-purple p-5 hover:bg-age-calculator-neutral-500 md:h-20 md:w-20 lg:absolute lg:bottom-0 lg:right-0 lg:h-[96px] lg:w-[96px]"
          type="submit"
          aria-label="Calculate age"
        >
          <svg
            viewBox="0 0 46 44"
            className="h-11 stroke-[3px] lg:stroke-2"
            role="img"
            aria-hidden="true"
          >
            <use href="/age-calculator-app/assets/images/icon-arrow.svg#icon-arrow" />
          </svg>
        </button>
        <hr className="w-full border-t-2 border-age-calculator-neutral-200 lg:mt-[47px]" />
      </form>
      <div
        className="mt-[65px] flex flex-col gap-[6px] font-poppins text-[56px] font-extrabold italic leading-none tracking-[-1px] text-age-calculator-neutral-500 md:text-7xl lg:mt-[51px] lg:gap-[9px] lg:text-[105px] lg:tracking-[-3px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">
            {!Number.isNaN(Number.parseInt(diff.year)) ? (
              <CountUp
                isCounting
                start={0}
                end={Number.parseInt(diff.year)}
                duration={2}
              />
            ) : (
              "- -"
            )}
          </span>
          <span className="lg:ml-[12px]">years</span>
        </p>
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">
            {!Number.isNaN(Number.parseInt(diff.month)) ? (
              <CountUp
                isCounting
                start={0}
                end={Number.parseInt(diff.month)}
                duration={2}
              />
            ) : (
              "- -"
            )}
          </span>
          <span className="lg:ml-[12px]">months</span>
        </p>
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">
            {!Number.isNaN(Number.parseInt(diff.day)) ? (
              <CountUp
                isCounting
                start={0}
                end={Number.parseInt(diff.day)}
                duration={2}
              />
            ) : (
              "- -"
            )}
          </span>
          <span className="lg:ml-[12px]">days</span>
        </p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-age-calculator-neutral-500 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

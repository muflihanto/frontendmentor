import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs from "../utils/dayjs";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO:
// - View an age in years, months, and days after submitting a valid date through the form
// - Receive validation errors if:
//   - Any field is empty when the form is submitted
//   - The day number is not between 1-31
//   - The month number is not between 1-12
//   - The year is in the future
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page
// - **Bonus**: See the age numbers animate to their final number when the form is submitted

const dateInputsSchema = z
  .object({
    day: z.number({ required_error: "This field is required", invalid_type_error: "This field is required" }).min(1, "Must be a valid day").max(31, "Must be a valid day"),
    month: z.number({ required_error: "This field is required", invalid_type_error: "This field is required" }).min(1, "Must be a valid month").max(12, "Must be a valid month"),
    year: z.number({ required_error: "This field is required", invalid_type_error: "This field is required" }).min(1900, "Must be a valid year").max(new Date().getFullYear(), "Must be in the past"),
  })
  .required()
  .superRefine((val, ctx) => {
    const date = `${val.year}-${val.month}-${val.day}`;
    const now = dayjs();
    if (now.diff(date) < 0) {
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
    if ([1, 3, 5, 7, 8, 10, 12].includes(val.month) && val.day > 31) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid day",
        path: ["day"],
      });
    } else if ([4, 6, 9, 11].includes(val.month) && val.day > 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must be a valid day",
        path: ["day"],
      });
    } else if (val.month === 2) {
      if (new Date(val.year, 1, 29).getMonth() === 1) {
        if (val.day > 29) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a valid day",
            path: ["day"],
          });
        }
      } else if (val.day > 28) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be a valid day",
          path: ["day"],
        });
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
      <div className="App bg-age-calculator-neutral-200 relative flex min-h-[100svh] flex-col items-center py-[88px] lg:justify-center lg:py-[80px]">
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
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<DateInput>({ resolver: zodResolver(dateInputsSchema) });
  const [diff, setDiff] = useState({ year: "", month: "", day: "" });

  // TODO: FIXME: fix logic
  const onSubmit = handleSubmit((data) => {
    const date = `${data.year}-${data.month}-${data.day}`;
    const now = dayjs();
    setDiff({
      day: (now.diff(date, "day") % 30).toString(),
      month: (now.diff(date, "month") % 12).toString(),
      year: now.diff(date, "year").toString(),
    });
    // console.log(now.diff(date));
  });

  return (
    <div className={`bg-age-calculator-neutral-100 h-[486px] w-[calc(100vw-32px)] max-w-md rounded-[24px] rounded-br-[100px] px-6 pt-[47px] lg:max-w-[840px] lg:rounded-br-[200px] lg:px-[56px] lg:pt-[55px] ${!!errors.day || !!errors.month || !!errors.year ? "h-[680px] translate-y-[31px]" : "lg:h-[652px]"}`}>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center lg:relative"
        noValidate
      >
        <div className="grid grid-cols-3 grid-rows-1 gap-4 lg:w-auto lg:gap-8 lg:self-start">
          <label
            className="flex flex-col gap-[5px] lg:gap-[9px]"
            htmlFor="day"
          >
            <p className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${!!errors.day || !!errors.month || !!errors.year ? "text-age-calculator-primary-red" : "text-age-calculator-neutral-400"}`}>Day</p>
            <input
              placeholder="DD"
              className={`text-age-calculator-neutral-500 font-poppins h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                !!errors.day || !!errors.month || !!errors.year ? "focus-visible:border-age-calculator-primary-red border-age-calculator-primary-red" : "focus-visible:border-age-calculator-primary-purple border-age-calculator-neutral-300 "
              }`}
              type="number"
              {...register("day", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
            {!!errors.day && <p className="font-poppins text-age-calculator-primary-red -mt-[2px] mb-[1px] w-full text-[14px] italic lg:max-w-[160px]">{errors.day.message}</p>}
          </label>
          <label
            className="flex flex-col gap-[5px] lg:gap-[9px]"
            htmlFor="month"
          >
            <p className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${!!errors.day || !!errors.month || !!errors.year ? "text-age-calculator-primary-red" : "text-age-calculator-neutral-400"}`}>Month</p>
            <input
              placeholder="MM"
              className={`text-age-calculator-neutral-500 font-poppins h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                !!errors.day || !!errors.month || !!errors.year ? "focus-visible:border-age-calculator-primary-red border-age-calculator-primary-red" : "focus-visible:border-age-calculator-primary-purple border-age-calculator-neutral-300 "
              }`}
              type="number"
              {...register("month", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
            {!!errors.month && <p className="font-poppins text-age-calculator-primary-red -mt-[2px] mb-[1px] w-full text-[14px] italic lg:max-w-[160px]">{errors.month.message}</p>}
          </label>
          <label
            className="flex flex-col gap-[5px] lg:gap-[9px]"
            htmlFor="year"
          >
            <p className={`font-poppins text-[12px] font-bold uppercase tracking-[3px] lg:text-[14px] lg:tracking-[3.2px] ${!!errors.day || !!errors.month || !!errors.year ? "text-age-calculator-primary-red" : "text-age-calculator-neutral-400"}`}>Year</p>
            <input
              placeholder="YYYY"
              className={`text-age-calculator-neutral-500 font-poppins h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold focus-visible:outline focus-visible:outline-transparent lg:h-[72px] lg:w-[160px] lg:px-[23px] lg:pb-[1px] lg:text-[32px] lg:placeholder:font-bold ${
                !!errors.day || !!errors.month || !!errors.year ? "focus-visible:border-age-calculator-primary-red border-age-calculator-primary-red" : "focus-visible:border-age-calculator-primary-purple border-age-calculator-neutral-300 "
              }`}
              type="number"
              min={1}
              max={new Date().getFullYear()}
              {...register("year", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
            {!!errors.year && <p className="font-poppins text-age-calculator-primary-red -mt-[2px] mb-[1px] w-full text-[14px] italic lg:max-w-[160px]">{errors.year.message}</p>}
          </label>
        </div>
        <button className="bg-age-calculator-primary-purple hover:bg-age-calculator-neutral-500 flex h-16 w-16 translate-y-[calc(50%-1px)] items-center justify-center rounded-full p-5 lg:absolute lg:bottom-0 lg:right-0 lg:h-[96px] lg:w-[96px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={46}
            height={44}
            viewBox="0 0 46 44"
            className="stroke-[3px] lg:stroke-2"
          >
            <g
              fill="none"
              stroke="#FFF"
              // strokeWidth={3}
            >
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
        <hr className="border-age-calculator-neutral-200 w-full border-t-2 lg:mt-[47px]" />
      </form>
      <div className="text-age-calculator-neutral-500 font-poppins mt-[65px] flex flex-col gap-[6px] text-[56px] font-extrabold italic leading-none tracking-[-1px] lg:mt-[51px] lg:gap-[9px] lg:text-[105px] lg:tracking-[-3px]">
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">{!!diff.year ? diff.year : "- -"}</span>
          <span className="lg:ml-[12px]">years</span>
        </p>
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">{!!diff.month ? diff.month : "- -"}</span>
          <span className="lg:ml-[12px]">months</span>
        </p>
        <p>
          <span className="text-age-calculator-primary-purple lg:tracking-[-3px]">{!!diff.day ? diff.day : "- -"}</span>
          <span className="lg:ml-[12px]">days</span>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-age-calculator-neutral-500 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

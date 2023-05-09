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
    day: z.number().min(1, "Must be a valid day"),
    month: z.number().min(1, "Must be a valid month").max(12, "Must be a valid month"),
    year: z.number().min(1900, "Must be a valid year").max(new Date().getFullYear(), "Must be a valid year"),
  })
  .superRefine((val, ctx) => {
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
    } else {
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
      <div className="App bg-age-calculator-neutral-200 relative flex min-h-[100svh] flex-col items-center pt-[88px]">
        <Main />
        <Footer />
        {/* <Slider basePath="/age-calculator-app/design" /> */}
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
      day: (now.diff(date, "day") % 31).toString(),
      month: (now.diff(date, "month") % 12).toString(),
      year: now.diff(date, "year").toString(),
    });
    // console.log(data);
  });

  return (
    <div className="bg-age-calculator-neutral-100 h-[486px] w-[calc(100vw-32px)] max-w-md rounded-[24px] rounded-br-[100px] px-6 pt-[47px]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center"
        noValidate
      >
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <label
            className="flex flex-col gap-[5px]"
            htmlFor="day"
          >
            <p className="text-age-calculator-neutral-400 font-poppins text-[12px] font-bold uppercase tracking-[3px]">Day</p>
            <input
              placeholder="DD"
              className="text-age-calculator-neutral-500 font-poppins border-age-calculator-neutral-300 h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold"
              type="number"
              {...register("day", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
          </label>
          <label
            className="flex flex-col gap-[5px]"
            htmlFor="month"
          >
            <p className="text-age-calculator-neutral-400 font-poppins text-[12px] font-bold uppercase tracking-[3px]">Month</p>
            <input
              placeholder="MM"
              className="text-age-calculator-neutral-500 font-poppins border-age-calculator-neutral-300 h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold"
              type="number"
              {...register("month", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
          </label>
          <label
            className="flex flex-col gap-[5px]"
            htmlFor="year"
          >
            <p className="text-age-calculator-neutral-400 font-poppins text-[12px] font-bold uppercase tracking-[3px]">Year</p>
            <input
              placeholder="YYYY"
              className="text-age-calculator-neutral-500 font-poppins border-age-calculator-neutral-300 h-[54px] w-full rounded-md border px-[15px] text-[20px] font-extrabold"
              type="number"
              min={1}
              max={new Date().getFullYear()}
              {...register("year", { required: true, valueAsNumber: true, min: 1, minLength: 1 })}
            />
          </label>
        </div>
        <button className="bg-age-calculator-primary-purple hover:bg-age-calculator-neutral-500 flex h-16 w-16 translate-y-1/2 items-center justify-center rounded-full p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={46}
            height={44}
            viewBox="0 0 46 44"
          >
            <g
              fill="none"
              stroke="#FFF"
              strokeWidth={4}
            >
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
        <hr className="border-age-calculator-neutral-200 w-full border-t-2" />
      </form>
      <div className="text-age-calculator-neutral-500 font-poppins mt-[65px] flex flex-col gap-[6px] text-[56px] font-extrabold italic leading-none tracking-[-1px]">
        <p>
          <span className="text-age-calculator-primary-purple">{!!diff.year ? diff.year : "--"}</span> years
        </p>
        <p>
          <span className="text-age-calculator-primary-purple">{!!diff.month ? diff.month : "--"}</span> months
        </p>
        <p>
          <span className="text-age-calculator-primary-purple">{!!diff.day ? diff.day : "--"}</span> days
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

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "../utils/cn";
import { atom, useSetAtom } from "jotai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

type Queries = {
  step?: "1" | "2" | "3" | "4";
};

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const PersonalInfo = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Email invalid").min(1, "This field is required"),
  phone: z.string().regex(phoneRegex, "Invalid Number!").min(1, "This field is required"),
});
type PersonalInfo = z.infer<typeof PersonalInfo>;

const PlanValues = ["Arcade", "Advanced", "Pro"] as const;
const Plan = z.object({
  plan: z.enum(PlanValues),
});
type Plan = z.infer<typeof Plan>;

const AddOns = z.object({
  onlineService: z.boolean().default(false),
  largerStorage: z.boolean().default(false),
  customizableProfile: z.boolean().default(false),
});
type AddOns = z.infer<typeof AddOns>;

const formsInputAtom = atom({});

export default function MultiStepForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Multi-step form</title>
      </Head>
      <div className="App font-ubuntu relative min-h-[100svh]">
        <Main />
        <Footer />
        {/* <Slider absolutePath="/multi-step-form/design/mobile-design-step-1.jpg" /> */}
      </div>
    </>
  );
}

function PersonalInfoForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PersonalInfo>({ resolver: zodResolver(PersonalInfo) });
  const setFormsInput = useSetAtom(formsInputAtom);

  const onSubmit = handleSubmit((data) => {
    setFormsInput((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  });

  return (
    <form
      noValidate
      className="bg-multi-step-neutral-100 mt-[18px] h-[376px] w-[calc(100vw-32px)] max-w-md rounded-lg px-6 pt-[33px] shadow-lg"
    >
      <h1 className="text-multi-step-primary-blue-400 text-[24px] font-bold leading-none">Personal info</h1>
      <p className="text-multi-step-neutral-500 mt-3 leading-[25px]">Please provide your name, email address, and phone number.</p>
      <fieldset className="mt-[19px] flex w-full flex-col gap-[13px]">
        <label htmlFor="name">
          <p className="text-multi-step-primary-blue-400 text-[12px]">Name</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium"
            type="text"
            placeholder="e.g. Stephen King"
            {...register("name")}
          />
        </label>
        <label htmlFor="email">
          <p className="text-multi-step-primary-blue-400 text-[12px]">Email Address</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            {...register("email")}
          />
        </label>
        <label htmlFor="phone">
          <p className="text-multi-step-primary-blue-400 text-[12px]">Phone Number</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium"
            type="text"
            placeholder="e.g. +1 234 567 890"
            {...register("phone")}
          />
        </label>
      </fieldset>
    </form>
  );
}

function Main() {
  const router = useRouter();

  // useEffect(() => {
  //   console.log((router.query as Queries).step);
  // }, [router]);

  return (
    <main className="bg-multi-step-neutral-300 relative flex min-h-screen flex-col items-center bg-[url('/multi-step-form/assets/images/bg-sidebar-mobile.svg')] bg-no-repeat pt-4">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Link
              key={index}
              className={cn([
                "flex h-[33px] w-[33px] items-center justify-center rounded-full border pb-px pl-px text-[14px] font-bold tabular-nums", //
                (router.query as Queries).step === String(index + 1) ? "bg-multi-step-primary-blue-100 text-multi-step-primary-blue-400 border-transparent" : "text-multi-step-neutral-100 border-multi-step-neutral-100",
              ])}
              href={{
                pathname: "/multi-step-form",
                query: { step: index + 1 },
              }}
            >
              {index + 1}
            </Link>
          );
        })}
      </div>
      {!router.query.step || (router.query as Queries).step === "1" ? <PersonalInfoForm /> : <div>{router.query.step}</div>}
      <div className="bg-multi-step-neutral-100 fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-end p-4">
        <Link
          href={{
            pathname: "/multi-step-form",
            query: { step: (router.query as Queries).step ? parseInt((router.query as Queries).step!) + 1 : 2 },
          }}
          className="bg-multi-step-primary-blue-400 text-multi-step-neutral-100 flex h-10 w-[97px] items-center justify-center rounded text-[14px] font-medium"
        >
          Next Step
        </Link>
      </div>
      {/* {`
         <!-- Sidebar start -->

         Step 1
         Your info
       
         Step 2
         Select plan
       
         Step 3
         Add-ons
       
         Step 4
         Summary
       
         <!-- Sidebar end -->
       
         <!-- Step 1 start -->
       
         Personal info
         Please provide your name, email address, and phone number.
       
         Name
         e.g. Stephen King
       
         Email Address
         e.g. stephenking@lorem.com
       
         Phone Number
         e.g. +1 234 567 890
       
         Next Step
       
         <!-- Step 1 end -->
       
         <!-- Step 2 start -->
       
         Select your plan
         You have the option of monthly or yearly billing.
       
         Arcade
         $9/mo
       
         Advanced
         $12/mo
       
         Pro
         $15/mo
       
         Monthly
         Yearly
       
         Go Back
         Next Step
       
         <!-- Step 2 end -->
       
         <!-- Step 3 start -->
       
         Pick add-ons
         Add-ons help enhance your gaming experience.
       
         Online service
         Access to multiplayer games
         +$1/mo
       
         Larger storage
         Extra 1TB of cloud save
         +$2/mo
       
         Customizable Profile
         Custom theme on your profile
         +$2/mo
       
         Go Back
         Next Step
       
         <!-- Step 3 end -->
       
         <!-- Step 4 start -->
       
         Finishing up
         Double-check everything looks OK before confirming.
       
         <!-- Dynamically add subscription and add-on selections here -->
       
         Total (per month/year)
       
         Go Back
         Confirm
       
         <!-- Step 4 end -->
       
         <!-- Step 5 start -->
       
         Thank you!
       
         Thanks for confirming your subscription! We hope you have fun 
         using our platform. If you ever need support, please feel free 
         to email us at support@loremgaming.com.
       
         <!-- Step 5 end -->
      `} */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      {/* Challenge by{" "}
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
      . */}
    </footer>
  );
}

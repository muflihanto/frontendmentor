import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "../utils/cn";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffectOnce, useWindowSize } from "usehooks-ts";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

type Queries = {
  step?: "1" | "2" | "3" | "4";
  completed?: 1 | 0;
};

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const PersonalInfo = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Email invalid").min(1, "This field is required"),
  phone: z.string().regex(phoneRegex, "Invalid Number!").min(1, "This field is required"),
});
type PersonalInfo = z.infer<typeof PersonalInfo>;

const PlanValues = ["Arcade", "Advanced", "Pro"] as const;
const planTypeAtom = atom<PlanType>("monthly");
const Plan = z.object({
  plan: z.enum(PlanValues),
});
type PlanType = "monthly" | "yearly";
type Plan = z.infer<typeof Plan>;

const AddOns = z.object({
  onlineService: z.boolean().default(false),
  largerStorage: z.boolean().default(false),
  customizableProfile: z.boolean().default(false),
});
type AddOns = z.infer<typeof AddOns>;

// const defaultFormValues: PersonalInfo & Plan & AddOns & { completedStep: Queries["step"] } = {
//   name: "Test",
//   email: "test@test.com",
//   phone: "+1 234 567",
//   plan: "Arcade",
//   onlineService: true,
//   largerStorage: true,
//   customizableProfile: false,
//   completedStep: "4",
// };

const defaultFormValues: PersonalInfo & Plan & AddOns = {
  name: "",
  email: "",
  phone: "",
  plan: "Arcade",
  onlineService: false,
  largerStorage: false,
  customizableProfile: false,
};

const formsInputAtom = atom<typeof defaultFormValues & { completedStep: Queries["step"] }>({
  ...defaultFormValues,
  completedStep: undefined,
});

const price = {
  monthly: {
    Arcade: 9,
    Advanced: 12,
    Pro: 15,
    onlineService: 1,
    largerStorage: 2,
    customizableProfile: 2,
  },
  yearly: {
    Arcade: 90,
    Advanced: 120,
    Pro: 150,
    onlineService: 10,
    largerStorage: 20,
    customizableProfile: 20,
  },
};

export default function MultiStepForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Multi-step form</title>
      </Head>
      <div className="App font-ubuntu bg-multi-step-neutral-300 relative min-h-[100svh] lg:flex lg:min-h-[810px] lg:items-center lg:justify-center">
        <Main />
        <Footer />
        {/* <Slider absolutePath="/multi-step-form/design/desktop-design-step-3-monthly.jpg" /> */}
      </div>
    </>
  );
}

function PersonalInfoForm() {
  const [formsInput, setFormsInput] = useAtom(formsInputAtom);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PersonalInfo>({ resolver: zodResolver(PersonalInfo), defaultValues: { email: formsInput.email, name: formsInput.name, phone: formsInput.phone } });

  const onSubmit = handleSubmit((data) => {
    setFormsInput((prev) => {
      const prevStep = prev.completedStep;
      return {
        ...prev,
        ...data,
        completedStep: !!prevStep && parseInt(prevStep) > 1 ? prevStep : "1",
      };
    });
    router.push({
      pathname: "/multi-step-form",
      query: { step: (router.query as Queries).step ? parseInt((router.query as Queries).step!) + 1 : 2 },
    });
  });

  return (
    <form
      noValidate
      className="bg-multi-step-neutral-100 mt-[18px] h-[376px] w-[calc(100vw-32px)] max-w-md rounded-lg px-6 pt-[33px] shadow-lg lg:mt-0 lg:flex lg:h-full lg:w-[450px] lg:max-w-none lg:flex-col lg:place-self-center lg:bg-transparent lg:p-0 lg:pb-4 lg:pt-[42px] lg:shadow-none"
      onSubmit={onSubmit}
    >
      <h1 className="text-multi-step-primary-blue-400 text-[24px] font-bold leading-none lg:text-[32px]">Personal info</h1>
      <p className="text-multi-step-neutral-500 mt-3 leading-[25px] lg:mt-[11px]">Please provide your name, email address, and phone number.</p>
      <fieldset className="mt-[19px] flex w-full flex-col gap-[13px] lg:mt-[35px] lg:gap-[21px]">
        <label htmlFor="name">
          <p className="text-multi-step-primary-blue-400 text-[12px] lg:text-[14px]">Name</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium lg:mt-[6px] lg:h-12 lg:rounded-lg lg:text-[16px]"
            type="text"
            placeholder="e.g. Stephen King"
            {...register("name")}
          />
        </label>
        <label htmlFor="email">
          <p className="text-multi-step-primary-blue-400 text-[12px] lg:text-[14px]">Email Address</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium lg:mt-[6px] lg:h-12 lg:rounded-lg lg:text-[16px]"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            {...register("email")}
          />
        </label>
        <label htmlFor="phone">
          <p className="text-multi-step-primary-blue-400 text-[12px] lg:text-[14px]">Phone Number</p>
          <input
            className="border-multi-step-neutral-400 mt-[2px] h-[40px] w-full rounded border px-[15px] pb-px text-[15px] font-medium lg:mt-[6px] lg:h-12 lg:rounded-lg lg:text-[16px]"
            type="text"
            placeholder="e.g. +1 234 567 890"
            {...register("phone")}
          />
        </label>
      </fieldset>

      <div className="bg-multi-step-neutral-100 fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-end p-4 lg:static lg:mt-auto lg:h-fit lg:p-0">
        <button className="bg-multi-step-primary-blue-400 text-multi-step-neutral-100 flex h-10 w-[97px] items-center justify-center rounded text-[14px] font-medium lg:h-12 lg:w-[123px] lg:rounded-lg lg:pb-[2px] lg:text-base">Next Step</button>
      </div>
    </form>
  );
}

function PlanForm() {
  const [formsInput, setFormsInput] = useAtom(formsInputAtom);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Plan>({ resolver: zodResolver(Plan), defaultValues: { plan: formsInput.plan } });

  const onSubmit = handleSubmit((data) => {
    setFormsInput((prev) => {
      const prevStep = prev.completedStep;
      return {
        ...prev,
        ...data,
        completedStep: !!prevStep && parseInt(prevStep) > 2 ? prevStep : "2",
      };
    });
    router.push({
      pathname: "/multi-step-form",
      query: { step: 3 },
    });
  });
  const [planType, setPlanType] = useAtom(planTypeAtom);

  return (
    <form
      noValidate
      className={cn([
        "bg-multi-step-neutral-100 mb-[94px] mt-[18px] w-[calc(100vw-32px)] max-w-md rounded-lg px-6 pt-[33px] shadow-lg lg:mb-0 lg:mt-0 lg:flex lg:h-full lg:w-[450px] lg:max-w-none lg:flex-col lg:place-self-center lg:bg-transparent lg:p-0 lg:pb-4 lg:pt-[42px] lg:shadow-none", //
        planType === "monthly" ? "h-[500px]" : "h-[567px]",
      ])}
      onSubmit={onSubmit}
    >
      <h1 className="text-multi-step-primary-blue-400 text-[24px] font-bold leading-none lg:text-[32px]">Select your plan</h1>
      <p className="text-multi-step-neutral-500 mt-3 leading-[25px] lg:mt-[11px]">You have the option of monthly or yearly billing.</p>
      <div className="mt-[22px] flex w-full flex-col gap-3 lg:mt-[38px] lg:flex-row lg:gap-[18px]">
        <label className="w-full cursor-pointer lg:h-full">
          <input
            {...register("plan", { required: true })}
            type="radio"
            className="peer hidden"
            value="Arcade"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 flex w-full items-start rounded-lg border px-[15px] pb-[3px] pt-4 lg:flex-col lg:pt-[19px]", //
              planType === "monthly" ? "h-[77px] lg:h-[160px] lg:pb-[14px]" : "h-[99px] lg:h-[183px] lg:pb-[16px]",
            ])}
          >
            <Image
              src="/multi-step-form/assets/images/icon-arcade.svg"
              alt="Arcade Icon"
              width={40}
              height={40}
            />
            <div className="ml-[14px] flex h-full flex-col lg:ml-0 lg:mt-auto lg:h-auto">
              <h3 className="text-multi-step-primary-blue-400 font-medium leading-[20px]">Arcade</h3>
              <p className="text-multi-step-neutral-500 mt-0.5 text-[14px]">
                ${price[planType].Arcade}/{planType === "monthly" ? "mo" : "yr"}
              </p>
              {planType === "yearly" && <p className="text-multi-step-primary-blue-400 mt-[3px] text-[12px]">2 months free</p>}
            </div>
          </div>
        </label>
        <label className="w-full cursor-pointer rounded lg:h-full">
          <input
            {...register("plan", { required: true })}
            type="radio"
            className="peer hidden"
            value="Advanced"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 flex w-full items-start rounded-lg border px-[15px] pb-[3px] pt-4 lg:flex-col lg:pt-[19px]", //
              planType === "monthly" ? "h-[77px] lg:h-[160px] lg:pb-[14px]" : "h-[99px] lg:h-[183px] lg:pb-[16px]",
            ])}
          >
            <Image
              src="/multi-step-form/assets/images/icon-advanced.svg"
              alt="Advanced Icon"
              width={40}
              height={40}
            />
            <div className="ml-[14px] flex h-full flex-col lg:ml-0 lg:mt-auto lg:h-auto">
              <h3 className="text-multi-step-primary-blue-400 font-medium leading-[20px]">Advanced</h3>
              <p className="text-multi-step-neutral-500 mt-0.5 text-[14px]">
                ${price[planType].Advanced}/{planType === "monthly" ? "mo" : "yr"}
              </p>
              {planType === "yearly" && <p className="text-multi-step-primary-blue-400 mt-[3px] text-[12px]">2 months free</p>}
            </div>
          </div>
        </label>
        <label className="w-full cursor-pointer rounded lg:h-full">
          <input
            {...register("plan", { required: true })}
            type="radio"
            className="peer hidden"
            value="Pro"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 flex w-full items-start rounded-lg border px-[15px] pb-[3px] pt-4 lg:flex-col lg:pt-[19px]", //
              planType === "monthly" ? "h-[77px] lg:h-[160px] lg:pb-[14px]" : "h-[99px] lg:h-[183px] lg:pb-[16px]",
            ])}
          >
            <Image
              src="/multi-step-form/assets/images/icon-pro.svg"
              alt="Arcade Icon"
              width={40}
              height={40}
            />
            <div className="ml-[14px] flex h-full flex-col lg:ml-0 lg:mt-auto lg:h-auto">
              <h3 className="text-multi-step-primary-blue-400 font-medium leading-[20px]">Pro</h3>
              <p className="text-multi-step-neutral-500 mt-0.5 text-[14px]">
                ${price[planType].Pro}/{planType === "monthly" ? "mo" : "yr"}
              </p>
              {planType === "yearly" && <p className="text-multi-step-primary-blue-400 mt-[3px] text-[12px]">2 months free</p>}
            </div>
          </div>
        </label>
      </div>

      <div className="lg:bg-multi-step-neutral-200 mt-[38px] flex w-full items-center justify-center gap-6 text-[14px] font-medium leading-none lg:mt-[32px] lg:h-12 lg:rounded lg:pr-3">
        <p className={cn([planType === "monthly" ? "text-multi-step-primary-blue-400" : "text-multi-step-neutral-500"])}>Monthly</p>
        <button
          type="button"
          className="bg-multi-step-primary-blue-400 relative flex h-[20px] w-[38px] items-center rounded-full px-1"
          onClick={() => {
            setPlanType((prev) => (prev === "monthly" ? "yearly" : "monthly"));
          }}
        >
          <div
            className={cn([
              "bg-multi-step-neutral-100 absolute top-1 h-3 w-3 rounded-full", //
              planType === "monthly" ? "left-1" : "right-1",
            ])}
          />
        </button>
        <p className={cn([planType !== "monthly" ? "text-multi-step-primary-blue-400" : "text-multi-step-neutral-500"])}>Yearly</p>
      </div>

      <div className="bg-multi-step-neutral-100 fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-between p-4 lg:static lg:mt-auto lg:h-fit lg:p-0">
        <Link
          className="text-multi-step-neutral-500 text-[14px] font-medium lg:mb-[2px] lg:text-base"
          href={{
            pathname: "/multi-step-form",
            query: { step: 1 },
          }}
        >
          Go Back
        </Link>
        <button className="bg-multi-step-primary-blue-400 text-multi-step-neutral-100 flex h-10 w-[97px] items-center justify-center rounded text-[14px] font-medium lg:h-12 lg:w-[123px] lg:rounded-lg lg:pb-[2px] lg:text-base">Next Step</button>
      </div>
    </form>
  );
}

function AddOnsForm() {
  const [formsInput, setFormsInput] = useAtom(formsInputAtom);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<AddOns>({ resolver: zodResolver(AddOns), defaultValues: { customizableProfile: formsInput.customizableProfile, largerStorage: formsInput.largerStorage, onlineService: formsInput.onlineService } });
  const planType = useAtomValue(planTypeAtom);

  const onSubmit = handleSubmit((data) => {
    setFormsInput((prev) => {
      const prevStep = prev.completedStep;
      return {
        ...prev,
        ...data,
        completedStep: !!prevStep && parseInt(prevStep) > 3 ? prevStep : "3",
      };
    });
    router.push({
      pathname: "/multi-step-form",
      query: { step: (router.query as Queries).step ? parseInt((router.query as Queries).step!) + 1 : 2 },
    });
  });

  return (
    <form
      noValidate
      className="bg-multi-step-neutral-100 mt-[18px] h-[383px] w-[calc(100vw-32px)] max-w-md rounded-lg px-6 pt-[33px] shadow-lg"
      onSubmit={onSubmit}
    >
      <h1 className="text-multi-step-primary-blue-400 text-[24px] font-bold leading-none">Pick add-ons</h1>
      <p className="text-multi-step-neutral-500 mt-3 leading-[25px]">Add-ons help enhance your gaming experience.</p>
      <fieldset className="mt-[22px] flex w-full flex-col gap-[12px]">
        <label className="w-full cursor-pointer">
          <input
            {...register("onlineService", { required: true })}
            type="checkbox"
            className="peer hidden"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 peer-checked:[&_.check-container]:bg-multi-step-primary-blue-300 flex h-[62px] w-full items-center rounded-lg border px-[15px] peer-checked:[&_.check-container]:border-transparent [&_img]:opacity-0 peer-checked:[&_img]:opacity-100", //
            ])}
          >
            <div className="check-container flex h-5 w-5 items-center justify-center rounded border bg-transparent">
              <Image
                src="/multi-step-form/assets/images/icon-checkmark.svg"
                alt="Checkmark Icon"
                width={12}
                height={9}
              />
            </div>
            <div className="ml-[16px] flex flex-col">
              <h3 className="text-multi-step-primary-blue-400 text-[14px] font-medium leading-[18px]">Online service</h3>
              <p className="text-multi-step-neutral-500 mt-0 text-[12px]">Access to multiplayer games</p>
            </div>
            <p className="text-multi-step-primary-blue-300 ml-auto text-[12px]">+$1{planType === "monthly" ? "/mo" : "0/yr"}</p>
          </div>
        </label>
        <label className="w-full cursor-pointer">
          <input
            {...register("largerStorage", { required: true })}
            type="checkbox"
            className="peer hidden"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 peer-checked:[&_.check-container]:bg-multi-step-primary-blue-300 flex h-[62px] w-full items-center rounded-lg border px-[15px] peer-checked:[&_.check-container]:border-transparent [&_img]:opacity-0 peer-checked:[&_img]:opacity-100", //
            ])}
          >
            <div className="check-container flex h-5 w-5 items-center justify-center rounded border bg-transparent">
              <Image
                src="/multi-step-form/assets/images/icon-checkmark.svg"
                alt="Checkmark Icon"
                width={12}
                height={9}
              />
            </div>
            <div className="ml-[16px] flex flex-col">
              <h3 className="text-multi-step-primary-blue-400 text-[14px] font-medium leading-[18px]">Larger storage</h3>
              <p className="text-multi-step-neutral-500 mt-0 text-[12px]">Extra 1TB of cloud save</p>
            </div>
            <p className="text-multi-step-primary-blue-300 ml-auto text-[12px]">+$2{planType === "monthly" ? "/mo" : "0/yr"}</p>
          </div>
        </label>
        <label className="w-full cursor-pointer">
          <input
            {...register("customizableProfile", { required: true })}
            type="checkbox"
            className="peer hidden"
          />
          <div
            className={cn([
              "peer-checked:border-multi-step-primary-blue-300 peer-checked:bg-multi-step-neutral-200 peer-checked:[&_.check-container]:bg-multi-step-primary-blue-300 flex h-[62px] w-full items-center rounded-lg border px-[15px] peer-checked:[&_.check-container]:border-transparent [&_img]:opacity-0 peer-checked:[&_img]:opacity-100", //
            ])}
          >
            <div className="check-container flex h-5 w-5 items-center justify-center rounded border bg-transparent">
              <Image
                src="/multi-step-form/assets/images/icon-checkmark.svg"
                alt="Checkmark Icon"
                width={12}
                height={9}
              />
            </div>
            <div className="ml-[16px] flex flex-col">
              <h3 className="text-multi-step-primary-blue-400 text-[14px] font-medium leading-[18px]">Customizable profile</h3>
              <p className="text-multi-step-neutral-500 mt-0 text-[12px]">Custom theme on your profile</p>
            </div>
            <p className="text-multi-step-primary-blue-300 ml-auto text-[12px]">+$2{planType === "monthly" ? "/mo" : "0/yr"}</p>
          </div>
        </label>
      </fieldset>

      <div className="bg-multi-step-neutral-100 fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-between p-4">
        <Link
          className="text-multi-step-neutral-500 text-[14px] font-medium"
          href={{
            pathname: "/multi-step-form",
            query: { step: 2 },
          }}
        >
          Go Back
        </Link>
        <button className="bg-multi-step-primary-blue-400 text-multi-step-neutral-100 flex h-10 w-[97px] items-center justify-center rounded text-[14px] font-medium">Next Step</button>
      </div>
    </form>
  );
}

function FinishingUp() {
  const formsInput = useAtomValue(formsInputAtom);
  const { customizableProfile, largerStorage, onlineService, plan } = formsInput;
  const router = useRouter();
  const planType = useAtomValue(planTypeAtom);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // console.log(formsInput);
    router.push({
      pathname: "/multi-step-form",
      query: { step: 4, completed: 1 },
    });
  };

  const total = price[planType][formsInput.plan] + (formsInput.onlineService ? price[planType].onlineService : 0) + (formsInput.customizableProfile ? price[planType].customizableProfile : 0) + (formsInput.largerStorage ? price[planType].largerStorage : 0);

  return (
    <form
      noValidate
      className="bg-multi-step-neutral-100 mt-[18px] w-[calc(100vw-32px)] max-w-md rounded-lg px-6 pb-[34px] pt-[33px] shadow-lg"
      onSubmit={onSubmit}
    >
      <h1 className="text-multi-step-primary-blue-400 text-[24px] font-bold leading-none">Finishing up</h1>
      <p className="text-multi-step-neutral-500 mt-3 leading-[25px]">Double-check everything looks OK before confirming.</p>

      <div className="bg-multi-step-neutral-200 mt-[22px] w-full rounded-md px-4 pb-[18px] pt-[19px]">
        <div className="flex items-center justify-between text-[14px]">
          <div>
            <p className="text-multi-step-primary-blue-400 font-medium leading-[16px]">
              {plan} ({planType[0].toUpperCase() + planType.slice(1)})
            </p>
            <Link
              href={{
                pathname: "/multi-step-form",
                query: { step: 2 },
              }}
              className="text-multi-step-neutral-500 underline"
            >
              Change
            </Link>
          </div>
          <p className="text-multi-step-primary-blue-400 pt-0.5 font-bold leading-none">
            ${price[planType][plan]}/{planType === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        {(!!customizableProfile || !!largerStorage || !!onlineService) && (
          <>
            <hr className="border-t-multi-step-neutral-400 my-[11px] w-full" />
            <div className="mt-4 space-y-[18px]">
              {onlineService && (
                <div className="flex items-center justify-between text-[14px]">
                  <p className="text-multi-step-neutral-500 leading-none">Online service</p>
                  <p className="text-multi-step-primary-blue-400 font-medium leading-none">
                    +${price[planType].onlineService}/{planType === "monthly" ? "mo" : "yr"}
                  </p>
                </div>
              )}
              {largerStorage && (
                <div className="flex items-center justify-between text-[14px]">
                  <p className="text-multi-step-neutral-500 leading-none">Larger storage</p>
                  <p className="text-multi-step-primary-blue-400 font-medium leading-none">
                    +${price[planType].largerStorage}/{planType === "monthly" ? "mo" : "yr"}
                  </p>
                </div>
              )}
              {customizableProfile && (
                <div className="flex items-center justify-between text-[14px]">
                  <p className="text-multi-step-neutral-500 leading-none">Customizable Profile</p>
                  <p className="text-multi-step-primary-blue-400 font-medium leading-none">
                    +${price[planType].customizableProfile}/{planType === "monthly" ? "mo" : "yr"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-[26px] flex items-center justify-between px-4">
        <p className="text-multi-step-neutral-500 text-[14px] leading-[16px]">Total (per {planType === "monthly" ? "month" : "year"})</p>
        <p className="text-multi-step-primary-blue-300 text-[16px] font-bold leading-[16px]">
          +${total}/{planType === "monthly" ? "mo" : "yr"}
        </p>
      </div>

      <div className="bg-multi-step-neutral-100 fixed bottom-0 left-0 flex h-[72px] w-full items-center justify-between p-4">
        <Link
          className="text-multi-step-neutral-500 text-[14px] font-medium"
          href={{
            pathname: "/multi-step-form",
            query: { step: 3 },
          }}
        >
          Go Back
        </Link>
        <button className="bg-multi-step-primary-blue-300 text-multi-step-neutral-100 flex h-10 w-[97px] items-center justify-center rounded text-[14px] font-medium">Confirm</button>
      </div>
    </form>
  );
}

function ThankYou() {
  const { width } = useWindowSize();

  return (
    <div className="bg-multi-step-neutral-100 mt-[18px] flex h-[400px] w-[calc(100vw-32px)] max-w-md flex-col items-center rounded-lg px-6 pt-[79px] shadow-lg">
      <Image
        src={"/multi-step-form/assets/images/icon-thank-you.svg"}
        width={width > 1023 ? 80 : 56}
        height={width > 1023 ? 80 : 56}
        alt="Thank You Illustration"
      />
      <h1 className="text-multi-step-primary-blue-400 mt-[25px] text-[24px] font-bold leading-none">Thank you!</h1>
      <p className="text-multi-step-neutral-500 mt-3 text-center leading-[25px]">Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </div>
  );
}

function Main() {
  const router = useRouter();
  const formsInput = useAtomValue(formsInputAtom);
  const steps = ["Your Info", "Select Plan", "Add-ons", "Summary"];

  // useEffect(() => {
  //   console.log((router.query as Queries).step);
  // }, [router]);

  // useEffect(() => {
  //   console.log(formsInput);
  // }, [formsInput]);

  useEffectOnce(() => {
    const step = (router.query as Queries).step;
    if (!step) {
      router.push({
        pathname: "/multi-step-form",
        query: { step: 1 },
      });
    } else if (parseInt(step) > parseInt(formsInput.completedStep || "1")) {
      router.push({
        pathname: "/multi-step-form",
        query: { step: parseInt(formsInput.completedStep || "1") },
      });
    }
  });

  return (
    <main className="bg-multi-step-neutral-300 lg:shadow-multi-step-neutral-500/20 relative flex min-h-screen flex-col items-center bg-[url('/multi-step-form/assets/images/bg-sidebar-mobile.svg')] bg-no-repeat pt-4 lg:grid lg:h-[600px] lg:min-h-0 lg:w-[940px] lg:grid-cols-[274px,auto] lg:gap-4 lg:rounded-xl lg:bg-white lg:bg-none lg:p-4 lg:shadow-xl">
      <div className="flex gap-4 bg-no-repeat p-4 lg:h-full lg:w-full lg:flex-col lg:gap-[31px] lg:rounded-xl lg:bg-[url('/multi-step-form/assets/images/bg-sidebar-desktop.svg')] lg:p-8 lg:py-[40px]">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <Link
                className={cn([
                  "flex h-[33px] w-[33px] items-center justify-center rounded-full border pb-px pl-px text-[14px] font-bold tabular-nums", //
                  (router.query as Queries).step === String(index + 1) ? "bg-multi-step-primary-blue-100 text-multi-step-primary-blue-400 border-transparent" : "text-multi-step-neutral-100 border-multi-step-neutral-100",
                  index > parseInt(formsInput.completedStep || "0") && "pointer-events-none",
                ])}
                href={{
                  pathname: "/multi-step-form",
                  query: { step: index + 1 },
                }}
              >
                {index + 1}
              </Link>
              <div className="flex flex-col pb-[2px] uppercase text-white max-lg:hidden lg:gap-[6px]">
                <p className="text-multi-step-neutral-400 text-[12px] leading-none">Step {index + 1}</p>
                <p className="text-[14px] font-bold leading-none tracking-[1px]">{steps[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
      {!router.query.step || (router.query as Queries).step === "1" ? <PersonalInfoForm /> : (router.query as Queries).step === "2" ? <PlanForm /> : (router.query as Queries).step === "3" ? <AddOnsForm /> : (router.query as Queries).step === "4" ? !!(router.query as Queries).completed ? <ThankYou /> : <FinishingUp /> : <div>Error</div>}
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

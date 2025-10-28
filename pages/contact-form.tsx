import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useForm, type ValidationError } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { atom, useAtom } from "jotai";
import Head from "next/head";
// import Image from "next/image";
import {
  type ComponentProps,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { z } from "zod";
import { cn } from "../utils/cn";
import { karla } from "../utils/fonts/karla";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const toastAtom = atom<"visible" | "invisible">("invisible");

export default function ContactForm() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Contact form</title>
      </Head>
      <div
        className={cn(
          `App relative flex min-h-[100svh] flex-col items-center bg-contact-primary-green-200 pb-10 pt-8 ${karla.variable} font-karla`,
          "md:justify-center md:py-16",
          "overflow-x-hidden",
        )}
      >
        <Main />
        <Footer />
        <SuccessToast />
        {/* <Slider
          basePath="/contact-form/design"
          absolutePath="/contact-form/design/focus-and-active-state.jpg"
        /> */}
      </div>
    </>
  );
}

function RequiredFieldIndicator({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn("ml-[9px] text-contact-primary-green-600", className)}
    >
      *
    </span>
  );
}

type FormInputChildrenProps =
  | ComponentProps<"input">
  | ComponentProps<"textarea">;

function FormInput({
  children,
  label,
  className,
  errors,
}: PropsWithChildren & {
  label: string;
  className?: string;
  errors: ValidationError[];
}) {
  return isValidElement<FormInputChildrenProps>(children) ? (
    <label
      className={cn("flex w-full flex-col gap-[9px]", className)}
      htmlFor={children.props.id}
    >
      <p>
        <span>{label}</span>
        <RequiredFieldIndicator />
      </p>
      {cloneElement(children, {
        ...children.props,
        className: cn(
          "h-[51px] rounded-lg border border-contact-neutral-grey-500 px-[23px] pb-0.5 text-lg hover:border-contact-primary-green-600 focus-visible:border-contact-primary-green-600 focus-visible:outline focus-visible:outline-transparent bg-white",
          children.props.className,
          errors.length > 0
            ? "border-red-600 focus-visible:border-red-600 hover:border-red-600"
            : "",
        ),
      })}
      {errors.length > 0 ? (
        <p className="-mt-0.5 text-red-600">{errors.join(", ")}</p>
      ) : null}
    </label>
  ) : null;
}

const queryType = z
  .enum(["general-enquiry", "support-request"], {
    message: "Please select a query type",
  })
  .optional()
  .refine((val) => val !== undefined, {
    message: "Please select a query type",
  });
type QueryType = z.infer<typeof queryType>;

function Form() {
  const [, setToast] = useAtom(toastAtom);

  const fistNameInput = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (fistNameInput.current) {
      fistNameInput.current?.focus();
    }
  }, []);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      queryType: undefined as QueryType,
      message: "",
      consent: false,
    },
    onSubmit: ({ value, formApi }) => {
      setToast("visible");
      console.log(value);
      formApi.reset();
    },
    validatorAdapter: zodValidator({
      transformErrors: (errors) => {
        return errors[0].message;
      },
    }),
  });

  return (
    <form
      className={cn(
        "mt-[23px] flex flex-col gap-[23px] text-contact-neutral-grey-900",
        "md:grid md:grid-cols-2 md:gap-x-4",
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <form.Field
        name="firstName"
        validators={{
          onSubmit: z
            .string()
            .min(1, "This field is required")
            .refine((value) => value.trim().length > 0, {
              message: "This field cannot be only whitespace",
            })
            .refine((value) => value.trim().length >= 3, {
              message: "First name must be at least 3 characters",
            }),
        }}
      >
        {(field) => (
          <FormInput label="First Name" errors={field.state.meta.errors}>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              ref={fistNameInput}
            />
          </FormInput>
        )}
      </form.Field>
      <form.Field
        name="lastName"
        validators={{
          onSubmit: z
            .string()
            .min(1, "This field is required")
            .refine((value) => value.trim().length > 0, {
              message: "This field cannot be only whitespace",
            })
            .refine((value) => value.trim().length >= 3, {
              message: "Last name must be at least 3 characters",
            }),
        }}
      >
        {(field) => (
          <FormInput label="Last Name" errors={field.state.meta.errors}>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FormInput>
        )}
      </form.Field>
      <form.Field
        name="emailAddress"
        validators={{
          onSubmit: z
            .string()
            .min(1, "This field is required")
            .email("Please enter a valid email address"),
        }}
      >
        {(field) => (
          <FormInput
            label="Email Address"
            className="md:col-span-2"
            errors={field.state.meta.errors}
          >
            <input
              type="email"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FormInput>
        )}
      </form.Field>
      <fieldset className="md:col-span-2">
        <legend>
          <span>Query Type</span>
          <RequiredFieldIndicator />
        </legend>
        <div className="mt-[17px] flex flex-col gap-4 md:flex-row">
          <form.Field
            name="queryType"
            validators={{
              onChange: queryType,
            }}
          >
            {(field) => (
              <div className="relative w-full md:flex-1">
                <input
                  type="radio"
                  name={field.name}
                  id="general-enquiry"
                  value="general-enquiry"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as QueryType)
                  }
                  checked={field.getValue() === "general-enquiry"}
                  className={cn(
                    "peer absolute left-[27px] top-1/2 h-[19px] w-[19px] -translate-y-1/2 cursor-pointer appearance-none rounded-full border border-contact-neutral-grey-500/50 bg-white bg-clip-content checked:border-0 checked:bg-[image:_url('/contact-form/assets/images/icon-radio-selected.svg')] checked:bg-center checked:bg-no-repeat hover:border-contact-neutral-grey-500 checked:hover:border-contact-primary-green-600/75 checked:hover:brightness-90",
                    "focus-visible:outline focus-visible:outline-transparent",
                  )}
                />
                <label
                  htmlFor="general-enquiry"
                  className={cn(
                    "group/label flex h-[51px] w-full cursor-pointer items-center gap-4 rounded-lg border border-contact-neutral-grey-500 pl-[59px] text-lg/none hover:border-contact-primary-green-600 peer-checked:border-contact-primary-green-600 peer-checked:bg-contact-primary-green-600/10",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-contact-primary-green-600",
                  )}
                >
                  General Enquiry
                </label>
              </div>
            )}
          </form.Field>
          <form.Field
            name="queryType"
            validators={{
              onChange: queryType,
            }}
          >
            {(field) => (
              <div className="relative w-full md:flex-1">
                <input
                  type="radio"
                  name={field.name}
                  id="support-request"
                  value="support-request"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as QueryType)
                  }
                  checked={field.getValue() === "support-request"}
                  className={cn(
                    "peer absolute left-[27px] top-1/2 h-[19px] w-[19px] -translate-y-1/2 cursor-pointer appearance-none rounded-full border border-contact-neutral-grey-500/50 bg-white bg-clip-content checked:border-0 checked:bg-[image:_url('/contact-form/assets/images/icon-radio-selected.svg')] checked:bg-center checked:bg-no-repeat hover:border-contact-neutral-grey-500 checked:hover:border-contact-primary-green-600/75 checked:hover:brightness-90",
                    "focus-visible:outline focus-visible:outline-transparent",
                  )}
                />
                <label
                  htmlFor="support-request"
                  className={cn(
                    "group/label flex h-[51px] w-full cursor-pointer items-center gap-4 rounded-lg border border-contact-neutral-grey-500 pl-[59px] text-lg/none hover:border-contact-primary-green-600 peer-checked:border-contact-primary-green-600 peer-checked:bg-contact-primary-green-600/10",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-contact-primary-green-600",
                  )}
                >
                  Support Request
                </label>
              </div>
            )}
          </form.Field>
        </div>
        <form.Subscribe selector={(state) => state.fieldMeta.queryType}>
          {(fieldMeta) => {
            const queryFieldError = fieldMeta?.errorMap?.onChange;
            return queryFieldError ? (
              <p className="mt-[17px] text-red-600">{queryFieldError}</p>
            ) : null;
          }}
        </form.Subscribe>
      </fieldset>
      <form.Field
        name="message"
        validators={{
          onSubmit: z
            .string()
            .min(1, "This field is required")
            .refine((value) => value.trim().length > 0, {
              message: "This field cannot be only whitespace",
            })
            .refine((value) => value.trim().length >= 50, {
              message: "Message must be at least 50 meaningful characters",
            }),
        }}
      >
        {(field) => (
          <FormInput
            label="Message"
            className="mt-px gap-2 md:col-span-2"
            errors={field.state.meta.errors}
          >
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="h-[240px] resize-none px-[23px] py-[10px] md:h-[105px]"
            />
          </FormInput>
        )}
      </form.Field>
      <form.Field
        name="consent"
        validators={{
          onSubmit: z.boolean().refine((val) => val === true, {
            message: "To submit this form, please consent to being contacted",
          }),
        }}
      >
        {(field) => {
          return (
            <>
              <label className="mt-4 flex items-center gap-5 px-0.5 md:col-span-2">
                <input
                  type="checkbox"
                  className="h-[18px] w-[18px] appearance-none border-2 border-contact-neutral-grey-500/75 bg-white bg-contain checked:overflow-hidden checked:border-0 checked:bg-[image:url('/contact-form/assets/images/icon-checkbox-check.svg')] checked:bg-clip-content hover:border-contact-neutral-grey-500"
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(!!e.currentTarget.checked)
                  }
                />
                <p>
                  <span>I consent to being contacted by the team</span>
                  <RequiredFieldIndicator className="ml-1" />
                </p>
              </label>
              {field.state.meta.errors.length > 0 ? (
                <p className="-mt-4 text-red-600 md:col-span-2">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          );
        }}
      </form.Field>
      <button
        type="submit"
        className="mt-[18px] flex h-[59px] w-full items-center justify-center rounded-lg bg-contact-primary-green-600 pb-0.5 text-lg font-bold text-contact-neutral-white hover:bg-[hsl(171,83%,14%)] md:col-span-2"
      >
        Submit
      </button>
    </form>
  );
}

function SuccessToast({ duration = 5000 }: { duration?: number }) {
  const [toast, setToast] = useAtom(toastAtom);
  const timerId = useRef<null | {
    start: number;
    pausedAt: number;
    timeout: ReturnType<typeof setTimeout>;
  }>(null);

  const handleDismiss = useCallback(() => {
    setToast("invisible");
  }, [setToast]);

  const handleMouseEnter = () => {
    if (timerId.current) {
      timerId.current = { ...timerId.current, pausedAt: Date.now() };
      clearTimeout(timerId.current?.timeout);
    }
  };

  const handleMouseLeave = () => {
    if (timerId.current) {
      const remainingTime =
        duration - (timerId.current.pausedAt - timerId.current.start);
      timerId.current.timeout = setTimeout(() => {
        handleDismiss();
      }, remainingTime);
    }
  };

  useEffect(() => {
    if (toast === "visible") {
      timerId.current = {
        timeout: setTimeout(handleDismiss, duration),
        start: Date.now(),
        pausedAt: Date.now(),
      };

      return () => {
        clearTimeout(timerId.current?.timeout);
      };
    }
  }, [toast, duration, handleDismiss]);

  return (
    <Transition
      show={toast === "visible"}
      className={cn(
        "fixed left-1/2 top-6 flex h-[107px] -translate-x-1/2 flex-col items-center justify-center gap-2 rounded-xl bg-contact-neutral-grey-900 px-6 pb-0.5 text-contact-neutral-white md:w-[450px]",
        "w-[300px] transition-all",
      )}
      enter="duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <h2 className="flex items-center gap-2 self-start text-lg font-bold">
        <CheckCircleIcon className="h-6 w-6" />
        <span>Message Sent!</span>
      </h2>
      <p className="text-contact-primary-green-200">
        Thanks for completing the form. We&rsquo;ll be in touch soon!
      </p>
    </Transition>
  );
}

function Main() {
  return (
    <main
      className={cn(
        "w-[343px] rounded-2xl bg-white px-6 pb-[39px] pt-4",
        "md:min-h-[772px] md:w-[736px] md:px-[40px] md:pt-[32px]",
      )}
    >
      <h1 className="text-[32px] font-bold tracking-tight text-contact-neutral-grey-900">
        Contact Us
      </h1>
      <Form />
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-contact-primary-green-600 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

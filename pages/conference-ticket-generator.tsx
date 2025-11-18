import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { type ComponentProps, forwardRef, useRef } from "react";
import {
  Controller,
  type ControllerRenderProps,
  type FieldError,
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { cn } from "../utils/cn";
import { inconsolata } from "../utils/fonts/inconsolata";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const inputSchema = z.object({
  avatar: z
    .custom<FileList | null>()
    .transform((fileList) => (fileList ? fileList[0] : null))
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file",
    })
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(file.type);
      },
      {
        message: "File must be JPG or PNG format",
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 500 * 1024;
      },
      {
        message: "File too large. Please upload a photo under 500KB.",
      },
    )
    .nullable()
    .optional(),
  fullname: z
    .string()
    .min(1, { message: "Fullname cannot be empty." })
    .refine((val) => val.trim().length > 0, {
      message: "Fullname cannot be empty.",
    })
    .transform((el) => el.trim()),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .transform((el) => el.trim()),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty." })
    .refine((val) => val.trim().length > 0, {
      message: "Username cannot be empty.",
    })
    .transform((el) => el.trim()),
});

type Inputs = z.infer<typeof inputSchema>;

const completedAtom = atom<boolean>(false);
const previewUrlAtom = atom<string | null>(null);

export default function ConferenceTicketGenerator() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Conference ticket generator</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-x-hidden bg-white bg-[url('/conference-ticket-generator/assets/images/background-mobile.png')] bg-cover bg-scroll bg-top font-inconsolata md:bg-[url('/conference-ticket-generator/assets/images/background-tablet.png')] lg:bg-[url('/conference-ticket-generator/assets/images/background-desktop.png')] ${inconsolata.variable}`}
      >
        <Ornament />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/conference-ticket-generator/design"
          // absolutePath="/conference-ticket-generator/design/mobile-design-form.jpg"
          absolutePath="/conference-ticket-generator/design/dekstop-design-ticket.jpg"
        /> */}
      </div>
    </>
  );
}

function Ornament() {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
      <div className="pointer-events-none absolute -left-[22px] -top-8 aspect-square h-[109px] lg:-top-[84px] lg:left-11 lg:h-[217px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute -right-[46px] top-[548px] aspect-square h-[108px] lg:left-[65.15%] lg:top-[48.5%] lg:h-[217px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-circle.svg"
          fill
          className="object-contain"
          alt="Pattern circle bottom"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 aspect-[1459/1024] w-[264%] -translate-x-[calc(50%+28px)] lg:w-[101.25%] lg:-translate-x-[calc(50%+41px)]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-lines.svg"
          fill
          className="object-contain"
          alt="Pattern lines"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-6 aspect-[446/208] h-[52px] lg:top-[76px] lg:h-[208px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-top.svg"
          fill
          className="object-contain"
          alt="Pattern squiggly line top"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 aspect-[760/530] h-[210px] lg:aspect-[825/476] lg:h-[476px]">
        <Image
          src="/conference-ticket-generator/assets/images/pattern-squiggly-line-"
          fill
          className="object-contain"
          alt="Pattern squiggly line"
          aria-hidden="true"
          loader={({ src, width }) => {
            if (width > 1023) {
              return `${src}bottom-desktop.svg`;
            }
            return `${src}bottom-mobile-tablet.svg`;
          }}
        />
      </div>
    </div>
  );
}

const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & { error?: FieldError }
>(({ className, error, ...props }, ref) => {
  return (
    <>
      <input
        className={cn(
          "mt-3 h-[54px] w-full rounded-[12px] border bg-conference-ticket-generator-neutral-700/30 px-[14px] py-2 text-[18px] hover:bg-conference-ticket-generator-neutral-700/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-conference-ticket-generator-neutral-500",
          error
            ? "border-conference-ticket-generator-orange-500"
            : "border-conference-ticket-generator-neutral-500",
          className,
        )}
        ref={ref}
        {...props}
      />
      {!!error && (
        <p className="mt-3 flex items-center gap-2 text-xs tracking-[-0.0175em] text-conference-ticket-generator-neutral-500">
          <svg
            viewBox="0 0 16 16"
            className="w-4 text-conference-ticket-generator-orange-500"
            role="graphics-symbol"
          >
            <use href="/conference-ticket-generator/assets/images/icon-info.svg#icon-info" />
          </svg>
          <span className="text-conference-ticket-generator-orange-500">
            {error.message}
          </span>
        </p>
      )}
    </>
  );
});

Input.displayName = "Input";

function Form() {
  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useFormContext<Inputs>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useAtom(previewUrlAtom);
  const setIsCompleted = useSetAtom(completedAtom);

  const handleFileChange = (
    files: FileList | null,
    field: ControllerRenderProps<Inputs, "avatar">,
  ) => {
    if (files && files.length > 0) {
      const validation = z
        .object({
          avatar: inputSchema.shape.avatar,
        })
        .safeParse({ avatar: files });
      if (validation.success) {
        const url = URL.createObjectURL(files[0]);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
    field.onChange(files);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    resetField("avatar");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChangeImage = () => {
    inputRef.current?.click();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setIsCompleted(true);
  };

  return (
    <form
      className="mt-10 flex w-full max-w-[460px] flex-1 flex-col items-center lg:mt-[45px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <label htmlFor="avatar" className="tracking-tight">
          Upload Avatar
        </label>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => {
            return (
              <>
                {previewUrl ? (
                  <div className="mt-3 flex h-[126px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-conference-ticket-generator-neutral-500 bg-conference-ticket-generator-neutral-700/30 ">
                    <Image
                      src={previewUrl}
                      alt="Avatar preview"
                      width={50}
                      height={50}
                      className="aspect-square rounded-xl border border-conference-ticket-generator-neutral-500 object-cover"
                    />
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="rounded bg-conference-ticket-generator-neutral-700/50 px-2 py-[3px] text-xs tracking-[-0.02em] hover:underline hover:underline-offset-2"
                      >
                        Remove image
                      </button>
                      <button
                        type="button"
                        onClick={handleChangeImage}
                        className="rounded bg-conference-ticket-generator-neutral-700/50 px-2 py-[3px] text-xs tracking-[-0.02em] hover:underline hover:underline-offset-2"
                      >
                        Change image
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="avatar"
                    className="group mt-3 flex h-[126px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-conference-ticket-generator-neutral-500 bg-conference-ticket-generator-neutral-700/30 hover:border-conference-ticket-generator-neutral-300 hover:bg-conference-ticket-generator-neutral-700/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-conference-ticket-generator-neutral-500"
                    // biome-ignore lint/a11y/noNoninteractiveTabindex: onKeyDown handle interactivity
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleChangeImage();
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-start gap-[15px]">
                      <svg
                        viewBox="0 0 30 30"
                        className="box-content w-[30px] rounded-xl border border-conference-ticket-generator-neutral-700 bg-conference-ticket-generator-neutral-700 bg-opacity-50 p-[9px] group-hover:border-conference-ticket-generator-neutral-500 group-hover:bg-opacity-100"
                        role="graphics-symbol"
                      >
                        <use href="/conference-ticket-generator/assets/images/icon-upload.svg#icon-upload" />
                      </svg>
                      <p className="text-[18px] text-conference-ticket-generator-neutral-300">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  ref={inputRef}
                  onChange={(e) => handleFileChange(e.target.files, field)}
                />
              </>
            );
          }}
        />
        <p
          className={`mt-3 flex items-center gap-2 text-xs tracking-[-0.0175em] ${errors.avatar ? "text-conference-ticket-generator-orange-500" : "text-conference-ticket-generator-neutral-500"}`}
        >
          <svg
            viewBox="0 0 16 16"
            className={`w-4 ${errors.avatar ? "text-conference-ticket-generator-orange-500" : "text-[#D1D0D5]"}`}
            role="graphics-symbol"
          >
            <use href="/conference-ticket-generator/assets/images/icon-info.svg#icon-info" />
          </svg>
          <span>
            {errors.avatar?.message ??
              "Upload your photo (JPG or PNG, max size: 500KB)."}
          </span>
        </p>
      </div>
      <label htmlFor="fullname" className="mt-6 w-full">
        <p className="tracking-tight">Full Name</p>
        <Input
          type="text"
          id="fullname"
          {...register("fullname", { required: true })}
          error={errors.fullname}
        />
      </label>
      <label htmlFor="email" className="mt-6 w-full">
        <p className="tracking-tight">Email Address</p>
        <Input
          type="email"
          id="email"
          placeholder="example@email.com"
          {...register("email", { required: true })}
          error={errors.email}
        />
      </label>
      <label htmlFor="username" className="mt-6 w-full">
        <p className="tracking-tight">GitHub Username</p>
        <Input
          type="text"
          id="username"
          placeholder="@yourusername"
          {...register("username", { required: true })}
          error={errors.username}
        />
      </label>
      <button
        className="mt-[24px] h-[54px] w-full rounded-xl bg-conference-ticket-generator-orange-500 font-extrabold tracking-tight text-conference-ticket-generator-neutral-900 hover:bg-conference-ticket-generator-orange-700 hover:shadow-[0px_4px] hover:shadow-conference-ticket-generator-orange-500 focus-visible:border-[3px] focus-visible:border-conference-ticket-generator-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-conference-ticket-generator-neutral-500"
        type="submit"
      >
        Generate My Ticket
      </button>
    </form>
  );
}

function Main() {
  const form = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    // values: {
    //   email: "jonatan@email.com",
    //   fullname: "Jonatan Kristof",
    //   username: "@jonatankristof0101",
    // },
  });
  const { getValues } = form;

  const isCompleted = useAtomValue(completedAtom);
  const previewUrl = useAtomValue(previewUrlAtom);

  return (
    <FormProvider {...form}>
      <main className="relative z-20 flex h-full w-full flex-col items-center px-4 py-[30px] text-[20px] leading-6 text-conference-ticket-generator-neutral-0 lg:py-10">
        <Image
          src={"/conference-ticket-generator/assets/images/logo-full.svg"}
          width={209}
          height={30}
          alt="Coding Conf"
          className="scale-[80%] lg:scale-100"
        />

        {isCompleted ? (
          <>
            <h1 className="mt-[38px] text-center text-[30px]/8 font-extrabold tracking-[-0.035em] lg:mt-[70px] lg:max-w-[800px] lg:text-[62px]/[66px] lg:tracking-[-0.0325em]">
              Congrats,{" "}
              <span className="bg-gradient-to-r from-conference-ticket-generator-orange-gradient to-conference-ticket-generator-neutral-0 bg-clip-text text-transparent">
                {getValues("fullname")}!
              </span>{" "}
              Your ticket is ready.
            </h1>

            <p className="mt-[21px] text-center tracking-tight text-conference-ticket-generator-neutral-300 lg:mt-[32px] lg:text-[24px]/[29px] max-w-[520px]">
              We&rsquo;ve emailed your ticket to{" "}
              <span className="text-conference-ticket-generator-orange-gradient">
                {getValues("email")}
              </span>{" "}
              and will send updates in the run up to the event.
            </p>

            <div className="relative mt-[73px] flex aspect-[600/280] w-full max-w-[600px] items-center justify-between bg-[url('/conference-ticket-generator/assets/images/pattern-ticket.svg')] bg-cover px-4 py-4 md:px-6 md:py-6 lg:mt-[111px]">
              <div className="flex h-full flex-col items-start justify-between pt-1 md:pt-1.5">
                <div className="flex items-start gap-px md:gap-5">
                  <Image
                    src="/conference-ticket-generator/assets/images/logo-mark.svg"
                    width={40}
                    height={40}
                    alt="Coding Conf Mark"
                    className="origin-top-left scale-[calc(29/40*100%)] lg:scale-100"
                  />
                  <div className="flex flex-col gap-[13px] md:gap-5">
                    <span className="text-[clamp(1.5rem,0.08rem+6.04vw,2.5rem)] leading-[18px] md:leading-[32px] font-medium tracking-[-0.04em] md:font-bold md:tracking-[-0.0275em]">
                      Coding Conf
                    </span>
                    <span className="text-[14px] leading-none text-conference-ticket-generator-neutral-300 md:text-[18px]">
                      Jan 31, 2025 / Austin, TX
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="relative aspect-square w-[clamp(45px,8.906vw+0.725rem,80px)] origin-bottom-left overflow-hidden rounded-lg object-cover lg:rounded-xl">
                    <Image
                      src={
                        previewUrl ??
                        "/conference-ticket-generator/assets/images/default-avatar.png"
                      }
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between pb-[1px] pt-1 md:pb-[8px] md:pt-[10px]">
                    <div className="text-[clamp(1.125rem,0.0625rem+4.5vw,1.875rem)] leading-none md:tracking-[-0.035em]">
                      {getValues("fullname")}
                    </div>
                    <div className="flex items-center gap-[3px] md:gap-[9px]">
                      <div className="relative aspect-[22/23] h-[17px] md:h-[23px]">
                        <Image
                          src="/conference-ticket-generator/assets/images/icon-github.svg"
                          alt="Avatar preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[14px] leading-none text-conference-ticket-generator-neutral-300 md:text-[20px] md:tracking-[-0.025em]">
                        {getValues("username")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-[clamp(15px,calc(-22.5px+10vw),42px)] top-1/2 origin-top translate-x-1/2 rotate-90 text-[clamp(22px,calc(10px+3vw),30px)] tracking-[-0.035em] text-conference-ticket-generator-neutral-500">
                #01609
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-[38px] text-center text-[30px]/8 font-extrabold tracking-[-0.035em] lg:mt-[59px] lg:max-w-[800px] lg:text-[60px]/[66px] lg:tracking-[-0.0175em]">
              Your Journey to Coding Conf 2025 Starts Here!
            </h1>

            <p className="mt-[21px] text-center tracking-tight text-conference-ticket-generator-neutral-300 lg:mt-[22px] lg:text-[22px]/7 lg:tracking-wide">
              Secure your spot at next year&rsquo;s biggest coding conference.
            </p>

            <Form />
          </>
        )}
      </main>
    </FormProvider>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-conference-ticket-generator-neutral-0 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

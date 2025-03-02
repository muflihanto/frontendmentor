import Image from "next/image";
import { Logo } from "../../pages/huddle-landing-page-with-curved-sections";
import { type ComponentProps, useEffect } from "react";
import { cn } from "../../utils/cn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Footer = () => {
  return (
    <footer className="relative pt-[calc(100vw*53/375)] lg:pt-[calc(100vw*158/1440)]">
      <div className="absolute left-0 top-0 aspect-[375/53] w-full lg:aspect-[1440/158]">
        <Image
          src="/huddle-landing-page-with-curved-sections/images/"
          alt="Footer Curved Background"
          className="object-contain"
          loader={({ src, width }) => {
            if (width > 1023) {
              return `${src}bg-footer-top-desktop.svg`;
            }
            return `${src}bg-footer-top-mobile.svg`;
          }}
          fill
        />
      </div>
      <div className="relative grid grid-rows-2 gap-y-[92px] bg-huddle-curve-neutral-700 px-7 pb-[43.48px] pt-[56px] text-huddle-curve-neutral-100 lg:grid-cols-2 lg:grid-rows-1 lg:px-[120px] lg:pb-[100.18px] lg:pt-[122px]">
        <div className="max-md:row-start-2 lg:w-[310px]">
          <Logo
            className="h-[32px] lg:h-[39px]"
            labelId="huddle-logo-footer"
            white
          />
          <p className="mt-[16px] pr-2 text-[14px] leading-[24px] tracking-[0.25px] lg:mt-[25px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            nulla quam, hendrerit lacinia vestibulum a, ultrices quis sem.
          </p>
          <p className="ml-[3px] mt-[42px] flex items-center justify-start lg:mt-[26px]">
            <svg viewBox="0 0 18 18" className="w-[18px]" aria-hidden="true">
              <use href="/huddle-landing-page-with-curved-sections/images/icon-phone.svg#icon-phone" />
            </svg>
            <span className="ml-[18px] text-[14px] tracking-[0.25px] lg:text-[16px] lg:tracking-[0px]">
              Phone: +1-543-123-4567
            </span>
          </p>
          <p className="ml-[3px] mt-[19px] flex items-center justify-start lg:mt-[15px]">
            <svg className="w-5" viewBox="0 0 20 16" aria-hidden="true">
              <use href="/huddle-landing-page-with-curved-sections/images/icon-email.svg#icon-email" />
            </svg>
            <span className="ml-[18px] text-[14px] tracking-[0.25px] lg:text-[16px] lg:tracking-[0px]">
              example@huddle.com
            </span>
          </p>

          <SocialIcons />
        </div>
        <SubscribeNewsletter className="max-md:row-start-1 lg:w-[520px] lg:justify-self-end" />
        <p className="absolute bottom-2 left-0 w-full text-center text-[11px] text-huddle-curve-neutral-100 lg:bottom-8 lg:px-[120px] lg:text-right lg:text-[13px] [&_a:hover]:opacity-75 [&_a]:font-bold [&_a]:text-huddle-curve-primary-pink-100 [&_a]:underline [&_a]:decoration-wavy">
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
      </div>
    </footer>
  );
};

export default Footer;

function SocialIcons() {
  return (
    <div className="mt-[48px] flex items-center justify-start gap-[17px] lg:mt-[78px] lg:gap-[24px] [&>a:hover]:text-[hsl(192,99%,49%)] [&>a]:text-white [&_svg]:h-[26px] lg:[&_svg]:h-[37px]">
      <a href="">
        <svg role="graphics-symbol" aria-label="Facebook" viewBox="0 0 448 512">
          <use href="/huddle-landing-page-with-curved-sections/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a href="">
        <svg
          role="graphics-symbol"
          aria-label="Instagram"
          viewBox="0 0 448 512"
        >
          <use href="/huddle-landing-page-with-curved-sections/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
      <a href="">
        <svg role="graphics-symbol" aria-label="Twitter" viewBox="0 0 448 512">
          <use href="/huddle-landing-page-with-curved-sections/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
    </div>
  );
}

const InputSchema = z.object({
  email: z
    .string()
    .min(1, "Email must not be empty")
    .email("Check your email please"),
});
type InputSchema = z.infer<typeof InputSchema>;
function SubscribeNewsletter({ className }: ComponentProps<"div">) {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<InputSchema>({
    resolver: zodResolver(InputSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={cn([className])}>
      <h2 className="text-[20px] font-bold uppercase lg:text-[24px]">
        Newsletter
      </h2>
      <p className="mt-[15px] pr-2 text-[14px] leading-[24px] tracking-[0.25px] lg:mt-[16px] lg:w-[360px]">
        To recieve tips on how to grow your community, sign up to our weekly
        newsletter. We’ll never send you spam or pass on your email address
      </p>
      <form
        className="mt-[32px] grid grid-cols-2 grid-rows-2 gap-x-0 gap-y-4 lg:mt-[40px] lg:grid-cols-[minmax(0px,auto),160px] lg:grid-rows-1 lg:gap-x-[40px]"
        onSubmit={onSubmit}
        noValidate
        aria-label="Subscription form"
      >
        <div className="col-span-2 h-12 lg:col-span-1">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={cn([
              "h-full w-full rounded-md bg-white px-4 text-left text-huddle-curve-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-huddle-curve-primary-pink-200", //
              !!errors.email && "text-red-500 focus-visible:outline-red-500",
            ])}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className="mt-[5px] text-[12.5px] text-red-400"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <button
          className="col-start-2 rounded-md bg-huddle-curve-primary-pink-200 font-bold text-huddle-curve-neutral-100/75 hover:bg-huddle-curve-primary-pink-100 lg:col-start-2"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

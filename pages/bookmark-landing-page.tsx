import Head from "next/head";
import Image from "next/image";
import {
  type CSSProperties,
  type ComponentProps,
  type PropsWithChildren,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { Disclosure } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  type AriaButtonProps,
  type AriaModalOverlayProps,
  Overlay,
  useButton,
  useModalOverlay,
  useOverlayTrigger,
} from "react-aria";
import {
  type OverlayTriggerProps,
  type OverlayTriggerState,
  useOverlayTriggerState,
} from "react-stately";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BookmarkLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Bookmark landing page</title>
      </Head>
      <div className="App relative min-h-[100svh] font-rubiks">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/bookmark-landing-page/design"
          // absolutePath="/bookmark-landing-page/design/mobile-active-states.jpg"
          absolutePath="/bookmark-landing-page/design/desktop-active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div>
      <Header />
      <Hero />
      <Feature />
      <DownloadExtension />
      <FAQ />
      <ContactUs />
    </div>
  );
}

function Button(
  props: PropsWithChildren<AriaButtonProps & ComponentProps<"button">>,
) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      className={cn([props.className, buttonProps.className])}
      ref={ref}
    >
      {children}
    </button>
  );
}

function Modal({
  state,
  children,
  ...props
}: PropsWithChildren<{ state: OverlayTriggerState } & AriaModalOverlayProps>) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div
        className="fixed right-0 top-0 z-50 flex h-screen w-screen bg-bookmark-neutral-200/95 font-rubiks"
        {...underlayProps}
      >
        <div
          {...modalProps}
          className="relative flex w-full flex-col items-center px-8 pb-12"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}

function MobileNav({
  children,
  ...props
}: {
  label: string;
  children: (close: OverlayTriggerState["close"]) => JSX.Element;
} & OverlayTriggerProps) {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "menu" },
    state,
  );

  return (
    <>
      <Button
        className={cn([
          "flex items-center justify-center md:hidden",
          state.isOpen && "hidden",
        ])}
        {...triggerProps}
      >
        <Image
          alt="Hamburger Icon"
          src="/space-tourism-website/assets/shared/icon-hamburger.svg"
          width={24}
          height={21}
        />
      </Button>

      {state.isOpen && (
        <Modal {...props} state={state}>
          {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}

function Header() {
  return (
    <header className="flex h-[105px] w-full items-center justify-between px-8 lg:px-[165px] lg:pt-[31px]">
      <svg
        viewBox="0 0 148 25"
        className="h-[25px] text-bookmark-neutral-200 lg:ml-[6px]"
      >
        <use href="/bookmark-landing-page/images/logo-bookmark.svg#logo-bookmark" />
      </svg>

      <div className="flex h-10 items-center uppercase text-bookmark-neutral-200">
        <nav className="mr-[49px] flex items-center gap-[45px] text-[13px] tracking-[1.5px] [&>a:hover]:text-bookmark-primary-red">
          <a className="" href="">
            Features
          </a>
          <a className="" href="">
            Pricing
          </a>
          <a className="" href="">
            Contact
          </a>
        </nav>

        <a
          href=""
          className="flex h-full w-[110px] items-center justify-center rounded bg-bookmark-primary-red text-[13px] font-medium tracking-[1.25px] text-white hover:border-2 hover:border-bookmark-primary-red hover:bg-white hover:text-bookmark-primary-red"
        >
          Login
        </a>
      </div>

      <MobileNav label="Open Mobile Navigation Menu">
        {(close) => {
          return (
            <>
              <div className="flex h-[105px] w-full items-center justify-between lg:hidden">
                <svg
                  viewBox="0 0 148 25"
                  className="h-[25px] text-bookmark-neutral-200/95"
                >
                  <use href="/bookmark-landing-page/images/logo-bookmark-white.svg#logo-bookmark-white" />
                </svg>
                <Button onPress={close} className="h-[15px] w-4">
                  <Image
                    src="/bookmark-landing-page/images/icon-close.svg"
                    width={16}
                    height={15}
                    alt="Close Icon"
                  />
                </Button>
              </div>

              <nav className="mt-0 flex w-full flex-col items-center divide-y divide-white/25 border-y border-y-white/25">
                <a
                  className="flex h-[65.5px] w-full items-center justify-center pb-[1px] pr-[12px] text-[20px] uppercase tracking-[2.25px] text-white"
                  href=""
                >
                  Features
                </a>
                <a
                  className="flex h-[65.5px] w-full items-center justify-center pb-[1px] pr-[12px] text-[20px] uppercase tracking-[2.25px] text-white"
                  href=""
                >
                  Pricing
                </a>
                <a
                  className="flex h-[65.5px] w-full items-center justify-center pb-[1px] pr-[12px] text-[20px] uppercase tracking-[2.25px] text-white"
                  href=""
                >
                  Contact
                </a>
              </nav>

              <a
                href=""
                className="mt-[24.5px] flex h-12 w-full items-center justify-center rounded-md border-2 text-[20px] font-medium uppercase tracking-[2.25px] text-white"
              >
                Login
              </a>

              <div className="mt-auto flex items-center justify-center gap-x-10">
                <a
                  href=""
                  className="text-white hover:text-bookmark-primary-red"
                >
                  <svg viewBox="0 0 24 24" className="w-6">
                    <use href="/bookmark-landing-page/images/icon-facebook.svg#icon-facebook" />
                  </svg>
                </a>
                <a
                  href=""
                  className="text-white hover:text-bookmark-primary-red"
                >
                  <svg viewBox="0 0 24 20" className="w-6">
                    <use href="/bookmark-landing-page/images/icon-twitter.svg#icon-twitter" />
                  </svg>
                </a>
              </div>
            </>
          );
        }}
      </MobileNav>
    </header>
  );
}

function Hero() {
  return (
    <div className="lg:mt-[60.5px] lg:grid lg:h-[522.5px] lg:grid-cols-2 lg:grid-rows-1 lg:items-center">
      <div className="relative mt-[27px] flex h-[268px] items-center justify-center pb-[1px] lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-full lg:justify-start">
        <div className="relative z-10 aspect-[657/466] h-auto w-[353px] lg:ml-[11px] lg:w-[657px]">
          <Image
            fill
            src="/bookmark-landing-page/images/illustration-hero.svg"
            alt="Bookmark Illustration"
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0 h-[203px] w-[305px] rounded-l-full bg-bookmark-primary-blue lg:h-[352px] lg:w-[515px]" />
      </div>

      <div className="mt-12 flex flex-col items-center px-8 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:items-start lg:self-start lg:pl-[165px] lg:pt-[107px]">
        <h1 className="text-center text-[30px] font-medium leading-[40px] text-bookmark-neutral-200 lg:text-left lg:text-[48px] lg:leading-[52px] lg:tracking-[-.2px]">
          A Simple Bookmark Manager
        </h1>
        <p className="mt-[16px] text-center text-[15px] leading-[25px] text-bookmark-neutral-100 lg:mt-[24px] lg:text-left lg:text-[18px] lg:leading-[28px]">
          A clean and simple interface to organize your favourite websites. Open
          a new browser tab and see your sites load instantly. Try it for free.
        </p>
        <div className="mt-[32px] flex h-12 w-full items-center justify-between gap-4 lg:w-[342px]">
          <button className="flex h-full w-full items-center justify-center rounded border-2 border-transparent bg-bookmark-primary-blue text-[15px] text-white shadow-md shadow-bookmark-primary-blue/25 hover:border-bookmark-primary-blue hover:bg-white hover:text-bookmark-primary-blue">
            Get it on Chrome
          </button>
          <button className="flex h-full w-full items-center justify-center rounded border-2 border-transparent bg-bookmark-neutral-100/10 text-[15px] text-bookmark-neutral-200 shadow-md shadow-bookmark-neutral-100/25 hover:border-bookmark-neutral-200/75">
            Get it on Firefox
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  children,
  ...props
}: PropsWithChildren<{ active: boolean } & ComponentProps<"button">>) {
  return (
    <button
      className={cn([
        "h-[58px] w-full text-[17px] text-bookmark-neutral-200/75 hover:text-bookmark-primary-red lg:h-[80px]", //
        active &&
          "relative text-bookmark-neutral-200 before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-[143px] before:-translate-x-1/2 before:bg-bookmark-primary-red hover:text-bookmark-neutral-200 lg:before:w-full",
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

function FeatureIllustration({
  variant,
}: ComponentProps<"svg"> & { variant: number }) {
  const svgProps: { className: ComponentProps<"svg">["className"] }[] = [
    { className: "aspect-[536/346] max-w-[536px]" },
    { className: "aspect-[478/346] max-w-[478px]" },
    { className: "aspect-[440/380] max-w-[440px]" },
  ];

  return (
    <div className={cn(["relative w-full", svgProps[variant].className])}>
      <Image
        src={`/bookmark-landing-page/images/illustration-features-tab-${
          variant + 1
        }.svg`}
        alt={`Illustration Features Tab ${variant + 1}`}
        fill
        className="object-contain"
      />
    </div>
  );
}

function Feature() {
  const [tab, setTab] = useState(0);
  const features = [
    {
      name: "Simple Bookmarking",
      title: "Bookmark in one click",
      description:
        "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
    },
    {
      name: "Speedy Searching",
      title: "Intelligent search",
      description:
        "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
    },
    {
      name: "Easy Sharing",
      title: "Share your bookmarks",
      description:
        "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
    },
  ];

  return (
    <div className="mt-[150px] lg:mt-[90px]">
      <div className="flex flex-col items-center px-8">
        <h2 className="text-[24px] font-medium leading-[32px] text-bookmark-neutral-200 lg:text-[32px]">
          Features
        </h2>
        <p className="mt-[10px] text-center text-[15px] leading-[25px] text-bookmark-neutral-100 lg:mt-[26px] lg:w-[540px] lg:text-[18px] lg:leading-[28px]">
          Our aim is to make it quick and easy for you to access your favourite
          websites. Your bookmarks sync between your devices so you can access
          them on the go.
        </p>

        <div className="mt-[39px] flex w-full flex-col items-center divide-y border-y text-bookmark-neutral-100 lg:mt-10 lg:grid lg:w-[730px] lg:grid-cols-3 lg:grid-rows-1 lg:divide-none lg:border-b lg:border-t-0">
          {features.map((feature, index) => {
            return (
              <TabButton
                active={tab === index}
                key={feature.name}
                onClick={() => {
                  setTab(index);
                }}
              >
                {feature.name}
              </TabButton>
            );
          })}
        </div>
      </div>

      <div className="lg:mt-[72px] lg:grid lg:h-[435px] lg:grid-cols-2 lg:grid-rows-1">
        <div className="mt-[35px] w-full py-[37px] lg:relative lg:mt-0 lg:py-0 lg:pr-[14px]">
          <div className="relative z-10 w-full px-8 lg:flex lg:items-center lg:justify-end lg:px-0">
            <FeatureIllustration variant={tab} />
          </div>
          <div className="absolute bottom-0 left-0 z-0 h-[203px] w-[308px] rounded-r-full bg-bookmark-primary-blue lg:h-[352px] lg:w-[640px]" />
        </div>

        <div className="mt-[42px] flex flex-col items-center lg:mt-0 lg:items-start lg:justify-center lg:pb-[78px] lg:pl-[110px]">
          <h3 className="text-[24px] font-medium leading-[32px] text-bookmark-neutral-200 lg:text-left lg:text-[32px]">
            {features[tab].title}
          </h3>
          <p className="mt-[11px] px-8 text-center text-[15px] leading-[25px] text-bookmark-neutral-100 lg:mt-[26px] lg:w-[435px] lg:px-0 lg:text-left lg:text-[18px] lg:leading-[28px]">
            {features[tab].description}
          </p>
          <button className="mt-[32px] flex h-12 w-[114px] items-center justify-center rounded border-2 border-transparent bg-bookmark-primary-blue text-[15px] text-white shadow-md shadow-bookmark-primary-blue/25 hover:border-bookmark-primary-blue hover:bg-white hover:text-bookmark-primary-blue max-lg:hidden">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

type Browser = {
  name: string;
  image: {
    size: string;
    src: string;
  };
  minimum: string;
};

function DownloadCard({
  data,
  className,
  ...props
}: ComponentProps<"div"> & { data: Browser }) {
  return (
    <div
      className={cn([
        "flex h-[370px] w-[280px] flex-col items-center pt-12 shadow-lg shadow-bookmark-neutral-100/20", //
        className,
      ])}
      {...props}
    >
      <div className={`relative h-[100px] ${data.image.size}`}>
        <Image
          src={data.image.src}
          alt={data.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="mt-7 text-[20px] font-medium leading-[32px] tracking-[.25px] text-bookmark-neutral-200">
        Add to {data.name}
      </h3>
      <p className="mt-[4px] text-center text-[15px] leading-[25px] text-bookmark-neutral-100">
        Minimum version {data.minimum}
      </p>

      <Image
        src="/bookmark-landing-page/images/bg-dots.svg"
        width={280}
        height={4}
        className="mt-[33px]"
        alt="dots"
      />

      <button className="mt-[24.25px] flex h-12 w-[calc(280px-48px)] items-center justify-center rounded border-2 border-transparent bg-bookmark-primary-blue text-[15px] text-white shadow-md shadow-bookmark-primary-blue/25 hover:border-bookmark-primary-blue hover:bg-white hover:text-bookmark-primary-blue">
        Add & Install Extension
      </button>
    </div>
  );
}

function DownloadExtension() {
  const browsers: Browser[] = [
    {
      name: "Chrome",
      image: {
        size: "aspect-[102/100]",
        src: "/bookmark-landing-page/images/logo-chrome.svg",
      },
      minimum: "62",
    },
    {
      name: "Firefox",
      image: {
        size: "aspect-[105/100]",
        src: "/bookmark-landing-page/images/logo-firefox.svg",
      },
      minimum: "55",
    },
    {
      name: "Opera",
      image: {
        size: "aspect-[96/100]",
        src: "/bookmark-landing-page/images/logo-opera.svg",
      },
      minimum: "46",
    },
  ];

  return (
    <div className="mt-[149px] flex flex-col items-center px-8 lg:mt-[160px]">
      <h2 className="text-[24px] font-medium leading-[32px] text-bookmark-neutral-200 lg:text-[32px]">
        Download the extension
      </h2>
      <p className="mt-[10px] text-center text-[15px] leading-[25px] text-bookmark-neutral-100 lg:mt-[25px] lg:w-[540px] lg:text-[18px] lg:leading-[28px]">
        We’ve got more browsers in the pipeline. Please do let us know if you’ve
        got a favourite you’d like us to prioritize.
      </p>
      <div className="mt-[41px] lg:mt-[49px] lg:flex lg:items-start lg:gap-x-[34px]">
        {browsers.map((browser, index) => {
          return (
            <DownloadCard
              style={
                {
                  "--mt": index * 40 + "px",
                } as CSSProperties
              }
              className="max-lg:mt-[41px] max-lg:first:mt-0 lg:mt-[--mt]"
              data={browser}
              key={browser.name}
            />
          );
        })}
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "What is Bookmark?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
    },
    {
      question: "How can I request a new browser?",
      answer:
        "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.",
    },
    {
      question: "What about other Chromium browsers?",
      answer:
        "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
    },
  ];

  return (
    <div className="mt-[141px] flex flex-col items-center px-8 lg:mt-[160px]">
      <h2 className="text-center text-[24px] font-medium leading-[30px] text-bookmark-neutral-200 lg:text-[32px]">
        Frequently Asked Questions
      </h2>
      <p className="mt-[16px] max-w-[540px] text-center text-[15px] leading-[25px] text-bookmark-neutral-100 lg:mt-[27px] lg:w-[540px] lg:text-[18px] lg:leading-[28px]">
        Here are some of our FAQs. If you have any other questions you’d like
        answered please feel free to email us.
      </p>
      <div className="mt-[43px] flex w-full max-w-[540px] flex-col lg:mt-[56px] lg:border-y">
        {faqs.map(({ question, answer }) => {
          return (
            <Disclosure key={question}>
              {({ open }) => {
                return (
                  <div className="group flex w-full flex-col border-b border-b-bookmark-neutral-100/25">
                    <Disclosure.Button
                      className={cn([
                        "flex h-[64px] items-center justify-between py-2 pt-4 text-left text-[15px] text-bookmark-neutral-200 hover:text-bookmark-primary-red lg:pb-[10px] lg:pr-6 lg:text-[18px] lg:group-[:nth-child(2)]:h-[70px] lg:group-[:nth-child(2)]:pb-[16px]",
                      ])}
                    >
                      <div>{question}</div>
                      <svg
                        className={cn([
                          "relative h-3 transition-all duration-150", //
                          open
                            ? "rotate-180 text-bookmark-primary-red"
                            : "text-bookmark-primary-blue",
                        ])}
                        viewBox="0 0 18 12"
                      >
                        <use href="/bookmark-landing-page/images/icon-arrow.svg#icon-arrow" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="mb-[28px] mt-[14px] text-[15px] leading-[30px] tracking-[.1px] text-bookmark-neutral-200/75 lg:mb-[30px] lg:mt-3 lg:text-[16px] lg:leading-[36px]">
                      {answer}
                    </Disclosure.Panel>
                  </div>
                );
              }}
            </Disclosure>
          );
        })}
      </div>
      <button className="mt-[47px] flex h-12 w-[114px] items-center justify-center rounded border-2 border-transparent bg-bookmark-primary-blue text-[15px] text-white shadow-md shadow-bookmark-primary-blue/25 hover:border-bookmark-primary-blue hover:bg-white hover:text-bookmark-primary-blue lg:mt-[53px]">
        More Info
      </button>
    </div>
  );
}

const InputSchema = z.object({
  email: z
    .string()
    .email({ message: "Whoops, make sure it's an email" })
    .min(1),
});

type InputSchema = z.infer<typeof InputSchema>;

function ContactUs() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<InputSchema>({ resolver: zodResolver(InputSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="mt-[123px] flex h-[360px] w-full flex-col items-center bg-bookmark-primary-blue px-8 pt-[74px] text-white lg:mt-[149px] lg:pt-[72px]">
      <h3 className="text-center text-[12.5px] font-medium uppercase leading-none tracking-[4.25px] lg:text-[13.25px] lg:tracking-[4.55px]">
        35,000+ already joined
      </h3>
      <h2 className="mt-3 max-w-[420px] text-center text-[24px] font-medium leading-[29px] lg:mt-[37px] lg:text-[32px] lg:leading-[40px]">
        Stay up-to-date with what we’re doing
      </h2>
      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-8 flex w-full max-w-[444px] flex-col gap-4 lg:mt-9 lg:grid lg:grid-cols-[300px_auto] [&>*]:tracking-[.25px]"
      >
        <div
          className={cn([
            "relative h-12 w-full", //
            !!errors.email &&
              "h-[70px] rounded-md bg-bookmark-primary-red lg:w-[300px]",
          ])}
        >
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email address"
            className={cn([
              "h-12 w-full rounded-md bg-white px-[20px] text-[14px] text-bookmark-neutral-200 placeholder:text-bookmark-neutral-100/50", //
              !!errors.email &&
                "border-[2px] border-bookmark-primary-red focus-visible:outline focus-visible:outline-transparent",
            ])}
          />
          {errors.email && (
            <svg
              viewBox="0 0 20 20"
              className="absolute right-4 top-[14px] w-5"
            >
              <use href="/bookmark-landing-page/images/icon-error.svg#icon-error" />
            </svg>
          )}
          {errors.email && (
            <p className="mt-[3px] px-[11px] text-[9px] font-medium italic tracking-[0.8px]">
              {errors.email.message}
            </p>
          )}
        </div>
        <button className="flex h-12 items-center justify-center rounded-md border-2 border-transparent bg-bookmark-primary-red text-[14px] font-medium text-white hover:border-bookmark-primary-red hover:bg-white hover:text-bookmark-primary-red lg:w-full">
          Contact Us
        </button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="lg: relative flex h-[334.25px] w-full flex-col items-center bg-bookmark-neutral-200 pt-[40px] text-white lg:h-[89px] lg:flex-row lg:px-[165px] lg:pt-0">
      <svg viewBox="0 0 148 25" className="h-[25px] text-white">
        <use href="/bookmark-landing-page/images/logo-bookmark.svg#logo-bookmark" />
      </svg>

      <nav className="mt-[41px] flex flex-col items-center space-y-[34px] text-[15px] uppercase leading-none tracking-[1.75px] lg:ml-[64px] lg:mt-0 lg:flex-row lg:gap-11 lg:space-y-0 lg:text-[13px] lg:tracking-[1.5px] [&>a:hover]:text-bookmark-primary-red">
        <a href="">Features</a>
        <a href="">Pricing</a>
        <a href="">Contact</a>
      </nav>

      <div className="mt-[48px] flex items-center justify-center gap-x-10 lg:ml-auto lg:mt-0">
        <a href="" className="text-white hover:text-bookmark-primary-red">
          <svg viewBox="0 0 24 24" className="w-6">
            <use href="/bookmark-landing-page/images/icon-facebook.svg#icon-facebook" />
          </svg>
        </a>
        <a href="" className="text-white hover:text-bookmark-primary-red">
          <svg viewBox="0 0 24 20" className="w-6">
            <use href="/bookmark-landing-page/images/icon-twitter.svg#icon-twitter" />
          </svg>
        </a>
      </div>

      <p className="absolute bottom-3 w-full text-center text-[11px] lg:bottom-2 lg:right-[165px] lg:w-fit [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
    </footer>
  );
}

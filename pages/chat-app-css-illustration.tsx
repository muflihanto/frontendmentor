import { animate, stagger } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { type CSSProperties, type PropsWithChildren, useEffect } from "react";
import {
  BsChevronCompactLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { rubik } from "../utils/fonts/rubik";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ChatAppCssIllustration() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <Head>
        <title>Frontend Mentor | Chat app CSS illustration</title>
      </Head>
      <div
        className={`App relative min-h-full bg-chat-app-secondary-200/50 font-rubik max-lg:h-[936px] ${rubik.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/chat-app-css-illustration/design" /> */}
      </div>
    </div>
  );
}

function Main() {
  useEffect(() => {
    void animate([
      ["div.chat", { scale: [0, 1] }, { delay: stagger(2), duration: 0.3 }],
      ["div.radio", { scale: [0, 1] }, { delay: 2 }],
    ]);
  }, []);
  return (
    <main
      className="relative z-10 flex w-full flex-col items-center lg:h-[100dvh] lg:min-h-[540px] lg:flex-row lg:justify-center lg:gap-[124px] lg:pl-[100px]"
      aria-labelledby="main-heading"
    >
      <div
        className="absolute -left-[calc((2*var(--width))-50vw)] top-0 -z-10 h-[510px] w-[calc(2*var(--width))] rounded-b-full bg-gradient-to-b from-chat-app-primary-gradients-magenta from-[-70%] to-chat-app-primary-gradients-violet lg:left-[-90px] lg:h-[calc(700/800*100vh)] lg:w-[510px] lg:rounded-b-[255px] lg:bg-[linear-gradient(200deg,var(--tw-gradient-stops))] lg:from-[-40%]"
        style={
          {
            "--width": "260px",
          } as CSSProperties
        }
      />
      <div className="my-[64px] flex h-[505px] items-center justify-center lg:my-0">
        <div className="h-full w-[247px] overflow-hidden rounded-[30px] bg-chat-app-secondary-100 p-[10px] pt-[11px] shadow-2xl">
          <div className="grid h-full w-full grid-rows-[66px_auto] overflow-hidden rounded-[20px] bg-chat-app-secondary-200">
            <div className="relative flex h-full w-full items-center rounded-b-md bg-gradient-to-l from-chat-app-primary-gradients-magenta to-chat-app-primary-gradients-violet px-3 py-[8px] pt-[25px] shadow-lg before:absolute before:left-1/2 before:top-0 before:z-10 before:h-[18px] before:w-[130px] before:-translate-x-1/2 before:rounded-b-[14px] before:bg-chat-app-secondary-100">
              <BsChevronCompactLeft className="stroke-2 text-[11px] text-chat-app-secondary-100" />
              <div className="relative ml-1 aspect-square w-6 overflow-hidden rounded-full border border-chat-app-secondary-100">
                <Image
                  src="/chat-app-css-illustration/images/avatar.jpg"
                  alt="Samuel Green Avatar"
                  fill
                />
              </div>
              <div className="ml-2 mt-[1px] flex flex-col gap-[3.5px] text-chat-app-secondary-100">
                <h2 className="text-[11px] font-medium leading-none">
                  Samuel Green
                </h2>
                <p className="text-[8px] leading-none text-chat-app-primary-text-subhead">
                  Available to Walk
                </p>
              </div>
              <BsThreeDotsVertical className="ml-auto stroke-1 text-[11px] text-chat-app-secondary-100" />
            </div>
            <div className="flex h-full flex-col justify-end px-[7px] py-[11px]">
              <ChatGroup>
                <ChatLeft>That sounds great. I’d be happy with that.</ChatLeft>
                <ChatLeft>
                  Could you send over some pictures of your dog, please?
                </ChatLeft>
              </ChatGroup>
              <ChatGroup variant="right">
                <ChatImages
                  images={[
                    "/chat-app-css-illustration/images/dog-image-1.jpg",
                    "/chat-app-css-illustration/images/dog-image-2.jpg",
                    "/chat-app-css-illustration/images/dog-image-3.jpg",
                  ]}
                />
                <ChatRight>
                  Here are a few pictures. She’s a happy girl!
                </ChatRight>
                <ChatRight>Can you make it?</ChatRight>
              </ChatGroup>
              <ChatGroup>
                <ChatLeft>
                  She looks so happy! The time we discussed works. How long
                  shall I take her out for?
                </ChatLeft>
                <RadioChat description="30 minute walk" price={29} />
                <RadioChat description="1 hour walk" price={49} />
              </ChatGroup>
              <div className="flex h-[34px] w-full items-center justify-between rounded-full bg-chat-app-secondary-100 pl-[17px] pr-1">
                <p className="mt-1 text-[9px] leading-none text-chat-app-primary-text-placeholder">
                  Type a message…
                </p>
                <div className="flex aspect-square w-6 items-center justify-center overflow-hidden rounded-full bg-chat-app-primary-text-mainhead">
                  <BsChevronRight className="stroke-2 text-[11px] text-chat-app-secondary-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-9 lg:w-[442px] lg:items-start lg:px-0">
        <h1
          className="text-center text-[40px] font-medium leading-[46px] text-chat-app-primary-text-mainhead lg:text-left"
          id="main-heading"
        >
          Simple booking
        </h1>
        <p className="mt-6 text-center leading-[28px] text-chat-app-primary-text-paragraph max-lg:max-w-screen-sm lg:text-left">
          Stay in touch with our dog walkers through the chat interface. This
          makes it easy to discuss arrangements and make bookings. Once the walk
          has been completed you can rate your walker and book again all through
          the chat.
        </p>
      </div>
    </main>
  );
}

function ChatImages({ images }: { images: string[] }) {
  return (
    <div className="chat mb-2 grid w-auto max-w-[136px] grid-cols-3 gap-2 self-end">
      {images.map((image, index) => {
        return (
          <div
            className="relative aspect-square w-[40px] overflow-hidden rounded-[10px]"
            key={`${index}-${image}`}
          >
            <Image
              fill
              className="object-contain"
              src={image}
              alt={`Dog Image ${index + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
}

function ChatGroup({
  variant,
  children,
}: PropsWithChildren<{ variant?: "left" | "right" }>) {
  return (
    <div
      className={`mb-2 flex flex-col ${
        variant === "right"
          ? "items-end self-end [&>div]:origin-top-right"
          : "items-start self-start [&>div]:origin-top-left"
      }`}
    >
      {children}
    </div>
  );
}

function RadioChat({
  className,
  price,
  description,
}: {
  className?: string;
  price: number;
  description: string;
}) {
  return (
    <div
      className={twMerge(
        "radio mb-[8px] flex h-[32px] w-[160px] items-center self-start rounded-[10px] rounded-bl-[4px] bg-gradient-to-r from-chat-app-primary-gradients-magenta to-chat-app-primary-gradients-violet px-[8px] py-[6px] pr-4 text-[8px] leading-[11px] text-chat-app-primary-text-chatleft",
        className,
      )}
    >
      <div className="aspect-square w-3 rounded-full border border-chat-app-secondary-200/20" />
      <p className="ml-2 text-chat-app-secondary-100/75">{description}</p>
      <p className="ml-auto pt-[1px] text-[12px] font-bold text-chat-app-secondary-100">
        ${price}
      </p>
    </div>
  );
}

function ChatLeft({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={twMerge(
        "chat mb-[8px] h-auto w-fit max-w-[128px] self-start rounded-[10px] rounded-bl-[4px] bg-chat-app-primary-text-chatright/[8%] px-[8px] py-[6px] text-[8px] leading-[11px] text-chat-app-primary-text-chatleft",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ChatRight({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={twMerge(
        "chat mb-[8px] h-auto w-auto max-w-[128px] self-end rounded-[10px] rounded-br-[4px] bg-chat-app-secondary-100 px-[8px] py-[6px] text-[8px] leading-[11px] text-chat-app-primary-text-chatright shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-chat-app-primary-text-mainhead [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

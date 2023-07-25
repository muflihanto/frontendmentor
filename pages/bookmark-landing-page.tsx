import Head from "next/head";
import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });
import { ComponentProps, PropsWithChildren, useState } from "react";
import { cn } from "../utils/cn";
import { Disclosure } from "@headlessui/react";

export default function BookmarkLandingPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Bookmark landing page</title>
      </Head>
      <div className="App relative min-h-[100svh]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/bookmark-landing-page/design"
          // absolutePath="/bookmark-landing-page/design/mobile-active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function TabButton({ active, children, ...props }: PropsWithChildren<{ active: boolean } & ComponentProps<"button">>) {
  return (
    <button
      className={cn([
        "h-[58px] w-full text-[17px]", //
        active && "text-bookmark-neutral-200 before:bg-bookmark-primary-red relative before:absolute before:bottom-0 before:left-1/2 before:h-1 before:w-[143px] before:-translate-x-1/2",
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

function FeatureIllustration({ variant, ...props }: ComponentProps<"svg"> & { variant: number }) {
  const svgProps: { className: ComponentProps<"svg">["className"] }[] = [{ className: "aspect-[536/346]" }, { className: "aspect-[478/346]" }, { className: "aspect-[440/380]" }];

  return (
    <div
      className={cn([
        "relative w-full", //
        // props.className,
        svgProps[variant].className,
      ])}
    >
      <Image
        src={`/bookmark-landing-page/images/illustration-features-tab-${variant + 1}.svg`}
        alt={`Illustration Features Tab ${variant + 1}`}
        fill
        className="object-contain"
      />
    </div>
  );

  // return <svg viewBox={svgProps[variant].viewBox} className={cn([props.className],svgProps[variant].className)} {...props}>
  //   <use href={`/bookmark-landing-page/images/illustration-features-tab-${variant+1}.svg#illustration-features-${variant+1}`} />
  // </svg>
}

function Feature() {
  const [tab, setTab] = useState(0);
  const features = [
    {
      name: "Simple Bookmarking",
      title: "Bookmark in one click",
      description: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
    },
    {
      name: "Speedy Searching",
      title: "Intelligent search",
      description: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
    },
    {
      name: "Easy Sharing",
      title: "Share your bookmarks",
      description: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
    },
  ];

  return (
    <div className="mt-[150px]">
      <div className="flex flex-col items-center px-8">
        <h2 className="text-bookmark-neutral-200 text-[24px] font-medium leading-[32px]">Features</h2>
        <p className="text-bookmark-neutral-100 mt-[10px] text-center text-[15px] leading-[25px]">Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go.</p>

        <div className="text-bookmark-neutral-100 mt-[39px] flex w-full flex-col items-center divide-y border-y">
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

      <div>
        <div className="relative mt-[35px] w-full py-[37px]">
          <div className="relative z-10 w-full px-8">
            <FeatureIllustration variant={tab} />
          </div>
          <div className="bg-bookmark-primary-blue lfeft-0 absolute bottom-0 z-0 h-[203px] w-[308px] rounded-r-full" />
        </div>

        <div className="mt-[42px] flex flex-col items-center">
          <h3 className="text-bookmark-neutral-200 text-[24px] font-medium leading-[32px]">{features[tab].title}</h3>
          <p className="text-bookmark-neutral-100 mt-[11px] px-8 text-center text-[15px] leading-[25px]">{features[tab].description}</p>
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

function DownloadCard({ data }: { data: Browser }) {
  return (
    <div className="shadow-bookmark-neutral-100/20 flex h-[370px] w-[280px] flex-col items-center pt-12 shadow-lg">
      <div className={`relative h-[100px] ${data.image.size}`}>
        <Image
          src={data.image.src}
          alt={data.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-bookmark-neutral-200 mt-7 text-[20px] font-medium leading-[32px] tracking-[.25px]">Add to {data.name}</h3>
      <p className="text-bookmark-neutral-100 mt-[4px] text-center text-[15px] leading-[25px]">Minimum version {data.minimum}</p>

      <Image
        src="/bookmark-landing-page/images/bg-dots.svg"
        width={280}
        height={4}
        className="mt-[33px]"
        alt="dots"
      />

      <button className="bg-bookmark-primary-blue shadow-bookmark-primary-blue/25 mt-[24.25px] flex h-12 w-[calc(280px-48px)] items-center justify-center rounded text-[15px] text-white shadow-md">Add & Install Extension</button>
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
    <div className="mt-[149px] flex flex-col items-center px-8">
      <h2 className="text-bookmark-neutral-200 text-[24px] font-medium leading-[32px]">Download the extension</h2>
      <p className="text-bookmark-neutral-100 mt-[10px] text-center text-[15px] leading-[25px]">We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize.</p>
      <div className="mt-[41px] space-y-[41px]">
        {browsers.map((browser) => {
          return (
            <DownloadCard
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
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.",
    },
    {
      question: "How can I request a new browser?",
      answer: "Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.",
    },
    {
      question: "Is there a mobile app?",
      answer: "Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.",
    },
    {
      question: "What about other Chromium browsers?",
      answer: "Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.",
    },
  ];

  return (
    <div className="mt-[141px] flex flex-col items-center px-8">
      <h2 className="text-bookmark-neutral-200 text-center text-[24px] font-medium leading-[30px]">Frequently Asked Questions</h2>
      <p className="text-bookmark-neutral-100 mt-[16px] text-center text-[15px] leading-[25px]">Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us.</p>
      <div className="mt-[43px] flex w-full flex-col ">
        {faqs.map(({ question, answer }, index) => {
          return (
            <Disclosure key={question}>
              {({ open }) => {
                return (
                  <div className="border-b-bookmark-neutral-100/25 flex w-full flex-col border-b">
                    <Disclosure.Button className={cn(["text-bookmark-neutral-200 flex h-[64px] items-center justify-between py-2 pt-4 text-left text-[15px]"])}>
                      <div>{question}</div>
                      <svg
                        className={cn([
                          "relative h-3 transition-all duration-150", //
                          open ? "text-bookmark-primary-red rotate-180" : "text-bookmark-primary-blue",
                        ])}
                        viewBox="0 0 18 12"
                      >
                        <use href="/bookmark-landing-page/images/icon-arrow.svg#icon-arrow" />
                        {/* #5267DF */}
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-bookmark-neutral-100 mb-[28px] mt-[14px] text-[15px] leading-[30px] tracking-[.1px]">{answer}</Disclosure.Panel>
                  </div>
                );
              }}
            </Disclosure>
          );
        })}
      </div>
      <button className="bg-bookmark-primary-blue shadow-bookmark-primary-blue/25 mt-[47px] flex h-12 w-[114px] items-center justify-center rounded text-[15px] text-white shadow-md">More Info</button>
    </div>
  );
}

function Main() {
  return (
    <div className="font-rubiks pb-16">
      <header className="flex h-[105px] w-full items-center justify-between px-8">
        <svg
          viewBox="0 0 148 25"
          className="text-bookmark-neutral-200 h-[25px]"
        >
          <use href="/bookmark-landing-page/images/logo-bookmark.svg#logo-bookmark" />
        </svg>
        <button className="flex aspect-square h-[18px] items-center justify-center">
          <svg
            viewBox="0 0 18 15"
            className="h-[15px]"
          >
            <use href="/bookmark-landing-page/images/icon-hamburger.svg#icon-hamburger" />
          </svg>
        </button>
      </header>

      <div className="relative mt-[27px] flex h-[268px] items-center justify-center pb-[1px]">
        <div className="relative z-10 aspect-[657/466] h-auto w-[353px]">
          <Image
            fill
            src="/bookmark-landing-page/images/illustration-hero.svg"
            alt="Bookmark Illustration"
            className="object-contain"
          />
        </div>
        <div className="bg-bookmark-primary-blue absolute bottom-0 right-0 z-0 h-[203px] w-[305px] rounded-l-full" />
      </div>

      <div className="mt-12 flex flex-col items-center px-8">
        <h1 className="text-bookmark-neutral-200 text-center text-[30px] font-medium leading-[40px]">A Simple Bookmark Manager</h1>
        <p className="text-bookmark-neutral-100 mt-[16px] text-center text-[15px] leading-[25px]">A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.</p>
        <div className="mt-[32px] flex h-12 w-full items-center justify-between gap-4">
          <button className="bg-bookmark-primary-blue shadow-bookmark-primary-blue/25 flex h-full w-full items-center justify-center rounded text-[15px] text-white shadow-md">Get it on Chrome</button>
          <button className="bg-bookmark-neutral-100/10 text-bookmark-neutral-200 shadow-bookmark-neutral-100/25 flex h-full w-full items-center justify-center rounded text-[15px] shadow-md">Get it on Firefox</button>
        </div>
      </div>

      <Feature />
      <DownloadExtension />
      <FAQ />

      {/* {`
         Features
         Pricing
         Contact
         Login

       
       
         <!-- Question 1 -->
         What is Bookmark?
       
         <!-- Answer 1 -->
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt 
         justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.
       
         <!-- Question 2 -->
         How can I request a new browser?
       
         <!-- Answer 2 -->
         Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. 
         Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, 
         ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. 
         Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.
       
         <!-- Question 3 -->
         Is there a mobile app?
       
         <!-- Answer 3 -->
         Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum 
         urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed 
         sollicitudin ex et ultricies bibendum.
       
         <!-- Question 4 -->
         What about other Chromium browsers?
       
         <!-- Answer 4 -->
         Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam 
         vitae neque eget nisl gravida pellentesque non ut velit.
       
         More Info
       
         35,000+ already joined
       
         Stay up-to-date with what we’re doing
       
         Contact Us
       
         Features
         Pricing
         Contact
      `} */}
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

import { log } from "console";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
const DesignSlider = dynamic(() => import("../components/Slider"), { ssr: false });

const CodingBootcamp = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Coding Bootcamp Testimonials Slider</title>
      </Head>
      <div className="App font-inter relative min-h-screen bg-[url('/coding-bootcamp-testimonials-slider/images/pattern-bg.svg')] bg-[length:calc(375px-48px),auto] bg-[center_top_24px] bg-no-repeat lg:bg-[length:auto,660px] lg:bg-[right_73px_top_calc(50%-22px)]">
        <Main />
        <Footer />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 610 154"
          className="absolute bottom-0 w-[75%] lg:w-[610px]"
        >
          <path
            fill="#F4F4FC"
            fillRule="evenodd"
            d="M610 154C469.493 123.42 358.432 86.087 276.818 42S102.93-11.42 0 14v140h610z"
          />
        </svg>
        {/* <DesignSlider
          basePath="/coding-bootcamp-testimonials-slider/design/"
          absolutePath="/coding-bootcamp-testimonials-slider/design/desktop-design-slide-1.jpg"
        /> */}
      </div>
    </>
  );
};

export default CodingBootcamp;

function Footer() {
  return (
    <div className="absolute bottom-2 z-10 mx-auto w-full text-center text-[11px] lg:bottom-4 lg:text-[13px] [&_a]:font-bold [&_a]:text-[#4A3FDB] [&_a]:underline [&_a]:decoration-[#D3629D] [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="lg:hover:decoration-[1.5px]"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
        className="lg:hover:decoration-[1.5px]"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-[253px] overflow-hidden rounded-sm shadow-[0px_40px_50px_-30px_hsla(240,38%,20%,.4),0px_0px_15px_hsla(240,38%,20%,.05)] lg:w-[540px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  );
}

const data = [
  {
    img: {
      src: "/coding-bootcamp-testimonials-slider/images/image-tanya.jpg",
      alt: "Tanya's Avatar",
    },
    testimony: "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    name: "Tanya Sinclair",
    occupation: "UX Engineer",
  },
  {
    img: {
      src: "/coding-bootcamp-testimonials-slider/images/image-john.jpg",
      alt: "John's Avatar",
    },
    testimony: "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”",
    name: "John Tarkpor",
    occupation: "Junior Front-end Developer",
  },
];

function Testimony({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="text-coding-primary-200 mx-auto mt-[17px] flex flex-col bg-[url('/coding-bootcamp-testimonials-slider/images/pattern-quotes.svg')] bg-[length:60px,50px] bg-[center_top_0px] bg-no-repeat px-[28px] pt-[25px] lg:z-10 lg:my-0 lg:ml-[0px] lg:mr-[-75px] lg:w-[632px] lg:bg-[length:120px,100px] lg:bg-[left_95px_top_0px] lg:px-0 lg:pt-[65px] lg:pb-[44px] [&_*]:text-center lg:[&_*]:text-left">
      <p className="text-[18px] font-light leading-[24px] lg:text-[32px] lg:leading-[44px]">{data[activeIndex].testimony}</p>
      <div className="mt-[19px] lg:mt-[36px] lg:flex lg:items-center lg:gap-[8px]">
        <p className="text-[15px] font-bold leading-[18px] lg:mt-0 lg:text-[20px] lg:leading-normal lg:tracking-[0.2px]">{data[activeIndex].name}</p>
        <p className="text-coding-primary-100 text-[15px] font-medium lg:text-[20px]">{data[activeIndex].occupation}</p>
      </div>
    </div>
  );
}

function Main() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = () => {
    setActiveIndex((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (["arrowleft", "arrowright"].includes(e.key.toLowerCase())) {
        slide();
      }
    };

    document.body.addEventListener("keydown", listener);

    return () => {
      document.body.removeEventListener("keydown", listener);
    };
  }, []);

  function SliderButton() {
    return (
      <div className="relative top-[-20px] flex h-[40px] w-[80px] items-center justify-around rounded-full bg-white lg:left-[60px] lg:top-[-28px] lg:h-[56px] lg:w-[112px]">
        <button
          onClick={() => {
            slide();
          }}
          className="group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 18"
            className="h-[14px] stroke-[#8585AC] stroke-[3px] group-hover:stroke-[#4A3FDB] lg:stroke-[4px]"
          >
            <path
              fill="none"
              d="M11 1L3 9l8 8"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            slide();
          }}
          className="group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 18"
            className="h-[14px] stroke-[#8585AC] stroke-[3px] group-hover:stroke-[#4A3FDB] lg:stroke-[4px]"
          >
            <path
              fill="none"
              d="M2 1l8 8-8 8"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center pt-[54px] lg:flex-row-reverse lg:justify-between lg:px-[165px] lg:pt-[113px]">
      <div className="flex flex-col max-md:items-center">
        <Avatar
          src={data[activeIndex].img.src}
          alt={data[activeIndex].img.alt}
        />
        <SliderButton />
      </div>
      <Testimony activeIndex={activeIndex} />
    </div>
  );
}
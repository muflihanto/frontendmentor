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
      <div className="App font-inter">
        <Main />
        <Footer />
        <DesignSlider
          basePath="/coding-bootcamp-testimonials-slider/design/"
          absolutePath="/coding-bootcamp-testimonials-slider/design/mobile-design-slide-1.jpg"
        />
      </div>
    </>
  );
};

export default CodingBootcamp;

function Footer() {
  return (
    <div className="text-center text-[11px] [&_a]:text-[hsl(228,45%,55%)]">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-[252px] lg:w-[540px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain shadow-[0px_40px_30px_-10px_rgba(0,0,0,.2)]"
      />
    </div>
  );
}

const data = [
  {
    img: {
      src: "/coding-bootcamp-testimonials-slider/images/image-tanya.jpg",
      alt: "Tanya Avatar",
    },
    testimony: "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    name: "Tanya's Sinclair",
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
    <div className="flex flex-col [&_*]:text-center">
      <p>{data[activeIndex].testimony}</p>
      <p className="font-bold">{data[activeIndex].name}</p>
      <p className="font-light">{data[activeIndex].occupation}</p>
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

  return (
    <div className="flex flex-col items-center justify-start">
      <Avatar
        src={data[activeIndex].img.src}
        alt={data[activeIndex].img.alt}
      />
      <button className="relative top-[-20px] flex h-[40px] w-[80px] items-center justify-around rounded-full bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 18"
          className="h-[14px]"
          onClick={() => {
            slide();
          }}
        >
          <path
            fill="none"
            stroke="#8585AC"
            strokeWidth="3"
            d="M11 1L3 9l8 8"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 18"
          className="h-[14px]"
          onClick={() => {
            slide();
          }}
        >
          <path
            fill="none"
            stroke="#8585AC"
            strokeWidth="3"
            d="M2 1l8 8-8 8"
          />
        </svg>
      </button>
      <Testimony activeIndex={activeIndex} />
    </div>
  );
}

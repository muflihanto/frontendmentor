import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { useEffectOnce, useInterval, useWindowSize } from "usehooks-ts";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function LaunchCountdownTimer() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Launch countdown timer</title>
      </Head>
      <div className="App [&_*]:font-red-hat-text bg-countdown-neutral-300 relative flex min-h-[100dvh] flex-col items-center justify-center bg-[url('/launch-countdown-timer/images/pattern-hills.svg'),url('/launch-countdown-timer/images/bg-stars.svg'),linear-gradient(rgb(30,31,41),#241c2b_calc(100vh-130px),#2F2439_calc(100vh-130px),#2F2439_100%)] bg-[length:920px_auto,auto_auto,100%_100%] bg-[position:bottom_43px_right_-67.5px,top_center,center] bg-no-repeat md:bg-[url('/launch-countdown-timer/images/pattern-hills.svg'),url('/launch-countdown-timer/images/bg-stars.svg'),linear-gradient(rgb(30,31,41),#241c2b_calc(100vh-90px),#2F2439_calc(100vh-90px),#2F2439_100%)] md:bg-[length:100vw_auto,auto_auto,100%_100%] md:bg-[position:bottom_center,top_3px_center,center]">
        <Main />
        <SocialIcons />
        <Footer />
        {/* <Slider basePath="/launch-countdown-timer/design" /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="text-countdown-neutral-100 flex h-full w-full flex-col items-center justify-center pb-[193px] md:pb-[210px]">
      <h1 className="px-8 text-center text-[18px] font-bold uppercase leading-[24px] tracking-[6.2px] md:text-[22px] md:tracking-[7.5px]">We&lsquo;re launching soon</h1>
      <CountdownTimer />
    </div>
  );
}

function FlipCard({ value, maxValue, duration = 1000 }: { value: number; maxValue: number; duration?: number }) {
  const [ref, flip] = useAnimate();
  const [init, setInit] = useState(true);

  useEffectOnce(() => {
    const timeout = setTimeout(() => {
      setInit(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(() => {
    flip(".top-flip", { rotateX: ["0deg", "90deg"] }, { ease: "easeIn", duration: duration / 2000 });
    flip(".bottom-flip", { rotateX: ["-90deg", "0deg"] }, { ease: "easeOut", duration: duration / 2000, delay: duration / 2000 });
  }, [duration, flip, value]);

  return (
    <>
      <div
        className="flip-card bg-countdown-neutral-200 text-countdown-primary-red relative flex flex-col items-center justify-center rounded text-[32px] font-bold tracking-tight md:rounded-lg md:text-[78px]"
        ref={ref}
      >
        <div className="top">{init ? (value < 10 ? `0${value}` : value) : value < 10 ? `0${value}` : value}</div>
        <div className="bottom">{init ? "--" : value + 1 < 10 ? `0${value + 1}` : value + 1 > maxValue ? `00` : value + 1}</div>
        <div className="top-flip">{init ? "--" : value + 1 < 10 ? `0${value + 1}` : value + 1 > maxValue ? `00` : value + 1}</div>
        <div className="bottom-flip">{init ? (value < 10 ? `0${value}` : value) : value < 10 ? `0${value}` : value}</div>
      </div>

      <style jsx>{`
        .flip-card {
          overflow: hidden;
          filter: drop-shadow(0px 5px 0.1px hsl(234, 17%, 12%));
        }

        .flip-card::before,
        .flip-card::after,
        .top::before {
          position: absolute;
          content: "";
        }

        .flip-card::before,
        .flip-card::after {
          --dot-radius: 6px;
          top: 50%;
          width: var(--dot-radius);
          height: var(--dot-radius);
          border-radius: var(--dot-radius);
          background-color: hsl(235, 16%, 14%);
          z-index: 30;
        }

        .flip-card::before {
          left: 0;
          transform: translate(-50%, -50%);
        }

        .flip-card::after {
          right: 0;
          transform: translate(50%, -50%);
        }

        @media (min-width: 768px) {
          .flip-card {
            filter: drop-shadow(0px 8px 0.1px hsl(234, 17%, 12%));
          }
          .flip-card::before,
          .flip-card::after {
            --dot-radius: 12px;
          }
        }

        .top,
        .bottom,
        .top-flip,
        .bottom-flip {
          position: absolute;
          width: 100%;
          line-height: var(--card-height);
          overflow: hidden;
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .top::before {
          width: 100%;
          height: 50%;
          left: 0;
          top: 0;
          z-index: 20;
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.2));
        }

        .top-flip {
          bottom: 0;
          height: 100%;
          z-index: 10;
          background-color: hsl(236, 21%, 26%);
          justify-content: flex-start;
        }

        .bottom,
        .bottom-flip {
          bottom: 0;
          height: 50%;
          z-index: 20;
          background-color: hsl(236, 21%, 26%);
          justify-content: flex-end;
          transform-origin: top center;
        }
      `}</style>
    </>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState(9 * 24 * 60 * 60);
  const [duration] = useState(1000);
  const { width } = useWindowSize();

  const handleTime = () => {
    if (time > 0) {
      setTime((t) => t - 1);
    }
  };

  const timeUnits = useMemo(() => {
    return {
      seconds: time % 60,
      minutes: Math.floor(time / 60) % 60,
      hours: Math.floor(time / 3600) % 24,
      days: Math.floor(time / (3600 * 24)),
    };
  }, [time]);

  useInterval(handleTime, duration);

  return (
    <>
      <div
        className="mt-14 grid w-full grid-cols-[repeat(4,70px)] grid-rows-[var(--card-height),auto] justify-center gap-x-[16px] gap-y-3 md:mt-[106px] md:grid-cols-[repeat(4,147px)] md:gap-x-[33px] md:gap-y-[24px]"
        style={
          {
            "--card-height": width < 768 ? "66px" : "140px",
          } as CSSProperties
        }
      >
        <FlipCard
          value={timeUnits.days}
          duration={duration}
          maxValue={0}
        />
        <FlipCard
          value={timeUnits.hours}
          duration={duration}
          maxValue={23}
        />
        <FlipCard
          value={timeUnits.minutes}
          duration={duration}
          maxValue={59}
        />
        <FlipCard
          value={timeUnits.seconds}
          duration={duration}
          maxValue={59}
        />
        <div className="text-countdown-primary-blue text-center text-[8px] font-bold uppercase tracking-[2.2px] md:text-[14px] md:tracking-[6px]">Days</div>
        <div className="text-countdown-primary-blue text-center text-[8px] font-bold uppercase tracking-[2.2px] md:text-[14px] md:tracking-[6px]">Hours</div>
        <div className="text-countdown-primary-blue text-center text-[8px] font-bold uppercase tracking-[2.2px] md:text-[14px] md:tracking-[6px]">Minutes</div>
        <div className="text-countdown-primary-blue text-center text-[8px] font-bold uppercase tracking-[2.2px] md:text-[14px] md:tracking-[6px]">Seconds</div>
      </div>

      <style jsx>{`
        .flip-card {
          overflow: hidden;
          filter: drop-shadow(0px 5px 0.1px hsl(234, 17%, 12%));
        }

        .flip-card::before,
        .flip-card::after,
        .top::before {
          position: absolute;
          content: "";
        }

        .flip-card::before,
        .flip-card::after {
          --dot-radius: 6px;
          top: 50%;
          width: var(--dot-radius);
          height: var(--dot-radius);
          border-radius: var(--dot-radius);
          background-color: hsl(235, 16%, 14%);
          z-index: 30;
        }

        .flip-card::before {
          left: 0;
          transform: translate(-50%, -50%);
        }

        .flip-card::after {
          right: 0;
          transform: translate(50%, -50%);
        }

        .top,
        .bottom {
          position: absolute;
          width: 100%;
          line-height: var(--card-height);
          overflow: hidden;
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .top::before {
          width: 100%;
          height: 50%;
          left: 0;
          top: 0;
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.2));
        }

        .bottom {
          bottom: 0;
          height: 50%;
          z-index: 20;
          background-color: hsl(236, 21%, 26%);
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}

function SocialIcons() {
  return (
    <nav className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-8 md:bottom-[72px]">
      <ul>
        <li className="group">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="group-hover:fill-countdown-primary-red h-6 w-6 fill-[#8385A9]"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
        </li>
      </ul>
      <ul>
        <li className="group">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="group-hover:fill-countdown-primary-red h-6 w-6 fill-[#8385A9]"
            >
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
          </a>
        </li>
      </ul>
      <ul>
        <li className="group">
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="group-hover:fill-countdown-primary-red h-6 w-6 fill-[#8385A9]"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-countdown-primary-blue absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold">
      Challenge by{" "}
      <a
        className="hover:text-countdown-primary-red"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className="hover:text-countdown-primary-red"
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

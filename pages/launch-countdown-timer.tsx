import Head from "next/head";
// import Image from "next/image";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { useAnimate } from "framer-motion";
import { useEffectOnce, useInterval, useWindowSize } from "usehooks-ts";
import { redHatText } from "../utils/fonts/redHatText";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function LaunchCountdownTimer() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Launch countdown timer</title>
      </Head>
      <div
        className={`App relative flex min-h-[100dvh] flex-col items-center justify-center bg-countdown-neutral-300 bg-[url('/launch-countdown-timer/images/pattern-hills.svg'),url('/launch-countdown-timer/images/bg-stars.svg'),linear-gradient(rgb(30,31,41),#241c2b_calc(100vh-130px),#2F2439_calc(100vh-130px),#2F2439_100%)] bg-[length:920px_auto,auto_auto,100%_100%] bg-[position:bottom_43px_right_-67.5px,top_center,center] bg-no-repeat font-red-hat-text md:bg-[url('/launch-countdown-timer/images/pattern-hills.svg'),url('/launch-countdown-timer/images/bg-stars.svg'),linear-gradient(rgb(30,31,41),#241c2b_calc(100vh-90px),#2F2439_calc(100vh-90px),#2F2439_100%)] md:bg-[length:100vw_auto,auto_auto,100%_100%] md:bg-[position:bottom_center,top_3px_center,center] ${redHatText.variable}`}
      >
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
    <div className="flex h-full w-full flex-col items-center justify-center pb-[193px] text-countdown-neutral-100 md:pb-[210px]">
      <h1
        id="countdown-title"
        className="px-8 text-center text-[18px] font-bold uppercase leading-[24px] tracking-[6.2px] md:text-[22px] md:tracking-[7.5px]"
      >
        We&lsquo;re launching soon
      </h1>
      <CountdownTimer />
    </div>
  );
}

function FlipCard({
  value,
  maxValue = Number.POSITIVE_INFINITY,
  duration = 1000,
  label,
}: {
  value: number;
  maxValue?: number;
  duration?: number;
  label: string;
}) {
  const [ref, flip] = useAnimate();
  const [init, setInit] = useState(true);

  const digit = useMemo(() => {
    const val1 = `${value}`.padStart(2, "0");
    const val2 = init
      ? "--"
      : value + 1 > maxValue
        ? "00"
        : `${value + 1}`.padStart(2, "0");
    return [val1, val2];
  }, [value, init, maxValue]);

  useEffectOnce(() => {
    const timeout = setTimeout(() => {
      setInit(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    void flip(
      ".top-flip",
      { rotateX: ["0deg", "90deg"] },
      { ease: "easeIn", duration: duration / 2000 },
    );
    void flip(
      ".bottom-flip",
      { rotateX: ["-90deg", "0deg"] },
      { ease: "easeOut", duration: duration / 2000, delay: duration / 2000 },
    );
  }, [duration, flip, value]);

  return (
    <>
      <div
        className="flip-card relative flex flex-col items-center justify-center rounded bg-countdown-neutral-200 text-[32px] font-bold tracking-tight text-countdown-primary-red md:rounded-lg md:text-[78px]"
        aria-live="polite"
        aria-label={`${value} ${label}`}
        id={label}
        ref={ref}
      >
        <div aria-hidden="true" className="top">
          {digit[0]}
        </div>
        <div aria-hidden="true" className="bottom">
          {digit[1]}
        </div>
        <div aria-hidden="true" className="top-flip">
          {digit[1]}
        </div>
        <div aria-hidden="true" className="bottom-flip">
          {digit[0]}
        </div>
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

        .top-flip,
        .bottom {
          will-change: transform;
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
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.2)
          );
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
  const [time, setTime] = useState(14 * 24 * 60 * 60);
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
        role="timer"
        aria-live="assertive"
        aria-labelledby="countdown-title"
        aria-describedby="days hours minutes seconds"
      >
        <FlipCard label="days" value={timeUnits.days} duration={duration} />
        <FlipCard
          label="hours"
          value={timeUnits.hours}
          duration={duration}
          maxValue={23}
        />
        <FlipCard
          label="minutes"
          value={timeUnits.minutes}
          duration={duration}
          maxValue={59}
        />
        <FlipCard
          label="seconds"
          value={timeUnits.seconds}
          duration={duration}
          maxValue={59}
        />
        <div
          aria-hidden="true"
          className="text-center text-[8px] font-bold uppercase tracking-[2.2px] text-countdown-primary-blue md:text-[14px] md:tracking-[6px]"
        >
          Days
        </div>
        <div
          aria-hidden="true"
          className="text-center text-[8px] font-bold uppercase tracking-[2.2px] text-countdown-primary-blue md:text-[14px] md:tracking-[6px]"
        >
          Hours
        </div>
        <div
          aria-hidden="true"
          className="text-center text-[8px] font-bold uppercase tracking-[2.2px] text-countdown-primary-blue md:text-[14px] md:tracking-[6px]"
        >
          Minutes
        </div>
        <div
          aria-hidden="true"
          className="text-center text-[8px] font-bold uppercase tracking-[2.2px] text-countdown-primary-blue md:text-[14px] md:tracking-[6px]"
        >
          Seconds
        </div>
      </div>
    </>
  );
}

function SocialIcons() {
  return (
    <nav>
      <ul className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-8 md:bottom-[72px]">
        {["facebook", "pinterest", "instagram"].map((el) => {
          return (
            <li className="group" key={el}>
              <a href="">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-[#8385A9] group-hover:fill-countdown-primary-red"
                  role="graphics-symbol"
                  aria-label={el}
                >
                  <use
                    href={`/launch-countdown-timer/images/icon-${el}.svg#icon-${el}`}
                  />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-countdown-primary-blue [&_a]:font-bold">
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

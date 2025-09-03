// import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import _data from "../../components/space-tourism-website/data.json";
import { getLayout } from "../../components/space-tourism-website/Layout";
import { cn } from "../../utils/cn";

// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });
const data = _data.crew;

export default function Crew() {
  const [crewIndex, setCrewIndex] = useState<number>(0);
  const crew = data[crewIndex];

  return (
    <>
      <Head>
        <title>Space Tourism Website | Crew</title>
      </Head>

      <main
        className="flex min-h-[710px] flex-col items-center bg-[url('/space-tourism-website/assets/crew/background-crew-mobile.jpg')] bg-[length:100vw_auto] px-6 pb-[58px] pt-[88px] text-space-tourism-white bg-blend-screen md:grid md:min-h-[1024px] md:grid-cols-1 md:grid-rows-[repeat(4,auto)] md:place-content-start md:bg-[url('/space-tourism-website/assets/crew/background-crew-tablet.jpg')] md:px-[38.5px] md:pb-0 md:pt-[136px] lg:relative lg:min-h-[900px] lg:w-full lg:grid-cols-[auto] lg:grid-rows-[34px,auto,15px] lg:content-stretch lg:bg-[url('/space-tourism-website/assets/crew/background-crew-desktop.jpg')] lg:bg-cover lg:pb-[94px] lg:pl-[165px] lg:pr-0 lg:pt-[212px]"
        aria-label="Crew page"
      >
        <h1 className="uppercase leading-[19px] tracking-[2.7px] text-space-tourism-white md:self-start md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:self-end lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]">
          <span className="mr-[14px] font-bold opacity-25 lg:mr-5">02</span>Meet
          your crew
        </h1>

        <div
          className={cn([
            "relative mt-8 aspect-[327/223] w-full max-w-screen-sm border-b border-b-[#383B4B] md:row-start-4 md:ml-10 md:w-auto md:place-self-center md:border-b-0 lg:absolute lg:col-start-2 lg:row-span-3 lg:row-start-1", //
            crewIndex === 0
              ? "md:mt-0 md:h-[572px] md:overflow-hidden"
              : "md:mt-10 md:h-[532px]", // medium crew-specific size
            crewIndex === 0
              ? "lg:bottom-[-94px] lg:right-[142px] lg:aspect-[514/700] lg:h-[700px]"
              : crewIndex === 1
                ? "lg:bottom-[-94px] lg:right-[192px] lg:aspect-[433/640] lg:h-[640px]"
                : crewIndex === 2
                  ? "lg:bottom-[-94px] lg:right-[142px] lg:aspect-[549/645] lg:h-[645px]"
                  : "lg:bottom-[-94px] lg:right-[118px] lg:aspect-[575/602] lg:h-[602px]", // large crew-specific size
          ])}
        >
          <Image
            fill
            className={cn([
              "object-contain pl-3 md:pl-0", //
              crewIndex === 0 && "md:translate-y-10 lg:translate-y-0",
            ])}
            src={crew.images.webp}
            alt={crew.name}
          />
        </div>

        <div className="md:row-start-3 md:place-self-center lg:mt-0 lg:place-self-start lg:self-end">
          <div className="mt-8 flex items-center gap-4 md:mt-10 lg:gap-6">
            {Array.from(Array(4).keys()).map((idx) => {
              return (
                <button
                  onClick={() => setCrewIndex(idx)}
                  key={idx}
                  className={cn([
                    "aspect-square w-[10px] rounded-full lg:w-[15px]", //
                    idx === crewIndex
                      ? "bg-white"
                      : "bg-white/[17.44%] hover:bg-white/50",
                  ])}
                  type="button"
                  aria-label={`Switch to slide ${idx + 1} of 4`}
                />
              );
            })}
          </div>
        </div>

        <div
          className={cn([
            "mt-8 flex flex-col items-center md:row-start-2 md:mt-[60px] md:h-[182px] md:place-self-center lg:mt-0 lg:h-[calc(100%-34px-15px)] lg:w-fit lg:items-start lg:place-self-start lg:pt-[154px]", //
            crewIndex === 0
              ? "md:w-[458px]"
              : crewIndex === 1
                ? "md:w-[520px]"
                : crewIndex === 2
                  ? "md:w-[592px]"
                  : "md:w-[536px]",
          ])}
        >
          <h2 className="font-bellefair uppercase leading-[18px] text-white/50 md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[37px]">
            {crew.role}
          </h2>
          <h3 className="mt-2 font-bellefair text-2xl uppercase leading-[28px] text-white md:text-[40px] md:leading-[45px] lg:mt-[15px] lg:text-[56px] lg:leading-[64px]">
            {crew.name}
          </h3>
          <p className="mt-4 text-center font-barlow text-[15px] leading-[25px] text-space-tourism-lightblue md:text-base md:leading-[28px] lg:mt-[27px] lg:w-[444px] lg:text-left lg:text-[18px] lg:leading-[32px]">
            {crew.bio}
          </p>
        </div>
      </main>

      {/* <Slider
        // absolutePath="/space-tourism-website/design/mobile-crew-a.jpg"
        // absolutePath={"/space-tourism-website/design/tablet-crew-d.jpg"}
        absolutePath="/space-tourism-website/design/desktop-crew-d.jpg"
      /> */}
    </>
  );
}

Crew.getLayout = getLayout;

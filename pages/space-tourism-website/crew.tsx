import Head from "next/head";
import { getLayout } from "../../components/space-tourism-website/Layout";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });
import _data from "../../components/space-tourism-website/data.json";
import { useState } from "react";
import Image from "next/image";
import { cn } from "../../utils/cn";
const data = _data.crew;

export default function Crew() {
  const [crewIndex, setCrewIndex] = useState<number>(0);
  const crew = data[crewIndex];

  return (
    <>
      <Head>
        <title>Space Tourism Website | Crew</title>
      </Head>

      <div className="text-space-tourism-white flex min-h-[710px] flex-col items-center bg-[url('/space-tourism-website/assets/crew/background-crew-mobile.jpg')] bg-[length:100vw_auto] px-6 pb-[58px] pt-[88px] bg-blend-screen md:grid md:min-h-[1024px] md:grid-cols-1 md:grid-rows-[repeat(4,auto)] md:place-content-start md:bg-[url('/space-tourism-website/assets/crew/background-crew-tablet.jpg')] md:px-[38.5px] md:pb-0 md:pt-[136px] lg:w-full lg:bg-[url('/space-tourism-website/assets/crew/background-crew-desktop.jpg')] lg:bg-cover lg:px-0 lg:pb-[112px] lg:pt-[176px]">
        <h5 className="text-space-tourism-white uppercase leading-[19px] tracking-[2.7px] md:self-start md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:ml-[166.5px] lg:mt-[36px] lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]">
          <span className="mr-[14px] font-bold opacity-25 lg:mr-6">02</span>Meet your crew
        </h5>

        <div
          className={cn([
            "relative mt-8 aspect-[327/223] w-full max-w-screen-sm border-b border-b-[#383B4B] md:row-start-4 md:ml-10 md:w-auto md:place-self-center md:border-b-0", //
            crewIndex === 0 ? "md:mt-0 md:h-[572px] md:overflow-hidden" : "md:mt-10 md:h-[532px]",
          ])}
        >
          <Image
            fill
            className={cn([
              "object-contain pl-3 md:pl-0", //
              crewIndex === 0 ? "md:translate-y-10" : "",
            ])}
            src={crew.images.webp}
            alt={crew.name}
          />
        </div>

        <div className="md:row-start-3 md:place-self-center">
          <div className="mt-8 flex items-center gap-4 md:mt-10">
            {Array.from(Array(4).keys()).map((idx) => {
              return (
                <button
                  onClick={() => setCrewIndex(idx)}
                  key={idx}
                  className={cn([
                    "aspect-square w-[10px] rounded-full", //
                    idx === crewIndex ? "bg-white" : "bg-white/[17.44%] hover:bg-white/50",
                  ])}
                />
              );
            })}
          </div>
        </div>

        <div
          className={cn([
            "mt-8 flex flex-col items-center md:row-start-2 md:mt-[60px] md:h-[182px] md:place-self-center", //
            crewIndex === 0 ? "md:w-[458px]" : crewIndex === 1 ? "md:w-[520px]" : crewIndex === 2 ? "md:w-[592px]" : "md:w-[536px]",
          ])}
        >
          <h4 className="font-bellefair uppercase leading-[18px] text-white/50 md:text-[24px] md:leading-[28px]">{crew.role}</h4>
          <h3 className="font-bellefair mt-2 text-2xl uppercase leading-[28px] text-white md:text-[40px] md:leading-[45px]">{crew.name}</h3>
          <p className="font-barlow text-space-tourism-lightblue mt-4 text-center text-[15px] leading-[25px] md:text-base md:leading-[28px]">{crew.bio}</p>
        </div>
      </div>

      {/* <Slider
        // absolutePath="/space-tourism-website/design/mobile-crew-a.jpg"
        absolutePath={"/space-tourism-website/design/tablet-crew-d.jpg"}
        // absolutePath="/space-tourism-website/design/desktop-crew-a.jpg"
      /> */}
    </>
  );
}

Crew.getLayout = getLayout;

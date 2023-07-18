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

      <div className="text-space-tourism-white flex min-h-[710px] flex-col items-center bg-[url('/space-tourism-website/assets/crew/background-crew-mobile.jpg')] bg-[length:100vw_auto] px-6 pb-[58px] pt-[88px] bg-blend-screen md:bg-[url('/space-tourism-website/assets/crew/background-crew-tablet.jpg')] md:px-[38.5px] md:pb-[61px] md:pt-[136px] lg:w-full lg:bg-[url('/space-tourism-website/assets/crew/background-crew-desktop.jpg')] lg:bg-cover lg:px-0 lg:pb-[112px] lg:pt-[176px]">
        <h5 className="text-space-tourism-white uppercase leading-[19px] tracking-[2.7px] md:self-start md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:ml-[166.5px] lg:mt-[36px] lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]">
          <span className="mr-[14px] font-bold opacity-25 lg:mr-6">02</span>Meet your crew
        </h5>

        <div className="relative mt-8 aspect-[327/223] w-full max-w-screen-sm border-b border-b-[#383B4B]">
          <Image
            fill
            className="object-contain pl-3"
            src={crew.images.webp}
            alt={crew.name}
          />
        </div>

        <div>
          <div className="mt-8 flex items-center gap-4">
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

        <div className="mt-8 flex flex-col items-center">
          <h4 className="font-bellefair uppercase leading-[18px] text-white/50">{crew.role}</h4>
          <h3 className="font-bellefair mt-2 text-2xl uppercase leading-[28px] text-white">{crew.name}</h3>
          <p className="font-barlow text-space-tourism-lightblue mt-4 text-center text-[15px] leading-[25px]">{crew.bio}</p>
        </div>
      </div>

      {/* <Slider
        absolutePath="/space-tourism-website/design/mobile-crew-a.jpg"
        // absolutePath="/space-tourism-website/design/tablet-crew-a.jpg"
        // absolutePath="/space-tourism-website/design/desktop-crew-a.jpg"
      /> */}
    </>
  );
}

Crew.getLayout = getLayout;

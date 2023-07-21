import Head from "next/head";
import { getLayout } from "../../components/space-tourism-website/Layout";
import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../../components/SliderTs"), { ssr: false });
import _data from "../../components/space-tourism-website/data.json";
import { useState } from "react";
import Image from "next/image";
import { cn } from "../../utils/cn";
const data = _data.technology;

export default function Tech() {
  const [techIndex, setTechIndex] = useState<number>(0);
  const tech = data[techIndex];

  return (
    <>
      <Head>
        <title>Space Tourism Website | Technology</title>
      </Head>

      <div className="text-space-tourism-white flex min-h-[710px] flex-col items-center bg-[url('/space-tourism-website/assets/technology/background-technology-mobile.jpg')] bg-[length:100vw_auto] pb-[58px] pt-[88px] bg-blend-screen md:min-h-[1024px] md:bg-[url('/space-tourism-website/assets/technology/background-technology-tablet.jpg')] md:pt-[136px]">
        <h5 className="text-space-tourism-white uppercase leading-[19px] tracking-[2.7px] md:self-start md:px-[38.5px] md:text-[20px] md:leading-6 md:tracking-[3.38px] lg:self-end lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]">
          <span className="mr-[14px] font-bold opacity-25 lg:mr-5">03</span>Space launch 101
        </h5>

        <div className="mt-8 flex w-full flex-col md:mt-[60px]">
          <div className="relative h-[170px] w-full md:h-[310px]">
            <Image
              src={"/space-tourism-website/assets/technology/"}
              className="object-cover"
              fill
              loader={({ width }) => {
                return width > 1023 ? tech.images.portrait : width > 767 ? tech.images.landscape : tech.images.mobile;
              }}
              alt={tech.name}
            />
          </div>
        </div>

        <div className="font-bellefair mt-[34px] flex items-center gap-4 md:mt-14 lg:gap-6">
          {Array.from(Array(3).keys()).map((idx) => {
            return (
              <button
                onClick={() => setTechIndex(idx)}
                key={idx}
                className={cn([
                  "flex aspect-square w-10 items-center justify-center rounded-full tabular-nums leading-[18px] tracking-[1px] md:w-[60px] md:text-[24px] md:leading-[28px] md:tracking-[1.5px] lg:w-20", //
                  idx === techIndex ? "text-space-tourism-black bg-white" : "text-space-tourism-white border border-white/25 hover:border-white",
                ])}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-[26px] flex w-[327px] flex-col items-center md:mt-11 md:w-[458px]">
          <h6 className="text-space-tourism-lightblue text-[14px] leading-[17px] tracking-[2.36px] md:text-base md:leading-[19px] md:tracking-[2.7px]">THE TERMINOLOGY…</h6>
          <h3 className="font-bellefair text-space-tourism-white mt-[9px] text-[24px] uppercase leading-[28px] md:mt-4 md:text-[40px] md:leading-[46px]">{tech.name}</h3>
          <p className="font-barlow text-space-tourism-lightblue mt-4 text-center text-[15px] leading-[25px] md:text-base md:leading-[28px]">{tech.description}</p>
        </div>
      </div>

      {/* <Slider
        // absolutePath="/space-tourism-website/design/mobile-technology-a.jpg"
        absolutePath={"/space-tourism-website/design/tablet-technology-a.jpg"}
        // absolutePath="/space-tourism-website/design/desktop-technology-a.jpg"
      /> */}
    </>
  );
}

Tech.getLayout = getLayout;

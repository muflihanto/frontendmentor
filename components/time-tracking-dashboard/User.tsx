import Image from "next/image";
import type { TimeUnit } from "./Main";
import type { Dispatch, SetStateAction } from "react";

type UserProps = { activeTab: TimeUnit; setActiveTab: Dispatch<SetStateAction<TimeUnit>>; };
export default function User({ activeTab, setActiveTab }: UserProps) {
  const buttons = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="rounded-[16px] bg-tracking-neutral-300 lg:row-span-2">
      <div className="flex gap-[18px] px-7 pt-8 pb-[31px] rounded-[16px] bg-tracking-primary-blue items-center lg:h-[354px] lg:flex-col lg:items-start lg:pt-[34px]">
        <div className="relative w-[70px] lg:w-[84px] aspect-square border-[3px] border-white rounded-full">
          <Image
            src="/time-tracking-dashboard/images/image-jeremy.png"
            alt="Jeremy Profile Picture"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col pt-1 lg:pl-[4px] lg:mt-[16px]">
          <p className="text-[15px] leading-[17px] lg:leading-[22px] text-tracking-neutral-100/75">Report for</p>
          <p className="text-[24px] font-light text-white/75 lg:text-[40px] lg:leading-[48px]">Jeremy Robson</p>
        </div>
      </div>
      <ul className="grid w-full grid-cols-3 pt-[21px] pb-[22px] lg:grid-cols-1 lg:grid-rows-3 lg:px-8 lg:pt-[23px] lg:gap-[15px]">
        {buttons.map((button, index) => {
          return (
            <li key={index}>
              <button
                className={`${button.toLowerCase() === activeTab ? "text-white hover:cursor-default" : "text-tracking-neutral-200 hover:text-white"} text-[18px] text-center w-full lg:text-left`}
                onClick={() => {
                  setActiveTab(button.toLowerCase() as TimeUnit);
                }}
              >
                {button}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

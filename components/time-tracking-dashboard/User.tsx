import Image from "next/image";
import type { TimeUnit } from "./Main";
import type { Dispatch, SetStateAction } from "react";

type UserProps = {
  activeTab: TimeUnit;
  setActiveTab: Dispatch<SetStateAction<TimeUnit>>;
};
export default function User({ activeTab, setActiveTab }: UserProps) {
  const buttons = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="rounded-[16px] bg-tracking-neutral-300 lg:row-span-2">
      <div className="flex items-center gap-[18px] rounded-[16px] bg-tracking-primary-blue px-7 pb-[31px] pt-8 lg:h-[354px] lg:flex-col lg:items-start lg:pt-[34px]">
        <div className="relative aspect-square w-[70px] rounded-full border-[3px] border-white lg:w-[84px]">
          <Image
            src="/time-tracking-dashboard/images/image-jeremy.png"
            alt="Jeremy Profile Picture"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col pt-1 lg:mt-[16px] lg:pl-[4px]" id="title">
          <p className="text-[15px] leading-[17px] text-tracking-neutral-100/75 lg:leading-[22px]">
            Report for
          </p>
          <p className="text-[24px] font-light text-white/75 lg:text-[40px] lg:leading-[48px]">
            Jeremy Robson
          </p>
        </div>
      </div>
      <ul
        className="grid w-full grid-cols-3 pb-[22px] pt-[21px] lg:grid-cols-1 lg:grid-rows-3 lg:gap-[15px] lg:px-8 lg:pt-[23px]"
        role="tablist"
        aria-labelledby="title"
      >
        {buttons.map((button, index) => {
          return (
            <li key={`${index}-${button}`} role="none">
              <button
                className={`${
                  button.toLowerCase() === activeTab
                    ? "text-white hover:cursor-default"
                    : "text-tracking-neutral-200 hover:text-white"
                } w-full text-center text-[18px] lg:text-left`}
                onClick={() => {
                  setActiveTab(button.toLowerCase() as TimeUnit);
                }}
                type="button"
                role="tab"
                id={`tab-${button.toLowerCase()}`}
                aria-selected={activeTab === button}
                aria-controls="tabpanel"
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

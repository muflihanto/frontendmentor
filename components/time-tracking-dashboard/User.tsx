import Image from "next/image";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useWindowSize } from "usehooks-ts";
import type { TimeUnit } from "./Main";

type UserProps = {
  activeTab: TimeUnit;
  setActiveTab: Dispatch<SetStateAction<TimeUnit>>;
};
export default function User({ activeTab, setActiveTab }: UserProps) {
  const buttons = ["Daily", "Weekly", "Monthly"];
  const { width } = useWindowSize();

  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const tab = event.currentTarget;
    const parent = tab.parentElement;
    const tablist = parent?.parentElement;
    const key = event.key;
    const allTabs = tablist?.querySelectorAll("button");
    const firstTab = allTabs?.[0];
    const lastTab = allTabs?.[allTabs.length - 1];
    const nextTab = parent?.nextElementSibling?.querySelector("button");
    const prevTab = parent?.previousElementSibling?.querySelector("button");

    let flag = false;

    switch (key) {
      case "Down":
      case "ArrowDown":
        if (width > 1023) {
          if (nextTab) {
            nextTab.focus();
          } else {
            firstTab?.focus();
          }
          flag = true;
        }
        break;

      case "Up":
      case "ArrowUp":
        if (width > 1023) {
          if (prevTab) {
            prevTab.focus();
          } else {
            lastTab?.focus();
          }
          flag = true;
        }
        break;

      case "Right":
      case "ArrowRight":
        if (width <= 1023) {
          if (nextTab) {
            nextTab.focus();
          } else {
            firstTab?.focus();
          }
          flag = true;
        }
        break;

      case "Left":
      case "ArrowLeft":
        if (width <= 1023) {
          if (prevTab) {
            prevTab.focus();
          } else {
            lastTab?.focus();
          }
          flag = true;
        }
        break;

      case "Home":
      case "PageUp":
        firstTab?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastTab?.focus();
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

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
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <ul> requires role="tablist" for proper ARIA tab pattern
        role="tablist"
        aria-labelledby="title"
        aria-orientation={width > 1023 ? "vertical" : "horizontal"}
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
                aria-selected={activeTab === button.toLowerCase()}
                tabIndex={activeTab === button.toLowerCase() ? 0 : -1}
                onKeyDown={onItemKeyDown}
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

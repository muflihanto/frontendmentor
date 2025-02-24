import Image from "next/image";
import { type MouseEvent, useState } from "react";
import Card from "./Card";

type OverviewProps = {
  openSelectionModal: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function Overview(props: OverviewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <Card className="relative pb-[39px] pt-[52px] lg:pb-[47px] lg:pt-[61px]">
      <div className="absolute -top-[28px] left-[49.75%] aspect-square w-[56px] -translate-x-1/2 lg:left-1/2">
        <Image
          src="/crowdfunding-product-page/images/logo-mastercraft.svg"
          fill
          className="object-contain"
          alt="Mastercraft Brand Logo"
        />
      </div>
      <div className="px-6 text-center lg:px-12">
        <h1
          className="px-1 text-[20px] font-bold leading-[24px] text-crowdfunding-neutral-200 lg:text-[28px]"
          id="main-heading"
        >
          Mastercraft Bamboo Monitor Riser
        </h1>
        <p className="mt-[16px] text-[14px] leading-[24px] text-crowdfunding-neutral-100 lg:mt-[18px] lg:text-[16px]">
          A beautiful<span className="inline lg:hidden">ly</span>{" "}
          <span className="hidden lg:inline">& </span>handcrafted monitor stand
          to reduce neck and eye strain.
        </p>
        <div className="mt-6 flex h-[56px] justify-between lg:mt-[38px]">
          <button
            className="w-[calc(100%-56px-9px)] rounded-full bg-crowdfunding-primary-100 pb-[2px] font-bold text-white/80 hover:bg-crowdfunding-primary-200 lg:w-[204px]"
            onClick={props.openSelectionModal}
            value={undefined}
            type="button"
          >
            Back this project
          </button>
          <button
            onClick={() => {
              setIsBookmarked((prev) => !prev);
            }}
            className={`group h-[56px] w-[56px] rounded-full bg-crowdfunding-neutral-200/[82%] transition-all lg:flex lg:items-center lg:justify-start ${
              isBookmarked
                ? "lg:w-[190px] lg:bg-crowdfunding-primary-100/[7%]"
                : "lg:w-[174px] lg:bg-crowdfunding-neutral-100/10"
            }`}
            type="button"
            aria-label="Toggle Bookmark"
            aria-pressed={isBookmarked}
          >
            <svg
              className={[
                "aspect-square w-[56px]",
                isBookmarked
                  ? "fill-crowdfunding-primary-200 text-white group-hover:fill-crowdfunding-primary-100"
                  : "fill-[#2F2F2F] text-[#B1B1B1] group-hover:fill-crowdfunding-neutral-100",
              ].join(" ")}
              aria-hidden="true"
            >
              <use href="/crowdfunding-product-page/images/icon-bookmark.svg#icon-bookmark" />
            </svg>
            <span
              className={`hidden lg:ml-4 lg:inline lg:font-bold ${
                isBookmarked
                  ? "group-hover:text-crowdfunding-primary-100 lg:text-crowdfunding-primary-200"
                  : "lg:text-crowdfunding-neutral-100 "
              }`}
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}

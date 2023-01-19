import Image from "next/image";
import { useState } from "react";
import Card from "./Card";

export default function Overview(props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <Card className="relative pt-[52px] pb-[39px] lg:pt-[61px] lg:pb-[47px]">
      <div className="absolute -top-[28px] left-[49.75%] lg:left-1/2 -translate-x-1/2 aspect-square w-[56px]">
        <Image
          src="/crowdfunding-product-page/images/logo-mastercraft.svg"
          fill
          className="object-contain"
          alt="Mastercraft Brand Logo"
        />
      </div>
      <div className="px-6 text-center lg:px-12">
        <h1 className="font-bold text-[20px] px-1 leading-[24px] lg:text-[28px]">Mastercraft Bamboo Monitor Riser</h1>
        <p className="text-[14px] mt-[16px] leading-[24px] text-crowdfunding-neutral-100 lg:text-[16px] lg:mt-[18px]">
          A beautiful<span className="inline lg:hidden">ly</span> <span className="hidden lg:inline">& </span>handcrafted monitor stand to reduce neck and eye strain.
        </p>
        <div className="mt-6 h-[56px] flex justify-between lg:mt-[38px]">
          <button
            className="rounded-full text-white/80 font-bold pb-[2px] bg-crowdfunding-primary-100 w-[calc(100%-56px-9px)] lg:w-[204px] hover:bg-crowdfunding-primary-200"
            onClick={props.openSelectionModal}
            value={null}
          >
            Back this project
          </button>
          <button
            onClick={() => {
              setIsBookmarked((prev) => !prev);
            }}
            className={`w-[56px] h-[56px] bg-crowdfunding-neutral-200/[82%] rounded-full lg:flex lg:justify-start lg:items-center group transition-all ${isBookmarked ? "lg:w-[190px] lg:bg-crowdfunding-primary-100/[7%]" : "lg:w-[174px] lg:bg-crowdfunding-neutral-100/10"}`}
          >
            <svg
              width="56"
              height="56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
              >
                <circle
                  className={`${isBookmarked ? "fill-crowdfunding-primary-200 group-hover:fill-crowdfunding-primary-100" : "group-hover:fill-crowdfunding-neutral-100"}`}
                  fill="#2F2F2F"
                  cx="28"
                  cy="28"
                  r="28"
                />
                <path
                  className={`${isBookmarked && "fill-white"}`}
                  fill="#B1B1B1"
                  d="M23 19v18l5-5.058L33 37V19z"
                />
              </g>
            </svg>
            <span className={`hidden lg:inline lg:font-bold lg:ml-4 ${isBookmarked ? "lg:text-crowdfunding-primary-200 group-hover:text-crowdfunding-primary-100" : "lg:text-crowdfunding-neutral-100 "}`}>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

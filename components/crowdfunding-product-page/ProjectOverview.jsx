import Image from "next/image";
import Card from "./Card";

export default function Overview(props) {
  return (
    <Card className="relative pt-[52px] pb-[39px]">
      <div className="absolute -top-[28px] left-[49.75%] -translate-x-1/2 aspect-square w-[56px]">
        <Image
          src="/crowdfunding-product-page/images/logo-mastercraft.svg"
          fill
          className="object-contain"
          alt="Mastercraft Brand Logo"
        />
      </div>
      <div className="px-6 text-center">
        <h1 className="font-bold text-[20px] px-1 leading-[24px]">Mastercraft Bamboo Monitor Riser</h1>
        <p className="text-[14px] mt-[16px] leading-[24px] text-crowdfunding-neutral-100">A beautifully handcrafted monitor stand to reduce neck and eye strain.</p>
        <div className="mt-6 h-[56px] flex justify-between">
          <button
            className="rounded-full text-white/80 font-bold pb-[2px] bg-crowdfunding-primary-100 w-[calc(100%-56px-9px)]"
            onClick={props.openSelectionModal}
            value={null}
          >
            Back this project
          </button>
          <button className="w-[56px] h-[56px] bg-crowdfunding-neutral-200/[82%] rounded-full">
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
                  fill="#2F2F2F"
                  cx="28"
                  cy="28"
                  r="28"
                />
                <path
                  fill="#B1B1B1"
                  d="M23 19v18l5-5.058L33 37V19z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}

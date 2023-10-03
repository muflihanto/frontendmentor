import type { MouseEvent } from "react";
import Card from "./Card";
import supportType from "./supportType.json";

type AboutProps = {
  openSelectionModal: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function About(props: AboutProps) {
  return (
    <Card className="mt-6 px-[23px] pb-[39px] pt-[38px] lg:px-12 lg:pb-[47px] lg:pt-[45px]">
      <h2 className="text-[18px] font-bold lg:text-[20px]">
        About this project
      </h2>
      <p className="mt-[22px] text-[14px] font-medium leading-[24px] text-crowdfunding-neutral-100/75 lg:mt-[33px] lg:text-[16px] lg:leading-[30px]">
        The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform
        that elevates your screen to a more comfortable viewing height. Placing
        your monitor at eye level has the potential to improve your posture and
        make you more comfortable while at work, helping you stay focused on the
        task at hand.
      </p>
      <p className="mt-[25px] text-[14px] font-medium leading-[24px] -tracking-[0.01px] text-crowdfunding-neutral-100/75 lg:mt-[30px] lg:text-[16px] lg:leading-[30px]">
        Featuring artisan craftsmanship, the simplicity of design creates extra
        desk space below your computer to allow notepads, pens, and USB sticks
        to be stored under the stand.
      </p>
      <div className="mt-[34px] flex flex-col gap-[24px] lg:mt-[40px]">
        {supportType.map((el, index) => {
          if (index > 0) {
            return (
              <Reward
                key={index}
                data={el}
                value={index}
                openSelectionModal={props.openSelectionModal}
              />
            );
          }
        })}
      </div>
    </Card>
  );
}

type RewardProps = {
  openSelectionModal: (e: MouseEvent<HTMLButtonElement>) => void;
  value: number;
  data: (typeof supportType)[number];
};
function Reward({ data, value, openSelectionModal }: RewardProps) {
  const { name, startsFrom, details, stock } = data;
  return (
    <div
      className={`rounded-lg border px-[23px] pb-[23px] pt-[21px] lg:px-[31px] lg:pb-[31px] lg:pt-[34px] ${
        stock === 0 && "select-none opacity-50"
      }`}
    >
      <div className="lg:flex lg:justify-between">
        <h3 className="text-[14px] font-bold lg:text-[18px]">{name}</h3>
        <p className="mt-1 text-[14px] font-medium text-crowdfunding-primary-100 lg:mt-[3px] lg:text-[15px]">
          Pledge ${startsFrom} or more
        </p>
      </div>
      <p className="mt-[23px] text-[14px] font-medium leading-[24px] text-crowdfunding-neutral-100/80 lg:mt-[21px] lg:text-[16px] lg:leading-[30px]">
        {details}
      </p>
      <div className="lg:mt-[25px] lg:flex lg:items-center lg:justify-between">
        <p className="mt-5 flex items-center gap-[8px] lg:m-0">
          <span className="text-[32px] font-bold">{stock}</span>
          <span className="text-[15px] font-medium text-crowdfunding-neutral-100/75">
            left
          </span>
        </p>
        <button
          className={`mt-[19px] h-[48px] w-[157px] rounded-full text-[14px] font-bold text-white/90 lg:m-0 ${
            stock === 0
              ? "cursor-default bg-crowdfunding-neutral-100/75"
              : "bg-crowdfunding-primary-100 hover:bg-crowdfunding-primary-200"
          }`}
          value={value}
          onClick={openSelectionModal}
          disabled={stock === 0}
        >
          {stock === 0 ? "Out of Stock" : "Select Reward"}
        </button>
      </div>
    </div>
  );
}

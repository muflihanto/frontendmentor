import BgIcons from "./BgIcons";
import type { ActivityData, ActivityType, TimeUnit } from "./Main";

type ActivityCardProps = {
  bgColor: string;
  title: ActivityType;
  timeframes: ActivityData["timeframes"][TimeUnit];
  timeUnit: string;
};
export default function ActivityCard(props: ActivityCardProps) {
  return (
    <div
      className={`flex h-40 flex-col rounded-[16px] text-white lg:h-full ${props.bgColor}`}
    >
      <BgIcons activity={props.title} />
      <div className="z-10 flex h-[122px] flex-col justify-center rounded-[16px] bg-tracking-neutral-300 px-6 lg:h-[calc(100%-45px)] lg:justify-start lg:gap-[33px] lg:px-[30px] lg:pt-[26px] lg:hover:cursor-pointer lg:hover:bg-[#34397b]">
        <div className="flex items-center justify-between">
          <div className="text-[18px] font-medium">{props.title}</div>
          <button className="group">
            <svg
              width="21"
              height="5"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[#BBC0FF] group-hover:fill-white"
            >
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-[17px]">
          <div className="text-[32px] font-light leading-[44px] lg:text-[56px]">
            {props.timeframes.current}hrs
          </div>
          <div className="text-[15px] text-tracking-neutral-100/75">{`${props.timeUnit} - ${props.timeframes.previous}hrs`}</div>
        </div>
      </div>
    </div>
  );
}

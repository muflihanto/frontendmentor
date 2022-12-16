import BgIcons from "./BgIcons";

export default function ActivityCard(props) {
  return (
    <div className={`rounded-[16px] h-40 lg:h-full flex flex-col text-white ${props.bgColor}`}>
      <BgIcons activity={props.title} />
      <div className="h-[122px] lg:h-[calc(100%-45px)] lg:px-[30px] lg:gap-[33px] rounded-[16px] z-10 bg-tracking-neutral-300 flex flex-col px-6 justify-center lg:justify-start lg:pt-[26px] lg:hover:bg-[#34397b] lg:hover:cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="font-medium text-[18px]">{props.title}</div>
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
        <div className="flex items-center justify-between lg:items-start lg:flex-col lg:gap-[17px]">
          <div className="text-[32px] font-light leading-[44px] lg:text-[56px]">{props.timeframes.current}hrs</div>
          <div className="text-[15px] text-tracking-neutral-100/75">{`${props.timeUnit} - ${props.timeframes.previous}hrs`}</div>
        </div>
      </div>
    </div>
  );
}

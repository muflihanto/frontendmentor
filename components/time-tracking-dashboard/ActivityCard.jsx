import BgIcons from "./BgIcons";

export default function ActivityCard(props) {
  return (
    <div className={`rounded-[16px] h-40 flex flex-col text-white ${props.bgColor}`}>
      <BgIcons activity={props.title} />
      <div className="h-[122px] rounded-[16px] z-10 bg-tracking-neutral-300 flex flex-col px-6 justify-center">
        <div className="flex items-center justify-between">
          <div className="font-medium text-[18px]">{props.title}</div>
          <button>
            <svg
              width="21"
              height="5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[32px] font-light leading-[44px]">{props.timeframes.current}hrs</div>
          <div className="text-[15px] text-tracking-neutral-100/75">{`${props.timeUnit} - ${props.timeframes.previous}hrs`}</div>
        </div>
      </div>
    </div>
  );
}

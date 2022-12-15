import Image from "next/image";

export default function User({ activeTab, setActiveTab }) {
  const buttons = ["Daily", "Weekly", "Monthly"];

  return (
    <div className="rounded-[16px] bg-tracking-neutral-300">
      <div className="flex gap-[18px] px-7 pt-8 pb-[31px] rounded-[16px] bg-tracking-primary-blue items-center">
        <div className="relative w-[70px] aspect-square border-[3px] border-white rounded-full">
          <Image
            src="/time-tracking-dashboard/images/image-jeremy.png"
            alt="Jeremy Profile Picture"
            className="object-contain"
            fill
          />
        </div>
        <div className="flex flex-col pt-1">
          <p className="text-[15px] leading-[17px] text-tracking-neutral-100/75">Report for</p>
          <p className="text-[24px] font-light text-white/75">Jeremy Robson</p>
        </div>
      </div>
      <ul className="grid w-full grid-cols-3 pt-[21px] pb-[22px]">
        {buttons.map((button, index) => {
          return (
            <li key={index}>
              <button
                className={`${button.toLowerCase() === activeTab ? "text-white hover:cursor-default" : "text-tracking-neutral-200 hover:text-white"} text-[18px] text-center w-full`}
                onClick={() => {
                  setActiveTab(button.toLowerCase());
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

import Card from "./Card";

type SuccessModalProps = {
  close: () => void;
};
export default function SuccessModal(props: SuccessModalProps) {
  return (
    <div className="font-commissioner fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <Card className="flex h-[382px] flex-col items-center justify-start overflow-scroll px-6 pt-[32px] lg:h-[449px] lg:w-[540px] lg:px-10 lg:pt-[48px]">
        <svg
          className="aspect-square lg:origin-top lg:scale-[calc(90/64*100%)]"
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
          >
            <circle
              fill="#3CB3AB"
              cx="32"
              cy="32"
              r="32"
            />
            <path
              stroke="#FFF"
              strokeWidth="5"
              className="lg:stroke-[3.25px]"
              d="M20 31.86L28.093 40 44 24"
            />
          </g>
        </svg>
        <h2 className="mt-[20.5px] text-[19px] font-bold -tracking-[0.4px] lg:mt-[69px] lg:text-[25px]">Thanks for your support!</h2>
        <p className="text-crowdfunding-neutral-100/75 mt-[22px] text-center text-[14px] font-medium leading-[24px] lg:mt-[12px] lg:text-[16px] lg:leading-[30px]">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <button
          className="bg-crowdfunding-primary-100 hover:bg-crowdfunding-primary-200 mt-[31px] flex h-[48px] w-[106px] -translate-x-[2px] items-center justify-center rounded-full text-[14px] font-bold text-white/75"
          onClick={props.close}
        >
          Got it!
        </button>
      </Card>
    </div>
  );
}

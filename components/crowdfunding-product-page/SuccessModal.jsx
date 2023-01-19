import Card from "./Card";

export default function SuccessModal(props) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen font-commissioner bg-black/50">
      <Card className="h-[382px] px-6 pt-[32px] overflow-scroll flex flex-col items-center justify-start lg:h-[449px] lg:w-[540px] lg:pt-[48px] lg:px-10">
        <svg
          className="aspect-square lg:scale-[calc(90/64*100%)] lg:origin-top"
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
        <h2 className="mt-[20.5px] font-bold text-[19px] -tracking-[0.4px] lg:mt-[69px] lg:text-[25px]">Thanks for your support!</h2>
        <p className="mt-[22px] text-center text-[14px] text-crowdfunding-neutral-100/75 font-medium leading-[24px] lg:mt-[12px] lg:text-[16px] lg:leading-[30px]">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <button
          className="bg-crowdfunding-primary-100 w-[106px] -translate-x-[2px] rounded-full text-white/75 font-bold text-[14px] h-[48px] flex justify-center items-center mt-[31px] hover:bg-crowdfunding-primary-200"
          onClick={props.close}
        >
          Got it!
        </button>
      </Card>
    </div>
  );
}

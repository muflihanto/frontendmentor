import Card from "./Card";

export default function SuccessModal(props) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen font-commissioner bg-black/50">
      <Card className="h-[382px] px-6 pt-[32px] overflow-scroll flex flex-col items-center justify-start">
        <svg
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
              d="M20 31.86L28.093 40 44 24"
            />
          </g>
        </svg>
        <h2 className="mt-[20.5px] font-bold text-[19px] -tracking-[0.4px]">Thanks for your support!</h2>
        <p className="mt-[22px] text-center text-[14px] text-crowdfunding-neutral-100/75 font-medium leading-[24px]">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <button
          className="bg-crowdfunding-primary-100 w-[106px] -translate-x-[2px] rounded-full text-white/75 font-bold text-[14px] h-[48px] flex justify-center items-center mt-[31px]"
          onClick={props.close}
        >
          Got it!
        </button>
      </Card>
    </div>
  );
}

import { commissioner } from "../../utils/fonts/commissioner";
import Card from "./Card";

type SuccessModalProps = {
  close: () => void;
};
export default function SuccessModal(props: SuccessModalProps) {
  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50 font-commissioner ${commissioner.variable}`}
    >
      <Card className="flex h-[382px] flex-col items-center justify-start overflow-scroll px-6 pt-[32px] lg:h-[449px] lg:w-[540px] lg:px-10 lg:pt-[48px]">
        <svg className="w-16 lg:w-[90px]" viewBox="0 0 64 64">
          <use href="/crowdfunding-product-page/images/icon-check.svg#icon-check" />
        </svg>
        <h2 className="mt-[20.5px] text-[19px] font-bold -tracking-[0.4px] lg:mt-[44px] lg:text-[24px] lg:tracking-normal">
          Thanks for your support!
        </h2>
        <p className="mt-[22px] text-center text-[14px] font-medium leading-[24px] text-crowdfunding-neutral-100/75 lg:mt-[12px] lg:text-[16px] lg:leading-[30px]">
          Your pledge brings us one step closer to sharing Mastercraft Bamboo
          Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </p>
        <button
          className="mt-[31px] flex h-[48px] w-[106px] -translate-x-[2px] items-center justify-center rounded-full bg-crowdfunding-primary-100 text-[14px] font-bold text-white/75 hover:bg-crowdfunding-primary-200 lg:mt-8"
          onClick={props.close}
        >
          Got it!
        </button>
      </Card>
    </div>
  );
}

import {
  type ChangeEvent,
  type ComponentProps,
  type FormEventHandler,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Card from "./Card";
import supportType from "./supportType.json";
import { useCallbackRef } from "use-callback-ref";
import { commissioner } from "../../utils/fonts/commissioner";
import type { SuppportContext } from "./Main";
import useFocusTrap from "../../utils/useFocusTrap";

type SupportType = typeof supportType;

type SelectionModalProps = {
  submit: FormEventHandler<HTMLFormElement>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & SuppportContext;

export default function SelectionModal(props: SelectionModalProps) {
  const { selectedOption, setSelectedOption, isOpen, setIsOpen } = props;
  const [pledge, setPledge] = useState(
    selectedOption ? supportType[selectedOption].startsFrom : 1,
  );
  const optionRef = useCallbackRef<HTMLDivElement>(null, (curr) => {
    if (curr !== null)
      curr.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  const modalRef = useFocusTrap(isOpen, setIsOpen);

  return isOpen ? (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`fixed left-0 top-0 flex h-full w-screen justify-center overflow-scroll bg-black/50 pb-[120px] pt-[121px] font-commissioner lg:py-[min(184px,calc(184/800*100vh))] ${commissioner.variable}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
      ref={modalRef}
    >
      <Card className="h-fit overflow-visible px-6 pb-[32px] pt-[29px] lg:px-12 lg:pb-[49px] lg:pt-[45.5px]">
        <CardHeader
          handleClose={() => {
            setIsOpen(false);
          }}
        />
        <form
          className="group mt-[25px] flex flex-col gap-[26px] lg:mt-[36px]"
          onSubmit={props.submit}
        >
          {supportType.map((el, index) => {
            return (
              <div
                key={el.name}
                className={`group rounded-lg px-[24px] pt-[21px] -outline-offset-1 ring-1 first:pb-[31px] first:pt-8 lg:px-[28px] lg:pb-[31.5px] lg:pt-[30px] lg:first:pt-[30px] ${
                  el.stock !== 0 && index === selectedOption
                    ? "pb-[23px] outline outline-2 outline-crowdfunding-primary-100 ring-inset ring-crowdfunding-primary-100 lg:pb-[23px]"
                    : "pb-[29px] ring-crowdfunding-neutral-100/30"
                } ${el.stock === 0 && "opacity-50"}`}
                ref={selectedOption === index ? optionRef : null}
              >
                <div className="flex flex-col items-start justify-between lg:grid lg:grid-flow-row lg:auto-rows-auto lg:grid-cols-[repeat(2,minmax(0,1fr))_auto]">
                  <RadioInput
                    el={el}
                    index={index}
                    checked={index === selectedOption}
                    onChange={() => {
                      setSelectedOption(index);
                      setPledge(el.startsFrom > 0 ? el.startsFrom : 1);
                    }}
                  />
                  <Details>{el.details}</Details>
                  {el.stock !== undefined && el.stock >= 0 && (
                    <Stock value={el.stock} />
                  )}
                </div>
                {el.stock !== 0 && index === selectedOption && (
                  <Continue
                    el={el}
                    pledge={pledge}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") setPledge(Number.parseInt(val));
                    }}
                  />
                )}
              </div>
            );
          })}
        </form>
      </Card>
    </div>
  ) : null;
}

const Details = ({ children }: ComponentProps<"p">) => {
  return (
    <p className="mt-[22px] text-[14px] font-medium leading-[24px] text-crowdfunding-neutral-100/80 group-first:mt-[33px] lg:col-span-3 lg:col-start-1 lg:mt-[10px] lg:pl-[48px] lg:text-[15px] lg:leading-[28px] lg:tracking-[-0.025px] lg:group-first:mt-[10px]">
      {children}
    </p>
  );
};

type CardHeaderProps = { handleClose: () => void };
const CardHeader = ({ handleClose }: CardHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold lg:text-[24px]">
          Back this project
        </h2>
        <button
          className="pt-[1px] lg:-translate-y-[25px] lg:translate-x-[17px]"
          onClick={handleClose}
          aria-label="Close 'Back this project' modal"
          type="button"
        >
          <svg viewBox="0 0 15 15" className="w-[15px]" role="graphics-symbol">
            <use href="/crowdfunding-product-page/images/icon-close-modal.svg#icon-close-modal" />
          </svg>
        </button>
      </div>
      <p className="mt-[22px] text-[14px] font-medium leading-[24px] text-crowdfunding-neutral-100/75 lg:mt-[15px] lg:text-[16px]">
        Want to support us in bringing Mastercraft Bamboo Monitor Riser out in
        the world?
      </p>
    </div>
  );
};

type StockProps = { value: number };
const Stock = ({ value }: StockProps) => {
  return (
    <p className="mt-[21px] flex items-center gap-2 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:-translate-y-1">
      <span className="text-[18px] font-bold">{value}</span>
      <span className="text-[15px] font-medium text-crowdfunding-neutral-100/75">
        left
      </span>
    </p>
  );
};

type RadioInputProps = {
  el: SupportType[number];
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};
const RadioInput = ({ el, index, checked, onChange }: RadioInputProps) => {
  return (
    <label
      htmlFor={`reward${index}`}
      className={`${
        el.stock !== 0 && "hover:cursor-pointer"
      } group/label flex items-center gap-4 lg:col-span-2 lg:items-start lg:gap-6`}
    >
      <input
        type="radio"
        value={index}
        name="reward"
        id={`reward${index}`}
        checked={checked}
        // biome-ignore lint/a11y/noAutofocus: <explanation>
        autoFocus={checked}
        className="peer/reward sr-only"
        onChange={onChange}
        disabled={el.stock === 0}
      />
      <div
        className={`flex aspect-square w-6 items-center justify-center rounded-full border bg-white peer-checked/reward:before:h-3 peer-checked/reward:before:w-3 peer-checked/reward:before:rounded-full peer-checked/reward:before:bg-crowdfunding-primary-100 lg:mt-[4px] peer-focus/reward:ring-2 peer-focus/reward:ring-crowdfunding-primary-100 ${
          el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"
        }`}
      />
      <div className="lg:flex lg:items-center lg:gap-4">
        <h3
          className={`text-[14px] font-bold lg:text-[16px] ${
            el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"
          }`}
        >
          {el.name}
        </h3>
        {el.startsFrom > 0 && (
          <p
            className={`mt-1 text-[14px] font-bold text-crowdfunding-primary-100/75 lg:mt-0 lg:text-[16px] ${
              el.stock !== 0 &&
              "group-hover/label:text-crowdfunding-primary-100"
            }`}
          >
            Pledge ${el.startsFrom} or more
          </p>
        )}
      </div>
    </label>
  );
};

type ContinueProps = {
  el: SupportType[number];
  pledge: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Continue = ({ el, pledge, onChange }: ContinueProps) => {
  return (
    <div className="mt-[22px] lg:mt-[31px]">
      <hr className="w-[calc(100%+46px)] -translate-x-[23px] border-t-2" />
      <div className="lg:mt-[24px] lg:flex lg:items-center lg:justify-between">
        <p className="mt-[27px] text-center text-[14px] font-medium text-crowdfunding-neutral-100/75 lg:mt-0 lg:text-[15px]">
          Enter your pledge
        </p>
        <div className="mt-[19px] grid h-[48px] auto-cols-auto grid-flow-col grid-rows-1 items-center justify-between lg:mt-0 lg:gap-4">
          <label
            htmlFor="pledge"
            className="flex h-full w-[100px] items-center gap-2 place-self-start rounded-full ring-2 ring-inset ring-crowdfunding-neutral-100/20 focus-within:ring-crowdfunding-primary-100/50 lg:w-[102px]"
          >
            <span className="pl-6 text-[14px] font-bold text-crowdfunding-neutral-100/75">
              $
            </span>
            {/* FIXME fix logic, shouldn't accept 0 in "Pledge with no reward" */}
            <input
              id="pledge"
              name="pledge"
              type="number"
              min={el.startsFrom > 0 ? el.startsFrom : 1}
              value={pledge}
              onChange={onChange}
              className="h-[24px] w-[50%] rounded-full bg-none text-[14px] font-bold focus-within:outline-none"
            />
          </label>
          <button
            className="h-full w-[115px] rounded-full bg-crowdfunding-primary-100 pb-[2px] text-[14px] font-bold text-white/75 hover:bg-crowdfunding-primary-200 lg:w-[107px]"
            type="submit"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

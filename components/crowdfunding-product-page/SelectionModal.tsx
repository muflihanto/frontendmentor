import { ChangeEvent, ComponentProps, FormEventHandler, useState } from "react";
import Card from "./Card";
import supportType from "./supportType.json";

type SupportType = typeof supportType;

type SelectionModalProps = { close: () => void; submit: FormEventHandler<HTMLFormElement>; initialSelection: number | undefined };
export default function SelectionModal(props: SelectionModalProps) {
  const [selected, setSelected] = useState<number | undefined>(props.initialSelection);
  const [pledge, setPledge] = useState(props.initialSelection ? supportType[props.initialSelection].startsFrom : 0);

  return (
    <div
      className="font-commissioner fixed left-0 top-0 flex h-full w-screen justify-center overflow-scroll bg-black/50 pb-[120px] pt-[121px] lg:py-[min(184px,calc(184/800*100vh))]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.close();
        }
      }}
    >
      <Card className="h-fit overflow-visible px-6 pb-[32px] pt-[29px] lg:px-12 lg:pb-[49px] lg:pt-[45.5px]">
        <CardHeader handleClose={props.close} />
        <form
          className="group mt-[25px] flex flex-col gap-[26px] lg:mt-[36px]"
          onSubmit={props.submit}
        >
          {supportType.map((el, index) => {
            return (
              <div
                key={index}
                className={`group rounded-lg px-[24px] pt-[21px] -outline-offset-1 ring-1 first:pb-[31px] first:pt-8 lg:px-[28px] lg:pb-[31.5px] lg:pt-[30px] lg:first:pt-[30px] ${el.stock !== 0 && index === selected ? "ring-crowdfunding-primary-100 outline-crowdfunding-primary-100 pb-[23px] outline outline-2 ring-inset lg:pb-[23px]" : "ring-crowdfunding-neutral-100/30 pb-[29px]"} ${
                  el.stock === 0 && "opacity-50"
                }`}
              >
                <div className="flex flex-col items-start justify-between lg:grid lg:grid-flow-row lg:auto-rows-auto lg:grid-cols-[repeat(2,minmax(0,1fr))_auto]">
                  <RadioInput
                    el={el}
                    index={index}
                    selected={selected}
                    onChange={() => {
                      setSelected(index);
                      setPledge(el.startsFrom);
                    }}
                  />
                  <Details>{el.details}</Details>
                  {el.stock !== undefined && el.stock >= 0 && <Stock value={el.stock} />}
                </div>
                {el.stock !== 0 && index === selected && (
                  <Continue
                    el={el}
                    pledge={pledge}
                    onChange={(e) => {
                      setPledge(parseInt(e.target.value));
                    }}
                  />
                )}
              </div>
            );
          })}
        </form>
      </Card>
    </div>
  );
}

const Details = ({ children }: ComponentProps<"p">) => {
  return <p className="text-crowdfunding-neutral-100/80 mt-[22px] text-[14px] font-medium leading-[24px] group-first:mt-[33px] lg:col-span-3 lg:col-start-1 lg:mt-[10px] lg:pl-[48px] lg:text-[15px] lg:leading-[28px] lg:tracking-[-0.025px] lg:group-first:mt-[10px]">{children}</p>;
};

type CardHeaderProps = { handleClose: () => void };
const CardHeader = ({ handleClose }: CardHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold lg:text-[24px]">Back this project</h2>
        <button
          className="pt-[1px] lg:-translate-y-[25px] lg:translate-x-[17px]"
          onClick={handleClose}
        >
          <svg
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
              fill="#000"
              fillRule="evenodd"
              opacity=".4"
            />
          </svg>
        </button>
      </div>
      <p className="text-crowdfunding-neutral-100/75 mt-[22px] text-[14px] font-medium leading-[24px] lg:mt-[15px] lg:text-[16px]">Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
    </div>
  );
};

type StockProps = { value: number };
const Stock = ({ value }: StockProps) => {
  return (
    <p className="mt-[21px] flex items-center gap-2 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:-translate-y-1">
      <span className="text-[18px] font-bold">{value}</span>
      <span className="text-crowdfunding-neutral-100/75 text-[15px] font-medium">left</span>
    </p>
  );
};

type RadioInputProps = { el: SupportType[number]; index: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void; selected: number | undefined };
const RadioInput = ({ el, index, selected, onChange }: RadioInputProps) => {
  return (
    <label
      htmlFor={`reward${index}`}
      className={`${el.stock !== 0 && "hover:cursor-pointer"} group/label flex items-center gap-4 lg:col-span-2 lg:items-start lg:gap-6`}
    >
      <input
        type="radio"
        value={index}
        name="reward"
        id={`reward${index}`}
        checked={el.stock !== undefined && el.stock > 0 && index === selected}
        className="peer/reward hidden"
        onChange={onChange}
        disabled={el.stock === 0}
      />
      <div className={`peer-checked/reward:before:bg-crowdfunding-primary-100 flex aspect-square w-6 items-center justify-center rounded-full border bg-white peer-checked/reward:before:h-3 peer-checked/reward:before:w-3 peer-checked/reward:before:rounded-full lg:mt-[4px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`} />
      <div className="lg:flex lg:items-center lg:gap-4">
        <h3 className={`text-[14px] font-bold lg:text-[16px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`}>{el.name}</h3>
        {el.startsFrom > 0 && <p className={`text-crowdfunding-primary-100/75 mt-1 text-[14px] font-bold lg:mt-0 lg:text-[16px] ${el.stock !== 0 && "group-hover/label:text-crowdfunding-primary-100"}`}>Pledge ${el.startsFrom} or more</p>}
      </div>
    </label>
  );
};

type ContinueProps = { el: SupportType[number]; pledge: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
const Continue = ({ el, pledge, onChange }: ContinueProps) => {
  return (
    <div className="mt-[22px] lg:mt-[31px]">
      <hr className="w-[calc(100%+46px)] -translate-x-[23px] border-t-2" />
      <div className="lg:mt-[24px] lg:flex lg:items-center lg:justify-between">
        <p className="text-crowdfunding-neutral-100/75 mt-[27px] text-center text-[14px] font-medium lg:mt-0 lg:text-[15px]">Enter your pledge</p>
        <div className="mt-[19px] grid h-[48px] auto-cols-auto grid-flow-col grid-rows-1 items-center justify-between lg:mt-0 lg:gap-4">
          <label
            htmlFor="pledge"
            className="ring-crowdfunding-neutral-100/20 focus-within:ring-crowdfunding-primary-100/50 flex h-full w-[100px] items-center gap-2 place-self-start rounded-full ring-2 ring-inset lg:w-[102px]"
          >
            <span className="text-crowdfunding-neutral-100/75 pl-6 text-[14px] font-bold">$</span>
            <input
              id="pledge"
              name="pledge"
              type="number"
              min={el.startsFrom}
              value={pledge}
              onChange={onChange}
              className="h-[24px] w-[50%] rounded-full bg-none text-[14px] font-bold focus-within:outline-none"
            />
          </label>
          <button className="bg-crowdfunding-primary-100 hover:bg-crowdfunding-primary-200 h-full w-[115px] rounded-full pb-[2px] text-[14px] font-bold text-white/75 lg:w-[107px]">Continue</button>
        </div>
      </div>
    </div>
  );
};

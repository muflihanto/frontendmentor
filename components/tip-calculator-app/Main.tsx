import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import Image from "next/image";
import { NumberField } from "./NumberField";

type Error = {
  people: {
    message: string;
  };
};
type Result = {
  tipPP: string;
  billPP: string;
};

const percentValue = [5, 10, 15, 25, 50] as const;
type PercentValue = (typeof percentValue)[number];

function DollarIcon() {
  return (
    <span className="pointer-events-none absolute left-[19px] top-[26px] aspect-[11/17] h-[17px] -translate-y-1/2">
      <Image
        src="/tip-calculator-app/images/icon-dollar.svg"
        fill
        alt="Dollar Icon"
        className="object-contain"
      />
    </span>
  );
}

function PeopleIcon() {
  return (
    <span className="pointer-events-none absolute left-[17px] top-[24px] aspect-[13/16] h-4 -translate-y-1/2">
      <Image
        src="/tip-calculator-app/images/icon-person.svg"
        fill
        alt="Person Icon"
        className="object-contain"
      />
    </span>
  );
}

export default function Main() {
  const [bill, setBill] = useState<number>();
  const [tip, setTip] = useState<number>();
  const [people, setPeople] = useState<number>();
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState<Error>();

  const result = useMemo<Result | undefined>(() => {
    if (bill && tip && people && people !== 0) {
      const totalTip = (bill * tip) / 100;
      const totalBill = totalTip + bill;
      return {
        tipPP: (totalTip / people).toFixed(2),
        billPP: (totalBill / people).toFixed(2),
      };
    }
    return undefined;
  }, [tip, bill, people]);

  const reset = () => {
    setBill(undefined);
    setTip(undefined);
    setPeople(undefined);
    setIsCustom(false);
    setError(undefined);
  };

  return (
    <main
      className="mt-[40px] flex flex-col gap-7 rounded-t-[25px] bg-tip-neutral-100 px-6 pb-8 pt-8 text-tip-neutral-500 lg:mx-auto lg:mt-[calc(87/1024*100vh)] lg:max-w-screen-md lg:flex-row lg:justify-between lg:rounded-[25px] lg:px-8 xl:max-w-[calc(23/36*100vw)]"
      aria-labelledby="title"
    >
      <h1 className="sr-only" id="title">
        Splitter | Tip calculator app
      </h1>
      <form className="flex flex-col gap-[34px] px-2 py-1 lg:w-[calc(411/1440*100vw)] lg:gap-[42px] lg:px-4 lg:pb-[16px] lg:pt-[17px]">
        <NumberField
          label="Bill"
          value={bill ?? Number.NaN}
          onChange={setBill}
          icon={<DollarIcon />}
          minValue={0}
        />
        <fieldset className="mt-[3px]">
          <legend className="text-[15px] font-medium leading-[15px] tracking-[.5px]">
            Select Tip %
          </legend>
          <div className="mt-[21px] grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-3 lg:gap-x-[13.5px]">
            {percentValue.map((el, index) => {
              return (
                <TipButton
                  key={`${index}-${el}`}
                  tip={tip}
                  percent={el}
                  setTip={setTip}
                  isCustom={isCustom}
                  setIsCustom={setIsCustom}
                />
              );
            })}
            <label htmlFor="custom-tip">
              <input
                type="number"
                value={isCustom ? tip : ""}
                onChange={(e) => {
                  setIsCustom(true);
                  setTip(Number.parseFloat(e.target.value));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                id="custom-tip"
                name="tip"
                placeholder="Custom"
                className="h-[50px] w-full rounded-md bg-tip-neutral-200 px-[18px] pb-[12px] pt-[10px] text-right text-[24px] leading-[24px] text-tip-neutral-600 placeholder:text-right placeholder:text-tip-neutral-500 focus:ring-2 focus:ring-inset focus:ring-tip-primary focus-visible:outline-none lg:px-[10px] lg:placeholder:text-center"
              />
            </label>
          </div>
        </fieldset>
        <NumberField
          label="Number of People"
          value={people ?? Number.NaN}
          onChange={(val) => {
            setPeople(val);
            if (val === 0) {
              setError((prev) => {
                return {
                  ...prev,
                  people: {
                    message: "Can't be zero",
                  },
                };
              });
            } else {
              setError(undefined);
            }
          }}
          icon={<PeopleIcon />}
          errorMessage={error?.people.message}
          errorState={Boolean(error?.people)}
          minValue={0}
        />
      </form>
      <ResultCard result={result} reset={reset} />
    </main>
  );
}

type ResultCardProps = { result?: Result; reset: () => void };
const ResultCard = ({ result, reset }: ResultCardProps) => {
  return (
    <div className="flex flex-col gap-[30px] rounded-[14px] bg-tip-neutral-600 pb-[24px] pl-6 pr-[22px] pt-[43px] text-[15px] leading-[15px] tracking-[.5px] lg:w-[calc(411/1440*100vw)] lg:gap-[60px] lg:px-[38px] lg:pb-[40px] lg:pt-[60px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[7px]">
          <span className="text-tip-neutral-200">Tip Amount</span>
          <span className="text-[13px] -tracking-[.05px] text-tip-neutral-400">
            / person
          </span>
        </div>
        <div className="text-[32px] -tracking-[.6px] text-tip-primary lg:self-start lg:text-[48px] lg:leading-[30px]">
          {result?.tipPP ? `$${result.tipPP}` : "$0.00"}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[7px]">
          <span className="text-tip-neutral-200">Total</span>
          <span className="text-[13px] -tracking-[.05px] text-tip-neutral-400">
            / person
          </span>
        </div>
        <div className="text-[32px] -tracking-[.6px] text-tip-primary lg:self-start lg:text-[48px] lg:leading-[30px]">
          {result?.billPP ? `$${result.billPP}` : "$0.00"}
        </div>
      </div>
      <button
        className={
          "mx-auto mt-2 block h-[48px] w-full rounded-md bg-tip-primary pt-[2px] text-center text-[20px] font-medium uppercase text-tip-neutral-600 disabled:bg-tip-primary/25 lg:mt-auto"
        }
        disabled={!result?.billPP && !result?.tipPP}
        onClick={reset}
        type="reset"
      >
        Reset
      </button>
    </div>
  );
};

type TipButtonProps = {
  percent: PercentValue;
  isCustom: boolean;
  setIsCustom: Dispatch<SetStateAction<boolean>>;
  tip?: number;
  setTip: Dispatch<SetStateAction<number | undefined>>;
};
const TipButton = (props: TipButtonProps) => {
  const { tip, percent, isCustom, setTip, setIsCustom } = props;
  return (
    <div>
      <input
        type="radio"
        value={percent}
        checked={!isCustom && tip === percent}
        onChange={(e) => {
          setIsCustom(false);
          setTip(Number.parseFloat(e.target.value));
        }}
        onClick={(e) => {
          const val = Number.parseFloat(e.currentTarget.value);
          if (val === tip) {
            setTip(undefined);
            setIsCustom(false);
          }
        }}
        id={`${percent}%`}
        name="tip"
        className="peer absolute left-0 opacity-0"
      />
      <label
        className="relative block select-none rounded-md bg-tip-neutral-600 text-center text-[24px] leading-[48px] text-tip-neutral-200 hover:cursor-pointer hover:bg-tip-primary/40 hover:text-tip-neutral-600 peer-checked:bg-tip-primary peer-checked:text-tip-neutral-600"
        htmlFor={`${percent}%`}
      >
        {`${percent}%`}
      </label>
    </div>
  );
};

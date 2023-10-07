import { type Dispatch, type SetStateAction, useMemo, useState } from "react";

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
    } else {
      return undefined;
    }
  }, [tip, bill, people]);

  const reset = () => {
    setBill(undefined);
    setTip(undefined);
    setPeople(undefined);
    setIsCustom(false);
    setError(undefined);
  };

  return (
    <div className="mt-[40px] flex flex-col gap-7 rounded-t-[25px] bg-tip-neutral-100 px-6 pb-8 pt-8 text-tip-neutral-500 lg:mx-auto lg:mt-[calc(87/1024*100vh)] lg:max-w-screen-md lg:flex-row lg:justify-between lg:rounded-[25px] lg:px-8 xl:max-w-[calc(23/36*100vw)]">
      <form className="flex flex-col gap-[34px] px-2 py-1 lg:w-[calc(411/1440*100vw)] lg:gap-[42px] lg:px-4 lg:pb-[16px] lg:pt-[17px]">
        <label
          htmlFor="bill"
          className="flex flex-col gap-[10px] lg:gap-[10px]"
        >
          <span className="text-[15px] font-medium leading-[15px] tracking-[.5px]">
            Bill
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-[19px] top-[26px] h-fit -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[17px] w-[11px]"
              >
                <path
                  fill="#9EBBBD"
                  d="M6.016 16.328v-1.464c1.232-.08 2.22-.444 2.964-1.092.744-.648 1.116-1.508 1.116-2.58v-.144c0-.992-.348-1.772-1.044-2.34-.696-.568-1.708-.932-3.036-1.092V4.184c.56.144 1.012.4 1.356.768.344.368.516.816.516 1.344v.288h1.824v-.432c0-.448-.088-.876-.264-1.284a3.783 3.783 0 00-.744-1.116A4.251 4.251 0 007.54 2.9a5.324 5.324 0 00-1.524-.492V.872H4.288V2.36a5.532 5.532 0 00-1.416.324c-.448.168-.84.392-1.176.672-.336.28-.604.616-.804 1.008-.2.392-.3.844-.3 1.356v.144c0 .96.316 1.708.948 2.244.632.536 1.548.884 2.748 1.044v3.912c-.704-.16-1.248-.472-1.632-.936-.384-.464-.576-1.08-.576-1.848v-.288H.256v.576c0 .464.08.924.24 1.38.16.456.404.88.732 1.272.328.392.744.728 1.248 1.008s1.108.476 1.812.588v1.512h1.728zM4.288 7.424c-.688-.128-1.164-.332-1.428-.612-.264-.28-.396-.644-.396-1.092 0-.464.176-.832.528-1.104.352-.272.784-.448 1.296-.528v3.336zm1.728 5.712V9.344c.768.128 1.328.328 1.68.6.352.272.528.688.528 1.248 0 .544-.196.984-.588 1.32-.392.336-.932.544-1.62.624z"
                />
              </svg>
            </span>
            <input
              id="bill"
              name="bill"
              type="number"
              value={bill ?? ""}
              placeholder="0"
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (val >= 0) {
                  setBill(val);
                } else if (e.target.value === "") {
                  setBill(undefined);
                }
              }}
              onWheel={(e) => e.currentTarget.blur()}
              className="w-full appearance-none rounded-md bg-tip-neutral-200 px-[17px] pb-[5px] pt-[7px] text-right text-[24px] text-tip-neutral-600 focus:ring-2 focus:ring-inset focus:ring-tip-primary focus-visible:outline-none"
            />
          </div>
        </label>
        <fieldset className="mt-[3px]">
          <legend className="text-[15px] font-medium leading-[15px] tracking-[.5px]">
            Select Tip %
          </legend>
          <div className="mt-[21px] grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-3 lg:gap-x-[13.5px]">
            {percentValue.map((el, index) => {
              return (
                <TipButton
                  key={index}
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
                  setTip(parseFloat(e.target.value));
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
        <label htmlFor="bill" className="flex flex-col gap-[11px]">
          <div className="flex items-end justify-between">
            <span className="text-[15px] font-medium leading-[15px] tracking-[.5px]">
              Number of People
            </span>
            {error?.people && (
              <span className="text-[15px] font-medium leading-[15px] tracking-[.5px] text-red-700/70">
                {error.people.message}
              </span>
            )}
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-[17px] top-[24px] h-fit -translate-y-1/2">
              <svg
                className="h-[16px] w-[13px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#9EBBBD"
                  d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"
                />
              </svg>
            </span>
            <input
              id="people"
              name="people"
              type="text"
              placeholder="0"
              value={people ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0) {
                  setPeople(value);
                } else if (e.target.value === "") {
                  setPeople(undefined);
                }
                if (value === 0) {
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
              onWheel={(e) => e.currentTarget.blur()}
              className={`w-full appearance-none rounded-md bg-tip-neutral-200 px-[17px] pb-[5px] pt-[7px] text-right text-[24px] text-tip-neutral-600 focus:ring-inset focus-visible:outline-none ${
                error?.people
                  ? "focus:ring-red-700/75"
                  : "focus:ring-tip-primary"
              }  focus:ring-2`}
            />
          </div>
        </label>
      </form>
      <ResultCard result={result} reset={reset} />
    </div>
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
        className={`mx-auto mt-2 block h-[48px] w-full rounded-md bg-tip-primary pt-[2px] text-center text-[20px] font-medium uppercase text-tip-neutral-600 disabled:bg-tip-primary/25 lg:mt-auto`}
        disabled={!result?.billPP && !result?.tipPP}
        onClick={reset}
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
          setTip(parseFloat(e.target.value));
        }}
        onClick={(e) => {
          const val = parseFloat(e.currentTarget.value);
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

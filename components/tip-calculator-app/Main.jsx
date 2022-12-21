import { useEffect, useMemo, useState } from "react";

export default function Main(props) {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState(1);
  const [isCustom, setIsCustom] = useState(false);

  const result = useMemo(() => {
    const totalTip = (bill * tip) / 100;
    const totalBill = totalTip + bill;
    const res = {
      tipPP: (totalTip / people).toFixed(2),
      billPP: (totalBill / people).toFixed(2),
    };
    return {
      ...res,
    };
  }, [tip, bill, people]);

  return (
    <div className="pt-9 pb-8 rounded-t-[25px] bg-tip-neutral-100 mt-[40px] text-tip-neutral-500 px-6">
      <form className="flex px-2 flex-col gap-[34px]">
        <label
          htmlFor="bill"
          className="flex flex-col gap-[10px]"
        >
          <span className="text-[15px] leading-[15px] tracking-[.5px] font-medium">Bill</span>
          <div className="relative">
            <span className="absolute -translate-y-1/2 pointer-events-none h-fit top-[26px] left-[19px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[11px] h-[17px]"
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
              min={0}
              value={bill}
              onChange={(e) => setBill(parseFloat(e.target.value))}
              onWheel={(e) => e.target.blur()}
              className="text-right rounded-md px-[17px] w-full pt-[7px] pb-[5px] appearance-none bg-tip-neutral-200 text-tip-neutral-600 text-[24px]"
            />
          </div>
        </label>
        <fieldset className="mt-[3px]">
          <legend className="text-[15px] leading-[15px] tracking-[.5px] font-medium">Select Tip %</legend>
          <div className="mt-[21px] grid grid-cols-2 gap-y-4 gap-x-4">
            {[5, 10, 15, 25, 50].map((el, index) => {
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
                value={isCustom && tip}
                onChange={(e) => {
                  setIsCustom(true);
                  setTip(parseFloat(e.target.value));
                }}
                onWheel={(e) => e.target.blur()}
                id="custom-tip"
                name="tip"
                placeholder="Custom"
                className="w-full text-[24px] h-[50px] text-right bg-tip-neutral-200 rounded-md leading-[24px] pt-[10px] pb-[12px] px-[18px] placeholder:text-right placeholder:text-tip-neutral-500"
              />
            </label>
          </div>
        </fieldset>
        <label
          htmlFor="bill"
          className="flex flex-col gap-[11px]"
        >
          <span className="text-[15px] leading-[15px] tracking-[.5px] font-medium">Number of People</span>
          <div className="relative">
            <span className="absolute -translate-y-1/2 pointer-events-none h-fit top-[24px] left-[17px]">
              <svg
                className="w-[13px] h-[16px]"
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
              type="number"
              min={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              onWheel={(e) => e.target.blur()}
              className="text-right rounded-md px-[17px] w-full pt-[7px] pb-[5px] appearance-none bg-tip-neutral-200 text-tip-neutral-600 text-[24px]"
            />
          </div>
        </label>
      </form>
      <ResultCard result={result} />
    </div>
  );
}

const ResultCard = ({ result }) => {
  return (
    <div className="bg-tip-neutral-600 rounded-[14px] mt-[32px] pt-[43px] pb-[24px] text-[15px] leading-[15px] tracking-[.5px] flex flex-col gap-[30px] pl-6 pr-[22px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[7px]">
          <span className="text-tip-neutral-200">Tip Amount</span>
          <span className="text-tip-neutral-400 text-[13px] -tracking-[.05px]">/ person</span>
        </div>
        <div className="text-tip-primary text-[32px] -tracking-[.6px]">{`$${result.tipPP || 0}`}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[7px]">
          <span className="text-tip-neutral-200">Total</span>
          <span className="text-tip-neutral-400 text-[13px] -tracking-[.05px]">/ person</span>
        </div>
        <div className="text-tip-primary text-[32px] -tracking-[.6px]">{`$${result.billPP || 0}`}</div>
      </div>
      <button className="w-full pt-[2px] font-medium text-tip-neutral-600 uppercase h-[48px] text-[20px] rounded-md block mx-auto text-center bg-tip-primary mt-2">Reset</button>
    </div>
  );
};

const TipButton = ({ tip, percent, isCustom, setTip, setIsCustom }) => {
  const peers = {
    5: ["peer/5", "peer-checked/5:text-tip-neutral-600", "peer-checked/5:bg-tip-primary"],
    10: ["peer/10", "peer-checked/10:text-tip-neutral-600", "peer-checked/10:bg-tip-primary"],
    15: ["peer/15", "peer-checked/15:text-tip-neutral-600", "peer-checked/15:bg-tip-primary"],
    25: ["peer/25", "peer-checked/25:text-tip-neutral-600", "peer-checked/25:bg-tip-primary"],
    50: ["peer/50", "peer-checked/50:text-tip-neutral-600", "peer-checked/50:bg-tip-primary"],
  };
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
        id={`${percent}%`}
        name="tip"
        className={`absolute left-0 opacity-0 ${peers[percent][0]}`}
      />
      <label
        className={`block text-center rounded-md ${peers[percent][1]} ${peers[percent][2]} relative bg-tip-neutral-600 text-tip-neutral-200 hover:cursor-pointer leading-[48px] text-[24px]`}
        htmlFor={`${percent}%`}
      >
        {`${percent}%`}
      </label>
    </div>
  );
};

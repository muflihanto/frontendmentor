import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

type Advice = {
  id: number;
  advice: string;
};
type Data = {
  slip: Advice;
};

export default function Main() {
  const [data, setData] = useState<Advice | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchNewQuote = async () => {
    setLoading(true);
    await fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data: Data) => {
        setData(data.slip);
        setLoading(false);
      });
  };

  useEffect(() => {
    void fetchNewQuote();
    // setData({
    //   id: 117,
    //   advice: "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    // });
    // setLoading(false);
  }, []);

  return (
    <div className="relative flex w-[calc(100vw-32px)] max-w-[540px] -translate-y-[56px] flex-col items-center justify-center rounded-xl bg-advice-neutral-200 px-5 pb-16 pt-[39px] text-center text-advice-primary-cyan shadow-[0px_40px_30px_-5px_rgba(0,0,0,0.05)] lg:-translate-y-[16px] lg:px-12 lg:pb-[72px] lg:pt-[48px] lg:shadow-[25px_50px_50px_-5px_rgba(0,0,0,0.075)]">
      <p className="text-[11px] font-bold uppercase tracking-[3.25px] text-advice-primary-green lg:text-[13px] lg:tracking-[4px]">
        Advice <span>{isLoading ? "#..." : data ? `#${data.id}` : "#"}</span>
      </p>
      <div className="mt-[23px] text-[24px] font-bold leading-[33px] lg:mt-[22px] lg:text-[28px] lg:leading-[38px]">
        {isLoading ? <Spinner /> : data ? `"${data.advice}"` : "..."}
      </div>
      <Divider />
      <DiceButton fetchNewQuote={fetchNewQuote} isLoading={isLoading} />
    </div>
  );
}

const DiceButton = ({
  fetchNewQuote,
  isLoading,
}: {
  fetchNewQuote: () => void;
  isLoading: boolean;
}) => {
  return (
    <button
      className={cn([
        "group absolute -bottom-8 flex aspect-square w-16 items-center justify-center rounded-full bg-advice-primary-green [&:hover>img]:rotate-12", //
        isLoading && "animate-spin",
      ])}
      onClick={fetchNewQuote}
    >
      <Image
        src="/advice-generator-app/images/icon-dice.svg"
        alt="Icon Dice"
        width={24}
        height={24}
      />
    </button>
  );
};

const dividerImageLoader = ({ width, src }: { width: number; src: string }) => {
  if (width > 1023) {
    return src + "pattern-divider-desktop.svg";
  }
  return src + "pattern-divider-mobile.svg";
};

const Divider = () => {
  return (
    <div className="relative mt-6 h-4 w-full lg:mt-10">
      <Image
        loader={dividerImageLoader}
        alt="Line Divider"
        className="object-contain"
        src="/advice-generator-app/images/"
        fill
      />
    </div>
  );
};

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin fill-advice-primary-green text-gray-200 dark:text-advice-neutral-100"
        viewBox="0 0 100 101"
      >
        <use href="/advice-generator-app/images/spinner.svg#spinner-bg" />
        <use href="/advice-generator-app/images/spinner.svg#spinner-fg" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

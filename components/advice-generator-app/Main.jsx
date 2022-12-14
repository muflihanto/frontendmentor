import Image from "next/image";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchNewQuote = () => {
    setLoading(true);
    fetch("https://api.adviceslip.com/advice", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        setData(data.slip);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className="bg-advice-neutral-200 w-[calc(100vw-32px)] flex flex-col items-center justify-center pt-[39px] pb-16 rounded-xl text-advice-primary-cyan px-5 text-center relative shadow-[0px_40px_30px_-5px_rgba(0,0,0,0.05)]">
      <p className="text-[11px] text-advice-primary-green uppercase tracking-[3.25px]">
        Advice <span>{isLoading ? "#..." : data ? `#${data.id}` : "#"}</span>
      </p>
      <div className="text-[24px] mt-[23px] leading-[33px] tracking-[-0.25px]">{isLoading ? <Spinner /> : data ? `"${data.advice}"` : "..."}</div>
      <Divider />
      <DiceButton fetchNewQuote={fetchNewQuote} />
    </div>
  );
}

const DiceButton = ({ fetchNewQuote }) => {
  return (
    <button
      className="w-16 aspect-square flex items-center justify-center rounded-full bg-advice-primary-green absolute -bottom-8"
      onClick={fetchNewQuote}
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
          fill="#202733"
        />
      </svg>
    </button>
  );
};

const dividerImageLoader = ({ width, src }) => {
  if (width > 1023) {
    return src + "pattern-divider-desktop.svg";
  }
  return src + "pattern-divider-mobile.svg";
};

const Divider = () => {
  return (
    <div className="relative w-full mt-6 h-4">
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
        className="w-8 h-8 text-gray-200 animate-spin dark:text-advice-neutral-100 fill-advice-primary-green"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

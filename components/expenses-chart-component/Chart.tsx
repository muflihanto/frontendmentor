import { type KeyboardEvent, useState } from "react";
import ChartBar from "./ChartBar";
import type { ChartData } from "./Spending";

export default function Chart({ data }: { data: ChartData }) {
  const maxVal = Math.max(...data.map((bar) => bar.amount));
  const [focusedBarIndex, setFocusedBarIndex] = useState(0);
  const handleBarFocus = (index: number) => {
    setFocusedBarIndex(index);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const key = event.key;
    let flag = false;

    switch (key) {
      case "ArrowRight":
        if (index < data.length - 1) {
          setFocusedBarIndex(index + 1);
          flag = true;
        }
        break;

      case "ArrowLeft":
        if (index > 0) {
          setFocusedBarIndex(index - 1);
          flag = true;
        }
        break;

      case "Home":
        setFocusedBarIndex(0);
        flag = true;
        break;

      case "End":
        setFocusedBarIndex(data.length - 1);
        flag = true;
        break;

      case "Enter":
      case " ":
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const chartElement = data.map((bar, index) => {
    return (
      <ChartBar
        value={bar.amount}
        day={bar.day}
        key={`${index}-${bar.day}`}
        maxVal={bar.amount === maxVal}
        index={index}
        isFocused={focusedBarIndex === index}
        onFocus={handleBarFocus}
        onKeyDown={handleKeyDown}
      />
    );
  });
  return (
    <div className="mt-[52px] flex items-end justify-between md:mt-[max(54px,calc(71/1024*100vh))]">
      {chartElement}
    </div>
  );
}

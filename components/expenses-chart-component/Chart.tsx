import ChartBar from "./ChartBar";
import type { ChartData } from "./Spending";

export default function Chart({ data }: { data: ChartData }) {
  const maxVal = Math.max(...data.map((bar) => bar.amount));
  const chartElement = data.map((bar, index) => {
    return (
      <ChartBar
        value={bar.amount}
        day={bar.day}
        key={index}
        maxVal={bar.amount === maxVal}
      />
    );
  });
  return (
    <div className="mt-[52px] flex items-end justify-between md:mt-[max(54px,calc(71/1024*100vh))]">
      {chartElement}
    </div>
  );
}

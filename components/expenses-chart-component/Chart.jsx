import ChartBar from "./ChartBar";

export default function Chart({ data }) {
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
  return <div className="flex items-end justify-between mt-[52px] md:mt-[max(54px,calc(71/1024*100vh))]">{chartElement}</div>;
}

import Chart from "./Chart";
import data from "../../public/expenses-chart-component/data.json";

export default function Spending() {
  return (
    <section
      className="bg-expenses-neutral-100 mt-4 rounded-[10px] text-expenses-neutral-400 px-5 pt-[23px] pb-[25px]
    md:mt-[calc(24/1024*100vh)] md:px-[40px] md:pt-[calc(37/1024*100vh)] md:pb-[calc(45.25/1024*100vh)] md:rounded-[20px]"
    >
      <h1 className="font-bold text-2xl md:text-[32px]">Spending - Last 7 days</h1>
      <Chart data={data} />
      <div className="border-t-[2px] border-t-expenses-neutral-200 mt-[23px] mb-[24px] md:mt-[calc(35/1024*100vh)] md:mb-[calc(30/1024*100vh)]" />
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[15px] text-expenses-neutral-300 md:text-[18px]">Total this month</p>
          <p className="text-3xl font-bold md:text-[48px] md:leading-[52px]">$478.33</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold leading-[22px] text-[15px] md:text-[18px] md:leading-[19px]">+2.4%</p>
          <p className="leading-[18px] text-[15px] text-expenses-neutral-300 md:text-[18px] md:leading-[29px]">from last month </p>
        </div>
      </div>
    </section>
  );
}

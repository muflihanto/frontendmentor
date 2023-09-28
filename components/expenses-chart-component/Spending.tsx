import Chart from "./Chart";
import data from "../../public/expenses-chart-component/data.json";

export type ChartData = typeof data;

export default function Spending() {
  return (
    <section className="bg-expenses-neutral-100 text-expenses-neutral-400 mt-4 rounded-[10px] px-5 pb-[25px] pt-[23px] md:mt-[calc(24/1024*100vh)] md:rounded-[20px] md:px-[40px] md:pb-[calc(45.25/1024*100vh)] md:pt-[calc(37/1024*100vh)]">
      <h1 className="text-2xl font-bold md:text-[32px]">Spending - Last 7 days</h1>
      <Chart data={data} />
      <div className="border-t-expenses-neutral-200 mb-[24px] mt-[23px] border-t-[2px] md:mb-[calc(30/1024*100vh)] md:mt-[calc(35/1024*100vh)]" />
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-expenses-neutral-300 text-[15px] md:text-[18px]">Total this month</p>
          <p className="text-3xl font-bold md:text-[48px] md:leading-[52px]">$478.33</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[15px] font-bold leading-[22px] md:text-[18px] md:leading-[19px]">+2.4%</p>
          <p className="text-expenses-neutral-300 text-[15px] leading-[18px] md:text-[18px] md:leading-[29px]">from last month </p>
        </div>
      </div>
    </section>
  );
}

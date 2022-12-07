import Chart from "./Chart";
import data from "../../public/expenses-chart-component/data.json";

export default function Spending() {
  return (
    <section className="bg-expenses-neutral-100 mt-4 rounded-[10px] text-expenses-neutral-400 px-5 pt-[23px] pb-[27px]">
      <h1 className="font-bold text-2xl">Spending - Last 7 days</h1>
      <Chart data={data} />
      <div className="border-t-[2px] border-t-expenses-neutral-200 mt-[23px] mb-[22px]" />
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[15px] text-expenses-neutral-300">Total this month</p>
          <p className="font-bold text-3xl">$478.33</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold leading-[24px] text-[15px]">+2.4%</p>
          <p className="leading-[15px] text-[15px] text-expenses-neutral-300">from last month </p>
        </div>
      </div>
    </section>
  );
}

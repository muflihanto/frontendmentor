export default function Header() {
  return (
    <header className="flex h-[97px] items-center justify-between rounded-[10px] bg-expenses-primary-red pl-5 pr-6 md:h-[calc(125/1024*100vh)] md:min-h-[110px] md:rounded-[20px] md:pl-[32px] md:pr-[39px]">
      <div className="flex flex-col gap-[6px] text-expenses-neutral-200 md:gap-[18px]">
        <h2 className="text-[15px] leading-[15px] md:text-[18px]">
          My balance
        </h2>
        <p className="text-2xl font-bold md:text-[32px]">$921.48</p>
      </div>
      <div className="h-auto w-[60px] pb-[2px] md:w-[72px] md:pb-0">
        <svg viewBox="0 0 72 48" className="h-12">
          <use href="/expenses-chart-component/images/logo.svg#logo" />
        </svg>
      </div>
    </header>
  );
}

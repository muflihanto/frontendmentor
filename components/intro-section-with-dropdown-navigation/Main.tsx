import Clients from "./Clients";

export default function Main() {
  return (
    <main className="mt-[41px] px-4 lg:flex lg:flex-col lg:justify-between lg:px-0">
      <div className="lg:flex lg:h-full lg:flex-col lg:items-start lg:justify-center lg:gap-[47px]">
        <h1 className="text-center text-[36px] font-bold -tracking-[0.4px] text-introdrop-neutral-300 lg:pr-4 lg:text-left lg:text-[80px] lg:leading-[82px] lg:-tracking-[1px]">
          Make remote work
        </h1>
        <p className="mt-[9px] text-center font-medium leading-[26px] tracking-[0.05px] text-introdrop-neutral-200 lg:m-0 lg:max-w-[480px] lg:text-left lg:text-[18px] lg:leading-[28px]">
          Get your team in sync, no matter your location. Streamline processes,
          create team rituals, and watch productivity soar.
        </p>
        <button
          className="mx-auto mt-[25px] block rounded-[14px] bg-introdrop-neutral-300 pl-[24px] pr-[22px] text-center font-medium leading-[48px] text-introdrop-neutral-100 lg:m-0 lg:mt-[4px] lg:pl-8 lg:pr-7 lg:text-[18px] lg:leading-[56.75px] lg:shadow-[inset_0px_0px_0px_1.5px_hsla(0,0%,8%,.75)] lg:hover:border-introdrop-neutral-300 lg:hover:bg-transparent  lg:hover:text-introdrop-neutral-300"
          type="button"
        >
          <span className="drop-shadow-[0_0_0.1px_rgb(255,255,255)] lg:font-bold lg:drop-shadow-none">
            Learn more
          </span>
        </button>
      </div>
      <Clients />
    </main>
  );
}

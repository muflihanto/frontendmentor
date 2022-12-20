import Clients from "./Clients.jsx";

export default function Main(props) {
  return (
    <main className="mt-[41px] px-4 lg:px-0 lg:flex lg:justify-between lg:flex-col">
      <div className="lg:flex lg:flex-col lg:items-start lg:justify-center lg:h-full lg:gap-[50px]">
        <h1
          className="font-bold -tracking-[0.4px] text-center text-introdrop-neutral-300 text-[36px]
      lg:text-left lg:text-[80px] lg:leading-[81px] lg:-tracking-[1px] lg:pr-4"
        >
          Make remote work
        </h1>
        <p
          className="mt-[9px] text-introdrop-neutral-200 font-medium tracking-[0.05px] leading-[26px] text-center
      lg:text-left lg:text-[18px] lg:leading-[28px] lg:max-w-[480px] lg:m-0"
        >
          Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch productivity soar.
        </p>
        <button className="block pl-[24px] pr-[22px] text-center rounded-[14px] mx-auto leading-[48px] font-medium bg-introdrop-neutral-300 text-introdrop-neutral-100 mt-[25px] lg:mx-0 lg:leading-[56px] lg:pl-8 lg:pr-7 lg:text-[18px] lg:m-0 lg:hover:bg-transparent lg:hover:border-introdrop-neutral-300 lg:shadow-[inset_0px_0px_0px_1.5px_hsla(0,0%,8%,.75)]  lg:hover:text-introdrop-neutral-300">
          <span className="drop-shadow-[0_0_0.1px_rgb(255,255,255)] lg:font-bold lg:drop-shadow-none">Learn more</span>
        </button>
      </div>
      <Clients />
    </main>
  );
}

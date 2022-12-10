import Clients from "./Clients.jsx";

export default function Main(props) {
  return (
    <main className="mt-[41px] px-4">
      <h1
        className="font-bold -tracking-[0.4px] text-center text-introdrop-neutral-300 text-[36px]
      lg:text-left lg:text-[64px] lg:leading-[72px]"
      >
        Make remote work
      </h1>
      <p
        className="mt-[9px] text-introdrop-neutral-200 font-medium tracking-[0.05px] leading-[26px] text-center
      lg:text-left"
      >
        Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch productivity soar.
      </p>
      <button className="block px-[20px] text-center rounded-[14px] mx-auto leading-[48px] font-bold bg-introdrop-neutral-300 text-introdrop-neutral-100 mt-[25px] lg:mx-0">Learn more</button>
      <Clients />
    </main>
  );
}

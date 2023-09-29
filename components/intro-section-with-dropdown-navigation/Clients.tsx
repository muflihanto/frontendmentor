import Image from "next/image";

export default function Clients() {
  return (
    <div className="mt-12 grid h-[26px] auto-cols-min grid-flow-col grid-rows-1 items-center justify-center gap-[29.5px] lg:max-w-[480px] lg:translate-y-1 lg:justify-start lg:gap-[40px]">
      <div className="relative aspect-[57/10] h-[14px] lg:h-[20px]">
        <Image
          src="/intro-section-with-dropdown-navigation/images/client-databiz.svg"
          fill
          className="object-contain"
          alt="Databiz"
        />
      </div>
      <div className="relative aspect-[73/36] h-[26px] lg:h-[36px]">
        <Image
          className="object-contain"
          src="/intro-section-with-dropdown-navigation/images/client-audiophile.svg"
          fill
          alt="Audiophile"
        />
      </div>
      <div className="relative aspect-[9/2] h-[14px] lg:h-[20px]">
        <Image
          className="object-contain"
          src="/intro-section-with-dropdown-navigation/images/client-meet.svg"
          fill
          alt="Meet"
        />
      </div>
      <div className="relative aspect-[83/24] h-[17px] lg:h-[24px]">
        <Image
          className="object-contain"
          src="/intro-section-with-dropdown-navigation/images/client-maker.svg"
          fill
          alt="Maker"
        />
      </div>
    </div>
  );
}

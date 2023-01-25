import type { PageProps } from "../../pages/loopstudios-landing-page";

const Creations = ({ creations }: PageProps) => {
  return (
    <div className="px-6 mt-[84px] grid grid-cols-1 justify-items-center grid-rows-[repeat(3,_minmax(0px,_auto))] row-start-1 lg:grid-cols-2 lg:justify-items-center lg:px-[calc(164/1440*100vw)] lg:mt-[167px]">
      <h2 className="text-center text-[32px] font-josefin uppercase tracking-[1.5px] lg:text-left lg:place-self-start lg:text-[48px]">Our creations</h2>
      <a
        href=""
        className="self-center row-start-3 p-[8.5px] w-[160px] text-center text-[14px] tracking-[5px] uppercase mx-auto border-2 border-loopstudios-primary-grey-200 mt-[33px] hover:border-loopstudios-primary-black hover:text-loopstudios-primary-white hover:bg-loopstudios-primary-black lg:row-start-1 lg:col-start-2 lg:m-0 lg:place-self-end lg:mb-[10.5px]"
      >
        See All
      </a>
      <ul className="flex flex-col row-start-2 gap-6 mt-11 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:col-span-2 lg:mt-[73px] lg:gap-[30px]">
        {creations.map((el, index) => {
          return (
            <li
              key={index}
              className={`${el.bgMobile} ${el.bgDesktop} w-full min-h-[120px] max-h-[120px] aspect-[327/120] bg-contain bg-no-repeat group lg:aspect-[256/450] lg:w-[calc(256/1440*100vw)] lg:h-auto lg:max-h-max lg:bg-contain lg:flex lg:items-end`}
            >
              <a
                href=""
                className="w-3/4 h-full bg-gradient-to-r from-black/[.6] to-transparent text-loopstudios-primary-white/75 font-josefin uppercase flex items-end text-[24px] leading-none pb-[22px] pl-[21px] tracking-[.8px] group-[&:nth-child(4)]:pr-[120px] pr-[100px] lg:w-full lg:h-[70%] lg:px-10 lg:pb-[35px] lg:bg-gradient-to-t lg:text-[32px] lg:leading-[32px] lg:hover:h-full lg:hover:from-white/75 lg:hover:to-white/75 transition-colors lg:hover:text-loopstudios-primary-black"
              >
                {el.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Creations;

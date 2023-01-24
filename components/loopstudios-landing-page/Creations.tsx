import type { PageProps } from "../../pages/loopstudios-landing-page";

const Creations = ({ creations }: PageProps) => {
  return (
    <div className="px-6 mt-[84px] grid grid-cols-1 grid-rows-[repeat(3,_minmax(0px,_auto))] row-start-1">
      <h2 className="text-center text-[32px] font-josefin uppercase tracking-[1.5px]">Our creations</h2>
      <a
        href=""
        className="self-center row-start-3 p-[8.5px] w-[160px] text-center text-[14px] tracking-[5px] uppercase mx-auto border-2 border-loopstudios-primary-grey-200 mt-[33px] hover:border-loopstudios-primary-black hover:text-loopstudios-primary-white hover:bg-loopstudios-primary-black"
      >
        See All
      </a>
      <ul className="flex flex-col row-start-2 gap-6 mt-11">
        {creations.map((el, index) => {
          return (
            <li
              key={index}
              className={`${el.bgMobile} ${el.bgDesktop} w-full h-[120px] aspect-[327/120] bg-contain bg-no-repeat group`}
            >
              <a
                href=""
                className="w-3/4 h-full bg-gradient-to-r from-black/[.6] to-transparent text-loopstudios-primary-white/75 font-josefin uppercase flex items-end text-[24px] leading-none pb-[22px] pl-[21px] tracking-[.8px] group-[&:nth-child(4)]:pr-[120px] pr-[100px]"
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

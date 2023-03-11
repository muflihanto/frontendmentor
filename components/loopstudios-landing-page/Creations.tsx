import type { PageProps } from "../../pages/loopstudios-landing-page";

const Creations = ({ creations }: PageProps) => {
  return (
    <div className="row-start-1 mt-[84px] grid grid-cols-1 grid-rows-[repeat(3,_minmax(0px,_auto))] justify-items-center px-6 lg:mt-[167px] lg:grid-cols-2 lg:justify-items-center lg:px-[calc(164/1440*100vw)]">
      <h2 className="font-josefin text-center text-[32px] uppercase tracking-[1.5px] lg:place-self-start lg:text-left lg:text-[48px]">Our creations</h2>
      <a
        href=""
        className="border-loopstudios-primary-grey-200 hover:border-loopstudios-primary-black hover:text-loopstudios-primary-white hover:bg-loopstudios-primary-black row-start-3 mx-auto mt-[33px] w-[160px] self-center border-2 p-[8.5px] text-center text-[14px] uppercase tracking-[5px] lg:col-start-2 lg:row-start-1 lg:m-0 lg:mb-[10.5px] lg:place-self-end"
      >
        See All
      </a>
      <ul className="row-start-2 mt-11 flex flex-col gap-6 lg:col-span-2 lg:mt-[73px] lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-[30px]">
        {creations.map((el, index) => {
          return (
            <li
              key={index}
              className={`${el.bgMobile} ${el.bgDesktop} group aspect-[327/120] max-h-[120px] min-h-[120px] w-full bg-contain bg-no-repeat lg:flex lg:aspect-[256/450] lg:h-auto lg:max-h-max lg:w-[calc(256/1440*100vw)] lg:items-end lg:bg-contain`}
            >
              <a
                href=""
                className="text-loopstudios-primary-white/75 font-josefin lg:hover:text-loopstudios-primary-black flex h-full w-3/4 items-end bg-gradient-to-r from-black/[.6] to-transparent pb-[22px] pl-[21px] pr-[100px] text-[24px] uppercase leading-none tracking-[.8px] transition-colors group-[&:nth-child(4)]:pr-[120px] lg:h-[70%] lg:w-full lg:bg-gradient-to-t lg:px-10 lg:pb-[35px] lg:text-[32px] lg:leading-[32px] lg:hover:h-full lg:hover:from-white/75 lg:hover:to-white/75"
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

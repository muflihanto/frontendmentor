import Image from "next/image";

const Footer: React.FC = () => {
  const navLinks = ["About", "Careers", "Events", "Products", "Support"];
  return (
    <footer className="mt-[95px] bg-loopstudios-primary-black pb-[9px] pt-[56px] lg:mt-[184px] lg:px-[165px] lg:pt-[44px]">
      <div className="flex flex-col items-center justify-start lg:grid lg:grid-cols-2 lg:grid-rows-[repeat(2,minmax(0,auto))] lg:items-start">
        <div className="relative aspect-[6/1] w-[144px]">
          <Image
            src="/loopstudios-landing-page/images/logo.svg"
            className="object-contain"
            alt="Loopstudios logo"
            fill
          />
        </div>
        <ul className="mt-8 flex flex-col items-center gap-[17.25px] lg:col-start-1 lg:row-start-2 lg:mt-[24px] lg:flex-row lg:gap-[32.5px] [&_*]:text-loopstudios-primary-white [&_li:hover]:relative [&_li:hover]:before:absolute [&_li:hover]:before:-bottom-[11px] [&_li:hover]:before:left-1/2 [&_li:hover]:before:h-1 [&_li:hover]:before:w-[45%] [&_li:hover]:before:-translate-x-1/2 [&_li:hover]:before:border-b-2 [&_li:hover]:before:content-['']">
          {navLinks.map((el, index) => {
            return (
              <li key={`${index}-${el}`}>
                <a href="" className="text-[15px]">
                  {el}
                </a>
              </li>
            );
          })}
        </ul>
        <SocialMediaButtons className="mt-12 flex items-center gap-4 lg:m-0 lg:place-self-end [&_li:hover]:relative [&_li:hover]:before:absolute [&_li:hover]:before:-bottom-[11px] [&_li:hover]:before:left-1/2 [&_li:hover]:before:h-1 [&_li:hover]:before:w-[100%] [&_li:hover]:before:-translate-x-1/2 [&_li:hover]:before:border-b [&_li:hover]:before:content-['']" />
        <p className="mt-[17px] text-[15px] text-loopstudios-primary-grey-100/90 lg:m-0 lg:place-self-end">
          © 2021 Loopstudios. All rights reserved.
        </p>
      </div>
      <div className="py-4 text-center font-alata text-[11px] text-loopstudios-primary-grey-100 [&_a]:text-loopstudios-primary-white [&_a]:underline [&_a]:decoration-loopstudios-primary-grey-100 [&_a]:decoration-wavy">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
        >
          Muflihanto
        </a>
        .
      </div>
    </footer>
  );
};

const socials = ["facebook", "twitter", "pinterest", "instagram"] as const;
const SocialMediaButtons = ({ className }: { className: string }) => {
  return (
    <ul className={className}>
      {socials.map((el) => {
        return (
          <li key={el}>
            <a href="" className="block h-fit w-fit">
              <svg
                viewBox={`0 0 24 ${el === "twitter" ? "20" : "24"}`}
                className="w-6"
              >
                <title>{el}</title>
                <use
                  href={`/loopstudios-landing-page/images/icon-${el}.svg#icon-${el}`}
                />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Footer;

import Image from "next/image";
import { ComponentProps, useState } from "react";
import { cn } from "../../utils/cn";

type NavItemProps = { text: string; hr: boolean };
const NavItem = ({ text, hr }: NavItemProps) => {
  return (
    <>
      <li className="group px-6 lg:px-0">
        <a
          href=""
          className="text-crowdfunding-neutral-200 text-[18px] font-medium lg:block lg:text-[13px] lg:font-normal lg:leading-[20px] lg:text-white lg:group-hover:underline lg:group-hover:decoration-white/20"
        >
          {text}
        </a>
      </li>
      {hr && <hr className="mb-[1px] lg:hidden" />}
    </>
  );
};

interface MenuButtonProps extends ComponentProps<"button"> {
  handleClick: () => void;
  isMenuOpen: boolean;
}
const MenuButton = ({ className, handleClick, isMenuOpen, ...props }: MenuButtonProps) => {
  return (
    <button
      className={cn(["group absolute right-0 top-0 h-4 w-4", className])}
      onClick={handleClick}
      aria-expanded={isMenuOpen}
      {...props}
    >
      <svg
        width="14"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        className="invisible absolute left-0 top-0 group-aria-expanded:visible"
      >
        <g
          fill="#FFF"
          fillRule="evenodd"
        >
          <path d="M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z" />
          <path d="M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z" />
        </g>
      </svg>
      <svg
        width="16"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        className="visible absolute left-0 top-0 group-aria-expanded:invisible"
      >
        <g
          fill="#FFF"
          fillRule="evenodd"
        >
          <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
        </g>
      </svg>
    </button>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <header className="h-[300px] w-full bg-[url('/crowdfunding-product-page/images/image-hero-mobile.jpg')] bg-contain bg-no-repeat lg:h-[400px] lg:bg-[url('/crowdfunding-product-page/images/image-hero-desktop.jpg')]">
      <div className="from-crowdfunding-neutral-200/60 to-crowdfunding-neutral-200/0 flex items-center justify-between bg-gradient-to-b px-6 pb-20 pt-8 lg:items-start lg:px-[166px] lg:pb-[60px] lg:pt-[48px]">
        <div className="relative aspect-[32/5] h-[20px]">
          <Image
            src="/crowdfunding-product-page/images/logo.svg"
            fill
            className="object-contain"
            alt="Crowdfunding Logo"
          />
        </div>
        <div className="relative h-[15px] lg:h-fit">
          <MenuButton
            className="peer lg:hidden"
            handleClick={handleClick}
            isMenuOpen={isMenuOpen}
          />
          <nav className="invisible absolute right-0 top-[53px] z-20 w-[calc(min(100vw,375px)-48px)] opacity-0 shadow-md transition-all peer-aria-expanded:visible peer-aria-expanded:opacity-100 lg:visible lg:static lg:w-fit lg:opacity-100 lg:shadow-none">
            <ul className="flex flex-col gap-[21px] rounded-lg bg-white pb-[22px] pt-[22px] lg:flex-row lg:gap-[33.5px] lg:bg-transparent lg:p-0">
              {["About", "Discover", "Get Started"].map((el, index) => {
                return (
                  <NavItem
                    key={index}
                    text={el}
                    hr={index < 2}
                  />
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
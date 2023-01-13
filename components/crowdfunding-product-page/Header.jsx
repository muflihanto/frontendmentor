import Image from "next/image";
import { useState } from "react";

const NavItem = ({ text, hr }) => {
  return (
    <>
      <li className="px-6">
        <a
          href=""
          className="font-medium text-crowdfunding-neutral-200"
        >
          {text}
        </a>
      </li>
      {hr && <hr />}
    </>
  );
};

const MenuButton = (props) => {
  return (
    <button
      className={`${props.className} group absolute top-0 right-0 w-4 h-4`}
      onClick={props.handleClick}
      aria-expanded={props.isMenuOpen}
    >
      <svg
        width="14"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 invisible group-aria-expanded:visible"
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
        className="absolute top-0 left-0 visible group-aria-expanded:invisible"
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

export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <header className="bg-[url('/crowdfunding-product-page/images/image-hero-mobile.jpg')] lg:bg-[url('/crowdfunding-product-page/images/image-hero-desktop.jpg')] w-full h-[300px] bg-contain">
      <div className="flex items-center justify-between px-6 pt-8 pb-20 bg-gradient-to-b from-crowdfunding-neutral-200/60 to-crowdfunding-neutral-200/0">
        <div className="relative aspect-[32/5] h-[20px]">
          <Image
            src="/crowdfunding-product-page/images/logo.svg"
            fill
            className="object-contain"
            alt="Crowdfunding Logo"
          />
        </div>
        <div className="relative h-[15px]">
          <MenuButton
            className="peer"
            handleClick={handleClick}
            isMenuOpen={isMenuOpen}
          />
          <nav className="absolute right-0 invisible opacity-0 top-10 peer-aria-expanded:visible peer-aria-expanded:opacity-100 transition-all w-[calc(min(100vw,375px)-48px)]">
            <ul className="flex flex-col gap-4 py-6 bg-white rounded-lg">
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

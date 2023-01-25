import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector("body").style.overflow = "hidden";
    }
    return () => {
      document.querySelector("body").style.overflow = "auto";
    };
  }, [isMenuOpen]);
  return (
    <header className="absolute top-0 left-0 w-full">
      <div className="relative z-20 flex items-center justify-between px-6 py-10 lg:px-[calc(165/1440*100vw)] lg:py-16">
        <div className="relative aspect-[6/1] w-[144px] lg:w-[192px]">
          <Image
            src="/loopstudios-landing-page/images/logo.svg"
            alt="Loopstudios Logo"
            className="object-contain"
            fill
          />
        </div>
        <button
          className="flex items-center justify-center lg:hidden"
          onClick={() => {
            setIsMenuOpen((a) => !a);
          }}
        >
          {isMenuOpen ? (
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
                fill="#FFF"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="#FFF"
                fillRule="evenodd"
              >
                <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
              </g>
            </svg>
          )}
        </button>
        <NavItems className="flex gap-[33px] [&_a]:text-loopstudios-primary-white/90 [&_a]:text-[15px] [&_li:hover]:before:absolute [&_li:hover]:before:content-[''] [&_li:hover]:before:w-[45%] [&_li:hover]:before:-bottom-[11px] [&_li:hover]:before:left-1/2 [&_li:hover]:before:h-1 [&_li:hover]:relative [&_li:hover]:before:border-b-2 [&_li:hover]:before:-translate-x-1/2" />
      </div>
      {isMenuOpen && (
        <nav className="absolute top-0 left-0 right-0 z-10 block lg:hidden">
          <NavItems className="flex flex-col items-start justify-center w-screen h-screen px-6 pb-[5px] bg-loopstudios-primary-black [&_a]:text-loopstudios-primary-white/75 [&_a]:font-josefin [&_a]:uppercase [&_a]:text-[24px] gap-[13px] [&_a]:tracking-[1px]" />
        </nav>
      )}
    </header>
  );
};

const NavItems = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <a href="">About</a>
      </li>
      <li>
        <a href="">Careers</a>
      </li>
      <li>
        <a href="">Events</a>
      </li>
      <li>
        <a href="">Products</a>
      </li>
      <li>
        <a href="">Support</a>
      </li>
    </ul>
  );
};

export default Header;

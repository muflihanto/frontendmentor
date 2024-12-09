import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (isMenuOpen) {
        body.style.overflow = "hidden";
      }

      return () => {
        body.style.overflow = "auto";
      };
    }
  }, [isMenuOpen]);
  return (
    <header className="absolute left-0 top-0 w-full">
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
          type="button"
          id="menubutton"
          aria-haspopup="true"
          aria-controls="menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 20 20" className="w-5">
              <title>Close</title>
              <use href="/loopstudios-landing-page/images/icon-close.svg#icon-close" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 16" className="w-6">
              <title>Hamburger Menu</title>
              <use href="/loopstudios-landing-page/images/icon-hamburger.svg#icon-hamburger" />
            </svg>
          )}
        </button>
        <NavItems className="hidden gap-[33px] lg:flex [&_a]:text-[15px] [&_a]:text-loopstudios-primary-white/90 [&_li:hover]:relative [&_li:hover]:before:absolute [&_li:hover]:before:-bottom-[11px] [&_li:hover]:before:left-1/2 [&_li:hover]:before:h-1 [&_li:hover]:before:w-[45%] [&_li:hover]:before:-translate-x-1/2 [&_li:hover]:before:border-b-2 [&_li:hover]:before:content-['']" />
      </div>
      {isMenuOpen && (
        <nav className="absolute left-0 right-0 top-0 z-10 block lg:hidden">
          <NavItems className="flex h-screen w-screen flex-col items-start justify-center gap-[13px] bg-loopstudios-primary-black px-6 pb-[5px] [&_a]:font-josefin [&_a]:text-[24px] [&_a]:uppercase [&_a]:tracking-[1px] [&_a]:text-loopstudios-primary-white/75" />
        </nav>
      )}
    </header>
  );
};

const links = ["About", "Careers", "Events", "Products", "Support"];
const NavItems = ({ className }: { className: string }) => {
  return (
    <ul className={className} id="menu" role="menu" aria-label="loopstudios">
      {links.map((el) => {
        return (
          <li key={el} role="none">
            <a role="menuitem" href="">
              {el}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Header;

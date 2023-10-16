import { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import NavItems from "./NavItems";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (window?.innerHeight > 1024) {
      setIsMenuOpen(false);
    }
  }, []);
  return (
    <header className="relative flex h-[75px] items-center justify-between px-4 lg:h-[84px] lg:justify-start lg:gap-[62px] lg:px-[41px]">
      <div className="lg:pt-[6px]">
        <svg viewBox="0 0 84 27" className="w-[84px]">
          <use href="/intro-section-with-dropdown-navigation/images/logo.svg#logo" />
        </svg>
      </div>
      <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <nav className="hidden justify-between lg:flex lg:w-full lg:items-center">
        <NavItems />
      </nav>
      {isMenuOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
          onTouchStart={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false);
          }}
          className="fixed right-0 top-0 z-20 h-full w-full bg-introdrop-neutral-300/[.75]"
        >
          <nav className="absolute right-0 top-0 h-full w-[64vw] bg-white py-5 pl-6 pr-5 pt-[78px] text-introdrop-neutral-300">
            <NavItems />
          </nav>
        </div>
      )}
    </header>
  );
}

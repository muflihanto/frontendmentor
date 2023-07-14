import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { type Page, pages } from "./Layout";

export default function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="absolute left-0 top-0 z-10 flex h-[88px] w-full items-center justify-between p-6 uppercase">
      <Image
        src="/space-tourism-website/assets/shared/logo.svg"
        width={40}
        height={40}
        alt="Space Tourism Logo"
      />
      <nav className={clsx(["text-white max-md:hidden"])}>
        <ul className="flex items-center gap-4">
          {pages.map((link, index) => {
            return (
              <li key={link}>
                <Link href={`/space-tourism-website/${link === "home" ? "" : link}`}>0{`${index} ${link}`}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <button className="flex items-center justify-center md:hidden">
      <Image
        alt="Hamburger Icon"
        src="/space-tourism-website/assets/shared/icon-hamburger.svg"
        width={24}
        height={21}
      />
    </button>
  );
}

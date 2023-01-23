import type { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";

const Header: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 flex items-center justify-between w-full px-6 py-10 ">
      <div className="relative aspect-[6/1] w-[144px]">
        <Image
          src="/loopstudios-landing-page/images/logo.svg"
          alt="Loopstudios Logo"
          className="object-contain"
          fill
        />
      </div>
      <nav className="relative">
        <button
          className="flex items-center justify-center peer"
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
        {isMenuOpen && (
          <ul className="absolute right-0 p-4 top-10 peer-focus:block bg-slate-600">
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
        )}
      </nav>
    </header>
  );
};

export default Header;

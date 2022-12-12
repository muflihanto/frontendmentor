import Head from "next/head";
import { useState } from "react";
import Accordion from "../components/test-component/accordion";

export default function Test(props) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-screen h-screen bg-white">
      <header className="relative flex items-center justify-between lg:justify-start lg:gap-8 h-[75px] px-4 bg-white">
        <Head>
          <title>Test Component</title>
        </Head>
        <div>Logo</div>
        <nav className="justify-between hidden lg:flex lg:items-center lg:w-full">
          <ul className="block lg:flex lg:h-fit lg:gap-5">
            <li>
              <Accordion />
            </li>
          </ul>
        </nav>
        <button className="ml-auto">Login</button>

        <button
          className={`absolute z-30 block p-2 ${isOpen ? "bg-slate-700 text-gray-50" : "bg-white"}  rounded-md right-2 top-2 lg:hidden`}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? "Close" : "Open"}
        </button>

        {isOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
            onTouchStart={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
            className="fixed top-0 right-0 z-20 w-full h-full bg-introdrop-neutral-200/50 lg:hidden"
          >
            <nav className="shadow-2xl absolute right-0 w-[60vw] h-full px-5 py-5 text-introdrop-neutral-300 top-0 bg-introdrop-neutral-100 pt-[70px]">
              <ul className="block lg:flex lg:h-fit lg:gap-5">
                <li>
                  <Accordion />
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

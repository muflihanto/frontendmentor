import { useAtomValue, useSetAtom } from "jotai";
import { type Nav, menuOpenAtom } from "../../pages/ecommerce-product-page";
import { createPortal } from "react-dom";
import { useEffectOnce, useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import { Transition } from "@headlessui/react";

export default function MobileMenu({ navs }: { navs: Nav[] }) {
  const menuOpen = useAtomValue(menuOpenAtom);

  return createPortal(
    <Transition
      appear={true}
      show={menuOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed left-0 top-0 z-50 h-[100svh] w-screen bg-black/75 lg:hidden"
    >
      <MenuContent navs={navs} />
    </Transition>,
    document.body
  );
}

function MenuContent({ navs }: { navs: Nav[] }) {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const ref = useRef(null);

  useEffectOnce(() => {
    document.body.style.overflow = "hidden";

    if (ref.current) {
      (ref.current as unknown as HTMLDivElement)?.focus();
    }

    const handleResize = () => {
      const { innerWidth: width } = window;
      if (width > 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleResize);
    };
  });

  useOnClickOutside(ref, () => {
    setMenuOpen(false);
  });

  return (
    <Transition.Child
      enter="transition-all duration-75"
      enterFrom="-translate-x-10"
      enterTo="translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-10"
      className="absolute left-0 top-0 h-full w-[66.75%] bg-white px-4 py-[15px]"
      ref={ref}
      tabIndex={1}
    >
      <button
        className="flex h-8 w-8 items-center justify-center rounded"
        onClick={() => {
          setMenuOpen(false);
        }}
        tabIndex={2}
      >
        <svg
          viewBox="0 0 14 15"
          className="w-[14px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fill="#69707D"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <nav className="mt-[42px]">
        <ul className="flex flex-col gap-[19px]">
          {navs.map((nav, index) => {
            const { text, href } = nav;
            return (
              <li key={index}>
                <a
                  className="text-ecommerce-neutral-500 font-kumbh-sans w-full rounded px-[9px] py-2 text-[18px] font-bold"
                  href={href}
                  tabIndex={1}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Transition.Child>
  );
}

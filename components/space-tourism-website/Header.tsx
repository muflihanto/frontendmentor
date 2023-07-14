import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { AriaModalOverlayProps, Overlay, useModalOverlay, useOverlayTrigger, useButton, AriaButtonProps } from "react-aria";
import { OverlayTriggerProps, OverlayTriggerState, useOverlayTriggerState } from "react-stately";
import { type Page, pages } from "./Layout";
import { HTMLProps, PropsWithChildren, cloneElement, useRef } from "react";
import { cn } from "../../utils/cn";
import { useOnClickOutside } from "usehooks-ts";

function Button(props: PropsWithChildren<AriaButtonProps & HTMLProps<HTMLButtonElement>>) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      {...buttonProps}
      className={cn([props.className, buttonProps.className])}
      ref={ref}
    >
      {children}
    </button>
  );
}

function Modal({ state, children, ...props }: PropsWithChildren<{ state: OverlayTriggerState } & AriaModalOverlayProps>) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  useOnClickOutside(ref, state.close);

  return (
    <Overlay>
      <div
        className="fixed right-0 top-0 z-50 flex h-screen w-[254px] bg-white/[4%] [backdrop-filter:blur(40.75px)]"
        {...underlayProps}
      >
        <div
          {...modalProps}
          className="relative flex h-full w-full flex-col py-[33px] pl-8 pr-[26.45px]"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}

function MobileNav({ label, children, ...props }: { label: string; children: (close: OverlayTriggerState["close"]) => JSX.Element } & OverlayTriggerProps) {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: "menu" }, state);

  return (
    <>
      <Button
        className={cn(["flex items-center justify-center md:hidden", state.isOpen && "hidden"])}
        {...triggerProps}
      >
        <Image
          alt="Hamburger Icon"
          src="/space-tourism-website/assets/shared/icon-hamburger.svg"
          width={24}
          height={21}
        />
      </Button>

      {state.isOpen && (
        <Modal
          {...props}
          state={state}
        >
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}

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

      <MobileNav label="Open Mobile Navigation Menu">
        {(close) => {
          return (
            <>
              <Button
                onPress={close}
                className="self-end"
              >
                <Image
                  src="/space-tourism-website/assets/shared/icon-close.svg"
                  width={20}
                  height={21}
                  alt="Close Icon"
                />
              </Button>

              <nav className="mt-16">
                <ul className="font-barlow-condensed text-space-tourism-white flex flex-col gap-8 uppercase leading-[19px] tracking-[2.7px]">
                  {pages.map((link, index) => {
                    return (
                      <li key={link}>
                        <Link href={`/space-tourism-website/${link === "home" ? "" : link}`}>
                          <span className="mr-[9px] font-bold tabular-nums tracking-[2.4px]">0{`${index}`}</span>
                          {`${link}`}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </>
          );
        }}
      </MobileNav>
    </header>
  );
}

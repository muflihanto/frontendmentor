import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  cloneElement,
  useRef,
  type HTMLProps,
  type PropsWithChildren,
} from "react";
import {
  Overlay,
  useButton,
  useDialog,
  useModalOverlay,
  useOverlayTrigger,
  type AriaButtonProps,
  type AriaDialogProps,
  type AriaModalOverlayProps,
} from "react-aria";
import {
  useOverlayTriggerState,
  type OverlayTriggerProps,
  type OverlayTriggerState,
} from "react-stately";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "../../utils/cn";
import { pages, type Page } from "./Layout";

function Button(
  props: PropsWithChildren<AriaButtonProps & HTMLProps<HTMLButtonElement>>,
) {
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

function Modal({
  state,
  children,
  ...props
}: PropsWithChildren<{ state: OverlayTriggerState } & AriaModalOverlayProps>) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  useOnClickOutside(ref, state.close);

  return (
    <Overlay>
      <div
        className="fixed right-0 top-0 z-50 flex h-screen w-[254px] bg-white/[4%] [backdrop-filter:blur(40.75px)]"
        {...underlayProps}
      >
        <div {...modalProps} className="relative h-screen w-full" ref={ref}>
          {children}
        </div>
      </div>
    </Overlay>
  );
}

function MobileNav({
  children,
  ...props
}: {
  label: string;
  children: (close: OverlayTriggerState["close"]) => JSX.Element;
} & OverlayTriggerProps) {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "menu" },
    state,
  );

  return (
    <>
      <Button
        className={cn([
          "flex items-center justify-center md:hidden",
          state.isOpen && "hidden",
        ])}
        aria-label={props.label}
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
        <Modal {...props} state={state}>
          {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}

interface DialogProps extends AriaDialogProps {
  children: React.ReactNode;
}

function Dialog({ children, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div
      className="flex h-full w-full flex-col py-[33px] pl-8 pr-[26.45px]"
      {...dialogProps}
      ref={ref}
      aria-label="Mobile Navigation Menu"
    >
      {children}
    </div>
  );
}

export default function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="absolute left-0 top-0 z-10 flex h-[88px] w-full items-center justify-between p-6 uppercase md:h-24 md:p-0 md:pl-[39px] lg:my-10 lg:justify-start lg:pl-[55px]">
      <div className="relative aspect-square w-10 md:w-12">
        <Image
          src="/space-tourism-website/assets/shared/logo.svg"
          alt="Space Tourism Logo"
          fill
        />
      </div>

      <hr className="relative z-10 w-[calc(100vw-260px-541.35px-min(12vw,165px))] border-t border-t-space-tourism-lightblue/25 max-lg:hidden lg:ml-auto lg:translate-x-[30px]" />

      <nav
        className={clsx([
          "max-md:hidden md:h-full md:w-[450px] md:bg-space-tourism-white/[4%] md:text-[14px] md:leading-[17px] md:tracking-[2.36px] md:[backdrop-filter:blur(40.75px)] lg:w-auto lg:text-base lg:leading-[19px] lg:tracking-[2.7px]",
        ])}
      >
        <ul className="flex items-center gap-4 md:h-full md:w-full md:justify-center md:gap-[37px] lg:justify-end lg:gap-12 lg:pl-[123px] lg:pr-[min(12vw,165px)]">
          {pages.map((link, index) => {
            return (
              <li
                key={link}
                className={cn([
                  "md:relative max-lg:[&:nth-child(2)]:mr-[3px]", //
                  currentPage === link
                    ? "text-space-tourism-white"
                    : "text-space-tourism-lightblue",
                ])}
              >
                <Link
                  href={`/space-tourism-website/${link === "home" ? "" : link}`}
                  className="peer"
                >
                  <span className="font-bold tabular-nums md:hidden lg:mr-[8px] lg:inline">
                    0{`${index}`}
                  </span>
                  {`${link}`}
                </Link>
                <div
                  className={cn([
                    "absolute -bottom-[calc(48px-17px/2)] left-1/2 h-[3px] w-full -translate-x-1/2 bg-white",
                    currentPage !== link
                      ? "scale-0 opacity-0 transition-all duration-200 peer-hover:block peer-hover:scale-100 peer-hover:opacity-50 peer-active:block"
                      : "peer-hover:opacity-100",
                  ])}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <MobileNav label="Open Mobile Navigation Menu">
        {(close) => {
          return (
            <Dialog>
              <Button
                onPress={close}
                className="self-end"
                aria-label="Close Navigation Menu"
              >
                <Image
                  src="/space-tourism-website/assets/shared/icon-close.svg"
                  width={20}
                  height={21}
                  alt="Close Icon"
                />
              </Button>

              <nav className="mt-16" aria-label="Main Menu">
                <ul className="flex flex-col gap-8 font-barlow-condensed uppercase leading-[19px] tracking-[2.7px] text-space-tourism-white">
                  {pages.map((link, index) => {
                    return (
                      <li key={link} className="relative">
                        <Link
                          href={`/space-tourism-website/${
                            link === "home" ? "" : link
                          }`}
                          className="peer"
                          aria-label={link[0].toUpperCase() + link.slice(1)}
                        >
                          <span className="mr-[9px] font-bold tabular-nums tracking-[2.4px]">
                            0{`${index}`}
                          </span>
                          {`${link}`}
                        </Link>
                        <div
                          className={cn([
                            "absolute -right-[26.45px] top-1/2 h-[31px] w-1 -translate-y-1/2 bg-white transition-all duration-200",
                            currentPage !== link
                              ? "origin-center scale-0 opacity-0 peer-hover:scale-100 peer-hover:opacity-50"
                              : "peer-hover:opacity-100",
                          ])}
                        />
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Dialog>
          );
        }}
      </MobileNav>
    </header>
  );
}

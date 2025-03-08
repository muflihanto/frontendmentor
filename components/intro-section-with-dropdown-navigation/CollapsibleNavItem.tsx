import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, MouseEventHandler, MutableRefObject } from "react";

type CollapsibleProps = {
  label: string;
  addClass: string;
  items: ReactNode;
};

export default function Collapsible(props: CollapsibleProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLUListElement | null>(null);
  const [animation, setAnimation] = useState<Animation | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSummaryClick: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    if (isClosing || !detailsRef.current?.open) {
      open();
    } else if (isExpanding || detailsRef.current.open) {
      shrink();
    }
  };

  const handleSummaryHover: MouseEventHandler<HTMLElement> = () => {
    if (window.innerWidth < 1024) return;
    if (isClosing || !detailsRef.current?.open) {
      open();
    }
  };

  const handleSummaryLeave: MouseEventHandler<HTMLElement> = (e) => {
    if (detailsRef.current) {
      if (
        window.innerWidth < 1024 ||
        (!isExpanding && !detailsRef.current.open)
      )
        return;
      detailsRef.current.style.overflow = "unset";
      const pointer = e.relatedTarget as Node;
      if (
        ![pointer, pointer.parentNode, pointer.parentNode?.parentNode].includes(
          contentRef.current,
        )
      ) {
        shrink();
      }
    }
  };

  const handleContentLeave = () => {
    if (window.innerWidth < 1024) return;
    if (isExpanding || detailsRef.current?.open) {
      shrink();
    }
  };

  const animate = ({ id }: { id: string }) => {
    if (detailsRef.current && summaryRef.current && contentRef.current) {
      if (animation) animation.cancel();

      let start: string;
      let end: string;
      let key: string;
      let element: MutableRefObject<
        HTMLDetailsElement | HTMLUListElement | null
      >;
      if (window.innerWidth < 1024) {
        detailsRef.current.style.overflow = "hidden";
        key = "height";
        element = detailsRef;
        start = `${detailsRef.current.offsetHeight}px`;
        end = `${
          id === "shrink"
            ? summaryRef.current.offsetHeight
            : summaryRef.current.offsetHeight + contentRef.current.offsetHeight
        }px`;
      } else {
        key = "clipPath";
        element = contentRef;
        start = "ellipse(0px 0px at 50% -30px)";
        end = "ellipse(300px 300px at 50% 50%)";
        if (id === "shrink") [start, end] = [end, start];
      }
      if (element.current) {
        setAnimation(
          element.current.animate(
            {
              [key]: [start, end],
            },
            {
              duration: 250,
              easing: "ease-out",
              id,
            },
          ),
        );
      }
    }
  };

  const shrink = () => {
    setIsClosing(true);
    animate({ id: "shrink" });
  };

  const open = () => {
    if (detailsRef.current) {
      detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;
      detailsRef.current.open = true;
      window.requestAnimationFrame(() => expand());
    }
  };

  const expand = () => {
    setIsExpanding(true);
    animate({ id: "expand" });
  };

  const onAnimationFinish = useCallback((open: boolean) => {
    if (detailsRef.current) {
      detailsRef.current.open = open;
      setAnimation(null);
      setIsClosing(false);
      setIsExpanding(false);
      detailsRef.current.style.height = detailsRef.current.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    if (animation?.id === "expand") {
      animation.onfinish = () => onAnimationFinish(true);
      animation.oncancel = () => setIsExpanding(false);
    } else if (animation?.id === "shrink") {
      animation.onfinish = () => onAnimationFinish(false);
      animation.oncancel = () => setIsClosing(false);
    }
  }, [animation, onAnimationFinish]);

  return (
    <details ref={detailsRef} className="group lg:relative">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <summary
        ref={summaryRef}
        onClick={handleSummaryClick}
        onMouseEnter={handleSummaryHover}
        onMouseLeave={handleSummaryLeave}
        className="relative flex w-fit list-none items-center justify-start gap-[15px] hover:cursor-pointer lg:gap-[7px]"
        aria-haspopup="true"
        aria-expanded={!!detailsRef.current?.open}
      >
        <span className="lg:group-open:text-introdrop-neutral-300 lg:group-open:drop-shadow-[0_0_0.25px_hsl(0,0%,41%)]">
          {props.label}
        </span>
        <span className="inline-block transition-transform duration-300 group-open:rotate-180">
          <svg
            viewBox="0 0 10 6"
            className="h-1.5"
            role="graphics-symbol"
            aria-label="Arrow Down"
          >
            <use href="/intro-section-with-dropdown-navigation/images/icon-arrow-down.svg#icon-arrow-down" />
          </svg>
        </span>
      </summary>

      <ul
        ref={contentRef}
        onMouseLeave={handleContentLeave}
        className={`lg:text flex flex-col gap-[18px] pb-[8px] lg:absolute lg:bottom-auto lg:left-auto lg:top-[38px] lg:w-max lg:gap-2 lg:rounded-lg lg:bg-white lg:px-6 lg:py-5 lg:shadow-[0px_0px_15px_10px_rgba(0,0,0,.05)] lg:before:absolute lg:before:right-0 lg:before:top-[-30px] lg:before:h-[30px] lg:before:w-full lg:before:bg-transparent lg:before:content-[''] ${props.addClass}`}
        aria-label={props.label}
      >
        {props.items}
      </ul>
    </details>
  );
}

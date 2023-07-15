/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import type { TouchEvent, MouseEvent } from "react";
import { useState, useCallback, useRef, useEffect } from "react";

type Events = MouseEvent | TouchEvent;

export default function Slider({ basePath, active = false, absolutePath = "" }: { basePath: string; active?: boolean; absolutePath?: string }) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const getWidthStatus = () => {
    if (window.innerWidth <= 375) {
      return window.innerWidth;
    } else if (window.innerWidth > 375 && window.innerWidth < 1440) {
      return window.innerWidth;
    } else {
      return 1440;
    }
  };
  const [offset, setOffset] = useState({ w: getWidthStatus() });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerCallbackRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        containerRef.current = node;
        const width = `${offset.w / 4}px`;
        containerRef.current.style.width = width;
        sliderRef.current!.style.left = `calc(${width} - 20px)`;
      }
    },
    [offset]
  );

  const getSliderImg = () => {
    if (Boolean(absolutePath)) {
      return absolutePath;
    }
    if (!active) {
      return `${basePath}/${window.innerWidth >= 1440 ? "desktop" : "mobile"}-design.jpg`;
    }
    return `${basePath}/active-states.jpg`;
  };
  const [imagePath, setImagePath] = useState(getSliderImg());

  const slideReady = (e: Events) => {
    e.preventDefault();
    setClicked(true);
  };

  const getCursorPos = (e: Events) => {
    let a = containerRef.current!.getBoundingClientRect();
    let pageX = ((e as TouchEvent).changedTouches ? (e as TouchEvent).changedTouches[0] : (e as MouseEvent)).pageX;
    let x = pageX - a.left;
    x = x - window.pageXOffset;
    return x;
  };

  const slide = (pos: number) => {
    containerRef.current!.style.width = `${pos}px`;
    sliderRef.current!.style.left = `${containerRef.current!.offsetWidth - sliderRef.current!.offsetWidth / 2}px`;
  };

  const slideFinish = () => {
    setClicked(false);
  };

  const slideMove: EventListener = (e) => {
    let pos;
    if (!clicked) {
      return false;
    }
    pos = getCursorPos(e as unknown as Events);
    if (pos < 0) pos = 0;
    if (pos > offset.w) pos = offset.w;
    slide(pos);
  };

  const handleScroll = () => {
    sliderRef.current!.style.top = `${window.innerHeight / 2 + window.pageYOffset}px`;
  };

  const handleWindowResize = () => {
    setImagePath(getSliderImg());
    const newOffset = getWidthStatus();
    setOffset({ w: newOffset });
    sliderRef.current!.style.left = `${containerRef.current!.offsetWidth - sliderRef.current!.offsetWidth / 2}px`;
  };

  useEffect(() => {
    if (sliderRef.current) {
      window.addEventListener("scroll", handleScroll);
    }

    if (clicked) {
      window.addEventListener("mouseup", slideFinish);
      window.addEventListener("touchend", slideFinish);
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("mouseup", slideFinish);
      window.removeEventListener("touchend", slideFinish);
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  return (
    <>
      <div
        className="absolute left-[calc(25vw-20px)] top-[50vh] z-[100] h-10 w-10 cursor-ew-resize rounded-full bg-[#2196f3] opacity-50"
        ref={sliderRef}
        onTouchStart={slideReady}
        onMouseDown={slideReady}
      />
      <div
        className="absolute left-0 top-0 z-[99] h-max w-auto max-w-max overflow-hidden text-left"
        ref={containerCallbackRef}
      >
        <img
          className="block h-max w-max max-w-max object-none"
          src={imagePath}
          alt="Slider"
        />
      </div>
    </>
  );
}

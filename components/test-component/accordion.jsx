import { useEffect, useRef, useState } from "react";

export default function Accordion() {
  const detailsRef = useRef(null);
  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const [animation, setAnimation] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSummaryClick = (e) => {
    e.preventDefault();
    if (isClosing || !detailsRef.current.open) {
      open();
    } else if (isExpanding || detailsRef.current.open) {
      shrink();
    }
  };

  const handleSummaryHover = () => {
    if (window.innerWidth < 1024) return;
    if (isClosing || !detailsRef.current.open) {
      open();
    }
  };

  const handleSummaryLeave = (e) => {
    if (window.innerWidth < 1024 || (!isExpanding && !detailsRef.current.open))
      return;
    detailsRef.current.style.overflow = "unset";
    const pointer = e.relatedTarget;
    if (
      ![pointer, pointer.parentNode, pointer.parentNode.parentNode].includes(
        contentRef.current,
      )
    ) {
      shrink();
    }
  };

  const handleContentLeave = () => {
    if (window.innerWidth < 1024) return;
    if (isExpanding || detailsRef.current.open) {
      shrink();
    }
  };

  const animate = ({ id }) => {
    if (animation) animation.cancel();

    let start, end, key, element;
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
  };

  const shrink = () => {
    setIsClosing(true);
    animate({ id: "shrink" });
  };

  const open = () => {
    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;
    detailsRef.current.open = true;
    window.requestAnimationFrame(() => expand());
  };

  const expand = () => {
    setIsExpanding(true);
    animate({ id: "expand" });
  };

  const onAnimationFinish = (open) => {
    detailsRef.current.open = open;
    setAnimation(null);
    setIsClosing(false);
    setIsExpanding(false);
    detailsRef.current.style.height = detailsRef.current.style.overflow = "";
  };

  useEffect(() => {
    if (animation?.id === "expand") {
      animation.onfinish = () => onAnimationFinish(true);
      animation.oncancel = () => setIsExpanding(false);
    } else if (animation?.id === "shrink") {
      animation.onfinish = () => onAnimationFinish(false);
      animation.oncancel = () => setIsClosing(false);
    }
  }, [animation]);

  return (
    <details ref={detailsRef} className="group lg:relative">
      <summary
        ref={summaryRef}
        onClick={handleSummaryClick}
        onMouseEnter={handleSummaryHover}
        onMouseLeave={handleSummaryLeave}
        className="relative flex w-fit list-none items-center justify-start gap-2 hover:cursor-pointer"
      >
        <span>Features</span>
        <span className="inline-block transition-transform duration-300 group-open:rotate-180">
          <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#686868"
              strokeWidth="1.5"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </span>
      </summary>

      <ul
        ref={contentRef}
        onMouseLeave={handleContentLeave}
        className="lg:text flex flex-col gap-1 py-3  pl-4 lg:absolute lg:-bottom-[180px] lg:left-auto lg:right-0 lg:rounded-lg lg:bg-white lg:px-5 lg:py-6 lg:shadow-[0px_0px_15px_10px_rgba(0,0,0,.05)] lg:before:absolute lg:before:top-[-30px] lg:before:h-[30px] lg:before:w-full lg:before:bg-transparent lg:before:content-['']"
      >
        <li>
          <a href="">Todo List</a>
        </li>
        <li>
          <a href="">Calendar</a>
        </li>
        <li>
          <a href="">Reminders</a>
        </li>
        <li>
          <a href="">Planning</a>
        </li>
      </ul>
    </details>
  );
}

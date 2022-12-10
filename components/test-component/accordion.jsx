import { useCallback, useEffect, useRef, useState } from "react";

export default function Accordion(props) {
  const el = useRef(null);
  const elCb = useCallback(
    (node) => {
      if (node !== null) {
        el.current = node;
      }
    },
    [el]
  );
  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const [animation, setAnimation] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSummaryClick = (e) => {
    e.preventDefault();
    el.current.style.overflow = "hidden";
    if (isClosing || !el.current.open) {
      open();
    } else if (isExpanding || el.current.open) {
      shrink();
    }
  };

  const handleSummaryHover = (e) => {
    el.current.style.overflow = "hidden";
    if (isClosing || !el.current.open) {
      open();
    }
  };

  const handleSummaryLeave = (e) => {
    el.current.style.overflow = "hidden";
    if (e.relatedTarget.parentNode !== contentRef.current && e.relatedTarget.parentNode.parentNode !== contentRef.current) {
      if (isExpanding || el.current.open) {
        shrink();
      }
    }
  };

  const handleContentLeave = () => {
    if (isExpanding || el.current.open) {
      shrink();
    }
  };

  const shrink = () => {
    setIsClosing(true);
    const startHeight = `${el.current.offsetHeight}px`;
    const endHeight = `${summaryRef.current.offsetHeight}px`;

    if (animation) {
      animation.cancel();
    }

    setAnimation(
      el.current.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 250,
          easing: "ease-out",
          id: "shrink",
        }
      )
    );
  };

  const open = () => {
    el.current.style.height = `${el.current.offsetHeight}px`;
    el.current.open = true;
    window.requestAnimationFrame(() => expand());
  };

  const expand = () => {
    setIsExpanding(true);
    const startHeight = `${el.current.offsetHeight}px`;
    const endHeight = `${summaryRef.current.offsetHeight + contentRef.current.offsetHeight}px`;

    if (animation) {
      animation.cancel();
    }

    setAnimation(
      el.current.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 250,
          easing: "ease-out",
          id: "expand",
        }
      )
    );
  };

  const onAnimationFinish = (open) => {
    el.current.open = open;
    setAnimation(null);
    setIsClosing(false);
    setIsExpanding(false);
    el.current.style.height = el.current.style.overflow = "";
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
    <details
      ref={elCb}
      className="group lg:relative"
    >
      <summary
        ref={summaryRef}
        onClick={handleSummaryClick}
        onMouseEnter={handleSummaryHover}
        onMouseLeave={handleSummaryLeave}
        className="relative flex items-center justify-start gap-2 list-none hover:cursor-pointer w-fit"
      >
        <span>Features</span>
        <span className="inline-block transition-transform duration-[250ms] group-open:rotate-180">
          <svg
            width="10"
            height="6"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        className="pl-4 lg:absolute lg:top-10 lg:left-0 lg:bg-white lg:px-5 lg:py-6 lg:rounded-lg lg:text lg:shadow-[0px_0px_15px_10px_rgba(0,0,0,.05)] "
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

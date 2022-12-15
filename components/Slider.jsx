import { useState, useCallback, useRef, useEffect } from "react";

export default function Slider({ basePath }) {
  const imageRef = useRef(null);
  const sliderRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const getWidthStatus = () => {
    if (window.innerWidth <= 375) {
      return window.innerWidth;
    } else if (window.innerWidth > 375 && window.innerWidth < 1440) {
      return 375;
    } else {
      return 1440;
    }
  };
  const [offset, setOffset] = useState({ w: getWidthStatus() });
  const containerRef = useRef(null);
  const containerCallbackRef = useCallback(
    (node) => {
      if (node !== null) {
        containerRef.current = node;
        const width = `${offset.w / 4}px`;
        containerRef.current.style.width = width;
        sliderRef.current.style.left = `calc(${width} - 20px)`;
      }
    },
    [offset]
  );

  const getSliderImg = () => {
    return `${basePath}/${window.innerWidth >= 1440 ? "desktop" : "mobile"}-design.jpg`;
    // return `${basePath}/active-states.jpg`;
  };
  const [imagePath, setImagePath] = useState(getSliderImg());

  const slideReady = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  const getCursorPos = (e) => {
    e = e.changedTouches ? e.changedTouches[0] : e;
    let a = containerRef.current.getBoundingClientRect();
    let x = e.pageX - a.left;
    x = x - window.pageXOffset;
    return x;
  };

  const slide = (pos) => {
    containerRef.current.style.width = `${pos}px`;
    sliderRef.current.style.left = `${containerRef.current.offsetWidth - sliderRef.current.offsetWidth / 2}px`;
  };

  const slideFinish = () => {
    setClicked(false);
  };

  const slideMove = (e) => {
    let pos;
    if (!clicked) {
      return false;
    }
    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > offset.w) pos = offset.w;
    slide(pos);
  };

  const handleScroll = () => {
    sliderRef.current.style.top = `${window.innerHeight / 2 + window.pageYOffset}px`;
  };

  const handleWindowResize = () => {
    setImagePath(getSliderImg());
    const newOffset = getWidthStatus();
    setOffset({ w: newOffset });
    sliderRef.current.style.left = `${containerRef.current.offsetWidth - sliderRef.current.offsetWidth / 2}px`;
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
  }, [clicked]);

  return (
    <>
      <div
        style={imgCompSlider}
        ref={sliderRef}
        onTouchStart={slideReady}
        onMouseDown={slideReady}
      />
      <div
        style={imgCompContainer}
        ref={containerCallbackRef}
      >
        <img
          style={imgCompImg}
          src={imagePath}
          ref={imageRef}
        />
      </div>
    </>
  );
}

const imgCompSlider = {
  position: "absolute",
  zIndex: 100,
  cursor: "ew-resize",
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: "#2196f3",
  opacity: "50%",
  borderRadius: "9999px",
  top: "50vh",
  left: "calc(25vw - 20px)",
};

const imgCompContainer = {
  zIndex: 99,
  top: 0,
  left: 0,
  width: "auto",
  position: "absolute",
  maxWidth: "max-content",
  height: "max-content",
  overflow: "hidden",
  textAlign: "left",
};

const imgCompImg = {
  top: 0,
  left: 0,
  display: "block",
  height: "max-content",
  objectFit: "none",
  width: "max-content",
  maxWidth: "max-content",
};

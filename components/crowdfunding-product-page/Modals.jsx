import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal(props) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.body;
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(<>{props.children}</>, ref.current) : null;
}

import { type Dispatch, type SetStateAction, useEffect } from "react";

type MenuButtonProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};
export default function MenuButton(props: MenuButtonProps) {
  const { isMenuOpen, setIsMenuOpen } = props;
  useEffect(() => {
    if (isMenuOpen) {
      if (window?.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);
  return (
    <button
      onClick={() => {
        setIsMenuOpen((prev) => !prev);
      }}
      className="group relative z-30 pb-2 lg:hidden"
    >
      {isMenuOpen ? (
        <svg
          width="26"
          height="26"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed right-[19px] top-[21px]"
        >
          <g fill="#151515" fillRule="evenodd">
            <path d="m2.393.98 22.628 22.628-1.414 1.414L.979 2.395z" />
            <path d="M.98 23.607 23.609.979l1.414 1.414L2.395 25.021z" />
          </g>
        </svg>
      ) : (
        <svg width="32" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#151515" fillRule="evenodd">
            <path d="M0 0h32v2H0zM0 8h32v2H0zM0 16h32v2H0z" />
          </g>
        </svg>
      )}
    </button>
  );
}

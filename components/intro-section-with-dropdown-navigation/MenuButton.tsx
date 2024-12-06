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
      type="button"
      id="menubutton"
      aria-haspopup="true"
      aria-controls="menu"
      aria-expanded={isMenuOpen}
    >
      {isMenuOpen ? (
        <svg
          viewBox="0 0 26 26"
          className="fixed right-[19px] top-[21px] w-[26px]"
        >
          <title>Close Menu</title>
          <use href="/intro-section-with-dropdown-navigation/images/icon-close-menu.svg#icon-close-menu" />
        </svg>
      ) : (
        <svg viewBox="0 0 32 18" className="w-8">
          <title>Menu</title>
          <use href="/intro-section-with-dropdown-navigation/images/icon-menu.svg#icon-menu" />
        </svg>
      )}
    </button>
  );
}

import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useCallbackRef } from "use-callback-ref";

export default function useFocusTrap(
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
) {
  const modalRef = useCallbackRef<HTMLDivElement>(null, (curr) => {
    if (curr !== null) {
      (
        curr.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )[0] as HTMLElement
      ).focus();
    }
  });

  useEffect(() => {
    if (state) {
      const modalElement = modalRef.current;
      if (modalElement) {
        const focusableElements = modalElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Tab") {
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              (lastElement as HTMLElement).focus();
            } else if (
              !event.shiftKey &&
              document.activeElement === lastElement
            ) {
              event.preventDefault();
              (firstElement as HTMLElement).focus();
            }
          }
        };

        const handleEscapeKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setState(false);
          }
        };

        modalElement.addEventListener("keydown", handleTabKeyPress);
        modalElement.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
          modalElement.removeEventListener("keydown", handleTabKeyPress);
          modalElement.removeEventListener("keydown", handleEscapeKeyPress);
        };
      }
    }
  }, [setState, state, modalRef]);

  return modalRef;
}

import type { KeyboardEvent } from "react";

export type TabOrientation = "horizontal" | "vertical";

export function createTabKeyHandler(
  orientation: TabOrientation = "horizontal",
) {
  return function onItemKeyDown(event: KeyboardEvent<HTMLElement>) {
    const tab = event.currentTarget;
    const parent = tab.parentElement;
    const tablist = parent?.parentElement;
    const key = event.key;
    const allTabs = tablist?.querySelectorAll("button");
    const firstTab = allTabs?.[0];
    const lastTab = allTabs?.[allTabs.length - 1];
    const nextTab = parent?.nextElementSibling?.querySelector("button");
    const prevTab = parent?.previousElementSibling?.querySelector("button");

    const isVertical = orientation === "vertical";

    let flag = false;

    switch (key) {
      case "Down":
      case "ArrowDown":
        if (isVertical) {
          if (nextTab) {
            nextTab.focus();
          } else {
            firstTab?.focus();
          }
          flag = true;
        }
        break;

      case "Up":
      case "ArrowUp":
        if (isVertical) {
          if (prevTab) {
            prevTab.focus();
          } else {
            lastTab?.focus();
          }
          flag = true;
        }
        break;

      case "Right":
      case "ArrowRight":
        if (!isVertical) {
          if (nextTab) {
            nextTab.focus();
          } else {
            firstTab?.focus();
          }
          flag = true;
        }
        break;

      case "Left":
      case "ArrowLeft":
        if (!isVertical) {
          if (prevTab) {
            prevTab.focus();
          } else {
            lastTab?.focus();
          }
          flag = true;
        }
        break;

      case "Home":
      case "PageUp":
        firstTab?.focus();
        flag = true;
        break;

      case "End":
      case "PageDown":
        lastTab?.focus();
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
}

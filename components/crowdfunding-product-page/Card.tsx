import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

export default function Card(props: ComponentProps<"div">) {
  return <div className={cn(["mx-auto w-[calc(100vw-48px)] rounded-lg bg-white shadow-sm lg:w-[730px]", props.className])}>{props.children}</div>;
}

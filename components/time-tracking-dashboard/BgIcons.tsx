import type { CSSProperties } from "react";
import type { ActivityType } from "./Main";

type IconProps = Record<"width" | "height" | "top" | "right", number>;
const sizes: Record<ActivityType, IconProps> = {
  Work: { width: 79, height: 79, top: 11, right: 17 },
  Play: { width: 76, height: 77, top: 5, right: 21.5 },
  Study: { width: 79, height: 79, top: 7.5, right: 17 },
  Exercise: { width: 81, height: 55, top: 1, right: 17 },
  Social: { width: 75, height: 100, top: 15, right: 12 },
  "Self Care": { width: 67, height: 67, top: 11, right: 15 },
};

export default function BgIcons({ activity }: { activity: ActivityType }) {
  const { height, width, top, right } = sizes[activity];
  const filename = activity.toLowerCase().split(" ").join("-");

  return (
    <div className="relative h-[38px] overflow-hidden lg:h-[45px]">
      <svg
        className="absolute right-[--right] top-[--top] w-[--width]"
        viewBox={`0 0 ${width} ${height}`}
        style={
          {
            "--width": `${width}px`,
            "--top": `-${top}px`,
            "--right": `${right}px`,
          } as CSSProperties
        }
      >
        <title>{activity}</title>
        <use
          href={`/time-tracking-dashboard/images/icon-${filename}.svg#icon-${filename}`}
        />
      </svg>
    </div>
  );
}

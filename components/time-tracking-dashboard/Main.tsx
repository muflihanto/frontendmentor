import { useRef, useState } from "react";
import ActivityCard from "./ActivityCard";
import data from "./data.json";
import User from "./User";

const activities = [
  "Work",
  "Play",
  "Study",
  "Exercise",
  "Social",
  "Self Care",
] as const;
export type ActivityData = (typeof data)[number];
export type ActivityType = (typeof activities)[number];
export type TimeUnit = keyof (typeof data)[number]["timeframes"];

// TODO: add tabs keyboard support
export default function Main() {
  const [activeTab, setActiveTab] = useState<TimeUnit>("weekly");
  const timeUnit = useRef({
    weekly: "Last Week",
    daily: "Yesterday",
    monthly: "Last Month",
  });
  const activityStyle = useRef<Record<ActivityType, string>>({
    Work: "bg-tracking-primary-work",
    Play: "bg-tracking-primary-play",
    Study: "bg-tracking-primary-study",
    Exercise: "bg-tracking-primary-exercise",
    Social: "bg-tracking-primary-social",
    "Self Care": "bg-tracking-primary-selfcare",
  });
  return (
    <div className="mx-auto grid w-full max-w-lg grid-rows-[7] gap-y-6 px-6 pb-[80.8px] pt-[81.2px] lg:h-[calc(518px)] lg:max-w-[calc(1110/1440*100vw)] lg:grid-cols-4 lg:grid-rows-2 lg:gap-[30px] lg:p-0">
      <User activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className="contents"
        id="tabpanel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {data.map((el, index) => {
          return (
            <ActivityCard
              key={`${index}-${el.title}`}
              title={el.title as ActivityType}
              timeframes={el.timeframes[activeTab]}
              timeUnit={timeUnit.current[activeTab]}
              bgColor={activityStyle.current[el.title as ActivityType]}
            />
          );
        })}
      </div>
    </div>
  );
}

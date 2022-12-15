import { useRef, useState } from "react";
import data from "./data.json";
import User from "./User";
import ActivityCard from "./ActivityCard";

export default function Main() {
  const [activeTab, setActiveTab] = useState("weekly");
  const timeUnit = useRef({
    weekly: "Last Week",
    daily: "Yesterday",
    monthly: "Last Month",
  });
  const activityBgColor = useRef({
    Work: "bg-tracking-primary-work",
    Play: "bg-tracking-primary-play",
    Study: "bg-tracking-primary-study",
    Exercise: "bg-tracking-primary-exercise",
    Social: "bg-tracking-primary-social",
    "Self Care": "bg-tracking-primary-selfcare",
  });
  return (
    <div className="w-full px-6 pt-[81.2px] pb-[80.8px] mx-auto max-w-lg grid grid-rows-[7] gap-y-6">
      <User
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {data.map((el, index) => {
        return (
          <ActivityCard
            key={index}
            title={el.title}
            timeframes={el.timeframes[activeTab]}
            timeUnit={timeUnit.current[activeTab]}
            bgColor={activityBgColor.current[el.title]}
          />
        );
      })}
    </div>
  );
}

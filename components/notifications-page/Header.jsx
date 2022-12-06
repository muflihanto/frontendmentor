import { useContext } from "react";
import { FontContext } from "./Main";

export default function Header(props) {
  const font = useContext(FontContext);
  return (
    <header className="flex items-end h-16 pb-[14px]">
      <h1 className={`${font} font-extrabold text-notif-neutral-700 text-[20px] leading-[28px] md:text-[24px] md:leading-[24px] md:ml-[2px]`}>Notifications</h1>
      {props.notifCount >= 0 && <div className="px-[11px] text-[16px] leading-[23px] mb-[1px] md:translate-y-[2px] pb-[2px] ml-[10px] md:ml-3 text-white font-extrabold bg-notif-primary-blue rounded-md">{props.notifCount}</div>}
      <button
        type="button"
        onClick={props.markAsRead}
        className="ml-auto text-notif-neutral-600 text-[14px] leading-[26px] focus-visible:underline focus-visible:underline-offset-2 hover:text-notif-neutral-700 focus-visible:outline-none md:text-[16px] md:leading-[24px]"
      >
        Mark all as read
      </button>
    </header>
  );
}

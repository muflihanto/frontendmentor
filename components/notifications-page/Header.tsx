import { useContext } from "react";
import { FontContext } from "./Main";

type HeaderProps = { notifCount: number; markAsRead: () => void };
export default function Header(props: HeaderProps) {
  const font = useContext(FontContext);
  return (
    <header className="flex h-16 items-end pb-[14px]">
      <h1 className={`${font} text-notif-neutral-700 text-[20px] font-extrabold leading-[28px] md:ml-[2px] md:text-[24px] md:leading-[24px]`}>Notifications</h1>
      {props.notifCount >= 0 && <div className="bg-notif-primary-blue mb-[1px] ml-[10px] rounded-md px-[11px] pb-[2px] text-[16px] font-extrabold leading-[23px] text-white md:ml-3 md:translate-y-[2px]">{props.notifCount}</div>}
      <button
        type="button"
        onClick={props.markAsRead}
        className="text-notif-neutral-600 hover:text-notif-neutral-700 ml-auto text-[14px] leading-[26px] focus-visible:underline focus-visible:underline-offset-2 focus-visible:outline-none md:text-[16px] md:leading-[24px]"
      >
        Mark all as read
      </button>
    </header>
  );
}

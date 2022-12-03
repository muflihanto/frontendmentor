export default function Header(props) {
  return (
    <header className="flex items-end h-16 pb-[14px]">
      <h1 className="font-bold text-[20px]">Notifications</h1>
      {props.notifCount > 0 && <div className="px-3 text-[20px] leading-[24px] pb-[4px] ml-2 text-white font-bold bg-blue-800 rounded-md">{props.notifCount}</div>}
      <button
        type="button"
        onClick={props.markAsRead}
        className="ml-auto text-slate-600 text-[14px] leading-[26px] focus-visible:underline focus-visible:underline-offset-2 hover:text-slate-900  focus-visible:outline-none"
      >
        Mark all as read
      </button>
    </header>
  );
}

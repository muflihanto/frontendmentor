export default function ObjectMessage(props) {
  return (
    <a
      href={props.url}
      className="block px-4 pt-[14px] pb-[16px] border rounded-md leading-[18px] border-notif-neutral-400 mt-[11px] text-notif-neutral-600 text-[14px] hover:bg-notif-neutral-200 w-full mb-[1px]"
    >
      {props.message}
    </a>
  );
}

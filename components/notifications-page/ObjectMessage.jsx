export default function ObjectMessage(props) {
  return (
    <a
      href={props.url}
      className="block px-4 pt-[14px] pb-[16px] border rounded-md leading-[18px] border-notif-neutral-400 mt-[11px] text-notif-neutral-600 text-[14px] hover:bg-notif-neutral-200 mb-[1px] md:text-[1rem] md:px-[19px] md:pt-[16px] md:leading-[21px] md:mb-[4px]"
    >
      {props.message}
    </a>
  );
}

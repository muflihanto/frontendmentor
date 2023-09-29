export default function ObjectMessage(props: { url: string; message: string }) {
  return (
    <a
      href={props.url}
      className="border-notif-neutral-400 text-notif-neutral-600 hover:bg-notif-neutral-200 mb-[1px] mt-[11px] block rounded-md border px-4 pb-[16px] pt-[14px] text-[14px] leading-[18px] md:mb-[4px] md:px-[19px] md:pt-[16px] md:text-[1rem] md:leading-[21px]"
    >
      {props.message}
    </a>
  );
}

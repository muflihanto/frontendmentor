// TODO: add keyboard support
export default function ChartBar(props: {
  value: number;
  maxVal: boolean;
  day: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-[10px]">
      <div
        tabIndex={-1}
        className={`${
          props.maxVal
            ? "bg-expenses-primary-cyan hover:bg-[#b4dfe5] focus:bg-[#b4dfe5]"
            : "bg-expenses-primary-red hover:bg-[#ff9b87] focus:bg-[#ff9b87]"
        } peer w-[calc(33/375*100vw)] max-w-[calc(33/375*570px)] rounded-[4px] px-1 py-3 hover:cursor-pointer focus-visible:border-none focus-visible:outline-none`}
        style={{ height: `${props.value * 2.86}px` }}
        aria-describedby={`tooltip-${props.day}`}
      />
      <p
        className="invisible absolute w-[calc(48/375*100vw)] max-w-[calc(48/375*570px)] scale-90 rounded-[4px] bg-expenses-neutral-400 py-1 pb-[7px] pt-[6px] text-center text-[min(18px,calc(10/375*100vw))] font-bold text-expenses-neutral-100 transition-all duration-100 ease-in peer-hover:visible peer-hover:-translate-y-[5px] peer-hover:scale-100 peer-focus:visible peer-focus:-translate-y-[5px] peer-focus:scale-100 "
        style={{ bottom: `${props.value * 2.86 + 29}px` }}
        role="tooltip"
        id={`tooltip-${props.day}`}
      >
        {`$${props.value}`}
      </p>
      <p className="text-[min(15px,calc(12/375*100vw))] leading-[18px] text-expenses-neutral-300 md:leading-[16px]">
        {props.day}
      </p>
    </div>
  );
}

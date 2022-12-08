export default function ChartBar(props) {
  return (
    <div className="flex flex-col items-center gap-[10px] relative">
      <div
        tabIndex="-1"
        className={`${props.maxVal ? "bg-expenses-primary-cyan hover:bg-[#b4dfe5] focus:bg-[#b4dfe5]" : "bg-expenses-primary-red hover:bg-[#ff9b87] focus:bg-[#ff9b87]"} px-1 py-3 w-[calc(33/375*100vw)] max-w-[calc(33/375*570px)] rounded-[4px] hover:cursor-pointer focus-visible:outline-none focus-visible:border-none peer`}
        style={{ height: `${props.value * 2.86}px` }}
      />
      <p
        className="text-[min(18px,calc(10/375*100vw))] absolute w-[calc(48/375*100vw)] max-w-[calc(48/375*570px)] text-center py-1 text-expenses-neutral-100 bg-expenses-neutral-400 rounded-[4px] invisible peer-hover:visible peer-focus:visible transition-all scale-90 peer-hover:scale-100 font-bold pb-[7px] pt-[6px] peer-focus:scale-100 peer-hover:-translate-y-[5px] peer-focus:-translate-y-[5px] ease-in duration-100 "
        style={{ bottom: `${props.value * 2.86 + 29}px` }}
      >
        {`$${props.value}`}
      </p>
      <p className="text-expenses-neutral-300 text-[min(15px,calc(12/375*100vw))] leading-[18px] md:leading-[16px]">{props.day}</p>
    </div>
  );
}

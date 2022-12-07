export default function ChartBar(props) {
  return (
    <div className="flex flex-col items-center gap-[10px] relative">
      <div
        tabIndex="-1"
        className={`${props.maxVal ? "bg-expenses-primary-cyan hover:bg-expenses-primary-cyan/75 focus:bg-expenses-primary-cyan/75" : "bg-expenses-primary-red hover:bg-expenses-primary-red/75 focus:bg-expenses-primary-red/75"} px-1 py-3 w-[33px] rounded-[4px] hover:cursor-pointer focus-visible:outline-none focus-visible:border-none peer`}
        style={{ height: `${props.value * 2.86}px` }}
      />
      <p
        className="text-[9px] absolute w-[33px] text-center py-1 text-expenses-neutral-100 bg-expenses-neutral-400 rounded-sm invisible peer-hover:visible peer-focus:visible transition-all scale-90 peer-hover:scale-100 peer-focus:scale-100 peer-hover:-translate-y-[5px] peer-focus:-translate-y-[5px] ease-in duration-100 "
        style={{ bottom: `${props.value * 2.86 + 30}px` }}
      >
        {props.value}
      </p>
      <p className="text-expenses-neutral-300 text-[12px]">{props.day}</p>
    </div>
  );
}

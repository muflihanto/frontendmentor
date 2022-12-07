export default function Header(props) {
  return (
    <header className="flex pl-5 pr-6 items-center justify-between bg-expenses-primary-red h-[97px] rounded-[10px]">
      <div className="flex flex-col gap-[6px] text-expenses-neutral-200">
        <h2 className="text-[15px] leading-[15px]">My balance</h2>
        <p className="font-bold text-2xl">$921.48</p>
      </div>
      <div className="w-[60px] h-auto pb-[2px]">
        <svg
          viewBox="0 0 72 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
          >
            <circle
              fill="#382314"
              cx="48"
              cy="24"
              r="24"
            />
            <circle
              stroke="#FFF"
              strokeWidth="2"
              cx="24"
              cy="24"
              r="23"
            />
          </g>
        </svg>
      </div>
    </header>
  );
}

export default function Header(props) {
  return (
    <header
      className="flex pl-5 pr-6 items-center justify-between bg-expenses-primary-red h-[97px] md:h-[calc(125/1024*100vh)] md:min-h-[110px] rounded-[10px]
    md:pl-[32px] md:pr-[39px] md:rounded-[20px]"
    >
      <div className="flex flex-col gap-[6px] md:gap-[18px] text-expenses-neutral-200">
        <h2 className="text-[15px] leading-[15px] md:text-[18px]">My balance</h2>
        <p className="text-2xl font-bold md:text-[32px]">$921.48</p>
      </div>
      <div className="w-[60px] h-auto pb-[2px] md:w-[72px] md:pb-0">
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

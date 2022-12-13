export default function Main(props) {
  return (
    <div className="bg-advice-neutral-200 w-[calc(100vw-32px)] flex flex-col items-center justify-center pt-[39px] pb-16 rounded-xl text-advice-primary-cyan px-5 text-center relative shadow-[0px_40px_30px_-5px_rgba(0,0,0,0.05)]">
      <p className="text-[11px] text-advice-primary-green uppercase tracking-[3.25px]">
        Advice <span>{props.id || "#Advice ID goes here"}</span>
      </p>
      <p className="text-[24px] mt-[23px] leading-[33px] tracking-[-0.25px]">{props.quote || '"Advice text goes here"'}</p>
      <svg
        width="295"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-6"
      >
        <g
          fill="none"
          fillRule="evenodd"
        >
          <path
            fill="#4F5D74"
            d="M0 8h122v1H0zM173 8h122v1H173z"
          />
          <g
            transform="translate(138)"
            fill="#CEE3E9"
          >
            <rect
              width="6"
              height="16"
              rx="3"
            />
            <rect
              x="14"
              width="6"
              height="16"
              rx="3"
            />
          </g>
        </g>
      </svg>
      <div className="w-16 aspect-square flex items-center justify-center rounded-full bg-advice-primary-green absolute -bottom-8">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            fill="#202733"
          />
        </svg>
      </div>
    </div>
  );
}

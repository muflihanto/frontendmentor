import Collapsible from "./CollapsibleNavItem";

export default function NavItems({ menuid }: { menuid: string }) {
  return (
    <>
      <ul
        className="flex flex-col gap-[18px] font-semibold text-introdrop-neutral-200/90 lg:h-fit lg:flex-row lg:gap-[40px] lg:text-[14px] lg:font-medium lg:text-introdrop-neutral-200"
        id={menuid}
        // role="menu"
        aria-label="Snap"
      >
        <li>
          <Collapsible
            label="Features"
            items={<FeatureItems />}
            addClass="lg:right-0 pl-[20px] pt-[26px] pl-[21px] "
          />
        </li>
        <li>
          <Collapsible
            label="Company"
            items={<CompanyItems />}
            addClass="lg:left-0 lg:py-[20px] lg:leading-[24px] pt-[20px] pl-[24px] "
          />
        </li>
        <li className="lg:hover:text-introdrop-neutral-300">
          <a href="">Careers</a>
        </li>
        <li className="lg:hover:text-introdrop-neutral-300">
          <a href="">About</a>
        </li>
      </ul>
      <div className="mt-[22px] flex w-full flex-col items-center gap-1 text-[14px] font-medium text-introdrop-neutral-200 lg:ml-auto lg:mt-0 lg:w-fit lg:flex-row lg:gap-[10px] lg:text-[14px]">
        <a
          href=""
          className="block w-full rounded-[14px] text-center leading-10 lg:w-[102px] lg:rounded-xl lg:hover:text-introdrop-neutral-300"
        >
          Login
        </a>
        <a
          href=""
          className="block w-full rounded-[14px] border-2 border-introdrop-neutral-200/75 text-center leading-[38px] lg:w-[102px] lg:rounded-xl lg:border-[2px] lg:hover:border-introdrop-neutral-300 lg:hover:text-introdrop-neutral-300"
        >
          Register
        </a>
      </div>
    </>
  );
}

const FeatureItems = () => {
  const items = [
    { width: 14, height: 16, icon: "todo", label: "Todo List" },
    { width: 16, height: 16, icon: "calendar", label: "Calendar" },
    { width: 13, height: 17, icon: "reminders", label: "Reminders" },
    { width: 16, height: 16, icon: "planning", label: "Planning" },
  ];
  return (
    <>
      {items.map((item, index) => {
        return (
          <li
            key={`${index}-${item.label}`}
            className="lg:hover:text-introdrop-neutral-300"
          >
            <a
              href=""
              className="flex items-start gap-3 lg:items-center lg:gap-[11px]"
            >
              <div className="flex aspect-square w-6 scale-125 items-center justify-center lg:scale-100">
                <svg
                  viewBox={`0 0 ${item.width} ${item.height}`}
                  className="h-4"
                  role="none"
                >
                  <use
                    href={`/intro-section-with-dropdown-navigation/images/icon-${item.icon}.svg#icon-${item.icon}`}
                  />
                </svg>
              </div>
              <span className="h-5">{item.label}</span>
            </a>
          </li>
        );
      })}
    </>
  );
};

const CompanyItems = () => {
  const items = [
    { label: "History" },
    { label: "Our Team" },
    { label: "Blog" },
  ];
  return (
    <>
      {items.map((item, index) => {
        return (
          <li
            key={`${index}-${item.label}`}
            className="lg:hover:text-introdrop-neutral-300"
          >
            <a href="">{item.label}</a>
          </li>
        );
      })}
    </>
  );
};

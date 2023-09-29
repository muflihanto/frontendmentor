const socialType = ["facebook", "instagram", "twitter", "pinterest"] as const;

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center justify-center bg-[#90d4c5] pb-[80px] pt-[65px] lg:pb-[71px] lg:pt-[72px]">
      <svg
        viewBox="0 0 124 24"
        className="w-[170px] -translate-x-[6px] fill-[#2C7566]"
      >
        <use href="/sunnyside-agency-landing-page/images/logo.svg#sunnyside-logo" />
      </svg>
      <div className="mt-[39px] w-[375px] px-2 lg:px-[10px]">
        <ul className="flex justify-around text-[18px] text-[#2C7566]/75">
          <li className="hover:text-sunny-neutral-100 text-center font-bold">
            <a href="">About</a>
          </li>
          <li className="hover:text-sunny-neutral-100 text-center font-bold">
            <a href="">Services</a>
          </li>
          <li className="hover:text-sunny-neutral-100 text-center font-bold">
            <a href="">Projects</a>
          </li>
        </ul>
      </div>
      <div className="mt-[87px] flex -translate-x-[2px] items-center gap-7">
        {socialType.map((soc) => {
          return (
            <SocialLink
              key={soc}
              viewBox={`0 0 20 ${soc === "twitter" ? "17" : "20"}`}
              type={soc}
            />
          );
        })}
      </div>
      <div className="font-barlow text-sunny-primary-cyan-100 absolute bottom-3 w-full text-center text-[11px]">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="hover:text-sunny-neutral-100 font-fraunces font-black text-[#2C7566] hover:drop-shadow-sm"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          className="hover:text-sunny-neutral-100 font-fraunces font-black text-[#2C7566] hover:drop-shadow-sm"
          href="https://github.com/muflihanto"
          target="_blank"
          rel="noreferrer"
        >
          Muflihanto
        </a>
        .
      </div>
    </footer>
  );
}

function SocialLink({ viewBox, type, href }: { viewBox: string; href?: string; type: (typeof socialType)[number] }) {
  return (
    <a
      href={href ?? ""}
      className="hover:fill-sunny-neutral-100 fill-[#2C7566]"
    >
      <svg
        viewBox={viewBox}
        className="w-5"
      >
        <use href={`/sunnyside-agency-landing-page/images/icon-${type}.svg#icon-${type}`} />
      </svg>
    </a>
  );
}

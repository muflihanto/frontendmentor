import Image from "next/image";

export default function Header(props) {
  return (
    <>
      <header className="bg-[url('/sunnyside-agency-landing-page/images/mobile/image-header.jpg')] bg-cover relative flex flex-col justify-center items-center w-full aspect-[375/538] gap-[49px] pt-[11px] bg-sunny-primary-yellow">
        <nav className="absolute z-10 top-0 w-full bg-transparent flex justify-between px-6 h-[5.5rem]">
          <div className="relative w-[124px] h-auto aspect-[31/6]">
            <Image
              src="/sunnyside-agency-landing-page/images/logo.svg"
              alt="Sunnyside Agency Logo"
              className="object-contain"
              fill
            />
          </div>
          <button className="relative w-6 h-auto aspect-[4/3]">
            <Image
              src="/sunnyside-agency-landing-page/images/icon-hamburger.svg"
              alt="Menu"
              className="object-contain"
              fill
            />
          </button>
          {/*
          About
          Services
          Projects
          Contact
        */}
        </nav>
        <h1 className="font-fraunces font-black text-sunny-neutral-100 text-[40px] tracking-[7px] text-center leading-[49px] uppercase">We are creatives</h1>
        <Image
          src="/sunnyside-agency-landing-page/images/icon-arrow-down.svg"
          alt="Arrow Down"
          width={36}
          height={114}
        />
      </header>
    </>
  );
}

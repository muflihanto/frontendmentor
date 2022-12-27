import Image from "next/image";

export default function Header(props) {
  return (
    <>
      <header className="bg-[url('/sunnyside-agency-landing-page/images/mobile/image-header.jpg')] bg-cover relative flex flex-col justify-center items-center w-full aspect-[375/538] gap-[49px] pt-[11px] bg-sunny-primary-yellow">
        <nav className="absolute z-10 top-0 w-full bg-transparent flex justify-between items-center px-6 h-[5.5rem]">
          <div className="relative w-[124px] h-auto aspect-[31/6]">
            <Image
              src="/sunnyside-agency-landing-page/images/logo.svg"
              alt="Sunnyside Agency Logo"
              className="object-contain"
              fill
            />
          </div>
          <button className="relative w-6 h-fit aspect-[4/3] peer/menu focus:opacity-50">
            <Image
              src="/sunnyside-agency-landing-page/images/icon-hamburger.svg"
              alt="Menu"
              className="object-contain"
              fill
            />
          </button>
          <ul className="absolute top-[106px] before:w-0 before:h-0 before:border-t-[25px] before:border-t-transparent before:border-b-[25px] before:border-b-transparent before:content-[''] before:border-r-[25px] before:border-r-sunny-neutral-100 before:absolute before:right-0 before:-top-[25px] pt-[37px] pb-[38px] left-1/2 -translate-x-1/2 bg-sunny-neutral-100 w-[calc(100%-48px)] peer-focus/menu:flex flex-col gap-[27px] justify-center items-center before:z-20 hidden">
            <li className="text-[20px] -tracking-[0.1px] font-barlow text-sunny-neutral-300">
              <a href="">About</a>
            </li>
            <li className="text-[20px] -tracking-[0.1px] font-barlow text-sunny-neutral-300">
              <a href="">Services</a>
            </li>
            <li className="text-[20px] -tracking-[0.1px] font-barlow text-sunny-neutral-300">
              <a href="">Projects</a>
            </li>
            <li className="text-[15px] font-fraunces text-sunny-neutral-500 mt-[2px] mr-[4px] bg-sunny-primary-yellow py-[17px] px-8 text-center rounded-full uppercase font-bold ">
              <a href="">Contact</a>
            </li>
          </ul>
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

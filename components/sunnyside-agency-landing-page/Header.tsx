import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="relative flex aspect-[375/538] w-full flex-col items-center justify-center gap-[49px] bg-sunny-primary-yellow bg-[url('/sunnyside-agency-landing-page/images/mobile/image-header.jpg')] bg-cover pt-[11px] lg:aspect-auto lg:h-screen lg:w-screen lg:gap-[104px] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-header.jpg')] lg:bg-contain lg:bg-bottom lg:pb-[123px] lg:pt-0 lg:font-black">
        <nav className="group absolute top-0 z-10 flex h-[5.5rem] w-full items-center justify-between bg-transparent px-6 lg:h-[7.8rem] lg:px-10">
          <svg
            viewBox="0 0 124 24"
            className="w-[124px] fill-sunny-neutral-100 lg:w-[170px]"
          >
            <title>Sunnyside Logo</title>
            <use href="/sunnyside-agency-landing-page/images/logo.svg#sunnyside-logo" />
          </svg>
          <button
            className="peer/menu relative aspect-[4/3] h-fit w-6 focus:opacity-50 lg:hidden"
            type="button"
          >
            <Image
              src="/sunnyside-agency-landing-page/images/icon-hamburger.svg"
              alt="Menu"
              className="object-contain"
              fill
            />
          </button>
          <ul
            // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
            tabIndex={0}
            className="invisible absolute left-1/2 top-[106px] flex w-[calc(100%-48px)] -translate-x-1/2 flex-col items-center justify-center gap-[27px] bg-sunny-neutral-100 pb-[38px] pt-[37px] before:absolute before:-top-[25px] before:right-0 before:z-20 before:h-0 before:w-0 before:border-b-[25px] before:border-r-[25px] before:border-t-[25px] before:border-b-transparent before:border-r-sunny-neutral-100 before:border-t-transparent before:content-[''] focus-visible:outline-none group-focus-within:visible
            lg:visible lg:static lg:left-0 lg:w-fit lg:translate-x-0 lg:flex-row lg:gap-[49px] lg:bg-transparent lg:px-1 lg:before:hidden"
          >
            <li className="font-barlow text-[20px] -tracking-[0.1px] text-sunny-neutral-300 hover:text-sunny-primary-blue lg:h-[25px] lg:text-[18px] lg:font-medium lg:text-sunny-neutral-100">
              <a href="">About</a>
            </li>
            <li className="font-barlow text-[20px] -tracking-[0.1px] text-sunny-neutral-300 hover:text-sunny-primary-blue lg:h-[25px] lg:text-[18px] lg:font-medium lg:text-sunny-neutral-100">
              <a href="">Services</a>
            </li>
            <li className="font-barlow text-[20px] -tracking-[0.1px] text-sunny-neutral-300 hover:text-sunny-primary-blue lg:h-[25px] lg:text-[18px] lg:font-medium lg:text-sunny-neutral-100">
              <a href="">Projects</a>
            </li>
            <li className="mr-[4px] mt-[2px] rounded-full bg-sunny-primary-yellow px-8 py-[17px] text-center font-fraunces text-[15px] font-bold uppercase text-sunny-neutral-500 hover:cursor-pointer lg:-ml-[2px] lg:mt-0 lg:bg-sunny-neutral-100 lg:font-extrabold lg:-tracking-[0.2px] lg:hover:bg-sunny-neutral-100/50 lg:hover:text-sunny-neutral-100">
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
        <h1
          className="text-center font-fraunces text-[40px] font-black uppercase leading-[49px] tracking-[7px] text-sunny-neutral-100















        lg:text-[55px] lg:tracking-[11px]"
        >
          We are creatives
        </h1>
        <Image
          src="/sunnyside-agency-landing-page/images/icon-arrow-down.svg"
          alt="Arrow Down"
          width={36}
          height={114}
          className="animate-bounce"
        />
      </header>
    </>
  );
}

export default function StandOut(props) {
  return (
    <section className="lg:flex lg:flex-row">
      <header className="bg-[url('/sunnyside-agency-landing-page/images/mobile/image-stand-out.jpg')] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-stand-out.jpg')] bg-cover w-full aspect-[375/312] lg:min-w-[50vw] lg:max-w-[50vw] lg:h-auto lg:aspect-[6/5]" />
      <div className="text-center px-5 bg-sunny-primary-red/[0.03] py-16 lg:flex lg:flex-col lg:py-0 lg:justify-center lg:pr-[161px] lg:pl-[109px] lg:pb-[2px]">
        <h2 className="font-fraunces font-black text-sunny-neutral-500 text-[32px] leading-[39px] lg:text-left lg:text-[40px] lg:leading-[50px] lg:tracking-[0.2px]">Stand out to the right audience</h2>
        <p className="font-bold mt-6 text-[18px] text-sunny-neutral-300 font-barlow leading-[30px] lg:text-left lg:mt-[32px] lg:-tracking-[0.125px]">Using a collaborative formula of designers, researchers, photographers, videographers, and copywriters, we’ll build and extend your brand in digital places. </p>
        <a
          href=""
          className="font-black mt-8 tracking-[0.35px] mr-[2px] block font-fraunces text-sunny-neutral-500 uppercase text-[16px] after:rounded-full relative after:absolute after:bg-sunny-primary-red/25 after:h-[10px] after:w-[140px] after:content-[''] after:left-[50%] after:-translate-x-1/2 after:-z-10 after:top-[15px] hover:after:bg-sunny-primary-red lg:w-[136px] lg:mt-[40px]"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}

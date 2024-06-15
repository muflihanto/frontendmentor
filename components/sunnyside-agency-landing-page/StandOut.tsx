export default function StandOut() {
  return (
    <section className="lg:flex lg:flex-row">
      <header className="aspect-[375/312] w-full bg-[url('/sunnyside-agency-landing-page/images/mobile/image-stand-out.jpg')] bg-cover lg:aspect-[6/5] lg:h-auto lg:min-w-[50vw] lg:max-w-[50vw] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-stand-out.jpg')]" />
      <div className="bg-sunny-primary-red/[0.03] px-5 py-16 text-center lg:flex lg:flex-col lg:justify-center lg:py-0 lg:pb-[2px] lg:pl-[109px] lg:pr-[161px]">
        <h2 className="font-fraunces text-[32px] font-black leading-[39px] text-sunny-neutral-500 lg:text-left lg:text-[40px] lg:leading-[50px] lg:tracking-[0.2px]">
          Stand out to the right audience
        </h2>
        <p className="mt-6 font-barlow text-[18px] font-bold leading-[30px] text-sunny-neutral-300 lg:mt-[32px] lg:text-left lg:-tracking-[0.125px]">
          Using a collaborative formula of designers, researchers,
          photographers, videographers, and copywriters, we’ll build and extend
          your brand in digital places.{" "}
        </p>
        <a
          href=""
          className="relative mr-[2px] mt-8 block font-fraunces text-[16px] font-black uppercase tracking-[0.35px] text-sunny-neutral-500 after:absolute after:left-[50%] after:top-[15px] after:-z-10 after:h-[10px] after:w-[140px] after:-translate-x-1/2 after:rounded-full after:bg-sunny-primary-red/25 after:content-[''] hover:after:bg-sunny-primary-red lg:mt-[40px] lg:w-[136px]"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}

export default function Transform(props) {
  return (
    <section className="lg:flex lg:flex-row-reverse">
      <header className="bg-[url('/sunnyside-agency-landing-page/images/mobile/image-transform.jpg')] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-transform.jpg')] bg-cover w-full aspect-[375/312] lg:min-w-[50vw] lg:max-w-[50vw] lg:h-auto lg:aspect-[6/5]" />
      <div className="text-center px-4 bg-sunny-primary-red/[0.03] py-16">
        <h2 className="font-fraunces font-black text-sunny-neutral-500 text-[32px] leading-[39px]">Transform your brand</h2>
        <p className="mt-6 text-[18px] text-sunny-neutral-300 font-barlow leading-[30px]">We are a full-service creative agency specializing in helping brands grow fast. Engage your clients through compelling visuals that do most of the marketing for you.</p>
        <a
          href=""
          className="font-black mt-8 tracking-[0.35px] mr-[2px] block font-fraunces text-sunny-neutral-500 uppercase text-[16px] after:rounded-full relative after:absolute after:bg-sunny-primary-yellow/25 after:h-[10px] after:w-[140px] after:content-[''] after:left-[50%] after:-translate-x-1/2 after:-z-10 after:top-[15px] hover:after:bg-sunny-primary-yellow"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}

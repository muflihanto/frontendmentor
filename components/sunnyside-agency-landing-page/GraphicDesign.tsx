export default function GraphicDesign() {
  return (
    <div className="flex aspect-[375/600] w-full flex-col justify-end gap-[24px] bg-[url('/sunnyside-agency-landing-page/images/mobile/image-graphic-design.jpg')] bg-cover pb-[57px] text-center lg:aspect-[6/5] lg:h-auto lg:min-w-[50vw] lg:max-w-[50vw] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-graphic-design.jpg')] lg:pb-[58px]">
      <h3 className="font-fraunces text-[28px] font-black leading-[42px] text-sunny-primary-cyan-200 lg:mx-auto lg:w-[400px]">
        Graphic Design
      </h3>
      <p className="px-5 font-barlow text-[16px] font-bold leading-[27px] -tracking-[0.1px] text-sunny-primary-cyan-200 lg:mx-auto lg:w-[380px] lg:leading-[27.5px] lg:text-sunny-primary-cyan-200/75">
        Great design makes you memorable. We deliver artwork that underscores
        your brand message and captures potential clients’ attention.
      </p>
    </div>
  );
}

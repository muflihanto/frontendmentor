export default function Photography() {
  return (
    <div className="flex aspect-[375/600] w-full flex-col justify-end gap-[24px] bg-[url('/sunnyside-agency-landing-page/images/mobile/image-photography.jpg')] bg-cover pb-[57px] text-center lg:aspect-[6/5] lg:h-auto lg:min-w-[50vw] lg:max-w-[50vw] lg:bg-[url('/sunnyside-agency-landing-page/images/desktop/image-photography.jpg')] lg:pb-[58px]">
      <h3 className="pr-3 font-fraunces text-[28px] font-black leading-[42px] text-sunny-primary-blue lg:mx-auto lg:w-[400px] lg:pr-0">
        Photography
      </h3>
      <p className="px-5 font-barlow text-[16px] font-bold leading-[27px] -tracking-[0.1px] text-sunny-primary-blue lg:mx-auto lg:w-[400px] lg:leading-[27.5px]">
        Increase your credibility by getting the most stunning, high-quality
        photos that improve your business image.
      </p>
    </div>
  );
}

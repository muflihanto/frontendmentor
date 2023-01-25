const Hero: React.FC = () => {
  return (
    <div
      className="w-full aspect-[375/650] bg-contain bg-no-repeat lg:bg-[url('/loopstudios-landing-page/images/desktop/image-hero.jpg')] bg-[url('/loopstudios-landing-page/images/mobile/image-hero.jpg')] flex items-center justify-center px-[23px] lg:relative lg:justify-start lg:px-[calc(164/1440*100vw)] lg:items-end lg:pb-36
      lg:before:absolute lg:before:content-[''] lg:before:w-full lg:before:h-full lg:before:bg-loopstudios-primary-black/40 lg:aspect-[144/65] lg:before:z-[1] lg:before:left-0 lg:before:top-0"
    >
      <h1 className="px-6 flex items-center font-light h-[198px] uppercase border-2 text-loopstudios-primary-white border-loopstudios-primary-white font-josefin text-[39px] tracking-[1.4px] leading-[39px] lg:z-[2] lg:h-[280px] lg:w-[652px] lg:text-[70px] lg:px-10 lg:leading-[70px] lg:pb-[4px] lg:tracking-[2.5px]">
        <p>
          Immersive experiences
          <span className="lg:tracking-[4px]"> that deliver</span>
        </p>
      </h1>
    </div>
  );
};

export default Hero;

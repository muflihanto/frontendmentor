const Hero: React.FC = () => {
  return (
    <div className="flex aspect-[375/650] w-full items-center justify-center bg-[url('/loopstudios-landing-page/images/mobile/image-hero.jpg')] bg-contain bg-no-repeat px-[23px] lg:relative lg:aspect-[144/65] lg:items-end lg:justify-start lg:bg-[url('/loopstudios-landing-page/images/desktop/image-hero.jpg')] lg:px-[calc(164/1440*100vw)] lg:pb-36 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:z-[1] lg:before:h-full lg:before:w-full lg:before:bg-loopstudios-primary-black/40 lg:before:content-['']">
      <h1
        className="flex h-[198px] items-center border-2 border-loopstudios-primary-white px-6 font-josefin text-[39px] font-light uppercase leading-[39px] tracking-[1.4px] text-loopstudios-primary-white lg:z-[2] lg:h-[280px] lg:w-[652px] lg:px-10 lg:pb-[4px] lg:text-[70px] lg:leading-[70px] lg:tracking-[2.5px]"
        id="main-heading"
      >
        <p>
          Immersive experiences
          <span className="lg:tracking-[4px]"> that deliver</span>
        </p>
      </h1>
    </div>
  );
};

export default Hero;

import Image from "next/image";

const Interactive = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full mt-[96px] px-6">
      <div className="relative aspect-[654/448] w-[327px]">
        <Image
          alt="A Man Playing Game With VR"
          src="/loopstudios-landing-page/images/mobile/image-interactive.jpg"
          className="object-contain"
          fill
        />
      </div>
      <div className="flex flex-col items-center mt-[46px] px-3">
        <h2 className="font-josefin text-center text-[31.5px] tracking-[1.5px] leading-[32px] uppercase font-light">The leader in interactive VR</h2>
        <p className="mt-[18px] text-center text-[15px] text-loopstudios-primary-grey-100 font-normal leading-[25px]">Founded in 2011, Loopstudios has been producing world-class virtual reality projects for some of the best companies around the globe. Our award-winning creations have transformed businesses through digital experiences that bind to their brand.</p>
      </div>
    </div>
  );
};

export default Interactive;

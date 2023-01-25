import Image from "next/image";

const Interactive = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full mt-[96px] px-6 lg:px-[164px] lg:flex-row lg:justify-start lg:items-end lg:mt-[160px] lg:relative">
      <div className="relative aspect-[654/448] w-[327px] lg:aspect-[732/500] lg:w-auto lg:h-[500px]">
        <Image
          alt="A Man Playing Game With VR"
          src="image-interactive.jpg"
          loader={({ src, width }) => {
            const baseUrl = "/loopstudios-landing-page/images/";
            if (width < 1023) {
              return baseUrl + "mobile/" + src;
            }
            return baseUrl + "desktop/" + src;
          }}
          className="object-contain"
          fill
        />
      </div>
      <div className="flex flex-col items-center mt-[46px] px-3 lg:bg-loopstudios-primary-white lg:items-start lg:justify-end lg:m-0 lg:w-[542px] lg:absolute lg:bottom-0 lg:h-[317px] lg:right-[164px] lg:p-0 lg:pl-[96px]">
        <h2 className="font-josefin text-center text-[31.5px] tracking-[1.5px] leading-[32px] uppercase font-light lg:text-left lg:text-[48px] lg:leading-none">The leader in interactive VR</h2>
        <p className="mt-[18px] text-center text-[15px] text-loopstudios-primary-grey-100 font-normal leading-[25px] lg:text-left lg:mt-[29px]">Founded in 2011, Loopstudios has been producing world-class virtual reality projects for some of the best companies around the globe. Our award-winning creations have transformed businesses through digital experiences that bind to their brand.</p>
      </div>
    </div>
  );
};

export default Interactive;

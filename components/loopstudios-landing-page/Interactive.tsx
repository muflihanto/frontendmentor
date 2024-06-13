import Image from "next/image";

const Interactive = () => {
  return (
    <div className="mt-[96px] flex w-full flex-col items-center justify-start px-6 lg:relative lg:mt-[160px] lg:flex-row lg:items-end lg:justify-start lg:px-[164px]">
      <div className="relative aspect-[654/448] w-[327px] lg:aspect-[732/500] lg:h-[500px] lg:w-auto">
        <Image
          alt="A Man Playing Game With VR"
          src="image-interactive.jpg"
          loader={({ src, width }) => {
            const baseUrl = "/loopstudios-landing-page/images/";
            if (width < 1023) {
              return `${baseUrl}mobile/${src}`;
            }
            return `${baseUrl}desktop/${src}`;
          }}
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-[46px] flex flex-col items-center px-3 lg:absolute lg:bottom-0 lg:right-[164px] lg:m-0 lg:h-[317px] lg:w-[542px] lg:items-start lg:justify-end lg:bg-loopstudios-primary-white lg:p-0 lg:pl-[96px]">
        <h2 className="text-center font-josefin text-[31.5px] font-light uppercase leading-[32px] tracking-[1.5px] lg:text-left lg:text-[48px] lg:leading-none">
          The leader in interactive VR
        </h2>
        <p className="mt-[18px] text-center text-[15px] font-normal leading-[25px] text-loopstudios-primary-grey-100 lg:mt-[29px] lg:text-left">
          Founded in 2011, Loopstudios has been producing world-class virtual
          reality projects for some of the best companies around the globe. Our
          award-winning creations have transformed businesses through digital
          experiences that bind to their brand.
        </p>
      </div>
    </div>
  );
};

export default Interactive;

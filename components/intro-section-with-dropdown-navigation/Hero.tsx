import Image, { type ImageLoader } from "next/image";

const heroLoader: ImageLoader = ({ width, src }) => {
  if (width > 1023) {
    return src + "image-hero-desktop.png";
  }
  return src + "image-hero-mobile.png";
};

export default function Hero() {
  return (
    <div
      className="relative aspect-[375/282] w-full
      lg:aspect-[3/4] lg:w-full lg:max-w-[calc(480/1440*100vw)]"
      // h-[calc(282/375*100vw)] max-h-[calc(282/375*640px)]
    >
      <Image
        loader={heroLoader}
        src="/intro-section-with-dropdown-navigation/images/"
        alt="Hero Image"
        className="object-contain lg:max-w-fit"
        fill
      />
    </div>
  );
}

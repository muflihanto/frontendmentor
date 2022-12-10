import Image from "next/image";

const heroLoader = ({ width, src }) => {
  if (width > 1023) {
    return src + "image-hero-desktop.png";
  }
  return src + "image-hero-mobile.png";
};

export default function Hero() {
  return (
    <div
      className="relative w-full h-[calc(282/375*100vw)] max-h-[calc(282/375*640px)]
    lg:h-[calc(640/1440*100vw)] lg:max-h-[640px]"
    >
      <Image
        loader={heroLoader}
        src="/intro-section-with-dropdown-navigation/images/"
        alt="Hero Image"
        className="object-contain"
        fill
      />
    </div>
  );
}

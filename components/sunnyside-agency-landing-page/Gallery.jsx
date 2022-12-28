import Image from "next/image";

export default function Gallery(props) {
  const images = [
    {
      src: ({ isMobile }) => `${isMobile ? "mobile" : "desktop"}/image-gallery-milkbottles.jpg`,
      alt: "Milk Bottles",
    },
    {
      src: ({ isMobile }) => `${isMobile ? "mobile" : "desktop"}/image-gallery-orange.jpg`,
      alt: "Orange",
    },
    {
      src: ({ isMobile }) => `${isMobile ? "mobile" : "desktop"}/image-gallery-cone.jpg`,
      alt: "Cone",
    },
    {
      src: ({ isMobile }) => `${isMobile ? "mobile" : "desktop"}/image-gallery-sugar-cubes.jpg`,
      alt: "Sugar Cubes",
    },
  ];
  return (
    <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
      {images.map((el, index) => {
        return (
          <div
            className="relative w-full aspect-square lg:aspect-[360/447]"
            key={index}
          >
            <Image
              src="/sunnyside-agency-landing-page/images/"
              alt={el.alt}
              loader={({ src, width }) => {
                if (width > 1023) {
                  return `${src}/${el.src({ isMobile: false })}`;
                }
                return `${src}/${el.src({ isMobile: true })}`;
              }}
              className="object-cover"
              fill
            />
          </div>
        );
      })}
    </div>
  );
}

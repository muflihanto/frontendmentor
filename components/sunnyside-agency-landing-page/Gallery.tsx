import Image from "next/image";

export default function Gallery() {
  const images = [
    {
      src: "milkbottles.jpg",
      alt: "Milk Bottles",
    },
    {
      src: "orange.jpg",
      alt: "Orange",
    },
    {
      src: "cone.jpg",
      alt: "Cone",
    },
    {
      src: "sugar-cubes.jpg",
      alt: "Sugar Cubes",
    },
  ];
  return (
    <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
      {images.map((el, index) => {
        return (
          <div
            className="relative aspect-square w-full lg:aspect-[360/447]"
            key={`${index}-${el.src}`}
          >
            <Image
              src="/sunnyside-agency-landing-page/images"
              alt=""
              loader={({ src, width }) => {
                if (width > 1023) {
                  return `${src}/desktop/image-gallery-${el.src}`;
                }
                return `${src}/mobile/image-gallery-${el.src}`;
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

import Image from "next/image";

export default function Gallery(props) {
  const images = [
    {
      src: "/sunnyside-agency-landing-page/images/mobile/image-gallery-milkbottles.jpg",
      alt: "Milk Bottles",
    },
    {
      src: "/sunnyside-agency-landing-page/images/mobile/image-gallery-orange.jpg",
      alt: "Orange",
    },
    {
      src: "/sunnyside-agency-landing-page/images/mobile/image-gallery-cone.jpg",
      alt: "Cone",
    },
    {
      src: "/sunnyside-agency-landing-page/images/mobile/image-gallery-sugar-cubes.jpg",
      alt: "Sugar Cubes",
    },
  ];
  return (
    <div className="grid grid-cols-2 grid-rows-2">
      {images.map((el, index) => {
        return (
          <div
            className="relative w-full aspect-square"
            key={index}
          >
            <Image
              src={el.src}
              alt={el.alt}
              className="object-cover"
              fill
            />
          </div>
        );
      })}
    </div>
  );
}

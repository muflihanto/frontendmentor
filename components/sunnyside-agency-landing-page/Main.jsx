import Image from "next/image";
import Gallery from "./Gallery";
import GraphicDesign from "./GraphicDesign";
import Photography from "./Photography";
import StandOut from "./StandOut";
import Testimonials from "./Testimonials";
import Transform from "./Transform";

export default function Main() {
  return (
    <>
      <Transform />
      <StandOut />
      <GraphicDesign />
      <Photography />
      <Testimonials />
      <Gallery />
    </>
  );
}

// {
//   /* <Image
//           src="/sunnyside-agency-landing-page/images/mobile/image-header.jpg"
//           alt="Header Image"
//           className="object-contain"
//           fill
//         /> */
// }

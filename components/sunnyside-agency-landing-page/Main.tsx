import Gallery from "./Gallery";
import GraphicDesign from "./GraphicDesign";
import Photography from "./Photography";
import StandOut from "./StandOut";
import Testimonials from "./Testimonials";
import Transform from "./Transform";

export default function Main() {
  return (
    <main aria-labelledby="main-heading" className="contents">
      <h1 id="main-heading" className="sr-only">
        Sunnyside Landing Page
      </h1>
      <Transform />
      <StandOut />
      <div className="lg:flex">
        <GraphicDesign />
        <Photography />
      </div>
      <Testimonials />
      <Gallery />
    </main>
  );
}

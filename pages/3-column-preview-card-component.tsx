import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const TriColumnPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | 3-column preview card component</title>
      </Head>
      <div className="App font-lexend-deca">
        <Main />
        <Footer />
        <Slider basePath="/3-column-preview-card-component/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Sedans
        Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city 
        or on your next road trip.

        SUVs
        Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation 
        and off-road adventures.

        Luxury
        Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury 
        rental and arrive in style.
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-indigo-500 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </footer>
  );
}

export default TriColumnPreview;

import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const FourCardFeature = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Four card feature section</title>
      </Head>
      <div className="App font-poppins relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/four-card-feature-section/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Reliable, efficient delivery
        Powered by Technology

        Our Artificial Intelligence powered tools use millions of project data points 
        to ensure that your project is successful

        Supervisor
        Monitors activity to identify project roadblocks

        Team Builder
        Scans our talent network to create the optimal team for your project

        Karma
        Regularly evaluates our talent to ensure quality

        Calculator
        Uses data from past projects to provide better delivery estimates
      `}
    </>
  );
}

function Footer() {
  return (
    <footer>
      <p className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-indigo-600 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </p>
    </footer>
  );
}

export default FourCardFeature;

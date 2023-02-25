import Head from "next/head";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const ProjectTracking = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Project tracking intro component</title>
      </Head>
      <div className="App font-barlow">
        <Main />
        <Footer />
        <Slider basePath="/project-tracking-intro-component/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Product
        Features
        Pricing
        Login

        New
        Monograph Dashboard

        Powerful insights into your team
        Project planning and time tracking for agile teams

        Schedule a demo
        to see a live preview
      `}
    </>
  );
}

function Footer() {
  return (
    <footer>
      <p className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
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

export default ProjectTracking;

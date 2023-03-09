import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const StatsPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Stats preview card component</title>
      </Head>
      <div className="App font-inter">
        <Main />
        <Footer />
        <Slider basePath="/stats-preview-card-component/design/" />
      </div>
      ;
    </>
  );
};

function Main() {
  return (
    <>
      {`
        Get insights that help your business grow.

        Discover the benefits of data analytics and make better decisions regarding revenue, customer 
        experience, and overall efficiency.

        10k+ companies
        314 templates
        12m+ queries
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)] [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
export default StatsPreview;

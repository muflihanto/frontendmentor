import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const InteractiveRating = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive rating component</title>
      </Head>
      <div className="App font-overpass">
        <Main />
        <Footer />
        <Slider basePath="/interactive-rating-component/design/" />
      </div>
    </>
  );
};

function Main() {
  return (
    <>
      {`
        <!-- Rating state start -->

        How did we do?
      
        Please let us know how we did with your support request. All feedback is appreciated 
        to help us improve our offering!
      
        1 2 3 4 5
      
        Submit
      
        <!-- Rating state end -->
      
        <!-- Thank you state start -->
      
        You selected <!-- Add rating here --> out of 5
      
        Thank you!
      
        We appreciate you taking the time to give a rating. If you ever need more support, 
        don’t hesitate to get in touch!
      
        <!-- Thank you state end -->
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
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

export default InteractiveRating;

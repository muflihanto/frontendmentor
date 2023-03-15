import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function SocialProofSection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Social proof section</title>
      </Head>
      <div className="App font-league-spartan relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/social-proof-section/design/" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        10,000+ of our users love our products.

        We only provide great products combined with excellent customer service.
        See what our satisfied customers are saying about our services.
        
        Rated 5 Stars in Reviews
        Rated 5 Stars in Report Guru
        Rated 5 Stars in BestTech
        
        Colton Smith 
        Verified Buyer
        "We needed the same printed design as the one we had ordered a week prior.
        Not only did they find the original order, but we also received it in time.
        Excellent!"
        
        Irene Roberts 
        Verified Buyer
        "Customer service is always excellent and very quick turn around. Completely
        delighted with the simplicity of the purchase and the speed of delivery."
        
        Anne Wallace 
        Verified Buyer
        "Put an order with this company and can only praise them for the very high
        standard. Will definitely use them again and recommend them to everyone!"
      `}
    </>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-3 z-20 w-full text-center text-[11px] [&_a]:font-bold [&_a]:text-white [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="#">Your Name Here</a>.
    </div>
  );
}

import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function EcommerceProductPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | E-commerce product page</title>
      </Head>
      <div className="App font-kumbh-sans relative min-h-[100svh]">
        <Main />
        <Footer />
        <Slider basePath="/ecommerce-product-page/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
         Collections
         Men
         Women
         About
         Contact
       
         Sneaker Company
       
         Fall Limited Edition Sneakers
       
         These low-profile sneakers are your perfect casual wear companion. Featuring a 
         durable rubber outer sole, they’ll withstand everything the weather can offer.
       
         $125.00
         50%
         $250.00
       
         0
         Add to cart
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}

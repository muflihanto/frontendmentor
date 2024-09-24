import Head from "next/head";
// import Image from "next/image";
import { redHatText } from "../utils/fonts/redHatText";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function ProductListWithCart() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Product list with cart</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-hidden bg-white text-product-list-rose-900 font-red-hat-text ${redHatText.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/product-list-with-cart/design"
          absolutePath="/product-list-with-cart/design/mobile-design-empty.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <main className="p-6">
      <h1 className="font-bold text-[40px] leading-[1.15]">Desserts</h1>
      {/* {`
        Waffle with Berries
        Waffle
        6.50
        Add to Cart

        Vanilla Bean Crème Brûlée
        Crème Brûlée
        7.00
        Add to Cart

        Macaron Mix of Five
        Macaron
        8.00
        Add to Cart

        Classic Tiramisu
        Tiramisu
        5.50
        Add to Cart

        Pistachio Baklava
        Baklava
        4.00
        Add to Cart

        Lemon Meringue Pie
        Pie
        5.00
        Add to Cart

        Red Velvet Cake
        Cake
        4.50
        Add to Cart

        Salted Caramel Brownie
        Brownie
        4.50
        Add to Cart

        Vanilla Panna Cotta
        Panna Cotta
        6.50
        Add to Cart

        Your Cart (<!-- Quantity -->)
        Your added items will appear here
      `} */}
    </main>
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
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}

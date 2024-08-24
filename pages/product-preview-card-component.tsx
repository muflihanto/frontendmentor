import Head from "next/head";
import Image from "next/image";
import { fraunces } from "../utils/fonts/fraunces";
import { montserrat } from "../utils/fonts/montserrat";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const ProductPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Product preview card component</title>
      </Head>
      <div
        className={`App flex h-screen items-center justify-center bg-product-review-primary-cream px-4 py-4 max-[750px]:min-h-[667px] ${fraunces.variable} ${montserrat.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/product-preview-card-component/design/"
          // absolutePath="/product-preview-card-component/design/active-states.jpg"
        /> */}
      </div>
      <style global jsx>{`
        :root {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

function Main() {
  return (
    <>
      <div className="grid aspect-[4/3] h-[56.25vh] min-h-[450px] min-w-[570px] grid-cols-2 grid-rows-1 rounded-[1rem] bg-product-review-neutral-100 shadow-[0_4px_4px_-12px] shadow-product-review-neutral-300 max-[750px]:aspect-[343/611] max-[750px]:h-auto max-[750px]:w-[343px] max-[750px]:min-w-0 max-[750px]:grid-cols-1 max-[750px]:grid-rows-[min(240px,_calc(240/343*(100vw-30px))),auto]">
        <ProductImage />
        <ProductDescription />
      </div>
    </>
  );
}

function ProductImage() {
  return (
    <header className="relative aspect-[2/3] flex-[50%] overflow-hidden rounded-l-[1rem] max-[750px]:aspect-[343/240] max-[750px]:h-full max-[750px]:rounded-none max-[750px]:rounded-t-[1rem]">
      <Image
        src="/product-preview-card-component/images/"
        loader={({ width, src }) =>
          `${src}image-product-${width > 750 ? "desktop" : "mobile"}.jpg`
        }
        alt="Image Product"
        className="object-cover brightness-[.89] contrast-[1.1]"
        fill
      />
    </header>
  );
}

function ProductDescription() {
  return (
    <main className="flex flex-col justify-around overflow-scroll px-[2.3rem] py-[1.2rem] max-[750px]:px-[1.8rem] max-[750px]:py-4">
      <h3 className="font-montserrat text-[0.8rem] font-light uppercase tracking-[.4rem] text-product-review-neutral-300">
        perfume
      </h3>
      <h1 className="-mt-3 font-fraunces text-[2.3rem] font-bold leading-none text-product-review-neutral-300 max-[750px]:-mt-2">
        Gabrielle Essence Eau De Parfum
      </h1>
      <p className="-mt-[6px] font-montserrat font-medium leading-[1.65] text-product-review-neutral-200 max-[750px]:-mt-1 max-[750px]:mb-2">
        A floral, solar and voluptuous interpretation composed by Olivier Polge,
        Perfumer-Creator for the House of CHANEL.
      </p>
      <p className="flex items-center gap-[1.4rem] font-montserrat font-light text-product-review-neutral-300">
        <span className="sr-only">Current price: $149.99</span>
        <span
          className="font-fraunces text-[2.2rem] font-bold leading-none tracking-[.75px] text-product-review-primary-cyan"
          aria-hidden="true"
        >
          $149.99
        </span>
        <span className="sr-only">Original price: $169.99</span>
        <span
          className="font-montserrat text-[13px] font-medium text-product-review-neutral-200 line-through"
          aria-hidden="true"
        >
          $169.99
        </span>
      </p>
      <button
        className="relative flex h-[48px] items-center justify-center gap-3 rounded-[.6rem] bg-product-review-primary-cyan font-montserrat font-bold text-product-review-neutral-100 hover:bg-[hsl(156,42%,18%)]"
        type="button"
      >
        <svg
          viewBox="0 0 15 16"
          className="pointer-events-none h-[17px] object-contain pt-[.5px]"
          aria-hidden="true"
        >
          <use href="/product-preview-card-component/images/icon-cart.svg#icon-cart" />
        </svg>
        <span>Add to Cart</span>
      </button>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center font-montserrat text-[11px] text-product-review-neutral-300 max-[750px]:bottom-1 [&_a]:font-bold [&_a]:text-product-review-primary-cyan [&_a]:underline [&_a]:decoration-product-review-neutral-200 [&_a]:decoration-wavy">
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

export default ProductPreview;

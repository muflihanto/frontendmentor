import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const ProductPreview = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Product preview card component</title>
      </Head>
      <div className="App bg-product-review-primary-cream flex h-screen items-center justify-center px-4 py-4 max-[750px]:min-h-[667px] ">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/product-preview-card-component/design/"
          // absolutePath="/product-preview-card-component/design/active-states.jpg"
        /> */}
      </div>
      <style
        global
        jsx
      >{`
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
      <div className="shadow-product-review-neutral-300 bg-product-review-neutral-100 grid aspect-[4/3] h-[56.25vh] min-h-[450px] min-w-[570px] grid-cols-2 grid-rows-1 rounded-[1rem] shadow-[0_4px_4px_-12px] max-[750px]:aspect-[343/611] max-[750px]:h-auto max-[750px]:w-[343px] max-[750px]:min-w-0 max-[750px]:grid-cols-1 max-[750px]:grid-rows-[min(240px,_calc(240/343*(100vw-30px))),auto]">
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
        loader={({ width, src }) => {
          if (width <= 750) {
            return src + "image-product-mobile.jpg";
          }
          return src + "image-product-desktop.jpg";
        }}
        alt="Image Product"
        className="object-cover brightness-[.89] contrast-[1.1]"
        fill
      />
    </header>
  );
}

function ProductDescription() {
  return (
    <main className="flex flex-col justify-around overflow-scroll px-[2.3rem] py-[1.2rem] max-[750px]:py-4 max-[750px]:px-[1.8rem]">
      <h3 className="font-montserrat text-[0.8rem] font-light uppercase tracking-[.4rem]">perfume</h3>
      <h1 className="font-fraunces text-product-review-neutral-300 -mt-3 text-[2.3rem] font-bold leading-none max-[750px]:-mt-2">Gabrielle Essence Eau De Parfum</h1>
      <p className="font-montserrat text-product-review-neutral-200 -mt-[6px] font-medium leading-[1.65] max-[750px]:-mt-1 max-[750px]:mb-2">A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.</p>
      <p className="font-montserrat text-product-review-neutral-300 flex items-center gap-[1.4rem] font-light">
        <span className="font-fraunces text-product-review-primary-cyan text-[2.2rem] font-bold leading-none tracking-[.75px]">$149.99</span>
        <span className="font-montserrat text-product-review-neutral-200 text-[13px] font-medium line-through">$169.99</span>
      </p>
      <button className="font-montserrat bg-product-review-primary-cyan text-product-review-neutral-100 relative flex h-[48px] items-center justify-center gap-3 rounded-[.6rem] font-bold hover:bg-[hsl(156,42%,18%)]">
        <svg
          viewBox="0 0 15 16"
          className="h-[17px] object-contain pt-[.5px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.383 10.388a2.397 2.397 0 0 0-1.518-2.222l1.494-5.593a.8.8 0 0 0-.144-.695.8.8 0 0 0-.631-.28H2.637L2.373.591A.8.8 0 0 0 1.598 0H0v1.598h.983l1.982 7.4a.8.8 0 0 0 .799.59h8.222a.8.8 0 0 1 0 1.599H1.598a.8.8 0 1 0 0 1.598h.943a2.397 2.397 0 1 0 4.507 0h1.885a2.397 2.397 0 1 0 4.331-.376 2.397 2.397 0 0 0 1.12-2.021ZM11.26 7.99H4.395L3.068 3.196h9.477L11.26 7.991Zm-6.465 6.392a.8.8 0 1 1 0-1.598.8.8 0 0 1 0 1.598Zm6.393 0a.8.8 0 1 1 0-1.598.8.8 0 0 1 0 1.598Z"
            fill="#FFF"
          />
        </svg>
        <span>Add to Cart</span>
      </button>
    </main>
  );
}

function Footer() {
  return (
    <footer className="font-montserrat [&_a]:decoration-product-review-neutral-200 [&_a]:text-product-review-primary-cyan absolute bottom-3 w-full text-center text-[11px] max-[750px]:bottom-1 [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
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

export default ProductPreview;

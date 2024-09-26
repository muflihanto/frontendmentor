import Head from "next/head";
import Image, { type ImageLoaderProps } from "next/image";
import _products from "../public/product-list-with-cart/data.json";
import { redHatText } from "../utils/fonts/redHatText";
import { useState } from "react";
import { cn } from "../utils/cn";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const products = _products as Product[];

// TODO: Add items to the cart and remove them
// TODO: Increase/decrease the number of items in the cart
// TODO: See an order confirmation modal when they click "Confirm Order"
// TODO: Reset their selections when they click "Start New Order"
// TODO: View the optimal layout for the interface depending on their device's screen size
// TODO: See hover and focus states for all interactive elements on the page

export default function ProductListWithCart() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Product list with cart</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] overflow-x-hidden bg-product-list-rose-50 pb-6 font-red-hat-text text-product-list-rose-900 ${redHatText.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/product-list-with-cart/design"
          absolutePath="/product-list-with-cart/design/mobile-design-selected.jpg"
        /> */}
      </div>
    </>
  );
}

type Product = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

function productImageloader({
  src,
  width,
  thumbnail,
}: ImageLoaderProps & { thumbnail?: boolean }): string {
  let base = src.slice(2);

  if (!thumbnail) {
    base = base.slice(0, -13);
    if (width > 1023) {
      base = `${base}desktop.jpg`;
    } else if (width > 767) {
      base = `${base}tablet.jpg`;
    } else {
      base = `${base}mobile.jpg`;
    }
  }

  return `/product-list-with-cart/${base}`;
}

function ListItem(product: Product) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <div className="relative aspect-[327/212] w-full">
        <Image
          alt={product.name}
          src={product.image.thumbnail}
          loader={productImageloader}
          className={cn(
            "rounded-lg object-contain",
            quantity > 0 && "rinng ring-2 ring-product-list-red",
          )}
          fill
        />
        {quantity === 0 ? (
          <button
            className="absolute bottom-0 left-1/2 flex h-[44px] w-[160px] -translate-x-1/2 translate-y-1/2 items-center justify-center gap-2 rounded-full border border-product-list-rose-300 bg-white px-4 text-sm font-semibold"
            type="button"
            onClick={() => {
              setQuantity(1);
            }}
          >
            <svg className="aspect-[21/20] h-5" aria-hidden="true">
              <use href="/product-list-with-cart/assets/images/icon-add-to-cart.svg#add-to-cart" />
            </svg>
            Add to Cart
          </button>
        ) : (
          <div className="absolute bottom-0 left-1/2 flex h-[44px] w-[160px] -translate-x-1/2 translate-y-1/2 items-center justify-between rounded-full bg-product-list-red px-[14px] text-sm font-semibold">
            <button
              className="flex aspect-square w-4 items-center justify-center rounded-full text-white ring-1 ring-product-list-rose-50 hover:bg-white hover:text-product-list-red"
              type="button"
              onClick={() => {
                setQuantity((p) => p - 1);
              }}
            >
              <svg
                className="aspect-[5/1] h-[2px]"
                role="graphics-symbol"
                aria-label="Decrement Quantity"
                aria-hidden="true"
              >
                <use href="/product-list-with-cart/assets/images/icon-decrement-quantity.svg#decrement-quantity" />
              </svg>
            </button>
            <span className="text-product-list-rose-50">{quantity}</span>
            <button
              className="flex aspect-square w-4 items-center justify-center rounded-full text-white ring-1 ring-product-list-rose-50 hover:bg-white hover:text-product-list-red"
              type="button"
              onClick={() => {
                setQuantity((p) => p + 1);
              }}
            >
              <svg
                className="aspect-square h-[10px]"
                role="graphics-symbol"
                aria-label="Increment Quantity"
                aria-hidden="true"
              >
                <use href="/product-list-with-cart/assets/images/icon-increment-quantity.svg#increment-quantity" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <p className="mt-[37px] text-sm text-product-list-rose-500">
        {product.category}
      </p>
      <p className="mt-[2px] font-semibold">{product.name}</p>
      <p className="mt-px font-semibold text-product-list-red">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}

function Main() {
  return (
    <main className="p-6">
      <h1 className="text-[40px] font-bold leading-[1.15]">Desserts</h1>
      <ul className="mb-4 mt-[34px] flex flex-col gap-[23px]">
        {products.map((el) => {
          return (
            <li key={el.name}>
              <ListItem {...el} />
            </li>
          );
        })}
      </ul>
      <div className="mt-[31px] flex min-h-[300px] w-full flex-col items-center bg-white px-6 py-[23px]">
        <h2 className="self-start text-[24px] font-bold text-product-list-red">
          Your Cart (0)
        </h2>
        <svg
          role="graphics-symbol"
          aria-label="Empty Cart"
          className="mt-[38px] aspect-square w-32"
          aria-hidden="true"
        >
          <use href="/product-list-with-cart/assets/images/illustration-empty-cart.svg#empty-cart" />
        </svg>
        <p className="mt-[14px] text-center text-sm font-semibold text-product-list-rose-500">
          Your added items will appear here
        </p>
      </div>
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

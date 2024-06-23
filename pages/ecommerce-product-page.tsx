import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { type CSSProperties, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "../components/ecommerce-product-page/CartController";
import { kumbhSans } from "../utils/fonts/kumbhSans";

const CartController = dynamic(
  import("../components/ecommerce-product-page/CartController"),
  { ssr: false },
);
const MobileMenu = dynamic(
  import("../components/ecommerce-product-page/MobileMenu"),
  { ssr: false },
);
const Lightbox = dynamic(
  import("../components/ecommerce-product-page/Lightbox"),
  { ssr: false },
);
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * TODO: View the optimal layout for the site depending on their device's screen size
 */

export interface Product {
  name: string;
  brand: string;
  images: string[];
  thumbnails: string[];
  originalPrice: number;
  price: number;
  discount: number;
  description: string;
}

export type CartItem = Pick<Product, "name" | "thumbnails" | "price"> & {
  count: number;
};

export const productCountAtom = atom(0);
export const productAtom = atom<Product>({
  discount: 50,
  images: [
    "/ecommerce-product-page/images/image-product-1.jpg",
    "/ecommerce-product-page/images/image-product-2.jpg",
    "/ecommerce-product-page/images/image-product-3.jpg",
    "/ecommerce-product-page/images/image-product-4.jpg",
  ],
  name: "Fall Limited Edition Sneakers",
  brand: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  originalPrice: 250,
  price: 125,
  thumbnails: [
    "/ecommerce-product-page/images/image-product-1-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-2-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-3-thumbnail.jpg",
    "/ecommerce-product-page/images/image-product-4-thumbnail.jpg",
  ],
});
export const cartOpenAtom = atom(false);
export const menuOpenAtom = atom(false);
export const lightboxOpenAtom = atom({ open: false, position: 0 });

export type Nav = {
  text: string;
  href?: string;
};
export const navs: Nav[] = [
  { text: "Collections" },
  { text: "Men" },
  { text: "Women" },
  { text: "About" },
  { text: "Contact" },
];

export default function EcommerceProductPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | E-commerce product page</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] font-kumbh-sans ${kumbhSans.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/ecommerce-product-page/design"
          // absolutePath="/ecommerce-product-page/design/mobile-design-basket-empty.jpg"
          absolutePath="/ecommerce-product-page/design/active-states-lightbox.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const currentProduct = useAtomValue(productAtom);

  return (
    <div className="pb-[88px] lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-[28px] lg:px-[165px] lg:pt-[91px]">
      <PhotoSlide product={currentProduct} />
      <ProductDetail product={currentProduct} />
      <Lightbox product={currentProduct} />
    </div>
  );
}

function Header() {
  const setCartOpen = useSetAtom(cartOpenAtom);
  const cartItem = useAtomValue(cartAtom);
  const setMenuOpen = useSetAtom(menuOpenAtom);

  return (
    <header className="flex h-[68px] items-center px-6 pb-[8px] lg:relative lg:h-[112px] lg:px-[165px]">
      <button
        className="mt-[2px] flex h-6 w-6 -translate-x-1 items-center justify-center rounded lg:hidden"
        onClick={() => {
          setMenuOpen(true);
        }}
        type="button"
      >
        <svg viewBox="0 0 16 15" className="w-4">
          <title>Menu</title>
          <use href="/ecommerce-product-page/images/icon-menu.svg#icon-menu" />
        </svg>
      </button>
      <MobileMenu navs={navs} />
      <Logo className="ml-2 lg:ml-0 lg:mt-[2px]" />
      <nav className="ml-14 text-[15px] text-ecommerce-neutral-400 max-lg:hidden">
        <ul className="flex gap-[32.75px] tracking-[.1px]">
          {navs.map((nav, index) => {
            const { text, href } = nav;
            return (
              <li
                key={`${index}-${nav.text}`}
                className="hover:relative hover:text-ecommerce-neutral-600 hover:before:absolute hover:before:bottom-[-49px] hover:before:left-0 hover:before:z-20 hover:before:h-1 hover:before:w-full hover:before:bg-ecommerce-primary-200 hover:before:content-['']"
              >
                <a href={href ?? ""} className="">
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        className="group relative ml-auto mt-[4px] flex h-6 w-6 items-center justify-center rounded lg:mt-[3px]"
        id="cart-toggle"
        onClick={() => {
          setCartOpen((c) => !c);
        }}
        type="button"
      >
        <svg
          viewBox="0 0 22 20"
          className={`w-[22px] group-hover:fill-ecommerce-neutral-600 ${
            cartItem.length === 0
              ? "fill-[#69707D]"
              : "fill-ecommerce-neutral-600"
          }`}
        >
          <title>Cart</title>
          <use href="/ecommerce-product-page/images/icon-cart.svg#icon-cart" />
        </svg>
        {cartItem.length !== 0 && (
          <span className="absolute -right-[5px] -top-1 flex h-[13px] w-5 items-center justify-center rounded-full bg-ecommerce-primary-200 text-[10px] font-bold text-ecommerce-neutral-100">
            {cartItem.length}
          </span>
        )}
      </button>
      <button
        className="relative ml-[21px] mt-[2px] h-6 w-6 rounded-full p-2 hover:ring hover:ring-ecommerce-primary-200 lg:ml-[45px] lg:h-[50px] lg:w-[50px]"
        type="button"
      >
        <Image
          src={"/ecommerce-product-page/images/image-avatar.png"}
          className="object-contain"
          alt="User's avatar"
          fill
        />
      </button>
      <hr className="absolute bottom-0 left-1/2 w-[calc(100%-330px)] -translate-x-1/2 border-t max-lg:hidden" />
    </header>
  );
}

function PhotoSlide({ product }: { product: Product }) {
  const [leftPos, setLeftPos] = useState(0);
  const setOpen = useSetAtom(lightboxOpenAtom);

  return (
    <div>
      <div
        className="relative mx-auto h-[calc(100vw-375px+300px)] max-h-[445px] w-full max-w-[445px] overflow-hidden bg-ecommerce-primary-200 lg:rounded-2xl"
        id="product-images-slider"
        aria-roledescription="carousel"
        aria-label="Product images slider"
      >
        <button
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ecommerce-primary-100 p-[14px] lg:hidden"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 0 ? p - 1 : 3;
            });
          }}
          type="button"
          aria-controls="slider-items"
        >
          <svg viewBox="0 0 12 18" className="w-[12px] stroke-[4px]">
            <title>Prev</title>
            <use href="/ecommerce-product-page/images/icon-previous.svg#icon-previous" />
          </svg>
        </button>
        <div
          className="relative left-0 flex h-full w-[400%] translate-x-[var(--translate)] gap-0 transition-all duration-150"
          style={
            {
              "--translate": `calc(${leftPos} * -${
                100 / product.images.length
              }%)`,
            } as CSSProperties
          }
          id="slider-items"
        >
          {product.images.map((img, index) => {
            return (
              <div
                className="relative h-full w-[100%]"
                key={img}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${product.images.length}`}
              >
                <button
                  className="relative z-10 flex h-full w-full items-center justify-center opacity-0 max-lg:hidden"
                  onClick={() => {
                    setOpen({ open: true, position: index });
                  }}
                  type="button"
                  aria-controls="product-lightbox"
                />
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
        <button
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ecommerce-primary-100 p-[14px] lg:hidden"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 3 ? p + 1 : 0;
            });
          }}
          type="button"
          aria-controls="slider-items"
        >
          <svg viewBox="0 0 13 18" className="w-[13px] stroke-[4px]">
            <title>Next</title>
            <use href="/ecommerce-product-page/images/icon-next.svg#icon-next" />
          </svg>
        </button>
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-[445px] justify-between max-lg:hidden">
        {product.thumbnails.map((thumb, index) => {
          return (
            <button
              key={thumb}
              className={`relative h-[88px] w-[88px] overflow-hidden rounded-[10px] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:z-10 hover:before:h-full hover:before:w-full hover:before:bg-white/50 hover:before:content-[''] ${
                leftPos === index &&
                "ring-2 ring-ecommerce-primary-200 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-white/75 before:content-[''] hover:before:bg-white/75"
              }`}
              onClick={() => {
                setLeftPos(index);
              }}
              type="button"
              aria-controls="slider-items"
            >
              <Image
                src={thumb}
                alt={`Product Thumbnail ${index + 1}`}
                className="object-contain"
                fill
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full max-w-[445px] px-6 pt-[21px] lg:px-0 lg:pt-[59px]">
      <p
        className="text-[12px] font-bold uppercase tracking-[1.7px] text-ecommerce-primary-200/80 lg:text-[14px] lg:tracking-[1.2px]"
        aria-label="Brand name"
      >
        {product.brand}
      </p>
      <h1
        className="mt-[13px] text-[28px] font-bold leading-[32px] text-ecommerce-neutral-500 lg:mt-[17px] lg:text-[44px] lg:leading-[48px]"
        aria-label="Product name"
      >
        {product.name}
      </h1>
      <p
        className="mt-[16px] text-[15px] leading-[25px] tracking-[0.02px] text-ecommerce-neutral-400 lg:mt-[35px] lg:text-[16px] lg:leading-[26px] lg:tracking-[0.075px]"
        aria-label="Product description"
      >
        {product.description}
      </p>
      <div className="mt-[21px] flex items-center lg:flex-col lg:items-start lg:gap-1">
        <p className="flex items-center lg:px-[1px]">
          <span
            className="text-[28px] font-bold tracking-[1px] text-ecommerce-neutral-500"
            aria-label="Current Price"
          >
            ${product.price.toFixed(2)}
          </span>
          <span
            className="ml-[16px] mt-[3px] flex h-[27px] w-[50px] justify-center rounded bg-ecommerce-primary-100 pt-[1px] font-bold tracking-[0.5px] text-ecommerce-primary-200"
            aria-label="Discount Value"
          >
            {product.discount}%
          </span>
        </p>
        <p
          className="ml-auto px-[2px] pb-[2px] font-bold tracking-[.25px] text-ecommerce-neutral-300 line-through lg:ml-0"
          aria-label="Original Price"
        >
          ${product.originalPrice.toFixed(2)}
        </p>
      </div>
      <CartController product={product} />
    </div>
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

function Logo({
  size = 138,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      style={
        {
          "--size": `${size}px`,
        } as CSSProperties
      }
      viewBox="0 0 138 20"
      className={`w-[var(--size)] ${className}`}
    >
      <title>Logo</title>
      <use href="/ecommerce-product-page/images/logo.svg#logo" />
    </svg>
  );
}

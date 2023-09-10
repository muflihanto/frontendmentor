import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CSSProperties, useEffect, useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { cartAtom } from "../components/ecommerce-product-page/CartController";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
const CartController = dynamic(import("../components/ecommerce-product-page/CartController"), { ssr: false });
const MobileMenu = dynamic(import("../components/ecommerce-product-page/MobileMenu"), { ssr: false });
const Lightbox = dynamic(import("../components/ecommerce-product-page/Lightbox"), { ssr: false });

/**
 * TODO:
 * - View the optimal layout for the site depending on their device's screen size
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
  images: ["/ecommerce-product-page/images/image-product-1.jpg", "/ecommerce-product-page/images/image-product-2.jpg", "/ecommerce-product-page/images/image-product-3.jpg", "/ecommerce-product-page/images/image-product-4.jpg"],
  name: "Fall Limited Edition Sneakers",
  brand: "Sneaker Company",
  description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  originalPrice: 250,
  price: 125,
  thumbnails: ["/ecommerce-product-page/images/image-product-1-thumbnail.jpg", "/ecommerce-product-page/images/image-product-2-thumbnail.jpg", "/ecommerce-product-page/images/image-product-3-thumbnail.jpg", "/ecommerce-product-page/images/image-product-4-thumbnail.jpg"],
});
export const cartOpenAtom = atom(false);
export const menuOpenAtom = atom(false);
export const lightboxOpenAtom = atom({ open: false, position: 0 });

export type Nav = {
  text: string;
  href: string;
};
export const navs: Nav[] = [
  {
    text: "Collections",
    href: "",
  },
  {
    text: "Men",
    href: "",
  },
  {
    text: "Women",
    href: "",
  },
  {
    text: "About",
    href: "",
  },
  {
    text: "Contact",
    href: "",
  },
];

export default function EcommerceProductPage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | E-commerce product page</title>
      </Head>
      <div className="App [&_*]:font-kumbh-sans relative min-h-[100svh]">
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
      >
        <svg
          viewBox="0 0 16 15"
          className="w-4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
            fill="#69707D"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <MobileMenu navs={navs} />
      <Logo className="ml-2 lg:ml-0 lg:mt-[2px]" />
      <nav className="text-ecommerce-neutral-400 ml-14 text-[15px] max-lg:hidden">
        <ul className="flex gap-[32.75px] tracking-[.1px]">
          {navs.map((nav, index) => {
            const { text, href } = nav;
            return (
              <li
                key={index}
                className="hover:before:bg-ecommerce-primary-200 hover:text-ecommerce-neutral-600 hover:relative hover:before:absolute hover:before:bottom-[-49px] hover:before:left-0 hover:before:z-20 hover:before:h-1 hover:before:w-full hover:before:content-['']"
              >
                <a
                  href={href}
                  className=""
                >
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
      >
        <svg
          viewBox="0 0 22 20"
          className={`group-hover:fill-ecommerce-neutral-600 w-[22px] ${cartItem.length === 0 ? "fill-[#69707D]" : "fill-ecommerce-neutral-600"}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fillRule="nonzero"
          />
        </svg>
        {cartItem.length !== 0 && <span className="bg-ecommerce-primary-200 text-ecommerce-neutral-100 absolute -right-[5px] -top-1 flex h-[13px] w-5 items-center justify-center rounded-full text-[10px] font-bold">{cartItem.length}</span>}
      </button>
      <button className="hover:ring-ecommerce-primary-200 relative ml-[21px] mt-[2px] h-6 w-6 rounded-full p-2 hover:ring lg:ml-[45px] lg:h-[50px] lg:w-[50px]">
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
      <div className="bg-ecommerce-primary-200 relative mx-auto h-[calc(100vw-375px+300px)] max-h-[445px] w-full max-w-[445px] overflow-hidden lg:rounded-2xl">
        <button
          className="bg-ecommerce-primary-100 absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full p-[14px] lg:hidden"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 0 ? p - 1 : 3;
            });
          }}
        >
          <svg
            viewBox="0 0 12 18"
            className="w-[12px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1 3 9l8 8"
              stroke="#1D2026"
              strokeWidth={4}
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div
          className="relative left-0 flex h-full w-[400%] translate-x-[var(--translate)] gap-0 transition-all duration-150"
          style={
            {
              "--translate": `calc(${leftPos} * -${100 / product.images.length}%)`,
            } as CSSProperties
          }
        >
          {product.images.map((img, index) => {
            return (
              <div
                className="relative h-full w-[100%]"
                key={index}
              >
                <button
                  className="relative z-10 flex h-full w-full items-center justify-center opacity-0 max-lg:hidden"
                  onClick={() => {
                    setOpen({ open: true, position: index });
                  }}
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
          className="bg-ecommerce-primary-100 absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full p-[14px] lg:hidden"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 3 ? p + 1 : 0;
            });
          }}
        >
          <svg
            viewBox="0 0 13 18"
            className="w-[13px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2 1 8 8-8 8"
              stroke="#1D2026"
              strokeWidth={4}
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-[445px] justify-between max-lg:hidden">
        {product.thumbnails.map((thumb, index) => {
          return (
            <button
              key={index}
              className={`relative h-[88px] w-[88px] overflow-hidden rounded-[10px] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:z-10 hover:before:h-full hover:before:w-full hover:before:bg-white/50 hover:before:content-[''] ${
                leftPos === index && "ring-ecommerce-primary-200 ring-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-white/75 before:content-[''] hover:before:bg-white/75"
              }`}
              onClick={() => {
                setLeftPos(index);
              }}
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
      <p className="text-ecommerce-primary-200/80 text-[12px] font-bold uppercase tracking-[1.7px] lg:text-[14px] lg:tracking-[1.2px]">{product.brand}</p>
      <h1 className="text-ecommerce-neutral-500 mt-[13px] text-[28px] font-bold leading-[32px] lg:mt-[17px] lg:text-[44px] lg:leading-[48px]">{product.name}</h1>
      <p className="text-ecommerce-neutral-400 mt-[16px] text-[15px] leading-[25px] tracking-[0.02px] lg:mt-[35px] lg:text-[16px] lg:leading-[26px] lg:tracking-[0.075px]">{product.description}</p>
      <div className="mt-[21px] flex items-center lg:flex-col lg:items-start lg:gap-1">
        <p className="flex items-center lg:px-[1px]">
          <span className="text-ecommerce-neutral-500 text-[28px] font-bold tracking-[1px]">${product.price.toFixed(2)}</span>
          <span className="text-ecommerce-primary-200 bg-ecommerce-primary-100 ml-[16px] mt-[3px] flex h-[27px] w-[50px] justify-center rounded pt-[1px] font-bold tracking-[0.5px]">{product.discount}%</span>
        </p>
        <p className="text-ecommerce-neutral-300 ml-auto px-[2px] pb-[2px] font-bold tracking-[.25px] line-through lg:ml-0">${product.originalPrice.toFixed(2)}</p>
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

function Logo({ size = 138, className }: { size?: number; className?: string }) {
  return (
    <svg
      style={
        {
          "--size": size + "px",
        } as CSSProperties
      }
      viewBox="0 0 138 20"
      className={`w-[var(--size)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.217 20c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.35-.053c-2.7-.405-3.18-.788-3.18-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.281v-.133c0-2.389-1.35-5.238-7.774-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.223 4.675.21.028.433.054.659.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.797 0-3.784-.593-3.784-1.92v-.134H.002L0 14.926v.317c.008.79.118 1.913 1.057 2.862C2.303 19.362 4.712 20 8.217 20Zm13.21 0v-7.49c0-2.104.547-4.423 4.176-4.423 3.915 0 3.778 2.777 3.768 4.042V20h4.18v-7.768c0-2.264-.176-7.766-6.732-7.766-2.778 0-4.192.911-5.195 2.28h-.197V4.467H17.22V20h4.207Zm21.959 0c5.094 0 7.787-2.07 8.217-5.405H47.53c-.386 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.056-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.099-9.574h-8.188c.486-1.574 1.764-2.431 4.089-2.431 2.994 0 3.755 1.267 4.099 2.431ZM70.499 20V4.457H66.29V6.74h-.176c-1.053-1.377-2.809-2.283-5.677-2.283-6.433 0-7.225 5.293-7.253 7.635v.137c0 2.092.732 7.771 7.241 7.771 2.914 0 4.684-.818 5.734-2.169h.131V20H70.5Zm-8.854-3.623c-3.996 0-4.447-3.032-4.447-4.148 0-1.21.426-4.148 4.455-4.148 3.631 0 4.374 2.044 4.374 4.148 0 2.35-.742 4.148-4.382 4.148ZM88.826 20l-6.529-9.045 6.588-6.488h-5.827l-6.836 6.756V0h-4.187v19.954h4.187V16.94l3.02-2.976L83.6 20h5.226Zm9.9 0c5.094 0 7.786-2.07 8.217-5.405h-4.074c-.387 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.057-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.098-9.574h-8.187c.485-1.574 1.763-2.431 4.089-2.431 2.994 0 3.755 1.267 4.098 2.431ZM112.76 20v-6.97c0-2.103.931-4.542 4.05-4.542 1.33 0 2.393.236 2.785.346l.67-3.976c-.728-.16-1.626-.392-2.757-.392-2.665 0-3.622.794-4.486 2.282h-.262V4.466h-4.21V20h4.21Zm17.221 0c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.349-.053c-2.701-.405-3.181-.788-3.181-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.282v-.133c0-2.389-1.35-5.238-7.775-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.224 4.675.21.028.432.054.658.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.796 0-3.784-.593-3.784-1.92v-.134h-4.319l-.001.301v.317c.008.79.117 1.913 1.056 2.862 1.246 1.257 3.655 1.895 7.16 1.895Z"
        fill="#1D2026"
        fillRule="nonzero"
      />
    </svg>
  );
}

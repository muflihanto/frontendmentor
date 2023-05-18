import { createPortal } from "react-dom";
import { cartOpenAtom, productCountAtom, type Product, type CartItem } from "../../pages/ecommerce-product-page";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { useEffectOnce, useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import { atomWithStorage } from "jotai/utils";
import { Transition } from "@headlessui/react";

export const cartAtom = atomWithStorage<CartItem[]>("cartItem", []);

export default function CartController({ product }: { product: Product }) {
  const [productCount, setProductCount] = useAtom(productCountAtom);
  const setCartItem = useSetAtom(cartAtom);
  const cartOpen = useAtomValue(cartOpenAtom);

  return (
    <div className="mt-[21px] lg:mt-[33px] lg:grid lg:grid-cols-[auto,272px] lg:grid-rows-1 lg:gap-x-4">
      <div className="bg-ecommerce-neutral-200 flex h-[56px] items-center justify-between rounded-[10px] px-[10px] lg:px-[2px]">
        <button
          className="text-ecommerce-primary-200 flex h-10 w-10 items-center justify-center rounded pb-2 text-[28px] font-bold leading-none"
          disabled={productCount === 0}
          onClick={() => {
            productCount !== 0 && setProductCount((p) => p - 1);
          }}
        >
          -
        </button>
        <div className="text-ecommerce-neutral-600 font-bold">{productCount}</div>
        <button
          className="text-ecommerce-primary-200 flex h-10 w-10 items-center justify-center rounded pb-2 text-[28px] font-bold leading-none"
          onClick={() => {
            setProductCount((p) => p + 1);
          }}
        >
          +
        </button>
      </div>
      <button
        className="bg-ecommerce-primary-200 mt-4 flex h-[56px] w-full items-center justify-center gap-4 rounded-[10px] shadow-[0px_10px_50px_theme(colors.ecommerce.primary.200/30%)] lg:mt-0"
        onClick={() => {
          const count = productCount;
          if (count > 0) {
            const { name, thumbnails, price } = product;
            setCartItem((p) => [...p, { count, name, thumbnails, price }]);
            setProductCount(0);
          }
        }}
      >
        <svg
          viewBox="0 0 22 20"
          className="fill-ecommerce-primary-100 w-[18px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            fillRule="nonzero"
          />
        </svg>
        <div className="text-ecommerce-primary-100 font-bold">Add to cart</div>
      </button>
      {createPortal(
        <Transition show={cartOpen}>
          <CartPopup />
        </Transition>,
        document.body
      )}
    </div>
  );
}

function CartPopup() {
  const ref = useRef(null);
  const setCartOpen = useSetAtom(cartOpenAtom);
  const [cartItem, setCartItem] = useAtom(cartAtom);

  useEffectOnce(() => {
    if (ref.current) {
      (ref.current as unknown as HTMLDivElement)?.focus();
    }
  });

  useOnClickOutside(ref, (e) => {
    const { target }: any = e;
    if (![target.id, target.parentElement.id, target.parentElement.parentElement.id].includes("cart-toggle")) {
      setCartOpen(false);
    }
  });

  return (
    <Transition.Child
      enter="transition-all duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={`bg-ecommerce-neutral-100 [&_*]:font-kumbh-sans absolute left-1/2 top-[76px] z-50 w-[calc(100vw-15px)] max-w-[360px] -translate-x-1/2 rounded-[10px] shadow-2xl sm:left-auto sm:right-[8px] sm:translate-x-0 lg:right-[88px] lg:top-[94px] ${cartItem.length === 0 ? "h-[256px]" : "min-h-[256px]"}`}
      ref={ref}
      tabIndex={1}
    >
      <h2 className={`text-ecommerce-neutral-500 flex h-[68px] w-full items-center border-b px-6 font-bold ${cartItem.length === 0 ? "pb-[2px]" : "pb-2"}`}>Cart</h2>
      <div className={`flex h-[calc(100%-68px)] w-full flex-col items-center pb-3 ${cartItem.length === 0 ? "justify-center" : "pb-8 pt-6"}`}>
        {cartItem.length > 0 ? (
          <div className="w-full px-6">
            <div className="flex flex-col gap-6">
              {cartItem.map((c, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full items-center"
                  >
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded">
                      <Image
                        src={c.thumbnails[0]}
                        alt="Product thumbnail"
                        className="object-contain"
                        fill
                      />
                    </div>
                    <div className="text-ecommerce-neutral-400 ml-4 flex flex-col gap-[10px] pb-[2px]">
                      <p className="leading-none">{c.name}</p>
                      <p className="leading-none tracking-[0.4px]">
                        ${c.price.toFixed(2)} x {c.count} <span className="text-ecommerce-neutral-600 pl-[2px] font-bold tracking-[0.6px]">${(c.price * c.count).toFixed(2)}</span>
                      </p>
                    </div>
                    <button
                      className="ml-auto"
                      onClick={() => {
                        setCartItem((prev) => {
                          return prev.filter((item, idx) => {
                            return idx !== index;
                          });
                        });
                      }}
                      tabIndex={1}
                    >
                      <svg
                        className="mt-[1px] w-[14px]"
                        viewBox="0 0 14 16"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs>
                          <path
                            d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                            id="a"
                          />
                        </defs>
                        <use
                          fill="#C3CAD9"
                          fillRule="nonzero"
                          xlinkHref="#a"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className="bg-ecommerce-primary-200 text-ecommerce-neutral-100 mt-[26px] flex h-[56px] w-full items-center justify-center rounded-[10px] font-bold"
              tabIndex={1}
            >
              Checkout
            </button>
          </div>
        ) : (
          <p className="text-ecommerce-neutral-500/80 font-medium">Your cart is empty.</p>
        )}
      </div>
    </Transition.Child>
  );
}

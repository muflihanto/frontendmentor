import { createPortal } from "react-dom";
import {
  cartOpenAtom,
  productCountAtom,
  type Product,
  type CartItem,
} from "../../pages/ecommerce-product-page";
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
      <div className="flex h-[56px] items-center justify-between rounded-[10px] bg-ecommerce-neutral-200 px-[10px] lg:px-[2px]">
        <button
          className="flex h-10 w-10 items-center justify-center rounded hover:opacity-50 disabled:cursor-default disabled:hover:opacity-100"
          disabled={productCount === 0}
          onClick={() => {
            productCount !== 0 && setProductCount((p) => p - 1);
          }}
          type="button"
        >
          <svg viewBox="0 0 12 4" className="w-3">
            <title>Decrease</title>
            <use href="/ecommerce-product-page/images/icon-minus.svg#icon-minus" />
          </svg>
        </button>
        <div
          className="font-bold text-ecommerce-neutral-600"
          aria-label="Quantity"
        >
          {productCount}
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded hover:opacity-50 disabled:cursor-default disabled:hover:opacity-100"
          onClick={() => {
            setProductCount((p) => p + 1);
          }}
          type="button"
        >
          <svg viewBox="0 0 12 12" className="w-3">
            <title>Increase</title>
            <use href="/ecommerce-product-page/images/icon-plus.svg#icon-plus" />
          </svg>
        </button>
      </div>
      <button
        className="mt-4 flex h-[56px] w-full items-center justify-center gap-4 rounded-[10px] bg-ecommerce-primary-200 shadow-[0px_10px_50px_theme(colors.ecommerce.primary.200/30%)] hover:bg-ecommerce-primary-200/70 lg:mt-0"
        onClick={() => {
          const count = productCount;
          if (count > 0) {
            const { name, thumbnails, price } = product;
            setCartItem((p) => [...p, { count, name, thumbnails, price }]);
            setProductCount(0);
          }
        }}
        type="button"
      >
        <svg
          viewBox="0 0 22 20"
          className="w-[18px] fill-ecommerce-primary-100"
          role="none"
        >
          <use href="/ecommerce-product-page/images/icon-cart.svg#icon-cart" />
        </svg>
        <div className="font-bold text-ecommerce-primary-100">Add to cart</div>
      </button>
      {createPortal(
        <Transition show={cartOpen}>
          <CartPopup />
        </Transition>,
        document.body,
      )}
    </div>
  );
}

function CartPopup() {
  const ref = useRef<HTMLDivElement>(null);
  const setCartOpen = useSetAtom(cartOpenAtom);
  const [cartItem, setCartItem] = useAtom(cartAtom);

  useEffectOnce(() => {
    ref.current?.focus();
  });

  useOnClickOutside(ref, (e) => {
    const { target } = e;
    const targetAsEl = target as HTMLElement | null;
    if (targetAsEl !== null) {
      if (
        ![
          targetAsEl.id,
          targetAsEl.parentElement?.id,
          targetAsEl.parentElement?.parentElement?.id,
        ].includes("cart-toggle")
      ) {
        setCartOpen(false);
      }
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
      className={`absolute left-1/2 top-[76px] z-50 w-[calc(100vw-15px)] max-w-[360px] -translate-x-1/2 rounded-[10px] bg-ecommerce-neutral-100 shadow-2xl sm:left-auto sm:right-[8px] sm:translate-x-0 lg:right-[88px] lg:top-[94px] [&_*]:font-kumbh-sans ${
        cartItem.length === 0 ? "h-[256px]" : "min-h-[256px]"
      }`}
      ref={ref}
      // biome-ignore lint/a11y/noPositiveTabindex: <explanation>
      tabIndex={1}
    >
      <h2
        className={`flex h-[68px] w-full items-center border-b px-6 font-bold text-ecommerce-neutral-500 lg:pb-2 ${
          cartItem.length === 0 ? "pb-[2px]" : "pb-2"
        }`}
      >
        Cart
      </h2>
      <div
        className={`flex h-[calc(100%-68px)] w-full flex-col items-center pb-3 ${
          cartItem.length === 0 ? "justify-center" : "pb-8 pt-6"
        }`}
      >
        {cartItem.length > 0 ? (
          <div className="w-full px-6">
            <ul className="flex flex-col gap-6" id="cart-items">
              {cartItem.map((c, index) => {
                return (
                  <li key={c.name} className="flex w-full items-center">
                    <div className="relative h-[50px] w-[50px] overflow-hidden rounded">
                      <Image
                        src={c.thumbnails[0]}
                        alt="Product thumbnail"
                        className="object-contain"
                        fill
                      />
                    </div>
                    <div className="ml-4 flex flex-col gap-[10px] pb-[2px] text-ecommerce-neutral-400">
                      <p className="leading-none">{c.name}</p>
                      <p className="leading-none tracking-[0.4px]">
                        ${c.price.toFixed(2)} x {c.count}{" "}
                        <span className="pl-[2px] font-bold tracking-[0.6px] text-ecommerce-neutral-600">
                          ${(c.price * c.count).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      className="group ml-auto"
                      onClick={() => {
                        setCartItem((prev) => {
                          return prev.filter((item, idx) => {
                            return idx !== index;
                          });
                        });
                      }}
                      // biome-ignore lint/a11y/noPositiveTabindex: <explanation>
                      tabIndex={1}
                      type="button"
                    >
                      <svg
                        className="mt-[1px] w-[14px] fill-[#C3CAD9] group-hover:fill-ecommerce-neutral-600"
                        viewBox="0 0 14 16"
                      >
                        <title>Delete</title>
                        <use href="/ecommerce-product-page/images/icon-delete.svg#icon-delete" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className="mt-[26px] flex h-[56px] w-full items-center justify-center rounded-[10px] bg-ecommerce-primary-200 font-bold text-ecommerce-neutral-100 hover:bg-ecommerce-primary-200/70"
              // biome-ignore lint/a11y/noPositiveTabindex: <explanation>
              tabIndex={1}
              type="button"
            >
              Checkout
            </button>
          </div>
        ) : (
          <p className="font-medium text-ecommerce-neutral-500/80">
            Your cart is empty.
          </p>
        )}
      </div>
    </Transition.Child>
  );
}

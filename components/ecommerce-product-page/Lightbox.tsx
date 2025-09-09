import { Transition } from "@headlessui/react";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { type CSSProperties, useState } from "react";
import { createPortal } from "react-dom";
import { useEffectOnce } from "usehooks-ts";
import {
  lightboxOpenAtom,
  type Product,
} from "../../pages/ecommerce-product-page";

export default function Lightbox({ product }: { product: Product }) {
  const open = useAtomValue(lightboxOpenAtom);

  return createPortal(
    <Transition
      show={open.open}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed left-0 top-0 z-50 flex h-[100svh] w-screen flex-col items-center justify-center bg-black/75"
    >
      <LightboxContent product={product} position={open.position} />
    </Transition>,
    document.body,
  );
}

function LightboxContent({
  product,
  position = 0,
}: {
  product: Product;
  position?: number;
}) {
  const [leftPos, setLeftPos] = useState(position);
  const setOpen = useSetAtom(lightboxOpenAtom);

  useEffectOnce(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Custom lightbox pattern requires non-standard ARIA
    <div
      className="relative"
      aria-roledescription="lightbox"
      aria-label="Product images"
      id="product-lightbox"
    >
      <button
        className="group ml-auto flex h-5 w-5 items-center justify-center"
        onClick={() => {
          setOpen({ open: false, position: 0 });
        }}
        type="button"
      >
        <svg
          viewBox="0 0 14 15"
          className="w-[24px] fill-[#69707D] group-hover:fill-ecommerce-primary-200"
        >
          <title>close</title>
          <use href="/ecommerce-product-page/images/icon-close.svg#icon-close" />
        </svg>
      </button>
      <div className="relative mx-auto mt-6 h-[calc(550/900*100vh)] max-h-[550px] w-[calc(550/900*100vh)] max-w-[550px]">
        <button
          className="absolute left-0 top-1/2 z-10 flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-[calc(50%+10px)] flex-col items-center justify-center rounded-full bg-ecommerce-primary-100 p-[14px]"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 0 ? p - 1 : 3;
            });
          }}
          type="button"
          aria-controls="lightbox-items"
        >
          <svg viewBox="0 0 12 18" className="w-[12px] stroke-[3px]">
            <title>Prev</title>
            <use href="/ecommerce-product-page/images/icon-previous.svg#icon-previous" />
          </svg>
        </button>
        <div
          className="relative h-full w-full overflow-hidden bg-ecommerce-primary-200 lg:rounded-2xl"
          id="lightbox-items"
        >
          <div
            className="relative left-0 flex h-full w-[400%] translate-x-[var(--translate)] gap-0 transition-all duration-150"
            style={
              {
                "--translate": `calc(${leftPos} * -${
                  100 / product.images.length
                }%)`,
              } as CSSProperties
            }
          >
            {product.images.map((img, index) => {
              return (
                // biome-ignore lint/a11y/useSemanticElements: Custom carousel slide requires non-semantic container
                <div
                  className="relative h-full w-[100%]"
                  key={`${index}-${img}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${product.images.length}`}
                >
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
        </div>
        <button
          className="absolute right-0 top-1/2 z-10 flex h-[56px] w-[56px] -translate-y-[calc(50%+10px)] translate-x-1/2 flex-col items-center justify-center rounded-full bg-ecommerce-primary-100 p-[14px]"
          onClick={() => {
            setLeftPos((p) => {
              return p !== 3 ? p + 1 : 0;
            });
          }}
          type="button"
          aria-controls="lightbox-items"
        >
          <svg viewBox="0 0 13 18" className="w-[13px] stroke-[3px]">
            <title>Next</title>
            <use href="/ecommerce-product-page/images/icon-next.svg#icon-next" />
          </svg>
        </button>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-[445px] justify-between max-lg:hidden">
        {product.thumbnails.map((thumb, index) => {
          return (
            <button
              key={`${index}-${thumb}`}
              className={`relative h-[88px] w-[88px] overflow-hidden rounded-[10px] hover:before:absolute hover:before:left-0 hover:before:top-0 hover:before:z-10 hover:before:h-full hover:before:w-full hover:before:bg-white/50 hover:before:content-[''] ${
                leftPos === index &&
                "ring-2 ring-ecommerce-primary-200 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-white/75 before:content-[''] hover:before:bg-white/75"
              }`}
              onClick={() => {
                setLeftPos(index);
              }}
              type="button"
              aria-controls="lightbox-items"
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

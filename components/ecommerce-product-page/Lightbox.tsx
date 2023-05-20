import { CSSProperties, useState } from "react";
import { type Product, lightboxOpenAtom } from "../../pages/ecommerce-product-page";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffectOnce } from "usehooks-ts";

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
      <MainContent
        product={product}
        position={open.position}
      />
    </Transition>,
    document.body
  );
}

function MainContent({ product, position = 0 }: { product: Product; position?: number }) {
  const [leftPos, setLeftPos] = useState(position);
  const setOpen = useSetAtom(lightboxOpenAtom);

  useEffectOnce(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div className="relative">
      <button
        className="group ml-auto flex h-5 w-5 items-center justify-center"
        onClick={() => {
          setOpen({ open: false, position: 0 });
        }}
      >
        <svg
          viewBox="0 0 14 15"
          className="group-hover:fill-ecommerce-primary-200 w-[24px] fill-[#69707D]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div className="relative mx-auto mt-6 h-[calc(550/900*100vh)] max-h-[550px] w-[calc(550/900*100vh)] max-w-[550px]">
        <button
          className="bg-ecommerce-primary-100 absolute left-0 top-1/2 z-10 flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-[calc(50%+10px)] flex-col items-center justify-center rounded-full p-[14px]"
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
              strokeWidth={3}
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div className="bg-ecommerce-primary-200 relative h-full w-full overflow-hidden lg:rounded-2xl">
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
          className="bg-ecommerce-primary-100 absolute right-0 top-1/2 z-10 flex h-[56px] w-[56px] -translate-y-[calc(50%+10px)] translate-x-1/2 flex-col items-center justify-center rounded-full p-[14px]"
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
              strokeWidth={3}
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-[445px] justify-between max-lg:hidden">
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

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image, { type ImageLoaderProps } from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import _products from "../public/product-list-with-cart/data.json";
import { cn } from "../utils/cn";
import { redHatText } from "../utils/fonts/redHatText";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const products = _products as Product[];

type Cart = Array<
  Pick<Product, "name" | "price"> & {
    quantity: number;
    totalPrice: number;
    thumbnail: string;
  }
>;

type CartAction = Dispatch<SetStateAction<Cart>>;

const CartContext = createContext<{ cart: Cart; setCart: CartAction }>({
  cart: [],
  setCart: {} as CartAction,
});

export default function ProductListWithCart() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Product list with cart</title>
      </Head>
      <div
        className={cn(
          `App relative min-h-[100svh] bg-product-list-rose-50 p-6 pb-[23px] font-red-hat-text text-product-list-rose-900 ${redHatText.variable}`,
          "sm:px-12 md:px-24",
          "lg:grid lg:grid-cols-[auto_384px] lg:grid-rows-1 lg:px-[112px] lg:pb-[70px] lg:pt-[56px]",
          // "overflow-x-hidden",
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/product-list-with-cart/design"
          // absolutePath="/product-list-with-cart/design/mobile-design-empty.jpg"
          absolutePath="/product-list-with-cart/design/desktop-design-order-confirmation.jpg"
        /> */}
      </div>
    </>
  );
}

export type Product = {
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
  const { cart, setCart } = useContext(CartContext);

  const addToCart = () => {
    setCart((cart) => {
      return [
        ...cart,
        {
          name: product.name,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
          thumbnail: product.image.thumbnail,
        },
      ];
    });
  };

  const updateCart = (quantity: number) => {
    if (quantity === 0) {
      setCart((cart) => {
        const updatedCart = cart.filter((c) => c.name !== product.name);
        return updatedCart;
      });
    } else {
      setCart((cart) => {
        const cartItemIndex = cart.findIndex(
          (item) => item.name === product.name,
        );
        const currentCart = cart[cartItemIndex];
        const updatedCart = Object.assign({}, currentCart, {
          quantity,
          totalPrice: quantity * currentCart.price,
        });
        // return [
        //   ...cart.slice(0, cartItemIndex),
        //   updatedCart,
        //   ...cart.slice(cartItemIndex + 1),
        // ];
        /** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced */
        return cart.toSpliced(cartItemIndex, 1, updatedCart);
      });
    }
  };

  const decrementQuantity = () => {
    updateCart(quantity - 1);
  };

  const incrementQuantity = () => {
    updateCart(quantity + 1);
  };

  // TODO: optimize this
  useEffect(() => {
    const item = cart.find((c) => c.name === product.name);
    setQuantity(item?.quantity ?? 0);
  }, [cart, product.name]);

  return (
    <div>
      <div className="relative aspect-[327/212] w-full lg:aspect-[377/360] lg:w-[251px]">
        <Image
          alt={product.name}
          src={product.image.thumbnail}
          loader={productImageloader}
          className={cn(
            "rounded-lg object-cover",
            quantity > 0 && "ring-2 ring-product-list-red",
          )}
          fill
        />
        {quantity === 0 ? (
          <button
            className="absolute bottom-0 left-1/2 flex h-[44px] w-[160px] -translate-x-1/2 translate-y-1/2 items-center justify-center gap-2 rounded-full border border-product-list-rose-300 bg-white px-4 text-sm font-semibold hover:border-product-list-red hover:text-product-list-red"
            type="button"
            onClick={addToCart}
            aria-label={`Add ${product.name} to Cart`}
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
              onClick={decrementQuantity}
            >
              <svg
                className="aspect-[5/1] h-[2px]"
                role="graphics-symbol"
                aria-label={`Decrement ${product.name} Quantity to ${
                  quantity - 1
                }`}
                aria-hidden="true"
              >
                <use href="/product-list-with-cart/assets/images/icon-decrement-quantity.svg#decrement-quantity" />
              </svg>
            </button>
            <span className="text-product-list-rose-50">{quantity}</span>
            <button
              className="flex aspect-square w-4 items-center justify-center rounded-full text-white ring-1 ring-product-list-rose-50 hover:bg-white hover:text-product-list-red"
              type="button"
              onClick={incrementQuantity}
            >
              <svg
                className="aspect-square h-[10px]"
                role="graphics-symbol"
                aria-label={`Increment ${product.name} Quantity to ${
                  quantity + 1
                }`}
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

function OrderConfirmationModal({
  orders,
  onClose,
}: {
  orders: Cart | null;
  onClose: () => void;
}) {
  const totalPrice = useMemo<number>(() => {
    if (!orders || orders?.length === 0) return 0;
    return orders?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }, [orders]);

  return (
    <div className="absolute bottom-0 left-0 max-h-screen min-h-0 w-full overflow-scroll rounded-t-xl bg-white p-6 py-10 pb-[72px] text-product-list-rose-900 lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:w-[592px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-xl lg:px-10 lg:py-10">
      <svg
        role="graphics-symbol"
        aria-hidden={true}
        className="aspect-square w-12"
        aria-label="Order Confirmed"
      >
        <use href="/product-list-with-cart/assets/images/icon-order-confirmed.svg#order-confirmed" />
      </svg>
      <Dialog.Title
        as="h2"
        className="mt-[23px] text-left text-[40px] font-bold leading-[1.2] lg:mt-[21px]"
      >
        Order Confirmed
      </Dialog.Title>
      <p className="mt-[7px] text-product-list-rose-500 lg:mt-2">
        We hope you enjoy your food!
      </p>
      <div className="mt-8 w-full rounded-lg bg-product-list-rose-50 px-6 pb-6 pt-[7px] lg:mt-[33px]">
        <ul className="w-full divide-y divide-product-list-rose-100">
          {orders?.map((item) => {
            return (
              <li
                key={item.name}
                className="flex w-full items-center justify-start gap-4 pb-4 pr-px pt-[16px] text-sm"
              >
                <div className="relative aspect-square w-12">
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    className="rounded"
                    loader={(props) =>
                      productImageloader({ ...props, thumbnail: true })
                    }
                    fill
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="max-w-[320px] truncate font-semibold">
                    {item.name}
                  </h3>
                  <p className="mb-px mt-[7px] flex gap-[6px]">
                    <span className="font-semibold text-product-list-red">
                      {item.quantity}x
                    </span>
                    <span className="ml-2 text-product-list-rose-500">
                      @ ${item.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="ml-auto text-base font-semibold text-product-list-rose-900">
                  ${item.totalPrice.toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
        <hr className="my-[7px] w-full border-product-list-rose-100" />
        <div className="mt-[24px] flex w-full items-center justify-between">
          <p className="text-sm">Order Total</p>
          <p className="text-2xl font-bold text-product-list-rose-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-[33px] flex h-[53px] w-full items-center justify-center rounded-full bg-product-list-red text-center font-semibold text-product-list-rose-50 hover:bg-[hsl(14,86%,32%)]"
        onClick={onClose}
      >
        Start New Order
      </button>
    </div>
  );
}

function Main() {
  // const [cart, setCart] = useState<Cart>([]);
  const [cart, setCart] = useLocalStorage<Cart>("product-list-with-cart", [], {
    initializeWithValue: false,
  });
  // const [cart, setCart] = useState<Cart>([
  //   {
  //     name: "Classic Tiramisu",
  //     quantity: 1,
  //     price: 5.5,
  //     totalPrice: 5.5,
  //     thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
  //   },
  //   {
  //     name: "Vanilla Bean Crème Brûlée",
  //     quantity: 4,
  //     price: 7.0,
  //     totalPrice: 28.0,
  //     thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
  //   },
  //   {
  //     name: "Vanilla Panna Cotta",
  //     quantity: 2,
  //     price: 6.5,
  //     totalPrice: 13.0,
  //     thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
  //   },
  // ]);
  const [confirmOrder, setConfirmOrder] = useState<null | Cart>(null);

  const [parent] = useAutoAnimate({ duration: 100 });

  const onModalClose = useCallback(() => {
    setCart([]);
    setConfirmOrder(null);
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [setCart]);

  const totalQuantity = useMemo<number>(() => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo<number>(() => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <main className="lg:mt-8">
        <h1 className="text-[40px] font-bold leading-[1.15]">Desserts</h1>
        <ul className="mb-4 mt-[34px] grid grid-cols-1 gap-[23px] sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:gap-6 lg:gap-y-8">
          {products.map((el) => {
            return (
              <li key={el.name} className="lg:w-[250px]">
                <ListItem {...el} />
              </li>
            );
          })}
        </ul>
      </main>
      <aside className="mt-[31px] flex min-h-[300px] w-full flex-col items-center rounded-xl bg-white px-6 py-[23px] lg:sticky lg:top-8 lg:mt-8 lg:max-h-[calc(100svh-32px)] lg:self-start lg:overflow-y-scroll">
        <h2 className="self-start text-[24px] font-bold text-product-list-red">
          Your Cart ({totalQuantity})
        </h2>
        {totalQuantity === 0 ? (
          <>
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
          </>
        ) : (
          <>
            <ul
              className="mt-[5px] w-full divide-y divide-product-list-rose-50"
              ref={parent}
            >
              {cart.map((item) => {
                return (
                  <li
                    key={item.name}
                    className="flex w-full items-center justify-between pb-4 pr-px pt-[15px] text-sm"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-[7px] flex gap-2">
                        <span className="font-semibold text-product-list-red">
                          {item.quantity}x
                        </span>
                        <span className="ml-2 text-product-list-rose-500">
                          @ ${item.price.toFixed(2)}
                        </span>
                        <span className="font-semibold text-product-list-rose-500">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex aspect-square w-[18px] items-center justify-center rounded-full border border-[#CAAFA7] text-[#CAAFA7] hover:border-product-list-rose-900 hover:text-product-list-rose-900"
                      onClick={() => {
                        setCart((items) =>
                          items.filter((i) => i.name !== item.name),
                        );
                      }}
                    >
                      <svg
                        className="aspect-square h-[10px]"
                        role="graphics-symbol"
                        aria-label="Remove Item"
                        aria-hidden="true"
                      >
                        <use href="/product-list-with-cart/assets/images/icon-remove-item.svg#remove-item" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <hr className="my-[9px] w-full border-product-list-rose-50" />
            <div className="mt-[14px] flex w-full items-center justify-between">
              <p className="text-sm">Order Total</p>
              <p className="text-2xl font-bold text-product-list-rose-900">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-product-list-rose-50 p-4 text-sm">
              <svg
                role="graphics-symbol"
                aria-label="Carbon Neutral"
                className="aspect-[21/20] h-5"
                aria-hidden="true"
              >
                <use href="/product-list-with-cart/assets/images/icon-carbon-neutral.svg#carbon-neutral" />
              </svg>
              <p>
                This is a{" "}
                <strong className="font-semibold">carbon-neutral</strong>{" "}
                delivery
              </p>
            </div>
            <button
              type="button"
              className="mt-6 flex min-h-[53px] w-full items-center justify-center rounded-full bg-product-list-red text-center font-semibold text-product-list-rose-50 hover:bg-[hsl(14,86%,32%)]"
              onClick={() => {
                setConfirmOrder(cart);
              }}
            >
              Confirm Order
            </button>
          </>
        )}
      </aside>
      <AnimatePresence>
        {confirmOrder !== null ? (
          <Dialog
            static
            as={motion.div}
            open={confirmOrder !== null}
            onClose={onModalClose}
            className="relative z-0"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <OrderConfirmationModal
                  orders={confirmOrder}
                  onClose={onModalClose}
                />
              </Dialog.Panel>
            </div>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-1 left-0 w-full text-center text-[11px] lg:bottom-4 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

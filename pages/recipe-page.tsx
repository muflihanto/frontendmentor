import Head from "next/head";
import Image from "next/image";
import { youngSerif } from "../utils/fonts/youngSerif";
import { outfit } from "../utils/fonts/outfit";
import { cn } from "../utils/cn";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function RecipePage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Recipe Page</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] ${outfit.className} bg-white font-outfit md:flex md:flex-col md:items-center md:justify-center md:bg-recipe-neutral-300 md:py-[123px]`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/recipe-page/design" /> */}
      </div>
    </>
  );
}

function Header() {
  return (
    <header>
      <div className="relative aspect-[328/150] w-full md:overflow-hidden md:rounded-xl">
        <Image
          src="/recipe-page/assets/images/image-omelette.jpeg"
          className="object-contain"
          fill
          alt="Omelette on a plate"
        />
      </div>
    </header>
  );
}

function Preparation() {
  return (
    <section className="mt-[33px] rounded-lg bg-recipe-neutral-200 px-6 pb-[22px] pt-5 md:px-7 md:pb-[26px] md:pt-6">
      <h3 className="text-xl font-semibold text-recipe-primary-dark-raspberry">
        Preparation time
      </h3>

      <ul
        className={cn(
          "mt-3 space-y-2 text-recipe-neutral-500 *:ml-[18px] *:pl-[22px]",
          "[&_li::before]:absolute [&_li::before]:-left-[10px] [&_li::before]:top-1/2 [&_li::before]:block [&_li::before]:h-1 [&_li::before]:w-1 [&_li::before]:-translate-y-[80%] [&_li::before]:rounded-full [&_li::before]:bg-recipe-primary-dark-raspberry [&_li::before]:content-[''] [&_li]:relative",
        )}
      >
        <li>
          <strong>Total</strong>: Approximately 10 minutes
        </li>
        <li>
          <strong>Preparation</strong>: 5 minutes
        </li>
        <li>
          <strong>Cooking</strong>: 5 minutes
        </li>
      </ul>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="my-[27px]">
      <h2
        className={`font-young-serif text-[28px] text-recipe-primary-nutmeg ${youngSerif.className}`}
      >
        Ingredients
      </h2>

      <ul
        className={cn(
          "relative mt-4 space-y-2 text-recipe-neutral-500 *:ml-[18px] *:pl-[22px]",
          "[&_li::before]:absolute [&_li::before]:-left-[10px] [&_li::before]:top-1/2 [&_li::before]:block [&_li::before]:h-1 [&_li::before]:w-1 [&_li::before]:-translate-y-1/2 [&_li::before]:rounded-full [&_li::before]:bg-recipe-primary-dark-raspberry [&_li::before]:content-[''] [&_li]:relative",
        )}
      >
        <li>2-3 large eggs</li>
        <li>Salt, to taste</li>
        <li>Pepper, to taste</li>
        <li>1 tablespoon of butter or oil</li>
        <li>
          Optional fillings: cheese, diced vegetables, cooked meats, herbs
        </li>
      </ul>
    </section>
  );
}

function Instructions() {
  return (
    <section className="my-[25px]">
      <h2
        className={`font-young-serif text-[28px] text-recipe-primary-nutmeg ${youngSerif.className}`}
      >
        Instructions
      </h2>

      <ol className="relative mt-4 list-decimal space-y-2 text-recipe-neutral-500 *:ml-[25px] *:pl-[15px] marker:font-outfit marker:font-bold marker:text-recipe-primary-nutmeg">
        <li>
          <strong>Beat the eggs</strong>: In a bowl, beat the eggs with a pinch
          of salt and pepper until they are well mixed. You can add a tablespoon
          of water or milk for a fluffier texture.
        </li>

        <li>
          <strong>Heat the pan</strong>: Place a non-stick frying pan over
          medium heat and add butter or oil.
        </li>

        <li>
          <strong>Cook the omelette</strong>: Once the butter is melted and
          bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly
          coat the surface.
        </li>

        <li>
          <strong>Add fillings (optional)</strong>: When the eggs begin to set
          at the edges but are still slightly runny in the middle, sprinkle your
          chosen fillings over one half of the omelette.
        </li>

        <li>
          <strong>Fold and serve</strong>: As the omelette continues to cook,
          carefully lift one edge and fold it over the fillings. Let it cook for
          another minute, then slide it onto a plate.
        </li>

        <li>
          <strong>Enjoy</strong>: Serve hot, with additional salt and pepper if
          needed.
        </li>
      </ol>
    </section>
  );
}

function Nutrition() {
  const nutrients = [
    {
      name: "Calories",
      value: "277kcal",
    },
    {
      name: "Carbs",
      value: "0g",
    },
    {
      name: "Protein",
      value: "20g",
    },
    {
      name: "Fat",
      value: "22g",
    },
  ];
  return (
    <section className="my-[25px]">
      <h2
        className={`font-young-serif text-[28px] text-recipe-primary-nutmeg ${youngSerif.className}`}
      >
        Nutrition
      </h2>

      <p className="mt-4 text-recipe-neutral-500">
        The table below shows nutritional values per serving without the
        additional fillings.
      </p>

      <ul className="mt-[12px] divide-y *:flex *:h-12 *:flex-row *:items-center">
        {nutrients.map(({ name, value }, index) => {
          return (
            <li key={`${index}-${name}`} className="w-full pl-8 pr-4 *:flex-1">
              <div className="text-recipe-neutral-500">{name}</div>
              <div className="font-bold text-recipe-primary-dark-raspberry">
                {value}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Main() {
  return (
    <div className="md:w-[736px] md:overflow-hidden md:rounded-3xl md:bg-recipe-neutral-100 md:p-10 md:pb-1">
      <Header />
      <main className="p-8 pb-[28.5px] pt-[39px] md:p-0 md:pt-[40px]">
        <h1
          className={`text-4xl leading-none text-recipe-neutral-600 ${youngSerif.className} font-young-serif md:text-[40px]/10`}
        >
          Simple Omelette Recipe
        </h1>
        <p className="mt-6 tracking-[-.025px] text-recipe-neutral-500">
          An easy and quick dish, perfect for any meal. This classic omelette
          combines beaten eggs cooked to perfection, optionally filled with your
          choice of cheese, vegetables, or meats.
        </p>
        <Preparation />
        <Ingredients />
        <hr className="mt-8" />
        <Instructions />
        <hr className="mt-8" />
        <Nutrition />
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-recipe-neutral-600 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

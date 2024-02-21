import Head from "next/head";
import Image from "next/image";
import { youngSerif } from "../utils/fonts/youngSerif";
import { outfit } from "../utils/fonts/outfit";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function RecipePage() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Recipe Page</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] ${outfit.className} font-outfit`}
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
      <div className="relative aspect-[328/150] w-full">
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
    <section className="bg-recipe-neutral-200 mt-[33px] rounded-lg px-6 pb-[22px] pt-5">
      <h3 className="text-recipe-primary-dark-raspberry text-xl font-semibold">
        Preparation time
      </h3>

      {/* FIXME: align the markers */}
      <ul className="text-recipe-neutral-500 marker:text-recipe-primary-dark-raspberry mt-3 list-disc space-y-2 *:ml-[18px] *:pl-[22px] marker:inline-block marker:text-[12px]">
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
        className={`text-recipe-primary-nutmeg font-young-serif text-[28px] ${youngSerif.className}`}
      >
        Ingredients
      </h2>

      <ul className="marker:text-recipe-primary-nutmeg text-recipe-neutral-500 relative mt-4 list-disc space-y-2 *:ml-[18px] *:pl-[22px] marker:text-xs">
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

function Main() {
  return (
    <div>
      <Header />
      <main className="p-8 py-[39px]">
        <h1
          className={`text-recipe-neutral-600 text-4xl leading-none ${youngSerif.className} font-young-serif`}
        >
          Simple Omelette Recipe
        </h1>
        <p className="text-recipe-neutral-500 mt-6 tracking-[-.025px]">
          An easy and quick dish, perfect for any meal. This classic omelette
          combines beaten eggs cooked to perfection, optionally filled with your
          choice of cheese, vegetables, or meats.
        </p>
        <Preparation />
        <Ingredients />
      </main>
      {/* {`
         Instructions
       
         Beat the eggs: In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. 
         You can add a tablespoon of water or milk for a fluffier texture.
       
         Heat the pan: Place a non-stick frying pan over medium heat and add butter or oil.
       
         Cook the omelette: Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure 
         the eggs evenly coat the surface.
       
         Add fillings (optional): When the eggs begin to set at the edges but are still slightly runny in the 
         middle, sprinkle your chosen fillings over one half of the omelette.
       
         Fold and serve: As the omelette continues to cook, carefully lift one edge and fold it over the 
         fillings. Let it cook for another minute, then slide it onto a plate.
       
         Enjoy: Serve hot, with additional salt and pepper if needed.
       
         Nutrition
       
         The table below shows nutritional values per serving without the additional fillings.
       
         Calories
         277kcal
       
         Carbs
         0g
       
         Protein
         20g
       
         Fat
         22g
      `} */}
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-recipe-neutral-600 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

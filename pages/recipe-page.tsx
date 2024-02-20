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
      </main>
      {/* {`
         Preparation time
       
         Total: Approximately 10 minutes
         Preparation: 5 minutes
         Cooking: 5 minutes
       
         Ingredients
       
         2-3 large eggs
         Salt, to taste
         Pepper, to taste
         1 tablespoon of butter or oil
         Optional fillings: cheese, diced vegetables, cooked meats, herbs
       
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

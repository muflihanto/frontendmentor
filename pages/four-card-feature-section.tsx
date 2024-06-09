import Head from "next/head";
// import Image from "next/image";
import type { ReactNode, FC } from "react";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

type CardVariant = "Supervisor" | "Team Builder" | "Karma" | "Calculator";
type CardSubComponents = { Heading: typeof Heading; Body: typeof Body };
type CardProps = { children: ReactNode; className?: string };

const FourCardFeature = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Four card feature section</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] items-center justify-center bg-four-card-neutral-100 pb-[78px] pt-[84px] font-poppins lg:pb-[50px] lg:pt-[80px] ${poppins.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/four-card-feature-section/design/" /> */}
      </div>
    </>
  );
};

function Main() {
  const cards = {
    Supervisor: {
      p: "Monitors activity to identify project roadblocks",
      cardStyle:
        "before:bg-four-card-primary-cyan grid-area lg:row-start-2 lg:col-start-1 lg:place-self-center",
    },
    "Team Builder": {
      p: "Scans our talent network to create the optimal team for your project",
      cardStyle:
        "before:bg-four-card-primary-red grid-area lg:row-start-1 lg:col-start-2 lg:place-self-end ",
    },
    Karma: {
      p: "Regularly evaluates our talent to ensure quality",
      cardStyle:
        "before:bg-four-card-primary-orange grid-area lg:row-start-3 lg:col-start-2",
    },
    Calculator: {
      p: "Uses data from past projects to provide better delivery estimates",
      cardStyle:
        "before:bg-four-card-primary-blue grid-area lg:row-start-2 lg:col-start-3 lg:place-self-center",
    },
  };

  return (
    <div className="flex max-w-[375px] flex-col items-center px-8 lg:max-w-none">
      <div className="text-four-card-neutral-200 lg:max-w-[520px]">
        <h1 className="text-center text-[24px] font-extralight tracking-[0.2px] text-four-card-neutral-300 lg:text-[36px] lg:leading-[51px]">
          Reliable, efficient delivery
          <span className="font-semibold"> Powered by Technology</span>
        </h1>
        <p className="mt-4 text-center text-[15px] leading-[25px] tracking-[0.1px] lg:mt-[17px]">
          Our Artificial Intelligence powered tools use millions of project data
          points to ensure that your project is successful
        </p>
      </div>
      <div className="mt-[75px] max-lg:flex max-lg:flex-col max-lg:gap-y-[24px] lg:mt-[33px] lg:grid lg:grid-cols-[repeat(3,minmax(0px,350px))] lg:grid-rows-[repeat(4,minmax(0px,125px))] lg:gap-[30px]">
        {Object.keys(cards).map((el, index) => {
          const variant = el as CardVariant;
          return (
            <Card
              key={`${index}-${variant}`}
              className={cards[variant].cardStyle}
            >
              <Card.Heading>{variant}</Card.Heading>
              <Card.Body>{cards[variant].p}</Card.Body>
              <Icon variant={variant} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const Card: FC<CardProps> & CardSubComponents = ({ className, children }) => {
  return (
    <div
      className={`relative flex h-[222px] flex-col overflow-hidden rounded-lg bg-white px-[28px] pb-[28px] pt-[31px] shadow-xl shadow-[hsla(180,51%,29%,0.13)] before:absolute before:left-0 before:top-0 before:h-1 before:w-full lg:row-span-2 lg:h-[250px] lg:px-[32px] lg:pb-[32px] lg:pt-[36px] ${className}`}
    >
      {children}
    </div>
  );
};

const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h2 className="text-[20px] font-semibold leading-none tracking-[-0.2px] text-four-card-neutral-300">
      {children}
    </h2>
  );
};
Card.Heading = Heading;

const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="mt-2 px-[1px] text-[13px] leading-[23px] tracking-[0.1px] text-four-card-neutral-200 lg:mt-[13px] lg:px-0 lg:tracking-[0.05px]">
      {children}
    </p>
  );
};
Card.Body = Body;

const Icon: FC<{ variant: CardVariant }> = ({ variant }) => {
  const variantKebabCase = variant.toLowerCase().replace(" ", "-");
  return (
    <svg viewBox="0 0 64 64" className="mt-auto h-[57px] self-end lg:h-[64px]">
      <title>{variant} Icon</title>
      <use
        href={`/four-card-feature-section/images/icon-${variantKebabCase}.svg#icon-${variantKebabCase}`}
      />
    </svg>
  );
};

function Footer() {
  return (
    <>
      <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-semibold [&_a]:text-indigo-600 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
          rel="noreferrer"
          target="_blank"
        >
          Muflihanto
        </a>
        .
      </footer>
    </>
  );
}

export default FourCardFeature;

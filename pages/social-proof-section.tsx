import Head from "next/head";
import Image from "next/image";
import { leagueSpartan } from "../utils/fonts/leagueSpartan";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

const ratings = [
  {
    rating: 5,
    rater: "Reviews",
  },
  {
    rating: 5,
    rater: "Report Guru",
  },
  {
    rating: 5,
    rater: "BestTech",
  },
];

const testimonies = [
  {
    name: "Colton Smith",
    avatar: "image-colton.jpg",
    testimony:
      "We needed the same printed design as the one we had ordered a week prior. Not only did they find the original order, but we also received it in time. Excellent!",
  },
  {
    name: "Irene Roberts ",
    avatar: "image-irene.jpg",
    testimony:
      "Customer service is always excellent and very quick turn around. Completely delighted with the simplicity of the purchase and the speed of delivery.",
  },
  {
    name: "Anne Wallace",
    avatar: "image-anne.jpg",
    testimony:
      "Put an order with this company and can only praise them for the very high standard. Will definitely use them again and recommend them to everyone!",
  },
];

export default function SocialProofSection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Social proof section</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col items-center bg-social-proof-neutral-100 bg-[url('/social-proof-section/images/bg-pattern-top-mobile.svg'),url('/social-proof-section/images/bg-pattern-bottom-mobile.svg')] bg-[length:100%_auto,_100%_auto] bg-[position:top,_bottom] bg-no-repeat pb-[99px] pt-[82px] font-league-spartan md:bg-[url('/social-proof-section/images/bg-pattern-top-desktop.svg'),url('/social-proof-section/images/bg-pattern-bottom-desktop.svg')] md:bg-[length:584px_362px,_1085px_673px] md:bg-[position:top_left,bottom_right] lg:px-8 lg:pt-[107px] ${leagueSpartan.variable}`}
      >
        <Main />
        <Footer />
        {/* <Slider basePath="/social-proof-section/design/" /> */}
      </div>
    </>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 17 16" className="h-4" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.539 6.097a.297.297 0 00-.24-.202l-5.36-.779L8.542.26a.296.296 0 00-.53 0L5.613 5.117l-5.36.779a.297.297 0 00-.165.505l3.88 3.78-.917 5.34a.297.297 0 00.43.312l4.795-2.52 4.794 2.52a.296.296 0 00.43-.313l-.916-5.338L16.464 6.4c.08-.08.11-.197.075-.304z"
        fill="#EF9546"
        fillRule="nonzero"
      />
    </svg>
  );
}

function RatingCard({ rating, rater }: { rating: number; rater: string }) {
  return (
    <div className="flex h-[78px] w-full flex-col items-center justify-center gap-[15px] rounded bg-social-proof-neutral-200 pt-[1px] lg:h-[56px] lg:w-[444px] lg:flex-row lg:justify-start lg:gap-[32px] lg:px-8 lg:pb-[1px] lg:pt-0">
      <div className="flex gap-[8px]">
        {Array.from({ length: rating }, (_, index) => {
          return <StarIcon key={index} />;
        })}
      </div>
      <span className="text-[17px] font-bold leading-none text-social-proof-primary-magenta">
        Rated {rating} Stars in {rater}
      </span>
    </div>
  );
}

function TestimonyCard({
  avatar,
  name,
  testimony,
}: {
  avatar: string;
  name: string;
  testimony: string;
}) {
  return (
    <div className="flex h-[248px] w-full flex-col overflow-hidden rounded-lg bg-social-proof-primary-magenta px-[32px] pb-[30px] pt-[36px] lg:h-[234px] lg:w-[350px]">
      <div className="flex h-12 items-center gap-[23px]">
        <div className="relative aspect-square h-10 overflow-hidden rounded-full">
          <Image
            fill
            alt={`${name}'s Avatar`}
            src={`/social-proof-section/images/${avatar}`}
          />
        </div>
        <p className="flex flex-col gap-1 self-start pt-[8px] leading-none tracking-[0.4px]">
          <span className="font-bold text-social-proof-neutral-100">
            {name}
          </span>
          <span className="text-social-proof-primary-pink">Verified Buyer</span>
        </p>
      </div>
      <p className="mt-6 font-medium leading-[22px] tracking-[0.1px] text-social-proof-neutral-100">
        &ldquo; {testimony} &rdquo;
      </p>
    </div>
  );
}

function Main() {
  return (
    <div className="w-[calc(100vw-48px)] max-w-[calc(375px-48px)] lg:grid lg:w-full lg:max-w-[calc(1440px-330px)] lg:grid-cols-2 lg:grid-rows-2 lg:items-center lg:gap-y-[61px] ">
      <div className="lg:w-[420px]">
        <h1 className="text-center text-[40px] font-bold leading-[32px] tracking-[-1.35px] text-social-proof-primary-magenta lg:text-left lg:text-[56px] lg:leading-[48px] lg:tracking-[-2px]">
          10,000+ of our users love our products.
        </h1>
        <p className="mt-[23px] text-center text-[18px] font-medium leading-[25px] tracking-[-0.2px] text-social-proof-neutral-300 lg:mt-[26px] lg:text-left">
          We only provide great products combined with excellent customer
          service. See what our satisfied customers are saying about our
          services.
        </p>
      </div>

      <div className="mt-[39px] flex flex-col gap-4 justify-self-end lg:mt-0 lg:w-[540px] lg:pt-[11px] [&>div:nth-child(2)]:self-center [&>div:nth-child(3)]:self-end">
        {ratings.map((el, index) => {
          return <RatingCard key={index} {...el} />;
        })}
      </div>

      <div className="mt-[49px] flex flex-col gap-4 lg:col-span-2 lg:mt-0 lg:h-[266px] lg:flex-row lg:justify-between [&>div:nth-child(2)]:self-center [&>div:nth-child(3)]:self-end">
        {testimonies.map((el, index) => {
          return <TestimonyCard key={index} {...el} />;
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-3 z-20 w-full text-center text-[11px] lg:text-[13px] [&_a]:font-bold [&_a]:text-social-proof-primary-magenta [&_a]:underline [&_a]:decoration-social-proof-primary-pink [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor{" "}
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </div>
  );
}

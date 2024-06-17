import Head from "next/head";
import Image from "next/image";
import { barlowSemiCondensed } from "../utils/fonts/barlowSemiCondensed";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function Testimonials() {
  return (
    <div
      className={`App relative flex w-screen items-center justify-center bg-testimonials-neutral-grayblue px-6 py-[71px] font-barlow-semi-condensed lg:px-[165px] lg:py-[calc(164/900*100vh)] ${barlowSemiCondensed.variable}`}
    >
      <Head>
        <title>Frontend Mentor | Testimonials Grid Section</title>
      </Head>
      <Main />
      <Footer />
      {/* <Slider basePath="/testimonials-grid-section/design/" /> */}
    </div>
  );
}

const testimonials = [
  {
    avatar: "/testimonials-grid-section/images/image-daniel.jpg",
    name: "Daniel Clifford",
    title: "Verified Graduate",
    highlight:
      "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny’s worth.",
    testimony:
      "“ I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the  best - and most grueling - time of my life. Since completing the course, I’ve successfully switched careers, working as a Software Engineer at a VR startup. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-jonathan.jpg",
    name: "Jonathan Walters",
    title: "Verified Graduate",
    highlight: "The team was very supportive and kept me motivated",
    testimony:
      "“ I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I’ve made in myself. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-jeanette.jpg",
    name: "Jeanette Harmon",
    title: "Verified Graduate",
    highlight: "An overall wonderful and rewarding experience",
    testimony:
      "“ Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-patrick.jpg",
    name: "Patrick Abrams",
    title: "Verified Graduate",
    highlight:
      "Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.",
    testimony:
      "“ The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people. ”",
  },
  {
    avatar: "/testimonials-grid-section/images/image-kira.jpg",
    name: "Kira Whittle",
    title: "Verified Graduate",
    highlight: "Such a life-changing experience. Highly recommended!",
    testimony:
      "“ Before joining the bootcamp, I’ve never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I’ve often referred to it during interviews as an example of my developent experience. It certainly helped me land a job as a full-stack developer after receiving multiple offers. 100% recommend! ”",
  },
];

const cardStyles = [
  {
    backgroundColor: "bg-testimonials-primary-violet",
    textIsDark: false,
    gridTemplate: "lg:col-start-1 lg:col-span-2",
  },
  {
    backgroundColor: "bg-testimonials-primary-gray-blue",
    textIsDark: false,
    gridTemplate: "lg:col-start-3",
  },
  {
    backgroundColor: "bg-testimonials-primary-white",
    textIsDark: true,
    gridTemplate: "lg:row-start-2 lg:col-start-1",
  },
  {
    backgroundColor: "bg-testimonials-primary-dark-blue",
    textIsDark: false,
    gridTemplate: "lg:row-start-2 lg:col-start-2 lg:col-span-2",
  },
  {
    backgroundColor: "bg-testimonials-primary-white",
    textIsDark: true,
    gridTemplate: "lg:row-start-1 lg:row-span-2 lg:col-start-4",
  },
];

function Main() {
  return (
    <section className="flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:grid-rows-[minmax(0,_282)_minmax(0,_266px)] lg:gap-x-[30px]">
      {testimonials.map((testimony, index) => {
        return (
          <TestmimoyCard
            key={`${index}-${testimony.title}`}
            {...testimony}
            {...cardStyles[index]}
            hasQuoteBg={index === 0}
            hasAvatarRing={[0, 3].includes(index)}
          />
        );
      })}
    </section>
  );
}

type TestimonyCardProps = (typeof testimonials)[number] &
  (typeof cardStyles)[number] & { hasQuoteBg: boolean; hasAvatarRing: boolean };
function TestmimoyCard(props: TestimonyCardProps) {
  const {
    avatar,
    name,
    title,
    highlight,
    testimony,
    backgroundColor,
    textIsDark,
    hasQuoteBg,
    hasAvatarRing,
    gridTemplate,
  } = props;
  const textColor = textIsDark
    ? {
        name: "text-testimonials-primary-gray-blue",
        title: "text-testimonials-primary-gray-blue/50",
        highlight: "text-testimonials-primary-gray-blue",
        testimony: "text-testimonials-primary-gray-blue/70",
      }
    : {
        name: "text-testimonials-neutral-gray",
        title: "text-testimonials-neutral-gray/50",
        highlight: "text-testimonials-neutral-gray",
        testimony: "text-testimonials-neutral-gray/70",
      };
  return (
    <article
      className={`${backgroundColor} ${textColor.name} ${
        hasQuoteBg &&
        "bg-[url('/testimonials-grid-section/images/bg-pattern-quotation.svg')] bg-[top_0px_right_10.75%] bg-no-repeat lg:bg-[top_0px_right_18.25%]"
      } group rounded-[8px] pb-[32.5px] pl-8 pr-[34px] pt-6 shadow-[50px_55px_20px_-40px_rgba(33,33,33,.12)] last:pr-[30px] lg:shadow-[45px_65px_20px_-35px_rgba(33,33,33,.08)] [&:nth-child(4)]:pr-[32px] lg:[&:nth-child(n+3)]:pb-[25px] ${gridTemplate}`}
    >
      <div className="flex items-center justify-start">
        <div
          className={`relative aspect-square ${
            hasAvatarRing ? "w-[28px]" : "w-[28px]"
          }`}
        >
          <Image
            src={avatar}
            alt={`${name}'s Avatar`}
            className={`rounded-full object-contain ${
              hasAvatarRing && "ring-2 ring-[#A775F1]"
            }`}
            fill
          />
        </div>
        <div className="ml-[17px]">
          <h2
            className={`${textColor.name} pt-[1px] text-[13px] leading-[15px]`}
          >
            {name}
          </h2>
          <p className={`${textColor.title} text-[11px]`}>{title}</p>
        </div>
      </div>
      <p
        className={`font-semibold ${textColor.highlight} mt-[15px] text-[20px] leading-[24px]`}
      >
        {highlight}
      </p>
      <p
        className={`${textColor.testimony} mt-[16px] pr-[0px] text-[13px] font-medium leading-[18px] group-first:pr-[14px] lg:group-first:pr-0 lg:group-[&:nth-child(n+3)]:mt-[24px] lg:group-[&:nth-child(4)]:pr-2`}
      >
        {testimony}
      </p>
    </article>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-3 w-full text-center text-[11px]">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="text-testimonials-primary-violet underline decoration-dotted"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
        className="text-testimonials-primary-violet underline decoration-dotted"
      >
        Muflihanto
      </a>
      .
    </div>
  );
}

import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function Testimonials(props) {
  return (
    <div className="App font-barlow-semi-condensed bg-testimonials-neutral-grayblue">
      <Head>
        <title>Frontend Mentor | [Challenge Name Here]</title>
      </Head>
      <Main />
      <Footer />
      <Slider basePath="/testimonials-grid-section/design/" />
    </div>
  );
}

function Main(props) {
  const testimonials = [
    {
      avatar: "/testimonials-grid-section/images/image-daniel.jpg",
      name: "Daniel Clifford",
      title: "Verified Graduate",
      highlight: "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny’s worth.",
      testimony: `“I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the best - and most grueling - time of my life. Since completing the course, I’ve successfully switched careers, working as a Software Engineer at a VR startup.”`,
    },
    {
      avatar: "/testimonials-grid-section/images/image-jonathan.jpg",
      name: "Jonathan Walters",
      title: "Verified Graduate",
      highlight: "The team was very supportive and kept me motivated",
      testimony: `“ I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I’ve made in myself. ”`,
    },
    {
      avatar: "/testimonials-grid-section/images/image-jeanette.jpg",
      name: "Jeanette Harmon",
      title: "Verified Graduate",
      highlight: "An overall wonderful and rewarding experience",
      testimony: `“ Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love. ”`,
    },
    {
      avatar: "/testimonials-grid-section/images/image-patrick.jpg",
      name: "Patrick Abrams",
      title: "Verified Graduate",
      highlight: `Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.`,
      testimony: `“ The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people. ”`,
    },
    {
      avatar: "/testimonials-grid-section/images/image-kira.jpg",
      name: "Kira Whittle",
      title: "Verified Graduate",
      highlight: "Such a life-changing experience. Highly recommended!",
      testimony: `“ Before joining the bootcamp, I’ve never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I’ve often referred to it during interviews as an example of my developent experience. It certainly helped me land a job as a full-stack developer after receiving multiple offers. 100% recommend! ”`,
    },
  ];
  const cardStyles = [
    {
      backgroundColor: "bg-testimonials-primary-violet",
      textIsDark: false,
    },
    {
      backgroundColor: "bg-testimonials-primary-gray-blue",
      textIsDark: false,
    },
    {
      backgroundColor: "bg-testimonials-primary-white",
      textIsDark: true,
    },
    {
      backgroundColor: "bg-testimonials-primary-dark-blue",
      textIsDark: false,
    },
    {
      backgroundColor: "bg-testimonials-primary-white",
      textIsDark: true,
    },
  ];
  return (
    <section>
      {testimonials.map((testimony, index) => {
        return (
          <TestmimoyCard
            key={index}
            {...testimony}
            {...cardStyles[index]}
            hasQuoteBg={index === 0}
          />
        );
      })}
    </section>
  );
}

function TestmimoyCard(props) {
  const { avatar, name, title, highlight, testimony, backgroundColor, textIsDark, hasQuoteBg } = props;
  const textColor = textIsDark
    ? { name: "text-testimonials-primary-gray-blue", title: "text-testimonials-primary-gray-blue/50", highlight: "text-testimonials-primary-gray-blue", testimony: "text-testimonials-primary-gray-blue/70" }
    : { name: "text-testimonials-primary-white", title: "text-testimonials-primary-white/50", highlight: "text-testimonials-primary-white", testimony: "text-testimonials-primary-white/70" };
  return (
    <article className={`${backgroundColor} ${textColor.name} ${hasQuoteBg && "bg-[url('/testimonials-grid-section/images/bg-pattern-quotation.svg')] bg-no-repeat bg-[top_0px_right_10%]"}`}>
      <div>
        <div className="relative aspect-square w-[30px] rounded-full overflow-hidden">
          <Image
            src={avatar}
            alt={`${name}'s Avatar`}
            className="object-contain"
            fill
          />
        </div>
        <div>
          <h2 className={`${textColor.name}`}>{name}</h2>
          <p className={`${textColor.title}`}>{title}</p>
        </div>
      </div>
      <p className={`font-semibold ${textColor.highlight}`}>{highlight}</p>
      <p className={`${textColor.testimony}`}>{testimony}</p>
    </article>
  );
}

function Footer(props) {
  return (
    <div className="text-[11px] text-center">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="text-[hsl(228,45%,44%)]"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="#"
        className="text-[hsl(228,45%,44%)]"
      >
        Your Name Here
      </a>
      .
    </div>
  );
}

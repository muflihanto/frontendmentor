import Head from "next/head";
import Footer from "../components/huddle-landing-page-with-curved-sections/Footer";
import Image from "next/image";
import type { CSSProperties } from "react";
import { openSans } from "../utils/fonts/openSans";
import { poppins } from "../utils/fonts/poppins";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function HuddleCurved() {
  return (
    <div
      className={`App font-open-sans ${openSans.variable} ${poppins.variable}`}
    >
      <Head>
        <title>
          Frontend Mentor | Huddle landing page with curved sections
        </title>
      </Head>
      <Header />
      <Hero />
      <HeroImage />
      <Statistics />
      <GrowSection />
      <FlowSection />
      <UsersSection />
      <CtaSection />
      <Footer />
      {/* <Slider
        basePath="/huddle-landing-page-with-curved-sections/design/"
        absolutePath="/huddle-landing-page-with-curved-sections/design/active-states.jpg"
      /> */}
    </div>
  );
}

export const Logo = ({
  className,
  white,
}: {
  className: string;
  white?: boolean;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 240 39"
      style={
        {
          "--logo-icon": white ? "#FFFFFF" : "#FF52C1",
          "--logo-text": white ? "#FFFFFF" : "#00252E",
        } as CSSProperties
      }
    >
      <use href="/huddle-landing-page-with-curved-sections/images/logo.svg#huddle-logo" />
    </svg>
  );
};

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-[24px] py-6 lg:py-[78px] lg:pl-20 lg:pr-[64px]">
      <Logo className="h-[16px] lg:h-[39px]" />
      <button className="flex h-6 w-[80px] items-center justify-center rounded-full border border-huddle-curve-primary-pink-200 text-huddle-curve-primary-pink-200 hover:border-huddle-curve-primary-pink-100 hover:text-huddle-curve-primary-pink-100 hover:shadow hover:shadow-huddle-curve-neutral-700/10 lg:h-[40px] lg:w-[136px]">
        <span className="pb-[2px] text-[10px] leading-none tracking-[0.1px] lg:text-[16px]">
          Try it Free
        </span>
      </button>
    </header>
  );
};

const Hero = () => {
  return (
    <div className="flex h-[446px] flex-col items-center justify-center px-6 lg:h-[564px] lg:justify-start lg:pt-[170px]">
      <h1 className="text-center font-poppins text-[24px] font-bold leading-[36px] lg:text-[48px]">
        Build The Community Your Fans Will Love
      </h1>
      <p className="mt-[22px] px-2 text-center font-open-sans text-[14px] text-huddle-curve-neutral-700 lg:mt-[40px] lg:w-[640px] lg:text-[20px]">
        Huddle re-imagines the way we build communities. You have a voice, but
        so does your audience. Create connections with your users as you engage
        in genuine discussion.{" "}
      </p>
      <a
        href=""
        className="mt-[48px] flex h-10 w-[200px] items-center justify-center rounded-full bg-huddle-curve-primary-pink-200 text-[12px] font-bold text-huddle-curve-neutral-100 shadow-[0px_5px_10px_rgba(0,0,0,.2)] hover:bg-huddle-curve-primary-pink-100 lg:h-[80px] lg:w-[400px] lg:text-[20px]"
      >
        Get Started For Free
      </a>
    </div>
  );
};

const HeroImage = () => {
  return (
    <div className="px-[36px] py-[10px] lg:mx-auto lg:w-[1036px] lg:px-0">
      <svg className="w-full" viewBox="0 0 1035 739">
        <use href="/huddle-landing-page-with-curved-sections/images/screen-mockups.svg#screen-mockups" />
      </svg>
    </div>
  );
};

const Statistics = () => {
  return (
    <div className="relative flex flex-col items-center gap-[94px] pb-[4px] pt-[112px] lg:flex-row lg:items-start lg:justify-start lg:gap-[440px] lg:pb-[20px] lg:pl-[280px] lg:pt-[108px] [&_>_div_>_p:nth-child(3)]:place-self-center [&_>_div_>_p:nth-child(3)]:text-center [&_>_div_>_p:nth-child(3)]:text-huddle-curve-neutral-700/50 max-md:[&_>_div_>_p:nth-child(3)]:font-poppins">
      <div className="grid w-[154px] grid-rows-[repeat(3,minmax(0,auto))] lg:place-items-start">
        <div className="relative aspect-[47/41] w-[30px] lg:ml-[4px] lg:w-[47px]">
          <Image
            src="/huddle-landing-page-with-curved-sections/images/icon-communities.svg"
            alt="Icon Communities"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-[60px] font-bold leading-[82px] lg:mt-[14px] lg:text-[97px] lg:leading-none">
          1.4k+
        </p>
        <p className="mt-[6px] text-[14px] leading-[23px] lg:mt-[34px] lg:text-[24px]">
          Communities Formed
        </p>
      </div>
      <div className="grid w-[154px] grid-rows-[repeat(3,minmax(0,auto))] lg:place-items-start">
        <div className="relative aspect-[48/40] w-[24px] lg:ml-[6px] lg:mt-[3px] lg:w-[40px]">
          <Image
            src="/huddle-landing-page-with-curved-sections/images/icon-messages.svg"
            alt="Icon Messages"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-[53px] font-bold leading-[74px] lg:mt-[18px] lg:text-[97px] lg:leading-none">
          2.7m+
        </p>
        <p className="mt-[4px] pr-[26px] max-md:w-[100px] max-md:text-[13px] lg:mt-[25px] lg:pr-[40px] lg:text-[24px]">
          Messages Sent
        </p>
      </div>
    </div>
  );
};

const GrowSection = () => {
  return (
    <div className="relative pb-[calc(100vw*52/375)] pt-[calc(100vw*112/375)] lg:mt-[116px] lg:pb-[calc(100vw*104/1080)] lg:pt-[calc(100vw*124/1080)]">
      <div className="absolute left-0 top-0 -z-10 aspect-[375/112] w-full lg:aspect-[1080/124]">
        <Image
          className="object-contain"
          fill
          src="/huddle-landing-page-with-curved-sections/images/"
          loader={({ src, width }) => {
            if (width > 1023) {
              return src + "bg-section-top-desktop-1.svg";
            }
            return src + "bg-section-top-mobile-1.svg";
          }}
          alt="Section Curved Background"
        />
      </div>
      <section className="flex h-[550px] flex-col items-center justify-start bg-huddle-curve-neutral-100 px-[27px] pt-[82px] lg:grid lg:h-[535px] lg:grid-cols-2 lg:grid-rows-1 lg:place-items-center lg:gap-x-[60px] lg:px-[130px] lg:pt-[24px]">
        <GrowIllustration className="w-[258px] lg:col-start-2 lg:w-[517px]" />
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="mt-[76px] text-center font-poppins text-[20px] font-bold text-huddle-curve-neutral-700 lg:mt-0 lg:text-left lg:text-[40px]">
            Grow Together
          </h2>
          <p className="mt-[15px] text-center font-open-sans text-[14px] text-huddle-curve-neutral-700 lg:mt-[22px] lg:pr-[50px] lg:text-left lg:text-[16px]">
            Generate meaningful discussions with your audience and build a
            strong, loyal community. Think of the insightful conversations you
            miss out on with a feedback form.
          </p>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 aspect-[375/52] w-full lg:aspect-[1080/104]">
        <Image
          className="object-contain"
          fill
          src="/huddle-landing-page-with-curved-sections/images/"
          loader={({ src, width }) => {
            if (width > 1023) {
              return src + "bg-section-bottom-desktop-1.svg";
            }
            return src + "bg-section-bottom-mobile-1.svg";
          }}
          alt="Section Curved Background"
        />
      </div>
    </div>
  );
};

const FlowSection = () => {
  return (
    <section className="flex h-[644px] flex-col items-center justify-center px-[28px] pt-[20px] lg:mt-[85px] lg:grid lg:h-[599px] lg:grid-cols-2 lg:grid-rows-1 lg:place-items-center lg:gap-x-[102px] lg:px-[130px] lg:pt-[0px]">
      <FlowIllustration className="w-[264px] lg:w-[530px]" />
      <div className="lg:ml-7 lg:mt-[2px]">
        <h2 className="mt-[88.5px] text-center font-poppins text-[20px] font-bold text-huddle-curve-neutral-700 lg:mt-0 lg:text-left lg:text-[40px]">
          Flowing Conversations
        </h2>
        <p className="mt-[14px] text-center font-open-sans text-[14px] text-huddle-curve-neutral-700 lg:mt-[22px] lg:text-left lg:text-[16px]">
          You wouldn&lsquo;t paginate a conversation in real life, so why do it
          online? Our threads have just-in-time loading for a more natural flow.
        </p>
      </div>
    </section>
  );
};

const UsersSection = () => {
  return (
    <div className="relative pb-[calc(100vw*101/375)] pt-[calc(100vw*103/375)] lg:pb-[calc(100vw*139/1440)] lg:pt-[calc(100vw*156/1440)]">
      <div className="absolute left-0 top-0 -z-10 aspect-[375/103] w-full lg:aspect-[1440/156]">
        <Image
          className="object-contain"
          fill
          src="/huddle-landing-page-with-curved-sections/images/"
          loader={({ src, width }) => {
            if (width > 1023) {
              return src + "bg-section-top-desktop-2.svg";
            }
            return src + "bg-section-top-mobile-2.svg";
          }}
          alt="Section Curved Background"
        />
      </div>
      <section className="flex h-[542px] flex-col items-center justify-center bg-huddle-curve-neutral-100 px-[27px] pb-[100px] lg:grid lg:h-fit lg:grid-cols-2 lg:grid-rows-1 lg:place-items-center lg:gap-x-[80px] lg:px-[120px] lg:pb-[40px] lg:pt-[44px]">
        <UsersIllustration className="w-[268px] lg:col-start-2 lg:w-[534px] " />
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="mt-[81px] text-center font-poppins text-[20px] font-bold text-huddle-curve-neutral-700 lg:mt-0 lg:text-left lg:text-[40px]">
            Your Users
          </h2>
          <p className="mt-[13px] text-center font-open-sans text-[14px] text-huddle-curve-neutral-700 lg:mt-[22px] lg:pr-[30px] lg:text-left lg:text-[16px]">
            It takes no time at all to integrate Huddle with your app&lsquo;s
            authentication solution. This means, once signed in to your app,
            your users can start chatting immediately.
          </p>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 aspect-[375/101] w-full lg:aspect-[1440/139]">
        <Image
          className="object-contain"
          fill
          src="/huddle-landing-page-with-curved-sections/images/"
          loader={({ src, width }) => {
            if (width > 1023) {
              return src + "bg-section-bottom-desktop-2.svg";
            }
            return src + "bg-section-bottom-mobile-2.svg";
          }}
          alt="Section Curved Background"
        />
      </div>
    </div>
  );
};

const CtaSection = () => {
  return (
    <section className="flex h-[467px] flex-col items-center justify-start px-[24px] pt-[67px] lg:mb-[50px] lg:pt-[160px]">
      <h2 className="text-center font-poppins text-[24px] font-bold text-huddle-curve-neutral-700 lg:ml-4 lg:text-[40px] lg:leading-[62px] lg:tracking-[-0.15px]">
        Ready To Build Your Community?
      </h2>
      <a
        href=""
        className="mt-[37.5px] flex h-[40px] w-[200px] items-center justify-center rounded-full bg-huddle-curve-primary-pink-200 shadow-[0px_5px_5px_rgba(0,0,0,.12)] hover:bg-huddle-curve-primary-pink-100 lg:h-[80px] lg:w-[400px]"
      >
        <span className="pt-[2px] text-[12px] font-bold text-huddle-curve-neutral-100/90 lg:text-[20px]">
          Get Started For Free
        </span>
      </a>
    </section>
  );
};

const GrowIllustration = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 1023.46 837.84" className={className}>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-grow-together.svg#illustration-grow-together" />
    </svg>
  );
};

const FlowIllustration = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 1125.12 800.94" className={className}>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-flowing-conversation.svg#illustration-flowing-conversation" />
    </svg>
  );
};

const UsersIllustration = ({ className }: { className: string }) => {
  return (
    <svg viewBox="0 0 1077.87 813.02" className={className}>
      <use href="/huddle-landing-page-with-curved-sections/images/illustration-your-users.svg#illustration-your-users" />
    </svg>
  );
};

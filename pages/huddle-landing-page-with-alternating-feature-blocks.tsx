import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import type { ReactElement } from "react";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

const HuddleAlternate = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Huddle landing page with alternating feature blocks</title>
      </Head>
      <div className="App font-open-sans relative">
        <Header />
        <Hero />
        <div className="flex flex-col gap-[40px] px-[20px] pt-[59px] pb-[53px]">
          <Card className="pt-[23.5px]">
            <GrowIllustration className="w-[236px]" />
            <h2 className="font-poppins text-huddle-alternate-neutral-300 mt-[56px] text-center text-[20px] font-semibold">Grow Together</h2>
            <p className="text-huddle-alternate-neutral-200 mt-[14px] px-[28px] text-center text-[14px]">Generate meaningful discussions with your audience and build a strong, loyal community. Think of the insightful conversations you miss out on with a feedback form.</p>
          </Card>
          <Card className="pt-[12px]">
            <FlowIllustration className="w-[242px]" />
            <h2 className="font-poppins text-huddle-alternate-neutral-300 mt-[68px] text-center text-[20px] font-semibold">Flowing Conversations</h2>
            <p className="text-huddle-alternate-neutral-200 mt-[14px] px-[40px] text-center text-[14px]">You wouldn&lsquo;t paginate a conversation in real life, so why do it online? Our threads have just-in-time loading for a more natural flow.</p>
          </Card>
          <Card className="pt-[26px]">
            <UsersIllustration className="w-[245px]" />
            <h2 className="font-poppins text-huddle-alternate-neutral-300 mt-[61.5px] text-center text-[20px] font-semibold">Your Users</h2>
            <p className="text-huddle-alternate-neutral-200 mt-[14px] px-[44px] text-center text-[14px]">It takes no time at all to integrate Huddle with your app&lsquo;s authentication solution. This means, once signed in to your app, your users can start chatting immediately.</p>
          </Card>
        </div>
        <div className="relative top-[67px] z-[2] mx-auto flex h-[176px] w-[calc(375px-24px)] flex-col items-center justify-center gap-[24px] rounded-[16px] bg-white pt-[3px] font-semibold shadow-[0px_0px_15px_5px_rgba(0,0,0,.05)]">
          <h2 className="font-poppins text-huddle-alternate-neutral-300 text-center text-[18px] font-semibold">Ready To Build Your Community?</h2>
          <a
            href=""
            className="bg-huddle-alternate-primary hover:bg-huddle-curve-primary-pink-100 text-huddle-alternate-neutral-100 flex h-[40px] w-[200px] items-center justify-center rounded-full text-[10.25px] shadow-[0px_5px_5px_rgba(0,0,0,.1)]"
          >
            <span className="text-center">Get Started For Free</span>
          </a>
        </div>
        <Footer />
        <Slider basePath="/huddle-landing-page-with-alternating-feature-blocks/design/" />
      </div>
    </>
  );
};

export default HuddleAlternate;

function Header() {
  return (
    <header className="absolute top-0 left-0 flex w-full items-center justify-between px-[16px] py-6 lg:py-[78px] lg:pl-20 lg:pr-[64px]">
      <Logo className="h-[17px] lg:h-[39px]" />
      <button className="text-huddle-alternate-neutral-300 flex h-6 w-[96px] items-center justify-center rounded-full bg-white font-bold shadow-[0px_0px_10px_rgba(0,0,0,.1)] lg:h-[40px] lg:w-[136px]">
        <span className="pb-[2px] text-[10px] leading-none tracking-[0.1px] lg:text-[16px]">Try it Free</span>
      </button>
    </header>
  );
}

function Hero() {
  return (
    <div className="flex h-[718px] flex-col items-center justify-center bg-[hsl(191,89%,96%)] bg-no-repeat px-[26px] pt-[96px] max-md:bg-[url('/huddle-landing-page-with-alternating-feature-blocks/images/bg-hero-mobile.svg')] lg:bg-[url('/huddle-landing-page-with-alternating-feature-blocks/images/bg-hero-desktop.svg')]">
      <h1 className="font-poppins text-center text-[24px] font-semibold leading-[36px] lg:text-[48px]">Build The Community Your Fans Will Love</h1>
      <p className="text-huddle-curve-neutral-700 font-open-sans mt-[21px] px-2 text-center text-[16px] lg:mt-[40px] lg:w-[640px] lg:text-[20px]">Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion. </p>
      <a
        href=""
        className="text-huddle-curve-neutral-100 hover:bg-huddle-curve-primary-pink-100 bg-huddle-curve-primary-pink-200 mt-[32px] flex h-10 w-[240px] items-center justify-center rounded-full pb-[3px] text-[12px] font-bold lg:h-[80px] lg:w-[400px] lg:text-[20px]"
      >
        Get Started For Free
      </a>
      <HeroImage className="mt-[53px] lg:mx-auto lg:w-[1036px] lg:px-0" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-huddle-alternate-neutral-300 text-huddle-curve-neutral-100 h-[851px] px-4 pt-[138px]">
      <Logo
        className="h-[27px]"
        white
      />
      <div className="grid grid-rows-[repeat(3,minmax(0,auto))] gap-y-[0px]">
        <div className="max-md:row-start-1 lg:w-[310px]">
          <p className="mt-[24px] grid grid-flow-col-dense justify-items-start">
            <svg
              viewBox="0 0 13 18"
              className="mr-[5px] w-[13px] pt-[8px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.188 0C2.74 0 0 2.79 0 6.3 0 10.98 6.188 18 6.188 18s6.187-7.02 6.187-11.7c0-3.51-2.74-6.3-6.188-6.3zm0 8.55c-1.238 0-2.21-.99-2.21-2.25s.972-2.25 2.21-2.25c1.237 0 2.21.99 2.21 2.25s-.973 2.25-2.21 2.25z"
                fill="#FFF"
                fillRule="evenodd"
              />
            </svg>
            <span className="ml-[21px] pr-[4px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
          </p>
          <p className="mt-[24px] flex items-center justify-start lg:mt-[26px]">
            <svg
              viewBox="0 0 18 18"
              className="ml-[3px] w-[18px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
              >
                <path d="M-3-3h24v24H-3z" />
                <path
                  d="M17 12.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H1C.4 0 0 .4 0 1c0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM16 9h2c0-5-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"
                  fill="#FFF"
                />
              </g>
            </svg>
            <span className="ml-[18px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">+1-543-123-4567</span>
          </p>
          <p className="mt-[24px] flex items-center justify-start lg:mt-[15px]">
            <svg
              className="ml-[2px] w-5"
              viewBox="0 0 20 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
              >
                <path d="M-2-4h24v24H-2z" />
                <path
                  d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 14h-2V5.2L10 9 4 5.2V14H2V2h1.2L10 6.2 16.8 2H18v12z"
                  fill="#FFF"
                />
              </g>
            </svg>
            <span className="ml-[19px] text-[15px] leading-[24px] tracking-[0.6px] lg:text-[16px] lg:tracking-[0px]">example@huddle.com</span>
          </p>
        </div>
        <ul className="mt-[56px] flex flex-col gap-4 [&_a]:text-[18px]">
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">What We Do</a>
          </li>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">Career</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-[25px]">
          <SocialIcons />
          <p className="font-poppins text-[11px]">&copy; Copyright 2018 Huddle. All rights reserved.</p>
        </div>
      </div>
      <p className="text-huddle-curve-neutral-100 [&_a]:text-huddle-curve-primary-pink-100 absolute bottom-2 left-0 w-full text-center text-[11px] lg:bottom-8 lg:px-[120px] lg:text-right lg:text-[13px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
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
          target="_blank"
          rel="noreferrer"
        >
          Muflihanto
        </a>
        .
      </p>
    </footer>
  );
}

function SocialIcons({}) {
  return (
    <div className="[&_a:hover]:border-huddle-alternate-primary mt-[52px] flex items-center justify-start gap-[12px] place-self-center lg:mt-[78px] lg:gap-[24px] [&_a]:flex [&_a]:aspect-square [&_a]:h-[31px] [&_a]:w-[31px] [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_svg]:h-[15px] lg:[&_svg]:h-[37px]">
      <a
        href=""
        className="group"
      >
        <svg
          className="group-hover:fill-huddle-alternate-primary fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
      </a>
      <a
        href=""
        className="group"
      >
        <svg
          className="group-hover:fill-huddle-alternate-primary fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>
      </a>
      <a
        href=""
        className="group"
      >
        <svg
          className="group-hover:fill-huddle-alternate-primary fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      </a>
    </div>
  );
}

function Logo({ className, white }: { className: string; white?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 39"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fillRule="nonzero"
        fill="none"
      >
        <path
          d="M27.967.879C20.242.875 12.182 2.615 4.047 4.872c-1.033.208-2.041.884-2.574 1.72C.983 7.38.805 8.171.652 9c-.79 4.428-.694 8.776-.53 13.594.036 1.103.2 2.41.715 3.205.538.803 1.46 1.313 2.561 1.48a95.99 95.99 0 0 0 4.232.525l-.312 8.698c-.048.692.29 1.267.71 1.598.376.286.795.413 1.225.445.86.065 1.869-.303 2.37-1.257 2.195-4.224 3.572-6.089 6.317-8.895 7.158.176 13.407-.222 20.482-.745 2.501-.065 4.218-2.11 4.672-3.743 1.357-4.232 1.568-9.456 1.712-14.737.061-2.093-.665-4.148-1.95-5.234-1.222-.991-2.702-1.35-4.058-1.718C35.031 1.363 31.263.905 27.967.879zm10.29 3.31c1.358.369 2.555.724 3.31 1.337 1.26 1.339 1.218 2.23 1.2 3.675-.142 5.122-.388 10.093-1.544 13.86-.498 1.405-1.366 2.405-3.006 2.556-7.208.533-13.462.945-20.707.739a1.032 1.032 0 0 0-.763.302c-3.044 3.074-4.601 5.21-6.921 9.676-.054.102-.171.164-.315.175-.097-.005-.136-.08-.142-.148l.314-9.432c.019-.509-.401-.995-.907-1.05a95.48 95.48 0 0 1-5.06-.62c-.726-.111-.994-.31-1.193-.606-.346-.825-.338-1.335-.365-2.128-.162-4.775-.242-8.948.491-13.1.068-.614.298-1.242.542-1.767.404-.632 1.023-.725 1.644-.897 7.956-2.197 15.74-3.84 23.068-3.845 3.592.13 7.364.49 10.354 1.273zm-27.479 8.09c-1.096 1.313-.987 3.096-.14 4.29.442.625 1.132 1.128 1.972 1.242 1.091.09 1.783-.352 2.53-.86 1.353-1.176 1.49-3.228.461-4.71-.524-.755-1.362-1.208-2.218-1.24-1.172.012-1.968.535-2.605 1.277zm11.856-1.072c-1.092.035-1.975.791-2.514 1.607-.617.933-.977 2.101-.478 3.246.96 2.203 4.277 2.176 5.6-.063.61-1.032.454-2.205 0-3.056-.452-.85-1.136-1.543-2.131-1.702a2.494 2.494 0 0 0-.477-.032zm9.625.207c-.34-.008-.69.024-1.018.111-1.312.35-2.429 1.704-2.26 3.437.086.872.487 1.722 1.21 2.308.723.585 1.773.847 2.88.62 1.272-.26 2.06-1.285 2.323-2.275.263-.99.197-1.999-.414-2.817a3.47 3.47 0 0 0-2.72-1.384zm-18.965 1.623c.245.002.438.08.637.366.445.642.321 1.615-.128 2.005-.447.39-.726.424-.922.398-.196-.027-.395-.162-.573-.414-.34-.48-.44-1.256.007-1.81.238-.316.675-.513.98-.545zm9.483.223c.038.006.464.253.668.636.204.383.242.739.048 1.066-.577.976-1.804.712-1.99.287-.07-.162-.017-.813.32-1.32.335-.509.757-.7.954-.67zm10.564.748c.062.083.213.64.096 1.082-.118.442-.31.715-.78.811-.602.124-.94 0-1.193-.207-.254-.205-.425-.552-.462-.923-.09-.92.24-1.133.764-1.273.61-.15 1.3.112 1.575.51z"
          fill={white ? "#FFF" : "#FF52C1"}
        />
        <path
          d="M57.61 4.996c.016-.26.111-.494.287-.701a.875.875 0 0 1 .701-.31h6.826c.23 0 .467.096.712.287a.883.883 0 0 1 .368.724v10.893h11.421V4.996c0-.276.096-.513.287-.712.192-.2.44-.3.747-.3h6.734c.306 0 .574.077.804.23.23.154.345.399.345.736V37.1c0 .337-.1.59-.3.758-.198.169-.459.253-.78.253h-6.803c-.306 0-.555-.084-.747-.253-.191-.168-.287-.42-.287-.758V24.047H66.504V37.1c0 .322-.104.57-.31.747-.207.176-.487.264-.84.264h-6.756c-.643 0-.972-.299-.988-.896V4.996zm62.875 32.725c-.199.168-.41.275-.632.321a3.123 3.123 0 0 1-.631.07h-3.47c-.276 0-.514-.05-.713-.15-.2-.1-.368-.234-.506-.402a2.384 2.384 0 0 1-.344-.575 4.884 4.884 0 0 1-.23-.666l-.712-2.942c-.23.475-.563 1.015-1 1.62a8.495 8.495 0 0 1-1.666 1.7c-.674.53-1.479.974-2.413 1.334-.935.36-2.007.54-3.218.54-1.746 0-3.332-.337-4.757-1.011a10.904 10.904 0 0 1-3.642-2.758c-1.003-1.164-1.781-2.524-2.332-4.08-.552-1.554-.828-3.213-.828-4.974V10.695c0-.582.127-1.022.38-1.321.252-.299.654-.448 1.206-.448h5.308c.66 0 1.111.11 1.356.333.245.222.368.655.368 1.298v14.96c0 .66.15 1.284.448 1.874.299.59.693 1.11 1.184 1.562.49.452 1.045.809 1.666 1.069.62.26 1.252.39 1.896.39.551 0 1.122-.13 1.712-.39a6.361 6.361 0 0 0 1.631-1.046c.498-.436.908-.95 1.23-1.54.322-.59.482-1.214.482-1.872V10.626c0-.26.05-.52.15-.781.1-.26.249-.46.448-.598.199-.122.387-.206.563-.252.176-.046.38-.07.609-.07h5.194c.658 0 1.133.162 1.424.483.291.322.437.751.437 1.287v25.716c0 .29-.065.559-.195.804s-.31.437-.54.574l.137-.068zm26.681-3.172c-.414.414-.87.858-1.367 1.333-.498.475-1.046.92-1.643 1.333a9.3 9.3 0 0 1-1.93 1.023 6.097 6.097 0 0 1-2.23.402c-2.083 0-4.002-.39-5.757-1.172a13.777 13.777 0 0 1-4.527-3.206c-1.264-1.356-2.252-2.953-2.964-4.792-.713-1.838-1.069-3.814-1.069-5.929 0-2.13.356-4.11 1.069-5.94.712-1.83 1.7-3.424 2.964-4.78a13.635 13.635 0 0 1 4.527-3.194c1.755-.774 3.674-1.161 5.757-1.161.843 0 1.613.123 2.31.368a8.51 8.51 0 0 1 1.907.942c.575.383 1.103.816 1.586 1.298.482.483.938.954 1.367 1.414V1.985c0-.49.15-.903.448-1.24.299-.338.747-.506 1.345-.506h5.17c.2 0 .41.042.632.126.222.085.425.203.61.357.183.153.332.337.447.551.115.215.173.452.173.712v34.357c0 1.18-.62 1.77-1.862 1.77h-4.504c-.306 0-.544-.04-.712-.116a1.13 1.13 0 0 1-.426-.333 2.319 2.319 0 0 1-.31-.551 17.13 17.13 0 0 0-.344-.77l-.667-1.793zm-13.214-11.008a8.39 8.39 0 0 0 .471 2.839c.314.88.762 1.643 1.345 2.286a6.384 6.384 0 0 0 2.102 1.528c.82.376 1.728.563 2.724.563.98 0 1.903-.176 2.769-.528a7.058 7.058 0 0 0 2.263-1.46 7.256 7.256 0 0 0 1.552-2.194c.39-.843.609-1.747.655-2.712v-.322a7.26 7.26 0 0 0-.552-2.803 7.427 7.427 0 0 0-1.528-2.344 7.242 7.242 0 0 0-2.298-1.597 6.977 6.977 0 0 0-2.861-.586c-.996 0-1.904.195-2.724.586-.82.39-1.52.923-2.102 1.597a7.236 7.236 0 0 0-1.345 2.344 8.35 8.35 0 0 0-.47 2.803zm48.72 11.008c-.414.414-.87.858-1.368 1.333-.498.475-1.046.92-1.643 1.333a9.3 9.3 0 0 1-1.93 1.023 6.097 6.097 0 0 1-2.23.402c-2.083 0-4.002-.39-5.756-1.172a13.777 13.777 0 0 1-4.528-3.206c-1.263-1.356-2.252-2.953-2.964-4.792-.712-1.838-1.069-3.814-1.069-5.929 0-2.13.357-4.11 1.069-5.94s1.7-3.424 2.964-4.78a13.635 13.635 0 0 1 4.528-3.194c1.754-.774 3.673-1.161 5.756-1.161.843 0 1.613.123 2.31.368a8.51 8.51 0 0 1 1.907.942c.575.383 1.103.816 1.586 1.298.483.483.938.954 1.367 1.414V1.985c0-.49.15-.903.448-1.24.3-.338.747-.506 1.345-.506h5.17c.2 0 .41.042.632.126.223.085.426.203.61.357.183.153.333.337.448.551.114.215.172.452.172.712v34.357c0 1.18-.62 1.77-1.862 1.77h-4.504c-.306 0-.544-.04-.712-.116a1.13 1.13 0 0 1-.425-.333 2.319 2.319 0 0 1-.31-.551 17.13 17.13 0 0 0-.345-.77l-.667-1.793zm-13.215-11.008a8.39 8.39 0 0 0 .471 2.839c.315.88.763 1.643 1.345 2.286a6.384 6.384 0 0 0 2.103 1.528c.82.376 1.727.563 2.723.563.98 0 1.903-.176 2.769-.528a7.058 7.058 0 0 0 2.264-1.46 7.256 7.256 0 0 0 1.55-2.194c.391-.843.61-1.747.656-2.712v-.322a7.26 7.26 0 0 0-.552-2.803 7.427 7.427 0 0 0-1.528-2.344 7.242 7.242 0 0 0-2.298-1.597 6.977 6.977 0 0 0-2.861-.586c-.996 0-1.904.195-2.723.586-.82.39-1.521.923-2.103 1.597a7.236 7.236 0 0 0-1.345 2.344 8.35 8.35 0 0 0-.47 2.803zM197.61 2.008c0-.49.122-.903.367-1.24.246-.338.667-.506 1.264-.506h5.63c.154 0 .315.042.483.126a1.7 1.7 0 0 1 .471.357c.146.153.268.337.368.551.1.215.15.452.15.712v34.334c0 .582-.165 1.022-.495 1.321-.329.299-.754.448-1.275.448h-5.332c-.597 0-1.018-.15-1.264-.448-.245-.299-.367-.74-.367-1.321V2.008zm38.7 32.61a15.31 15.31 0 0 1-4.55 2.907 13.87 13.87 0 0 1-5.355 1.046c-2.1 0-4.083-.383-5.952-1.15a15.494 15.494 0 0 1-4.918-3.182 15.273 15.273 0 0 1-3.355-4.792c-.828-1.838-1.241-3.837-1.241-5.998 0-1.348.164-2.654.494-3.918a15.45 15.45 0 0 1 1.402-3.55 15.055 15.055 0 0 1 2.206-3.045 13.957 13.957 0 0 1 2.907-2.379 14.327 14.327 0 0 1 3.493-1.54 14.084 14.084 0 0 1 3.975-.551c1.272 0 2.505.169 3.7.506 1.195.337 2.318.812 3.367 1.424 1.05.613 2.01 1.349 2.884 2.207a14.896 14.896 0 0 1 2.252 2.815 13.58 13.58 0 0 1 1.46 3.263c.344 1.157.517 2.348.517 3.573 0 .797-.012 1.448-.035 1.954-.023.505-.142.908-.356 1.206-.215.3-.57.506-1.069.62-.498.116-1.23.173-2.194.173h-16.546c.153.98.463 1.8.93 2.46a5.842 5.842 0 0 0 1.62 1.573c.613.391 1.264.67 1.954.84a8.24 8.24 0 0 0 1.953.252c.552 0 1.118-.058 1.7-.172a12.179 12.179 0 0 0 1.69-.46 9.557 9.557 0 0 0 1.493-.667c.452-.252.816-.517 1.092-.792.245-.2.456-.349.632-.449.176-.1.364-.149.563-.149.2 0 .402.07.61.207a4.8 4.8 0 0 1 .7.597l2.436 2.758c.168.2.276.38.322.54.046.161.069.326.069.494 0 .307-.085.571-.253.793a2.89 2.89 0 0 1-.598.586zm-11.054-19.143c-.598 0-1.176.119-1.735.356a6.547 6.547 0 0 0-1.575.954c-.49.398-.93.85-1.321 1.356a8.315 8.315 0 0 0-.954 1.54h11.743a13.536 13.536 0 0 0-1.045-1.655 7.081 7.081 0 0 0-1.287-1.333 5.558 5.558 0 0 0-1.655-.896c-.62-.215-1.344-.322-2.171-.322z"
          fill={white ? "#FFF" : "#00252E"}
        />
      </g>
    </svg>
  );
}

function HeroImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ScreenMockups className="w-full" />
    </div>
  );
}

function ScreenMockups({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1035 739"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect
          id="b"
          width="960"
          height="600"
          rx="20"
        />
        <filter
          x="-1.6%"
          y="-2.5%"
          width="103.1%"
          height="105%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <path
          d="M20 0h920c11.046 0 20 8.954 20 20v44H0V20C0 8.954 8.954 0 20 0z"
          id="d"
        />
        <filter
          x="-1.6%"
          y="-23.4%"
          width="103.1%"
          height="146.9%"
          filterUnits="objectBoundingBox"
          id="c"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <linearGradient
          x1="14.811%"
          y1="-22.362%"
          x2="75.996%"
          y2="119.406%"
          id="e"
        >
          <stop
            stopColor="#FAD961"
            offset="0%"
          />
          <stop
            stopColor="#FF52C1"
            offset="100%"
          />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="f"
        >
          <stop
            stopColor="#00C7FA"
            offset="0%"
          />
          <stop
            stopColor="#007DFA"
            offset="100%"
          />
        </linearGradient>
        <linearGradient
          x1="28.973%"
          y1="0%"
          x2="90.2%"
          y2="111.244%"
          id="g"
        >
          <stop
            stopColor="#FF52C1"
            offset="0%"
          />
          <stop
            stopColor="#9952FF"
            offset="100%"
          />
        </linearGradient>
        <rect
          id="i"
          width="320"
          height="512"
          rx="17.067"
        />
        <filter
          x="-4.2%"
          y="-2.6%"
          width="108.4%"
          height="105.3%"
          filterUnits="objectBoundingBox"
          id="h"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="4.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <path
          d="M17.067 0h285.866C312.36 0 320 7.641 320 17.067v37.546H0V17.067C0 7.64 7.641 0 17.067 0z"
          id="k"
        />
        <filter
          x="-4.2%"
          y="-24.7%"
          width="108.4%"
          height="149.4%"
          filterUnits="objectBoundingBox"
          id="j"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="4.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g
        fill="none"
        fillRule="evenodd"
      >
        <g transform="translate(10 10)">
          <use
            fill="#000"
            filter="url(#a)"
            xlinkHref="#b"
          />
          <use
            fill="#FFF"
            xlinkHref="#b"
          />
          <use
            fill="#000"
            filter="url(#c)"
            xlinkHref="#d"
          />
          <use
            fill="#00252E"
            xlinkHref="#d"
          />
          <rect
            fill="#E1E8EE"
            x="72"
            y="20"
            width="200"
            height="24"
            rx="5"
          />
          <g
            transform="translate(864 22)"
            fill="#D8D8D8"
          >
            <rect
              width="32"
              height="4"
              rx="2"
            />
            <rect
              y="8"
              width="32"
              height="4"
              rx="2"
            />
            <rect
              y="16"
              width="32"
              height="4"
              rx="2"
            />
          </g>
          <g transform="translate(72 138)">
            <circle
              fill="url(#e)"
              cx="48"
              cy="48"
              r="48"
            />
            <g
              transform="translate(152 12)"
              fill="#E1E8EE"
            >
              <rect
                width="115"
                height="16"
                rx="3"
              />
              <rect
                y="32"
                width="400"
                height="8"
                rx="3"
              />
              <rect
                y="48"
                width="366.667"
                height="8"
                rx="3"
              />
              <rect
                y="64"
                width="333.333"
                height="8"
                rx="3"
              />
            </g>
            <g
              transform="translate(600 36)"
              fill="#A7B9C8"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
              />
              <circle
                cx="76"
                cy="12"
                r="12"
              />
              <circle
                cx="44"
                cy="12"
                r="12"
              />
              <circle
                cx="108"
                cy="12"
                r="12"
              />
              <circle
                cx="140"
                cy="12"
                r="12"
              />
            </g>
          </g>
          <g transform="translate(72 274)">
            <circle
              fill="url(#f)"
              cx="45"
              cy="45"
              r="45"
            />
            <g
              transform="translate(149 9)"
              fill="#E1E8EE"
            >
              <rect
                width="115"
                height="16"
                rx="3"
              />
              <rect
                y="32"
                width="400"
                height="8"
                rx="3"
              />
              <rect
                y="48"
                width="366.667"
                height="8"
                rx="3"
              />
              <rect
                y="64"
                width="333.333"
                height="8"
                rx="3"
              />
            </g>
            <g
              transform="translate(597 33)"
              fill="#A7B9C8"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
              />
              <circle
                cx="76"
                cy="12"
                r="12"
              />
              <circle
                cx="44"
                cy="12"
                r="12"
              />
            </g>
          </g>
          <g transform="translate(72 417)">
            <circle
              fill="url(#g)"
              cx="45"
              cy="45"
              r="45"
            />
            <g
              transform="translate(149 9)"
              fill="#E1E8EE"
            >
              <rect
                width="115"
                height="16"
                rx="3"
              />
              <rect
                y="32"
                width="400"
                height="8"
                rx="3"
              />
              <rect
                y="48"
                width="366.667"
                height="8"
                rx="3"
              />
              <rect
                y="64"
                width="333.333"
                height="8"
                rx="3"
              />
            </g>
            <g
              transform="translate(597 33)"
              fill="#A7B9C8"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
              />
              <circle
                cx="76"
                cy="12"
                r="12"
              />
              <circle
                cx="44"
                cy="12"
                r="12"
              />
              <circle
                cx="108"
                cy="12"
                r="12"
              />
            </g>
          </g>
        </g>
        <g transform="translate(706 218)">
          <use
            fill="#000"
            filter="url(#h)"
            xlinkHref="#i"
          />
          <use
            fill="#FFF"
            xlinkHref="#i"
          />
        </g>
        <g transform="translate(706 218)">
          <use
            fill="#000"
            filter="url(#j)"
            xlinkHref="#k"
          />
          <use
            fill="#00252E"
            xlinkHref="#k"
          />
        </g>
        <g transform="translate(738.133 236.773)">
          <rect
            fill="#E1E8EE"
            width="104"
            height="20.48"
            rx="4.267"
          />
          <g
            transform="translate(226.427 1.707)"
            fill="#D8D8D8"
          >
            <rect
              width="27.307"
              height="3.413"
              rx="1.707"
            />
            <rect
              y="6.827"
              width="27.307"
              height="3.413"
              rx="1.707"
            />
            <rect
              y="13.653"
              width="27.307"
              height="3.413"
              rx="1.707"
            />
          </g>
        </g>
        <g transform="translate(738 326)">
          <circle
            fill="url(#e)"
            cx="15"
            cy="15"
            r="15"
          />
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
        </g>
        <g transform="translate(738 464)">
          <circle
            fill="url(#e)"
            cx="15"
            cy="15"
            r="15"
          />
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
        </g>
        <g transform="translate(738 372)">
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
          <circle
            fill="url(#f)"
            cx="15"
            cy="15"
            r="15"
          />
        </g>
        <g transform="translate(738 510)">
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
          <circle
            fill="url(#f)"
            cx="15"
            cy="15"
            r="15"
          />
        </g>
        <g transform="translate(738 418)">
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
          <circle
            fill="url(#g)"
            cx="15"
            cy="15"
            r="15"
          />
        </g>
        <g transform="translate(738 556)">
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
          <circle
            fill="url(#g)"
            cx="15"
            cy="15"
            r="15"
          />
        </g>
        <g transform="translate(738 602)">
          <circle
            fill="url(#e)"
            cx="15"
            cy="15"
            r="15"
          />
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
        </g>
        <g transform="translate(738 648)">
          <g
            transform="translate(46 3)"
            fill="#E1E8EE"
          >
            <rect
              width="57.5"
              height="5.333"
              rx=".92"
            />
            <rect
              y="10.667"
              width="200"
              height="2.667"
              rx=".92"
            />
            <rect
              y="16"
              width="183.333"
              height="2.667"
              rx=".92"
            />
            <rect
              y="21.333"
              width="166.667"
              height="2.667"
              rx=".92"
            />
          </g>
          <circle
            fill="url(#f)"
            cx="15"
            cy="15"
            r="15"
          />
        </g>
      </g>
    </svg>
  );
}

function Card({ children, className }: { children: ReactElement | ReactElement[]; className?: string }) {
  return <div className={"flex h-[488px] w-full flex-col items-center justify-center rounded-[16px] bg-white shadow-[0px_0px_15px_5px_rgba(0,0,0,.05)] " + className}>{children}</div>;
}

function GrowIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1023.46 837.84"
    >
      <defs>
        <linearGradient
          id="a"
          x1="352.43"
          y1="317.15"
          x2="352.43"
          y2="135.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="gray"
            stopOpacity=".25"
          />
          <stop
            offset=".54"
            stopColor="gray"
            stopOpacity=".12"
          />
          <stop
            offset="1"
            stopColor="gray"
            stopOpacity=".1"
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1="569.83"
          y1="551.49"
          x2="569.83"
          y2="380.82"
          xlinkHref="#a"
        />
        <linearGradient
          id="c"
          x1="171.5"
          y1="319.2"
          x2="171.5"
          y2="319.02"
          xlinkHref="#a"
        />
        <linearGradient
          id="d"
          x1="228.01"
          y1="853.75"
          x2="228.01"
          y2="250.26"
          xlinkHref="#a"
        />
        <linearGradient
          id="e"
          x1="944.05"
          y1="849.94"
          x2="944.05"
          y2="268.42"
          xlinkHref="#a"
        />
      </defs>
      <ellipse
        cx="176"
        cy="807.85"
        rx="176"
        ry="29.99"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="847.47"
        cy="800.75"
        rx="176"
        ry="29.99"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M274.41.46c-46 2.46-92.48 15.9-128.37 44.79-31.49 25.36-54.2 65.23-48.66 105.29 6.54 47.29 48.73 81.69 64.38 126.8 10.07 29 8.5 61 1.91 91-4.24 19.33-10.76 38.68-23.29 54-22.57 27.56-63.3 40.86-74.39 74.71-12.06 36.81 18.33 72.91 46.88 99.09 22.79 20.89 46.66 41.68 75.38 53.13 21 8.38 43.79 11.39 66.38 12.59a442.71 442.71 0 0 0 183-29.24c27.91-10.83 54.91-24.56 84.12-31.09 62.25-13.92 126.3 6.15 189.39 15.55a566.44 566.44 0 0 0 163.17.48c34.06-4.86 69.25-13.63 94.9-36.55 26-23.27 39-59.29 37.56-94.19s-16.16-68.5-37.84-95.9c-28-35.39-66.62-60.57-100.22-90.73a433.34 433.34 0 0 1-86.22-106.58c-13.2-23-24.43-47.41-41.53-67.66-26.67-31.56-65.35-50.33-104-64.83-89.16-33.4-181.64-40.2-274.6-54.96-29.05-4.63-58.52-7.24-87.95-5.7z"
        fill="#00c7fa"
        opacity=".1"
      />
      <g opacity=".7">
        <path
          fill="#f6f7f9"
          d="M258.54 367.11H449.5v106.71H258.54z"
        />
        <circle
          cx="294.49"
          cy="414.48"
          r="19.88"
          fill="#00c7fa"
          opacity=".2"
        />
        <path
          fill="#00c7fa"
          d="M338.61 390.92h86.62v5.45h-86.62zM338.61 404.81h44.13v5.45h-44.13zM338.61 418.7h71.37v5.45h-71.37zM338.61 432.59h86.62v5.45h-86.62zM401.27 452.64h23.97v10.53h-23.97z"
          opacity=".2"
        />
        <path
          fill="#f6f7f9"
          d="M419.31 72.2h190.96v106.71H419.31z"
        />
        <circle
          cx="455.27"
          cy="119.57"
          r="19.88"
          fill="#00c7fa"
          opacity=".2"
        />
        <path
          fill="#00c7fa"
          d="M499.39 96.01h86.62v5.45h-86.62zM499.39 109.9h44.13v5.45h-44.13zM499.39 123.79h71.37v5.45h-71.37zM499.39 137.69h86.62v5.45h-86.62zM562.04 157.73h23.97v10.53h-23.97z"
          opacity=".2"
        />
        <path
          fill="#f6f7f9"
          d="M482.87 251.36h190.96v106.71H482.87z"
        />
        <circle
          cx="518.82"
          cy="298.74"
          r="19.88"
          fill="#00c7fa"
          opacity=".2"
        />
        <path
          fill="#00c7fa"
          d="M562.95 275.18h86.62v5.45h-86.62zM562.95 289.07h44.13v5.45h-44.13zM562.95 302.96h71.37v5.45h-71.37zM562.95 316.85h86.62v5.45h-86.62zM625.6 336.9h23.97v10.53H625.6z"
          opacity=".2"
        />
      </g>
      <path
        fill="url(#a)"
        d="M191.88 135.71h321.11v181.44H191.88z"
      />
      <path
        fill="#f6f7f9"
        d="M194.15 137.96h316.6v176.93h-316.6z"
      />
      <circle
        cx="253.75"
        cy="216.51"
        r="32.96"
        fill="#00c7fa"
        opacity=".2"
      />
      <path
        fill="#00c7fa"
        d="M326.92 177.44h143.62v9.03H326.92zM326.92 200.48h73.16v9.03h-73.16zM326.92 223.51h118.33v9.03H326.92zM326.92 246.54h143.62v9.03H326.92z"
        opacity=".2"
      />
      <path
        fill="#00c7fa"
        d="M430.79 279.78h39.74v17.46h-39.74z"
      />
      <path
        fill="url(#b)"
        d="M417.12 380.82h305.42v170.67H417.12z"
      />
      <path
        fill="#f6f7f9"
        d="M419.23 381.99h301.2v168.32h-301.2z"
      />
      <circle
        cx="475.94"
        cy="456.72"
        r="31.36"
        fill="#00c7fa"
        opacity=".2"
      />
      <path
        fill="#00c7fa"
        d="M545.54 419.55h136.63v8.59H545.54zM545.54 441.47h69.6v8.59h-69.6zM545.54 463.38h112.57v8.59H545.54zM545.54 485.29h136.63v8.59H545.54z"
        opacity=".2"
      />
      <path
        fill="#00c7fa"
        d="M644.36 516.91h37.81v16.61h-37.81z"
        opacity=".5"
      />
      <path
        d="M171.13 319l.74.16a1 1 0 0 0-.74-.16z"
        transform="translate(-88.27 -31.08)"
        fill="url(#c)"
        opacity=".1"
      />
      <path
        d="M325.85 435.17c-2.21-14.84-15.69-49.46-15.69-49.46-.24-1-.5-2.06-.8-3.08-9.57-32.89-22.81-35.8-22.81-35.8l-47.43-10.11a3.54 3.54 0 0 1 1 .94l-.75.12a18.57 18.57 0 0 1-4.16-9c-.09-.49-.17-1-.23-1.52a33.35 33.35 0 0 0-2.72-50.16c-.49-.39-1-.76-1.52-1.13 2.24-2.37 2.31-5.68.64-9-3.74-7.77-11.86-12.68-20.22-15.07-6.38-1.83-13.3-2.42-19.62-.42-3.61 1.14-6.89 3.07-10.27 4.76-6.3 3.15-13.24 5.64-18 10.81-1.11 1.21-2.12 2.75-1.8 4.34.25 1.19 1.18 2.1 1.79 3.16 1.35 2.36 1 5.33.09 7.9s-2.29 5-2.94 7.6-.39 5.74 1.59 7.62a34.37 34.37 0 0 0 3 2.1 15.27 15.27 0 0 1 2.83 3.17l5.62 7.59a77.57 77.57 0 0 1 7 10.69c1.39 2.75 2.48 5.7 4.35 8.16a12.82 12.82 0 0 0 1.87 2c-.18-.07-.37-.13-.55-.21a8.51 8.51 0 0 0 6.28 2.41h.28a1.71 1.71 0 0 0 1.15-.47v1c.1 3.65.09 7.53-.17 11.17l-.44-.22a3.81 3.81 0 0 0-4.09.43l-43.69 35s-9.49 13-8.17 35.4l-7.65 33.62s-9.57 28.53-2.21 48.9 11.63 32 11.63 32 2.94 23.14 7.36 25 6.33 2.92 6.33 2.92l.88 5.53s.29.53.81 1.45c3.22 5.59 15.13 25.33 22.06 23.23a89.83 89.83 0 0 1 1.13 16.21l6.84 46s4.78 12.51 4.49 19.06 5.59 15.87 5.59 15.87a30.34 30.34 0 0 0-2.94 21.39c2.8 12.23 6.33 68.69 6.33 68.69l5.15 13.68-.15 16a15.34 15.34 0 0 1-3.16 7.1c-3.32 3.6-3.1 7.76-11 12.67s-13 6.76-13 13.31a17.27 17.27 0 0 1-.24 2.7c-.74 4.79-2.17 7.37 12.5 8.77 17.22 1.63 28.7-9.61 28.7-9.61s2.53-4.59 14.46-6.44c0 0 4.07-.22 4.3-3.83.08-1.24.06-3.62-.05-6.24-.19-5-.67-10.82-1.3-11.11-.79-.35-2.19-5.38-2.67-7.2h3.32s3.09-23.14 0-38.14-.29-25.61-.29-25.61l-.59-39.58s-4.17-4.23-.9-11.93 0-45.84 0-45.84 1.19-13.68 4.57-16.88.17-20.05 0-20.93l6 20.2s2.65 40.17 8.25 47.45l1.62 18.18s11.48 16.74 9.27 25.77 2.36 41.62 2.36 41.62v33.33s-5.16 13.39 2.06 18.19l3.11-.12c-1.06 1-1.82 2.39-3 3.62-1.38 1.42-2.16 6.82-2.6 11.46-.37 3.93-.49 7.31-.49 7.31s3.09 4.91 8.83 5.24 24.73 14.85 24.73 14.85 18.78 0 23.63-1l.29-.07a6.41 6.41 0 0 0 3.66-3 7.64 7.64 0 0 0 .89-5.5c-.61-2.87-2.88-6-7.93-8.69-12.59-6.65-14.46-12.87-14.46-12.87l-8.25-12.36h1.18s-.73-13.1 8.24-27.8l-.58-64.76s3.67-22.27-2.65-34.35c0 0-.52-12.81 3.71-16.74s-5.63-43.66-5.63-43.66-2-21.32-4.44-40.78c9.93 9.42 20.24-24.51 22-30.54h.26s-.05-.16-.12-.44.12-.43.12-.43c0-.05-2.2-7.85-.59-6.26s5.6-4.36 5.6-4.36-.59-32.46 6.33-48.82-3.12-56.15-3.12-56.15zm-29.59 20.65l.05-.09c1 19.82-.2 62.11-.2 62.11s-1.36 5.42-2.82 11.8l-1.05-40.18-1-37.84zm-126.73-13.66s5 62.58 0 71.6c-1.43 2.57-2.62 7.14-3.61 12.37-1.65-4.34-5.15-14.53-3.9-19.93 1.62-7-3.24-25.33-3.24-25.76s-.44-10.19 3.09-17.69 1.18-10.7 1.18-10.7 2.95-12.22 6.48-9.89z"
        transform="translate(-88.27 -31.08)"
        fill="url(#d)"
      />
      <path
        d="M93.44 552.02c-4.35 19.16-21.69-9.82-25.64-16.77l-.8-1.44 1.88-8.81 9.94-4.05a27.45 27.45 0 0 1 4.44 2.9c5.47 4.24 13.54 13.33 10.18 28.17zM227.94 520.66l-.11.43c0 .13-.09.28-.14.47-1.7 6-11.81 39.66-21.57 30.31-10.68-10.26-5.49-33.82-5.49-33.82h.1l22.47-2.3 4.45 4.58z"
        fill="#efb7b9"
      />
      <path
        d="M214.94 686.37l.57 64.28c-8.8 14.6-8.09 27.6-8.09 27.6l-29 1.15c-7.08-4.76-2-18.05-2-18.05v-33.09s-4.53-32.34-2.37-41.34-9.1-25.57-9.1-25.57l-1.58-18.05c-5.5-7.22-8.1-47.1-8.1-47.1l-5.91-20c.15.87 3.22 17.68 0 20.77s-4.48 16.76-4.48 16.76 3.18 37.85 0 45.5.86 12 .86 12l.59 39.29s-2.75 10.55.28 25.43 0 37.85 0 37.85h-31.2l.14-16-5.05-13.58s-3.47-56.05-6.21-68.18a30.44 30.44 0 0 1 2.88-21.24s-5.77-9.25-5.48-15.75-4.41-18.92-4.41-18.92l-6.72-45.65a88.55 88.55 0 0 0-3.32-26c-3.91-13-9.68-30.05-9.68-30.05l6.52.58 32.92 2.93s80-5.38 83.61-.91a14.93 14.93 0 0 1 1.52 4.66c3.59 16.15 8.34 66.71 8.34 66.71s9.68 39.44 5.52 43.34-3.64 16.61-3.64 16.61c6.2 11.92 2.59 34.02 2.59 34.02z"
        fill="#444053"
      />
      <path
        d="M147.29 798.14c-.23 3.58-4.23 3.8-4.23 3.8-11.7 1.84-14.18 6.4-14.18 6.4s-11.27 11.15-28.15 9.58c-14.39-1.38-13-4-12.26-8.7a17 17 0 0 0 .23-2.68c0-6.5 5-8.35 12.79-13.22s7.58-9 10.83-12.57 3.58-10.5 3.58-10.5c3.68-6.4 13 1 13 1 .43 2.27 14.3 2 14.3 2s1.84 7.37 2.78 7.8c.62.29 1.09 6.07 1.28 11 .09 2.5.1 4.87.03 6.09z"
        fill="#b07473"
      />
      <path
        d="M147.29 798.14c-.23 3.58-4.23 3.8-4.23 3.8-11.7 1.84-14.18 6.4-14.18 6.4s-11.27 11.15-28.15 9.58c-14.39-1.38-13-4-12.26-8.7 6.43 1.6 18.73 3.82 25.91-.08 10-5.42 17.13-9.21 17.13-9.21l15.73-8.01c.11 2.63.12 5 .05 6.22z"
        opacity=".1"
      />
      <path
        d="M235.47 817.43a6.28 6.28 0 0 1-3.6 3 1.43 1.43 0 0 1-.28.07c-4.77 1-23.19 1-23.19 1s-18.67-14.46-24.27-14.79-8.67-5.2-8.67-5.2.11-3.36.47-7.26c.44-4.61 1.21-10 2.56-11.38 2.5-2.6 3-6.17 8.67-3.9 0 0 8-14.11 17.44-3.21l9.76 14.81s1.84 6.17 14.2 12.78c4.95 2.65 7.18 5.77 7.77 8.62a7.63 7.63 0 0 1-.86 5.46z"
        fill="#b07473"
      />
      <path
        d="M235.47 817.43c-1.1.93-2.33 1.93-3.6 3a1.43 1.43 0 0 1-.28.07c-4.77 1-23.19 1-23.19 1s-18.67-14.46-24.27-14.79-8.67-5.2-8.67-5.2.11-3.36.47-7.26c5.73 1.72 14.43 4.75 16.76 8 3.57 5 14.42 11.91 14.42 11.91s20.23-1.94 29.22-2.21a7.63 7.63 0 0 1-.86 5.48z"
        opacity=".1"
      />
      <path
        d="M156.73 313.28l-26.66 28.17s-32.29-2.38-26.65-11.92c2.87-4.85 3.32-15 3.07-23.86-.24-8.53-1.12-15.79-1.12-15.79s45.29-22.54 41.82-1.52a34.87 34.87 0 0 0-.13 12c1.97 10.62 9.67 12.92 9.67 12.92z"
        fill="#efb7b9"
      />
      <path
        d="M147.18 288.36a34.87 34.87 0 0 0-.13 12 33.24 33.24 0 0 1-23.7 9.89c-6.16 0-12.75-5-17.7-7.95-.24-8.53-.29-12.42-.29-12.42s45.29-22.54 41.82-1.52z"
        opacity=".1"
      />
      <path
        d="M156.73 275.14a33.38 33.38 0 1 1-12.56-26.08 33.38 33.38 0 0 1 12.56 26.08z"
        fill="#efb7b9"
      />
      <path
        d="M202.12 525.61c-8.31 19.78-61.77 20.19-61.77 20.19v-21.56l-3.24-.21c1.4 6.17-2 21.23-2 21.23-42.25 6-52.54-18.09-52.54-18.09l1.46-8.24 32.92 2.93s80-5.38 83.61-.91a14.93 14.93 0 0 1 1.56 4.66z"
        opacity=".1"
      />
      <path
        d="M140.35 543.2v-21.57l-3.24-.2c1.4 6.17-2 21.23-2 21.23-31.79 4.48-45.5-8-50.33-14.5a19.65 19.65 0 0 1-2.21-3.6l12.89-72.59 3-106.83 4.65-18.74 1.08-9v-.1l.11.05 3.28 1.41 19.68 8.5 22.47-16.87.33-.25 1.11-.84 1.85 1.49 4.59 3.68 14.74 95.14s25.56 73.26 30.3 102.83c.19 1.18.35 2.28.47 3.31 3.11 26.95-62.77 27.45-62.77 27.45z"
        fill="#e1e7ef"
      />
      <circle
        cx="129.73"
        cy="329.32"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="130.61"
        cy="346.65"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="132.5"
        cy="374.72"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="135.65"
        cy="404.94"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="137.54"
        cy="433.33"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="139.44"
        cy="463.56"
        r="1.9"
        fill="#67647e"
      />
      <circle
        cx="138.68"
        cy="493.47"
        r="1.9"
        fill="#67647e"
      />
      <path
        d="M105.53 462.53s-2.12 27.8-6 35.88-5.64 30.77-5.64 30.77l-9-1a19.65 19.65 0 0 1-2.21-3.6l12.89-72.59 3-106.83 4.65-18.74 1.08-9a.26.26 0 0 1 .12-.05 3.65 3.65 0 0 1 3.22.05l.44.22c-.13.37-.26.75-.38 1.14-3.52 11.05-4.84 31.43-4.84 31.43s5.06 37.27 5.63 54.61-2.96 57.71-2.96 57.71z"
        opacity=".1"
      />
      <path
        d="M83.26 523.85a6 6 0 0 1-.34.67c-3.51 5.93-12.41 9.7-15.12 10.73l-.8-1.44 1.88-8.81 9.94-4.05a27.45 27.45 0 0 1 4.44 2.9z"
        opacity=".1"
      />
      <path
        d="M59.2 381.98l-8.23 4.94-7.52 33.37s-9.39 28.32-2.16 48.54 11.44 31.75 11.44 31.75 2.89 23 7.22 24.85 6.22 2.89 6.22 2.89l.86 5.49s11.76-4 15.92-11-3.06-24.51-3.06-24.51-6.21-14.88-4.62-21.81-3.18-25.14-3.18-25.57-.43-10.12 3-17.56 1.16-10.61 1.16-10.61l-2.17-21.24z"
        fill="#67647e"
      />
      <path
        d="M202.8 519.36s-21.81 8.24-28.75 1-6.21-41-6.21-41-6.64-62.41-10.84-72.66-2-84.23-2-84.23-2.84-9.55-5.27-12.08a2.47 2.47 0 0 0-.52-.43l.85.18 3 .65 4.59 3.68 14.74 95.14s25.56 73.26 30.3 102.83z"
        opacity=".1"
      />
      <path
        d="M227.94 521.53h-.25c-2.74.35-27 3.28-27.09-1.76a15.56 15.56 0 0 1 .1-1.75l22.47-2.3 4.45 4.58c.08.3.15.56.21.76z"
        opacity=".1"
      />
      <path
        d="M204.73 348.55l15.95 8.31s13.23 34.36 15.4 49.1c0 0 9.82 39.47 3 55.7s-6.21 48.46-6.21 48.46-3.9 5.92-5.49 4.33.58 6.21.58 6.21-27.23 3.62-27.36-1.74 6.25-30.92 6.25-30.92 1.73-60.82-.73-70.35-1.39-69.1-1.39-69.1z"
        fill="#67647e"
      />
      <path
        d="M157.15 413.33s-9 21.95-11.85 23.4.58 7.22.58 7.22 16.33-22.82 11.27-30.62zM151.81 336.32c.1-.42-10.7 10.59-13.58 12.23s10.5-.09 13.58-12.23zM121.73 411.59s-16.47 10.66-14.31 14.86 14.31-14.86 14.31-14.86zM151.66 567.04s14 9 35.83 11.27zM118 588.71s13 16.32 18.93 16.76S118 588.71 118 588.71zM136.2 652.71c-.58.29-7.37 14.73-14.3 15.17s14.3-15.17 14.3-15.17zM196.45 684.34s12.88-2.88 15.74 6.36c0 0-.86-2.89-15.74-6.36zM187.78 737.22s15.6-3.18 18.92 1.16-18.92-1.16-18.92-1.16zM143.62 744.59c0 .14-15.89 3.18-15.26 5.2s16.94 1.73 17.52-1.45a3 3 0 0 0-2.26-3.75zM182.58 758.31s26.1-3.18 24.46 2.31-24.46-2.31-24.46-2.31zM45.91 436.73c.15.43 17.19 2.74 19.5 8.23 0 0-16.75-7.8-19.35-7.8M69.89 481.37s-14.16 4.48-13.16 11.27-1.43-3.17 13.16-11.27zM63.29 515.75s5.16-7.08 10.07-5.78-10.07 5.78-10.07 5.78zM144.16 249.06a8.26 8.26 0 0 1-1.66 1.24c-4.11 2.38-5.21 6-7.18 10.27-1.8 3.87-3.79 8-7.44 10.16-4.7 2.83-10.9 1.79-15.79 4.27a12.31 12.31 0 0 0-6.54 12.08 35.56 35.56 0 0 0 1.4 5.53 39.91 39.91 0 0 1 1.49 12 1.55 1.55 0 0 1 0 .37 33.38 33.38 0 1 1 35.76-55.93z"
        opacity=".1"
      />
      <path
        d="M143.29 239.02c-3.67-7.71-11.64-12.58-19.84-15-6.26-1.81-13.05-2.4-19.26-.41-3.54 1.13-6.77 3-10.08 4.72-6.19 3.13-13 5.6-17.65 10.74-1.08 1.19-2.08 2.73-1.76 4.31.24 1.18 1.16 2.08 1.75 3.13 1.33 2.34 1 5.29.09 7.84s-2.24 4.93-2.88 7.55-.39 5.69 1.55 7.56a35.12 35.12 0 0 0 2.92 2.08 15.73 15.73 0 0 1 2.77 3.15l5.51 7.53a76 76 0 0 1 6.9 10.62c1.38 2.73 2.44 5.65 4.27 8.09s4.7 4.4 7.74 4.13a1.47 1.47 0 0 0 1.22-.58 1.53 1.53 0 0 0 .16-.77 39.36 39.36 0 0 0-1.49-12 35.56 35.56 0 0 1-1.4-5.53 12.32 12.32 0 0 1 6.54-12.08c4.9-2.47 11.1-1.43 15.8-4.26 3.65-2.21 5.64-6.3 7.44-10.17 2-4.23 3.07-7.89 7.18-10.27s4.55-6.33 2.52-10.38z"
        fill="#585268"
      />
      <path
        d="M128.34 784.5s5.08 6.5 3.78 10.18-3.78-10.18-3.78-10.18zM197.41 800.75s1.13-8.72 5.68-8.8 4.77-.47 8.24.86 6.72 3.41 5.69 3.73-6-5-11-2.29a36.44 36.44 0 0 0-8.61 6.5zM113.11 338.15l14.24-10s-20.91-12.36-23.4-10.62-4.2 17.34-4.2 17.34z"
        opacity=".1"
      />
      <path
        d="M113.05 337.5l14.3-10.24s-20.91-12.35-23.4-10.62-4.2 18.21-4.2 18.21z"
        fill="#e1e7ef"
      />
      <path
        d="M113.05 337.5l14.3-10.24s-20.91-12.35-23.4-10.62-4.2 18.21-4.2 18.21z"
        opacity=".03"
      />
      <path
        d="M106.31 316.76l-.43-.22a3.69 3.69 0 0 0-4 .42L59 351.75s-9.32 12.89-8 35.14l25.28 35.83s2.89-12.14 6.36-9.83c0 0 4.91 62.12 0 71.08s-7.08 42.47-7.08 42.47l16.61 1.88s1.73-22.68 5.63-30.77 6-35.89 6-35.89 3.51-40.39 2.93-57.74-5.63-54.6-5.63-54.6 1.41-21.84 5.21-32.56z"
        fill="#67647e"
      />
      <path
        d="M149.02 331.81l-17.81-6.6s22.69-24.84 25.51-11.06z"
        opacity=".1"
      />
      <path
        d="M149.02 330.92l-17.81-6.59s22.69-24.85 25.51-11.07z"
        fill="#e1e7ef"
      />
      <path
        d="M149.02 330.92l-17.81-6.59s22.69-24.85 25.51-11.07z"
        opacity=".03"
      />
      <path
        d="M148.45 309.81a1 1 0 0 1 .73.15z"
        opacity=".1"
      />
      <path
        d="M150.18 308.07l47.28 10.2s13 2.89 22.39 35.53-12.86 72.65-12.86 72.65l-4.91-4.17 2.46 95.35s-21.82 8.23-28.75 1-6.22-41-6.22-41-6.64-62.43-10.84-72.71-2-84.23-2-84.23-3.91-13.19-6.55-12.62z"
        fill="#67647e"
      />
      <path
        d="M193.41 368.83c-.67.62-1.44 29.47 1.45 51.43a280.14 280.14 0 0 0 8.19 39.58l-4.29-88s-3.33-4.92-5.35-3.01zM187.63 343.98c1.16.72 6.22 12.71 3.9 17.63s-3.9-17.63-3.9-17.63zM143.01 239.02a26 26 0 0 0-10.39-10.88 24.67 24.67 0 0 1 7.79 9.15c2 4.05 1.44 8.11-2.53 10.41s-5.21 6-7.17 10.27c-1.8 3.87-3.8 8-7.45 10.16-4.7 2.84-10.89 1.8-15.79 4.26a12.33 12.33 0 0 0-6.54 12.09 34.47 34.47 0 0 0 1.4 5.53 39.27 39.27 0 0 1 1.48 12 1.54 1.54 0 0 1-.15.77 1.47 1.47 0 0 1-1.22.58 7 7 0 0 1-3.56-.66 8.29 8.29 0 0 0 6.16 2.39 1.47 1.47 0 0 0 1.22-.58 1.64 1.64 0 0 0 .16-.77 39.67 39.67 0 0 0-1.49-12 34.47 34.47 0 0 1-1.4-5.53 12.32 12.32 0 0 1 6.54-12.08c4.9-2.47 11.09-1.43 15.79-4.26 3.65-2.21 5.65-6.3 7.45-10.17 2-4.23 3.06-7.89 7.17-10.27s4.55-6.36 2.53-10.41z"
        opacity=".1"
      />
      <ellipse
        cx="968.23"
        cy="761.73"
        rx="41"
        ry="5.63"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="646.82"
        cy="814.56"
        rx="29.14"
        ry="4"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="386.08"
        cy="784.91"
        rx="29.14"
        ry="4"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M402.13 775.81a11.64 11.64 0 0 0 3.83-5.79c.5-2.29-.48-5.05-2.68-5.89-2.46-.94-5.09.77-7.08 2.49s-4.28 3.69-6.88 3.32a10.5 10.5 0 0 0 3.24-9.81 4.21 4.21 0 0 0-.9-2c-1.37-1.46-3.85-.83-5.48.32-5.2 3.65-6.65 10.72-6.68 17.07-.52-2.29-.08-4.68-.1-7s-.65-5-2.64-6.22a8 8 0 0 0-4-1c-2.33-.09-4.94.15-6.53 1.86-2 2.12-1.47 5.68.25 8s4.35 3.81 6.77 5.42a15 15 0 0 1 4.83 4.61 4.16 4.16 0 0 1 .36.83h14.66a41.24 41.24 0 0 0 9.03-6.21zM984.86 754.71a11.71 11.71 0 0 0 3.87-5.79c.5-2.29-.48-5-2.68-5.89-2.46-.94-5.09.77-7.08 2.49s-4.28 3.69-6.89 3.32a10.45 10.45 0 0 0 3.24-9.81 4 4 0 0 0-.9-2c-1.36-1.46-3.84-.83-5.47.32-5.2 3.65-6.65 10.72-6.68 17.07-.53-2.29-.08-4.68-.1-7s-.66-5-2.64-6.22a8 8 0 0 0-4-1c-2.34-.09-4.94.15-6.54 1.86-2 2.12-1.47 5.68.26 8s4.35 3.81 6.77 5.42a15 15 0 0 1 4.83 4.61 4.83 4.83 0 0 1 .36.83h14.65a41.06 41.06 0 0 0 9-6.21zM654.73 801.46a11.73 11.73 0 0 0 3.84-5.79c.49-2.3-.49-5-2.68-5.89-2.46-.94-5.09.76-7.08 2.49s-4.28 3.68-6.89 3.32a10.47 10.47 0 0 0 3.24-9.81 4.11 4.11 0 0 0-.9-2c-1.37-1.46-3.84-.83-5.48.32-5.2 3.66-6.65 10.72-6.68 17.08-.52-2.29-.08-4.68-.09-7s-.66-5-2.64-6.22a8.07 8.07 0 0 0-4-1c-2.34-.08-4.94.15-6.54 1.86-2 2.13-1.47 5.69.26 8s4.35 3.8 6.76 5.42a15 15 0 0 1 4.88 4.68 5.08 5.08 0 0 1 .36.82h14.64a40.73 40.73 0 0 0 9-6.28z"
        fill="#00c7fa"
      />
      <path
        d="M1036.86 376.24c-13.12-.26-24.7-9.56-31.26-20.84a21 21 0 0 1-3.16-8.92 10.52 10.52 0 0 1 .36-2.14 21 21 0 0 0 1-3.26 5.46 5.46 0 0 0 0-1.34v-.06c.32-2.42-1.1-4.75-2.88-6.42s-3.95-2.88-5.78-4.49c-5.64-4.95-7.35-12.89-7.46-20.45v-.4c.06-3.23.32-6.48.29-9.72a40.57 40.57 0 0 0-.24-5.51c-.54-4.58-2.28-9.24-5.88-12.16-9.39-7.61-25.18.31-34.89-6.89-2.37-1.75-4.28-4.36-7.14-5-2.17-.52-4.42.18-6.53.88-7.16 2.36-15.14 5.47-17.94 12.43-1.6 4-1.15 8.49-2.62 12.51-1 2.69-2.77 5-4.09 7.56a11.83 11.83 0 0 0-1.53 6.31 7.26 7.26 0 0 0 .47 3.36 8.46 8.46 0 0 0 2.32 3.31 11 11 0 0 1-1.4 2.22c-1.83 2.24-4.64 3.84-6.54 6-3.52 4.08-3.39 9.63-1.65 14.43s4.86 9.17 7 13.84c.93 2 1.68 4.3.71 6.32-.67 1.4-2.07 2.46-3.16 3.67a11.56 11.56 0 0 0-2.86 6.42c-21.43 4.89-21.44 22.1-21.44 22.1L869 419.14s-1.85 4.9-4 11.37l-13.7-2.45 9.46 15.94c-1.81 6.49-3.08 12.51-2.66 15.53 0 0-4.25 20 3.31 23.49l16.7 7.51a9.21 9.21 0 0 0 2.31 1l.68.3a1.77 1.77 0 0 0 1.56 0h.27a2.12 2.12 0 0 0 1-.14 1.8 1.8 0 0 0 .83-.91.36.36 0 0 0 0-.09l5-1.45 4.24 5c1.91 1.34 3.78 2.51 5.61 3.56l-6.52 65.2s-1.06 86.66-4.25 106.39c-1.19 7.31-1.2 12.29-.75 15.68l-.12.22c.79 5.57 2.84 6.67 2.84 6.67v-.08l.12.08a56.55 56.55 0 0 1 3.43-7.35v1.42c-.06 7.36-.29 17.65-1 24.34-1.3 11.38 3.31 49.08 3.31 49.08l1.59 34.3a31.72 31.72 0 0 1-3.9 16.7c-3.77 6.85-8.68 16.48-9 20.75a5.57 5.57 0 0 0 0 .7l-8.36 9.73s-3.2 4.93 4 6.92c3.87 1.08 10.56 0 15.92-1.27a10.64 10.64 0 0 0 8.26-10.35A36.61 36.61 0 0 1 912 824l1.35 7.89 9 2.23 1.15-21.63a9.47 9.47 0 0 0 .62-3.82c1.77-15.38-4.17-14-4.17-14a1 1 0 0 1 .29.54c-.1-.17-.2-.35-.29-.53-3.65-7.2-1.86-19-1.86-19s4.73-34.28 6.39-43.33c1.17-6.39.69-27.33.3-39.06 0-.49 0-1-.05-1.41 13.93-.18 31-.66 43-1.82v1.42l-2.22 81a44.53 44.53 0 0 1-3.09 15.06c0 .09-.08.18-.11.27a65.71 65.71 0 0 0-4.48 21.19l-1 25.74v.71c-1.79.69-4.61 2.68-4.69 8.45-.12 8.45 14.77 5.63 14.77 5.63 14.89 0 15-15.5 15-15.5s.48-14.21 1.18-23.72-2.24-7.41-2.24-7.41l-.22 27v.21-23.71l.23-3.44v-.1l.05-.73 1.85-27.9s13.71-46.5 15.84-55.42c1.51-6.33.88-25.43.38-36 0-.49 0-.95-.06-1.4 4.24-.38 8-.42 9.51-.42h.69s-.71-74.68-2.48-102.86-4.61-53.9-11.71-61.65c-4.28-4.68-10.25-19.14-14.31-29.85a150.17 150.17 0 0 0 26.25 8.6c22.46 4.7 19.39-14.8 19.39-14.8l-2.28-36.87h.15a187.27 187.27 0 0 0-2.48-28.83c-1.18-7.31-3-14.87-5.78-21 2.44-.93 4.84-2 7.2-3 6.1-2.69 13-6.51 13.86-13.09h-.3a9.16 9.16 0 0 0 .23-1.4zm-139.22 53.34c.06 3.81-.09 10.41-.31 17.72l-7.13-9.52 7.15-11.6zm95.56 19.31zm3 14.4l-11.88-3.82a53.63 53.63 0 0 1 7.34-9.08l1-1-.37.08.58-.52.34-.08-.55.52.65-.13a20.31 20.31 0 0 0 4.05 8.14c4.24 4.72-1.2 5.89-1.2 5.89z"
        transform="translate(-88.27 -31.08)"
        fill="url(#e)"
      />
      <path
        fill="#a27772"
        d="M835.72 774.95l-1.4 26.34-8.86-2.21-1.87-10.96 12.13-13.17z"
      />
      <path
        opacity=".1"
        d="M835.72 774.95l-1.4 26.34-8.86-2.21-1.87-10.96 12.13-13.17z"
      />
      <path
        d="M868.24 804.79l13.52 2.8 10-8.86v-24.95l.22-3.41v-.1l.05-.72 1.82-27.7s13.52-46.17 15.62-55c1.49-6.29.87-25.26.38-35.74-.2-4.3-.38-7.17-.38-7.17l-29.84-7.23-.63 23-2.18 80.4a44.36 44.36 0 0 1-3.06 14.95l-.1.27a65.28 65.28 0 0 0-4.33 21.07l-1 25.55v.71z"
        fill="#cc818c"
      />
      <path
        d="M892.02 769.56v.71l.05-.72zM868.24 804.79l13.52 2.8 10-8.86v-2.12a2.84 2.84 0 0 1-1.44 2.29l-.14.08a26.89 26.89 0 0 1-15.18 3l-5.28-.45a5.53 5.53 0 0 0-1.39.34v.71z"
        opacity=".1"
      />
      <path
        d="M890.21 799.68l.14-.08a2.83 2.83 0 0 0 1.45-2.48l.22-26.86s2.92-2.07 2.22 7.37-1.17 23.55-1.17 23.55-.11 15.39-14.8 15.39c0 0-14.69 2.79-14.58-5.6s6.07-8.74 6.07-8.74l5.27.46a27 27 0 0 0 15.18-3.01z"
        fill="#b07473"
      />
      <path
        d="M797.83 799.08c.35 6.06 18.18 2.56 18.18 2.56l12-23.31s10-7.7 5-14.46a10.28 10.28 0 0 1-.74-1.15v-.06c-.11-.18-.2-.36-.3-.55-3.6-7.14-1.83-18.85-1.83-18.85s4.66-34 6.3-43c1.15-6.35.68-27.14.29-38.78-.15-4.83-.29-8.09-.29-8.09l-29.62-7.92v8.83c-.06 7.3-.28 17.52-1 24.16-1.28 11.31 3.27 48.73 3.27 48.73l1.57 34.06a31.6 31.6 0 0 1-3.93 16.53c-3.72 6.8-8.56 16.37-8.9 20.61a4 4 0 0 0 0 .69z"
        fill="#cc818c"
      />
      <path
        d="M797.83 799.08c.35 6.06 18.18 2.56 18.18 2.56l12-23.31s10-7.7 5-14.46a10.28 10.28 0 0 1-.74-1.15c-.16 3.53-4 12.34-4 12.34s-9.91 19.83-13 24.37-16.85-.84-17.36-1a4 4 0 0 0-.08.65z"
        opacity=".1"
      />
      <path
        d="M831.95 762.09s5.86-1.36 4.12 13.91a9.85 9.85 0 0 1-4.65 8.73c-4.19 2.64-10.67 8.31-13.94 19.34a10.56 10.56 0 0 1-8.14 10.29c-5.29 1.23-11.89 2.32-15.71 1.25-7.11-2-4-6.87-4-6.87l8.16-9.68s14.22 5.6 17.37 1.05 13-24.37 13-24.37 5.57-12.37 3.79-13.65z"
        fill="#b07473"
      />
      <path
        d="M879.67 639.48l-.63 23c8-.77 13.64-1.85 14.62-3.36 2.09-3.25 9.73-4.63 16.23-5.19-.2-4.3-.38-7.17-.38-7.17zM806.79 657.06a11.07 11.07 0 0 1 3.27-3.94c3.15-1.75 2.81 11.19 2.81 11.19s10.45.1 23.84-.07c-.15-4.84-.29-8.09-.29-8.09l-29.62-7.92s.04 3.69-.01 8.83z"
        opacity=".1"
      />
      <path
        d="M803.42 660.14s3.5-9.47 6.64-11.21 2.81 11.19 2.81 11.19 76.94.7 80.79-5.25 26.23-5.59 26.23-5.59-.7-74.15-2.45-102.13-4.55-53.51-11.54-61.2c-4.53-5-11-21.09-14.94-31.83-2.17-5.87-3.6-10.14-3.6-10.14l-73.44 4.2-.6 5.94-7.8 78s-1 86-4.2 105.62 2.1 22.4 2.1 22.4z"
        fill="#444053"
      />
      <g opacity=".1">
        <path d="M887.73 654.92c3.84-5.94 26.23-5.59 26.23-5.59s-.7-74.15-2.45-102.13-4.55-53.51-11.54-61.2c-4.53-5-11-21.09-14.94-31.83-1.82-4.93-3.12-8.73-3.49-9.82l5.7-.32s1.43 4.27 3.6 10.14c4 10.74 10.41 26.85 14.94 31.83 7 7.69 9.79 33.22 11.54 61.2s2.41 102.08 2.41 102.08-22.38-.36-26.22 5.64c-3.29 5.08-59.91 5.31-76.35 5.27 21.08-.1 67.57-.73 70.57-5.27zM804.1 648.92c1.42-.79 2.13 1.4 2.48 4a56.63 56.63 0 0 0-3.31 7.16s-2-1.09-2.8-6.62c1.11-1.97 2.4-3.85 3.63-4.54z" />
      </g>
      <path
        d="M826.11 264.58c-5.08 6.94.06 16.79-5.39 23.53-1.8 2.23-4.57 3.82-6.45 6-3.48 4.06-3.34 9.56-1.63 14.33s4.8 9.1 6.92 13.74c.92 2 1.66 4.27.71 6.27-.66 1.39-2 2.44-3.12 3.65-3.5 3.91-3.6 9.35-1.72 13.95s5.49 8.59 9 12.47c1.4 1.54 3.17 3.23 5.5 3.19a7.75 7.75 0 0 0 3.46-1.14 36.44 36.44 0 0 0 17.57-20.65 36.83 36.83 0 0 0-1.5-25.35c-3-7.07-7.88-13.85-7.92-21.33 0-5.93 3.05-11.59 3.59-17.5.66-7.17-3.59-18.57-12.25-21.7.57 4.63-4.15 7.02-6.77 10.54z"
        fill="#585268"
      />
      <path
        d="M826.11 264.58c-5.08 6.94.06 16.79-5.39 23.53-1.8 2.23-4.57 3.82-6.45 6-3.48 4.06-3.34 9.56-1.63 14.33s4.8 9.1 6.92 13.74c.92 2 1.66 4.27.71 6.27-.66 1.39-2 2.44-3.12 3.65-3.5 3.91-3.6 9.35-1.72 13.95s5.49 8.59 9 12.47c1.4 1.54 3.17 3.23 5.5 3.19a7.75 7.75 0 0 0 3.46-1.14 36.44 36.44 0 0 0 17.57-20.65 36.83 36.83 0 0 0-1.5-25.35c-3-7.07-7.88-13.85-7.92-21.33 0-5.93 3.05-11.59 3.59-17.5.66-7.17-3.59-18.57-12.25-21.7.57 4.63-4.15 7.02-6.77 10.54zM882.5 516.7c-10.18.54-19.76 4.91-28.67 9.86s-17.53 10.6-27.12 14.08M876.17 540.68a42.09 42.09 0 0 0-26.44 12.85c-2.47 2.62-4.6 5.56-7.18 8.07a32 32 0 0 1-14.17 8M878.26 558.92a46.21 46.21 0 0 0-21.25 12.81c-1.56 1.68-3 3.49-4.54 5.16-8.43 9-20.33 13.85-31.82 18.39"
        opacity=".1"
      />
      <path
        d="M877.39 305.83a209.63 209.63 0 0 0 2.1 24.3c.94 5.74 2.28 10.85 4.2 13.12 5.59 6.65-27.28 15.57-27.28 15.57l-19.41-15s15.39-14.17 8.22-28 32.17-9.99 32.17-9.99z"
        fill="#cc818c"
      />
      <path
        d="M813.32 454.12h77.64c-2.17-5.87-3.6-10.14-3.6-10.14l-73.44 4.2z"
        opacity=".1"
      />
      <path
        d="M808.32 452.72h83c-2.33-8.34 0-16.07 3.33-22a48.59 48.59 0 0 1 8.69-11.28l.57-.51 29-6.43 1.56-.34s.23-52.69-18.42-59.92-29.85-17-29.85-17l-25.64 7.92-18.89-9.55c-6.06 6.53-22.15 4-22.15 4-26.35 3-26.35 22.85-26.35 22.85s15.39 35.91 16.56 35.91-1.41 56.35-1.41 56.35z"
        fill="#67647e"
      />
      <path
        d="M836.98 419.22s-16.93-3.75-22.69-10.31M922.33 399.56l-19.6 16.09a32.59 32.59 0 0 0 .65 3.78l.57-.51 29-6.43zM869.17 447.13s4.3 2.42 10.88 5.59h11.28c-2.33-8.34 0-16.07 3.33-22l-19.93-6.45c6.8 6.3-5.56 22.86-5.56 22.86z"
        opacity=".1"
      />
      <path
        d="M804.82 354.1l-11.66 6.29-11.43 28.91s-11.89 31.71-10.73 40.11c0 0-4.19 19.81 3.27 23.31l19.46 8.8a1.8 1.8 0 0 0 2.33-2.49c-2.77-5.25-5.81-13.45-1-18l-5.6-11.65 20.27-33.08 6.75-11.38z"
        fill="#67647e"
      />
      <path
        d="M830.73 412.6c1 4.12 4.42 10.45 15.7 12.84l12.42 10.14 13.17 6 5.36 2.43 2.28-16.44-5.17-2.83-6-3.29s-13.59-24.64-35.12-14.23a4.77 4.77 0 0 0-2.64 5.38z"
        opacity=".1"
      />
      <path
        d="M831.44 411.2c1 4.12 4.42 10.45 15.7 12.84l12.42 10.15 13.17 6 5.36 2.43 2.28-16.44-5.17-2.82-6-3.3s-13.59-24.63-35.12-14.23a4.77 4.77 0 0 0-2.64 5.37z"
        fill="#cc818c"
      />
      <circle
        cx="855.7"
        cy="297.09"
        r="30.08"
        opacity=".1"
      />
      <circle
        cx="855.7"
        cy="296.39"
        r="30.08"
        fill="#cc818c"
      />
      <path
        d="M874.33 360.65l-9-17.58s13.24-5.34 14.2-11.54 12.68 7.26 10.14 11.72-15.34 17.4-15.34 17.4z"
        opacity=".1"
      />
      <path
        d="M874.33 359.25l-9-17.58s13.24-5.34 14.2-11.54 12.68 7.27 10.14 11.72-15.34 17.4-15.34 17.4z"
        fill="#67647e"
      />
      <path
        d="M800.32 404.65l50 67.19s-18.42 10-43.84-7.93l-11-13.05-31.25-52.7z"
        fill="#f6f8fb"
      />
      <path
        d="M790.48 441.18l4.55-.12s27.8-27 34.62-13.34-17.31 26.4-17.31 26.4l-7.34 4-9.62 2.8-6.12-8.22z"
        fill="#cc818c"
      />
      <path
        d="M797.19 455.76c.42 1.55.82 3.26.12 4.7a1.78 1.78 0 0 1-.83.9 2 2 0 0 1-1 .14 9.55 9.55 0 0 1-6.27-3.11 28.28 28.28 0 0 1-4.07-5.88c-1.24-2.15-2.53-4.55-2.08-7 .49-2.68 2.88-4.54 5.16-6 4.61-3.05 4.72.5 5.77 4.42z"
        opacity=".1"
      />
      <path
        d="M796.49 455.76c.42 1.55.82 3.26.12 4.7a1.78 1.78 0 0 1-.83.9 2 2 0 0 1-1 .14 9.55 9.55 0 0 1-6.27-3.11 28.28 28.28 0 0 1-4.07-5.88c-1.24-2.15-2.53-4.55-2.08-7 .49-2.68 2.88-4.54 5.16-6 4.61-3.05 4.72.5 5.77 4.42z"
        fill="#67647e"
      />
      <path
        opacity=".1"
        d="M809.72 396.3l2.33-3.93-2.04 7.3-.29-3.37zM872.73 440.15l5.36 2.43 2.28-16.44-5.17-2.82c3.53 4.06.44 11.6-2.47 16.83zM894.24 421.07s-17.31 1.05-24.65-3.67"
      />
      <g opacity=".1">
        <path d="M892.09 432.11a48.83 48.83 0 0 1 8.7-11.28 24 24 0 0 1 2.56-1.4l27-5.54 1.56-.34s.24-52.69-18.42-59.92a112.66 112.66 0 0 1-29.09-16.39l2.05-.63s11.19 9.79 29.84 17 18.44 59.94 18.44 59.94h-2.8l-27.64 5.29-1.56 1.49A53.33 53.33 0 0 0 893.9 432a29.29 29.29 0 0 0-2.31 22.12h-2.86c-2.3-8.34.07-16.07 3.36-22.01zM818.4 339.12c.45-.06.88-.13 1.34-.18a49.24 49.24 0 0 0 5.71.47 51.47 51.47 0 0 1-7.05-.29zM857.98 344.53l-17.08-8.61a9.55 9.55 0 0 0 1-.91l17.82 9z" />
      </g>
      <path
        d="M923.03 398.16l11.43 14 2.33 38s3 19.35-19.12 14.69-47.8-19.12-47.8-19.12 12.36-16.56 5.6-22.85l31.71 10.26s5.36-1.17 1.16-5.83-4.94-13.06-4.94-13.06z"
        fill="#67647e"
      />
      <path
        d="M928.16 438.27l6.3 7.22a9.07 9.07 0 0 1-6.3-7.22zM917.44 437.1l9.79 12.59-4.89 1.17-4.9-13.76zM819.79 282.58c-1.08-2.63-.26-5.67 1-8.2s3.07-4.83 4-7.51c1.45-4 1-8.48 2.58-12.42 2.77-6.9 10.64-10 17.7-12.33 2.08-.69 4.3-1.39 6.44-.88 2.82.68 4.71 3.27 7 5 9.58 7.14 25.15-.72 34.41 6.84 3.55 2.89 5.27 7.53 5.8 12.07s0 9.15-.05 13.73c-.15 8 1.34 16.78 7.35 22.09 1.81 1.6 3.94 2.81 5.7 4.46s3.15 4 2.84 6.37a21.7 21.7 0 0 1-1 3.23c-1.2 4.18.58 8.61 2.75 12.38 6.48 11.2 17.89 20.43 30.84 20.69-.87 6.53-7.65 10.32-13.67 13-7.67 3.41-15.73 6.76-24.11 6.33s-17.12-5.79-18.61-14c-.51-2.83-.44-6.3-2.9-7.79-1.48-.9-3.4-.67-5-1.35-2.31-1-3.46-3.54-4.22-5.94a53.59 53.59 0 0 1-2.49-15.24c-.1-6.13.72-12.82-2.76-17.87-3.22-4.67-8.94-7-12.65-11.34-3.42-4-7.15-8.78-12.76-9.54-7.54-1.09-23.6 9.46-28.19-1.78z"
        opacity=".1"
      />
      <path
        d="M819.79 281.18c-1.08-2.63-.26-5.67 1-8.2s3.07-4.83 4-7.51c1.45-4 1-8.48 2.58-12.42 2.77-6.9 10.64-10 17.7-12.33 2.08-.69 4.3-1.39 6.44-.88 2.82.68 4.71 3.27 7 5 9.58 7.15 25.15-.72 34.41 6.84 3.55 2.9 5.27 7.53 5.8 12.07s0 9.15-.05 13.73c-.15 8 1.34 16.78 7.35 22.09 1.81 1.6 3.94 2.81 5.7 4.46s3.15 4 2.84 6.37a22.18 22.18 0 0 1-1 3.24c-1.2 4.17.58 8.61 2.75 12.37 6.48 11.2 17.89 20.43 30.84 20.69-.87 6.53-7.65 10.32-13.67 13-7.67 3.42-15.73 6.76-24.11 6.33s-17.12-5.79-18.61-14.05c-.51-2.83-.44-6.3-2.9-7.79-1.48-.9-3.4-.67-5-1.35-2.31-1-3.46-3.54-4.22-5.94a53.59 53.59 0 0 1-2.49-15.24c-.1-6.13.72-12.82-2.76-17.87-3.22-4.67-8.94-7-12.65-11.34-3.42-4-7.15-8.78-12.76-9.54-7.54-.99-23.6 9.51-28.19-1.73z"
        fill="#585268"
      />
      <path
        d="M841.11 358.47l17.24-14s-11.8-6.4-13.21-11.86-10.85 2.59-9.89 7.49 5.86 18.37 5.86 18.37z"
        opacity=".1"
      />
      <path
        d="M841.81 356.37l17.24-14s-11.8-6.4-13.21-11.86-10.85 2.59-9.89 7.49 5.86 18.37 5.86 18.37z"
        fill="#67647e"
      />
      <circle
        cx="859.72"
        cy="354.09"
        r="1.37"
        opacity=".1"
      />
      <circle
        cx="859.72"
        cy="361.71"
        r="1.37"
        opacity=".1"
      />
      <circle
        cx="859.72"
        cy="369.32"
        r="1.37"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M826.73 261.75c1.36-3.75 1.07-7.95 2.34-11.72a13.56 13.56 0 0 0-1.45 2.68c-1.58 3.94-1.14 8.44-2.58 12.43 0 .07-.07.15-.1.23a22.14 22.14 0 0 0 1.79-3.62zM935.52 355.98c-7.67 3.42-15.73 6.76-24.12 6.33s-17.11-5.79-18.6-14.05c-.51-2.83-.44-6.3-2.9-7.79-1.48-.9-3.4-.67-5-1.35-2.32-1-3.46-3.54-4.22-5.94a53.59 53.59 0 0 1-2.49-15.26c-.1-6.13.71-12.82-2.76-17.87-3.22-4.67-8.94-7-12.65-11.34-3.43-4-7.15-8.78-12.77-9.54-7.7-1-23.77 9.5-28.35-1.74a8.83 8.83 0 0 1 .29-6.5c-.33.56-.65 1.12-.94 1.69-1.3 2.53-2.12 5.57-1 8.2 4.59 11.24 20.65.69 28.36 1.74 5.61.76 9.34 5.57 12.77 9.54 3.71 4.3 9.42 6.67 12.64 11.35 3.48 5 2.67 11.74 2.77 17.86a53.35 53.35 0 0 0 2.48 15.25c.76 2.39 1.91 5 4.22 5.94 1.6.67 3.52.45 5 1.35 2.45 1.48 2.39 5 2.89 7.78 1.49 8.26 10.23 13.63 18.61 14.06s16.45-2.92 24.11-6.34c5.52-2.45 11.67-5.86 13.32-11.44-2.68 3.67-7.36 6.16-11.66 8.07z" />
      </g>
    </svg>
  );
}

function FlowIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1125.12 800.94"
      className={className}
    >
      <defs>
        <linearGradient
          id="a"
          x1="652.58"
          y1="850.47"
          x2="652.58"
          y2="265.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="gray"
            stopOpacity=".25"
          />
          <stop
            offset=".54"
            stopColor="gray"
            stopOpacity=".12"
          />
          <stop
            offset="1"
            stopColor="gray"
            stopOpacity=".1"
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1="1069.38"
          y1="751.23"
          x2="1069.38"
          y2="686.58"
          xlinkHref="#a"
        />
      </defs>
      <path
        d="M26.46 423.83c17.58 72.21 54.78 134.64 113.58 164.88 122.19 62.88 397.76 30.45 603.43-6.77 106.36-19.26 199.88-72.36 267.81-147.17zM1104.98 83.95H992.14a9.38 9.38 0 1 1 0-18.75h19.5a9.38 9.38 0 1 1 0-18.75h-13.93a9.38 9.38 0 1 1 0-18.75h58.9c-13.08-5.84-28.3-10-46-12.17-160.6-19.83-217.94-6.71-238.17 6.78-24.95 16.64-52.8 28.88-82.54 34.78-99.04 19.65-284.34 43.29-452.34-7.57-83.45-25.27-145.5 17.44-182.69 88.83h1069.69c-1.4-20.75-5.58-39.91-13.26-56.68a9.87 9.87 0 0 1-6.32 2.28zM702.75 311.73l-1.47-.08-15.36-.87-147.16-8.31-15.9-.9-234.3-13.16-65.67-3.7-10.4-.58-9.23-.52-186.37-10.49a458.93 458.93 0 0 0 4.38 126l156.79 5.5 12.43.45 2.2.07 74.38 2.62 4 .14 8.58.3 75 2.64 10.28.36 35.86 1.27h.67l5.27.19 17.95.63 15.75.55 30 1.06h.63l2.68.09 2.83.11h.62l47.82 1.67 13.4.48h.56l6.45.23h1.68l5.67.21 17.31.61 6.5.23 8.35.29h.31l11.46.4 33.21 1.25 9.12.31h1l44.18 1.56 25.65.9 31.98 1.23 5.12.17 8.27.29 30.06 1.06 226.75 8a446.33 446.33 0 0 0 68.83-100.92zm-426.34 70a9.94 9.94 0 0 1-6.5-2.4 9.89 9.89 0 0 1-2.06-2.5 9.1 9.1 0 0 1-1.19-4.47 9 9 0 0 1 1.61-5.13 10.49 10.49 0 0 1 1.08-1.3 9.91 9.91 0 0 1 7.06-2.92h19.5a9.38 9.38 0 1 1 0-18.75h-13.93a9.1 9.1 0 0 1-.91 0 9.37 9.37 0 0 1 .91-18.71h112.84a9.38 9.38 0 1 1 0 18.75h13.93a9.38 9.38 0 1 1 0 18.75h-19.5a9.38 9.38 0 1 1 0 18.75zM1124.62 139.01l-778.36 18.2-85.55 2-217.77 5.1c-13.17 32.51-21.89 69.26-25.9 107.36h1088.63a430.57 430.57 0 0 0 15.71-68.44c3.24-22.39 4.55-44.05 3.24-64.22zm-888 82.87h-19.5a9.59 9.59 0 0 1 9.75 9.37v.57a9.32 9.32 0 0 1-4.32 7.23 10 10 0 0 1-5.41 1.58H104.3a9.38 9.38 0 1 1 0-18.75h19.51a9.38 9.38 0 1 1 0-18.75h-13.93a9.38 9.38 0 1 1 0-18.75h112.84a9.38 9.38 0 1 1 0 18.75h13.93a10 10 0 0 1 4.63 1.14 9.36 9.36 0 0 1 5.13 8.24 9.61 9.61 0 0 1-9.76 9.37z"
        fill="#00c7fa"
        opacity=".1"
      />
      <g opacity=".1">
        <path
          d="M604.98 583.09s28.58-67.62 81.87-92.73c22.37-10.53 40.87-27.4 52.21-48.73a181.94 181.94 0 0 0 13.09-31.6"
          fill="none"
          stroke="#535461"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M785.64 394.02c-5.55 6.72-34.32 16.52-34.32 16.52s3.47-29.14 9-35.86a16.62 16.62 0 0 1 22.72-2.49 15.13 15.13 0 0 1 2.6 21.83zM775.77 447.21c-8.46 2.74-38.14-4.06-38.14-4.06s19.38-22.66 27.84-25.39 17.63 1.64 20.48 9.77a15.41 15.41 0 0 1-10.18 19.68zM722.26 510.09c-8.74-1.75-30.8-22-30.8-22s28.64-10.15 37.38-8.4 14.35 10 12.54 18.37-10.38 13.77-19.12 12.03zM670.63 548.89c-8.92-.3-34.23-16.7-34.23-16.7s26.44-14.66 35.36-14.35 15.9 7.49 15.59 16.07-7.79 15.28-16.72 14.98zM709.99 424.14c1.14 8.51 20.47 31.21 20.47 31.21s12.73-26.66 11.59-35.18-9.24-14.52-18.09-13.42-15.11 8.88-13.97 17.39zM650.2 470.26c3.74 7.79 29.25 23.89 29.25 23.89s3.85-29.1.11-36.9a16.43 16.43 0 0 0-21.44-7.6 15.29 15.29 0 0 0-7.92 20.61zM598.49 522.75c2.31 8.29 24.63 28.3 24.63 28.3s8.91-28.06 6.59-36.35-11.17-13.2-19.79-11a15.48 15.48 0 0 0-11.43 19.05z"
          fill="#00c7fa"
        />
        <path
          d="M785.64 394.02c-5.55 6.72-34.32 16.52-34.32 16.52s3.47-29.14 9-35.86a16.62 16.62 0 0 1 22.72-2.49 15.13 15.13 0 0 1 2.6 21.83zM775.77 447.21c-8.46 2.74-38.14-4.06-38.14-4.06s19.38-22.66 27.84-25.39 17.63 1.64 20.48 9.77a15.41 15.41 0 0 1-10.18 19.68zM722.26 510.09c-8.74-1.75-30.8-22-30.8-22s28.64-10.15 37.38-8.4 14.35 10 12.54 18.37-10.38 13.77-19.12 12.03zM670.63 548.89c-8.92-.3-34.23-16.7-34.23-16.7s26.44-14.66 35.36-14.35 15.9 7.49 15.59 16.07-7.79 15.28-16.72 14.98zM709.99 424.14c1.14 8.51 20.47 31.21 20.47 31.21s12.73-26.66 11.59-35.18-9.24-14.52-18.09-13.42-15.11 8.88-13.97 17.39zM650.2 470.26c3.74 7.79 29.25 23.89 29.25 23.89s3.85-29.1.11-36.9a16.43 16.43 0 0 0-21.44-7.6 15.29 15.29 0 0 0-7.92 20.61zM598.49 522.75c2.31 8.29 24.63 28.3 24.63 28.3s8.91-28.06 6.59-36.35-11.17-13.2-19.79-11a15.48 15.48 0 0 0-11.43 19.05z"
          opacity=".25"
        />
      </g>
      <g opacity=".1">
        <path
          d="M626.35 480.69s3.6-72.91 45.24-113.58c17.48-17.06 29.11-38.88 32.45-62.62a179.34 179.34 0 0 0 1.44-34"
          fill="none"
          stroke="#535461"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M731.56 244.73c-2.93 8.11-26.68 26.53-26.68 26.53s-6.79-28.61-3.87-36.71 12.14-12.4 20.57-9.59a15.4 15.4 0 0 1 9.98 19.77zM740.56 298.06c-7 5.27-37.39 8.32-37.39 8.32s10.47-27.55 17.51-32.83a16.6 16.6 0 0 1 22.69 2.7 15.14 15.14 0 0 1-2.81 21.81zM711.81 374.47c-8.85 1.14-36.65-11-36.65-11s23.51-18.7 32.36-19.84 17 4.83 18.16 13.34-5.03 16.32-13.87 17.5zM676.48 427.47c-8.52 2.56-38-4.85-38-4.85s19.89-22.25 28.41-24.81 17.59 2 20.25 10.19a15.44 15.44 0 0 1-10.66 19.47zM670.56 297.26c4 7.67 30.08 22.92 30.08 22.92s2.81-29.21-1.2-36.88a16.47 16.47 0 0 0-21.7-6.9 15.26 15.26 0 0 0-7.18 20.86zM630.09 359.83c6.21 6.16 35.83 13.21 35.83 13.21s-6.41-28.68-12.62-34.84a16.64 16.64 0 0 0-22.86-.34 15.11 15.11 0 0 0-.35 21.97zM599.41 425.84c5 7.08 33 18.84 33 18.84s-1.28-29.31-6.32-36.39a16.58 16.58 0 0 0-22.47-4.05 15.17 15.17 0 0 0-4.21 21.6z"
          fill="#00c7fa"
        />
      </g>
      <path
        d="M668.86 125.13l-28.76 5.55s50.18-4.73 65.2-3.94 48.88 19.73 48.88 19.73 16 5.08 34.91 22.89a146.66 146.66 0 0 1 12.92 13.82c15.1 18.3 30.26 45.13 39.64 83.93 1 4 1.87 8.06 2.7 12.27 1.68 8.53 3.09 17.58 4.17 27.19.5 4.45.94 9 1.29 13.72q.53 6.72.82 13.78.28 6.72.37 13.74c.07 6.28 0 12.73-.15 19.39q-.18 6.65-.55 13.55v.55c-1.69 31.32-5.6 57.87-11 80.36-.56 2.33-1.14 4.63-1.73 6.87a271.16 271.16 0 0 1-10.01 30.51q-1 2.63-2.09 5.13-2.48 5.87-5.09 11.19-2.16 4.38-4.39 8.41c-.29.55-.6 1.09-.9 1.62-.73 1.29-1.47 2.55-2.21 3.78-25.89 43.3-57.66 53.85-70.32 56.41-1.75.35-3.14.56-4.1.67h-.07c-.94.11-1.45.13-1.45.13-3 11.4 2.72 16 9.6 17.65a29.11 29.11 0 0 0 3.38.59 49.56 49.56 0 0 0 13.49-.54s30.88 1.37 63.3 2.14l7.35.17 2.72.05c16.77.33 33.13.45 45.06.09 5.66-.17 10.32-.45 13.54-.86 24.51-3.17 17.39-19 9.88-31.23-6.46-10.54-3.26-29.28 7.33-60.24q2.57-7.53 5.71-16c11.61-31.47 10.94-78.51 8.21-118.33-.36-5.25-.75-10.38-1.16-15.32-.5-6.07-1-11.87-1.51-17.31-2.2-24.25-9.34-50.38-16.94-71.4-1.09-3-2.19-6-3.29-8.76a212.48 212.48 0 0 0-10.88-23.92c-.88-1.59-1.71-3-2.48-4.19l-.7-1.11c-1.33-2.14-2.72-4.6-4.15-7.29-2.09-3.92-4.26-8.34-6.4-12.91-5.45-11.65-10.75-24.39-14.25-33-2.55-6.31-4.14-10.45-4.14-10.45a15.83 15.83 0 0 1 1.74-4.84c13.29-24.29 90.33-38.24 90.33-38.24l38.62 2.78 76.77 5.52-83.83-12.66-13-2s3.77-.4 9.35-1.3c11.07-1.8 29.27-5.57 39.25-12.14 8-5.24 50.2-7.48 88.08-8.43v-9.64l-7.07 5-81.39 1.21 39.52-50.58-52.17 53.34c-8.2 1.64-24 5.36-42.13 9.78-12.5 3.05-26.12 6.46-39.12 9.68-32 8-60.56 15.32-60.56 15.32a140.77 140.77 0 0 1 55.47-102.72L965.14.47h-11.58c-33 19.69-82.71 59.05-82.71 59.05s.83-21.77 7.83-59H863.5q-.27 2.87-.69 5.7c-6 40.63-8.93 88.51-8.93 88.51-5.14 34.78-19 5.14-19 5.14 1.24-39.52-14.69-76.4-27.43-99.4h-16.84c7.78 15.86 5.18 27.44 5.18 27.44C769.99 8.69 749.47 2.2 735.44.47a59.65 59.65 0 0 0-15.63 0A27.73 27.73 0 0 0 714 1.82c52.16 2.37 89.3 41.88 89.3 41.88 4.14 1 14.58 33.32 19 74.32.65 6 1.18 12.23 1.53 18.56 1.19 21.15-1.47 29.76-4.9 32.7-2.51 2.16-5.44 1.25-7.57 0a15.29 15.29 0 0 1-2.94-2.28c-8.12-13.6-39-29.07-67-40.9-5.93-2.5-11.74-4.84-17.18-7a64.18 64.18 0 0 1-38.42-43.12c-9.17-33.51-26.36-32.23-26.36-32.23 20.16 15.41 19 62 19 62l-66.76-14.1c31.73 8.52 83.75 28.33 83.75 28.33l-26.55 5.11zM594.26 88.01l17.41 3.68a122.12 122.12 0 0 0-17.41-3.68z"
        fill="#dea3a2"
      />
      <path
        d="M794.35 564.82s14.69-8.7 34.82-4.35 50.95 2 53.76 1.57zM858.73 328.2s4.9 77.24-3.81 92.47zM876.8 420.67s-6.27 72.35-10.62 86.49 10.62-86.49 10.62-86.49zM882.93 242.79c4.44 1.68 23.48 40.26 19.63 51.68s-19.63-51.68-19.63-51.68zM834.65 202.7c2.07.94 10.92 23.18 9.15 29.76s-9.15-29.76-9.15-29.76zM917.09 332.47c-2.2 22.43-3.39 37.12-2 55.07a211.23 211.23 0 0 1-.6 41.88zM678.69 71.24c2.68 3.06 3.58 7.3 3.71 11.37s-.4 8.14-.13 12.19c.29 4.27 2.31 9.28 6.55 9.85z"
        opacity=".1"
      />
      <path
        d="M891.2 49.72a46.59 46.59 0 0 0-8.87 6.11 15.87 15.87 0 0 0-5.16 9.24c-.19 1.52-.09 3.08-.43 4.58a14.45 14.45 0 0 1-3 5.55 75.44 75.44 0 0 1-7.49 8.29"
        fill="none"
      />
      <path
        d="M865.39 152.9a55 55 0 0 1 7.15-5 30.1 30.1 0 0 1 7.35-3.23c3.94-1 8.09-.89 12.14-1.31s8.3-1.55 11.07-4.55zM1026.07 102.98c-4.81.13-9.8.3-14.08 2.5-2.18 1.13-4.08 2.73-6.22 3.93a18.92 18.92 0 0 1-9.07 2.36zM959.4 122.81c1-.8 2.6-.18 3.45.81s1.34 2.26 2.22 3.22c1.75 1.9 4.62 2.11 7.2 2.21zM931.9 20.68l-4.62 2.42c-4.72 2.47-9.47 5-13.62 8.31zM879.11 65.86c-3-.72-5.66 2.52-6.2 5.59s.09 6.32-.78 9.31c-.77 2.66-2.64 4.84-4.55 6.83zM827.7 71.47c-2.76 8.25 3.1 17.26 1.39 25.79-.52 2.6-1.73 5-2.34 7.6-1.61 6.78 1.15 14 5.59 19.39z"
        opacity=".1"
      />
      <ellipse
        cx="237.65"
        cy="719.04"
        rx="25.44"
        ry="3.49"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="140.21"
        cy="728.92"
        rx="25.44"
        ry="3.49"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="25.44"
        cy="715.54"
        rx="25.44"
        ry="3.49"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="179.21"
        cy="757.05"
        rx="18.08"
        ry="2.48"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="78.08"
        cy="754.57"
        rx="18.08"
        ry="2.48"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M139.66 728.13s35.68-116.95-5.58-163.79c-30.87-35-65.9-30.85-81.59-26.52a29 29 0 0 0-18.72 15.55c-5.48 11.84-4.49 31.05 34.23 53.47 64.84 37.53 68.87 89 68.87 89z"
        fill="#00c7fa"
      />
      <path
        d="M58.07 554.41s105.17 32.88 81.59 173.72M119.5 566.2s-14.48 9.76-9.88 24.42M68.62 574.88s8.85-9 19.63-4M110.19 620.18s15.55-7.89 19.57 2M148.66 636.62s-11.67-.93-11.89 4.65"
        fill="none"
        stroke="#565987"
        strokeMiterlimit="10"
      />
      <path
        d="M141.11 729.07s-41.79-85-53.27-83.14c-5.45.88-8 6.24-9.1 11.63a34.22 34.22 0 0 0 2.28 20.69c5.93 13.6 21.85 39.43 60.09 50.82z"
        fill="#00c7fa"
      />
      <path
        d="M88.15 662.06s43.86 63.59 52.34 66.38M84.12 671.98h10.24M96.38 695.25l16.05.69M106.15 676.64l-1.74 8.35M123.21 702.07l-.31 7.6"
        fill="none"
        stroke="#565987"
        strokeMiterlimit="10"
      />
      <path
        d="M139.86 729.07s41.79-85 53.27-83.14c5.45.88 8 6.24 9.1 11.63a34.22 34.22 0 0 1-2.28 20.69c-5.93 13.6-21.85 39.43-60.09 50.82z"
        fill="#00c7fa"
      />
      <path
        d="M192.82 662.06s-43.86 63.59-52.33 66.41M196.85 671.98h-10.24M184.59 695.25l-16.05.69M174.83 676.64l1.74 8.35M157.76 702.07l.31 7.6"
        fill="none"
        stroke="#565987"
        strokeMiterlimit="10"
      />
      <path
        d="M68.12 748.92a7.31 7.31 0 0 1-2.38-3.59 3.19 3.19 0 0 1 1.66-3.66c1.53-.58 3.16.48 4.4 1.54s2.65 2.29 4.27 2.07a6.51 6.51 0 0 1-2-6.09 2.56 2.56 0 0 1 .56-1.24c.85-.9 2.38-.51 3.4.2 3.22 2.27 4.12 6.65 4.14 10.6a19.93 19.93 0 0 0 .06-4.37 4.48 4.48 0 0 1 1.64-3.86 4.86 4.86 0 0 1 2.5-.59c1.45-.05 3.06.09 4 1.15 1.24 1.32.92 3.53-.15 5a15.86 15.86 0 0 1-4.2 3.37 9.12 9.12 0 0 0-3 2.86 3.42 3.42 0 0 0-.23.51H73.7a25.59 25.59 0 0 1-5.58-3.9zM227.34 714.68a7.22 7.22 0 0 1-2.38-3.59 3.19 3.19 0 0 1 1.66-3.65c1.53-.59 3.16.47 4.39 1.54s2.66 2.29 4.28 2.06a6.5 6.5 0 0 1-2-6.09 2.62 2.62 0 0 1 .56-1.23c.85-.91 2.39-.52 3.4.2 3.23 2.26 4.13 6.65 4.15 10.59a19.84 19.84 0 0 0 .05-4.36 4.48 4.48 0 0 1 1.64-3.86 4.91 4.91 0 0 1 2.5-.59c1.45-.06 3.07.09 4.06 1.15 1.23 1.32.91 3.53-.16 5a15.67 15.67 0 0 1-4.2 3.36 9.53 9.53 0 0 0-3 2.86 2.71 2.71 0 0 0-.22.52h-9.11a25.16 25.16 0 0 1-5.62-3.91zM174.27 748.92a7.31 7.31 0 0 1-2.38-3.59 3.2 3.2 0 0 1 1.67-3.66c1.52-.58 3.15.48 4.39 1.54s2.65 2.29 4.27 2.07a6.53 6.53 0 0 1-2-6.09 2.65 2.65 0 0 1 .56-1.24c.85-.9 2.38-.51 3.4.2 3.22 2.27 4.12 6.65 4.14 10.6a19.93 19.93 0 0 0 .06-4.37 4.48 4.48 0 0 1 1.64-3.86 4.86 4.86 0 0 1 2.5-.59c1.45-.05 3.07.09 4.06 1.15 1.23 1.32.91 3.53-.16 5a15.7 15.7 0 0 1-4.2 3.37 9.22 9.22 0 0 0-3 2.86 2.61 2.61 0 0 0-.22.51h-9.09a25.41 25.41 0 0 1-5.64-3.9zM23.78 679.72s-3.4 4.45 1.58 11.18 9.09 12.41 7.43 16.61c0 0-7.52-12.5-13.64-12.68s-2.1-7.6 4.63-15.11z"
        fill="#00c7fa"
      />
      <path
        d="M23.78 679.72a5.62 5.62 0 0 0-.69 1.39c-6 7-9.15 13.56-3.41 13.72 5.34.16 11.75 9.71 13.29 12.13 0 .18-.11.37-.18.55 0 0-7.52-12.5-13.64-12.68s-2.1-7.6 4.63-15.11z"
        opacity=".1"
      />
      <path
        d="M17.45 685.4c0 1.56.17 2.84.39 2.84s.39-1.28.39-2.84-.22-.83-.43-.83-.35-.74-.35.83z"
        fill="#ffd037"
      />
      <path
        d="M15.27 687.27c1.38.75 2.58 1.2 2.69 1s-.93-.95-2.31-1.7-.83-.21-.94 0-.81-.05.56.7z"
        fill="#ffd037"
      />
      <path
        d="M41.79 679.72s3.41 4.45-1.58 11.18-9.08 12.41-7.42 16.57c0 0 7.51-12.5 13.63-12.68s2.14-7.56-4.63-15.07z"
        fill="#00c7fa"
      />
      <path
        d="M41.79 679.72a5.62 5.62 0 0 1 .69 1.39c6 7 9.15 13.56 3.41 13.72-5.34.16-11.75 9.71-13.29 12.13a4 4 0 0 0 .19.55s7.51-12.5 13.63-12.68 2.14-7.6-4.63-15.11z"
        opacity=".1"
      />
      <path
        d="M48.12 685.4c0 1.56-.17 2.84-.39 2.84s-.39-1.28-.39-2.84.22-.83.43-.83.35-.74.35.83z"
        fill="#ffd037"
      />
      <path
        d="M50.3 687.27c-1.38.75-2.58 1.2-2.68 1s.92-.95 2.3-1.7.84-.21.94 0 .82-.05-.56.7z"
        fill="#ffd037"
      />
      <path
        d="M47.04 706.92s-9.53-.29-12.4-2.33-14.66-4.49-15.37-1.21-14.33 16.31-3.57 16.4 25-1.68 27.87-3.42 3.47-9.44 3.47-9.44z"
        fill="#a8a8a8"
      />
      <path
        d="M15.56 718.64c10.76.08 25-1.68 27.87-3.43 2.18-1.33 3.05-6.1 3.34-8.3h.32s-.61 7.69-3.47 9.44-17.11 3.5-27.87 3.42c-3.1 0-4.18-1.13-4.12-2.77.38 1 1.57 1.62 3.93 1.64z"
        opacity=".2"
      />
      <path
        d="M1015.3 505.17c-4.08-3.46-16.24-24.72-19.68-30.8l-.9-1.62c1.26-4.73-6.64-11.61-8.94-13.5-4.85-5.7-11.8-12.8-17.53-14.5-7.34-2.17-12.47.27-18-.68a14.06 14.06 0 0 1-3.89-1.25 19.42 19.42 0 0 1-2.33-1.38 28.48 28.48 0 0 1-5.28-5.05 11.48 11.48 0 0 0 3-.79q8.55-3.19 16.8-7.1c1.19-.57 2.48-1.25 2.95-2.48.2-.52.23-1.1.47-1.6.52-1.12 1.86-1.55 3-1.91 4.22-1.28 8.8-3.8 9.5-8.15a11 11 0 0 0 .1-1.72 7.32 7.32 0 0 1-.8 1.27c.15-1.47-.08-3 .14-4.43a8.88 8.88 0 0 1 1.46-3.52 11.75 11.75 0 0 0-.08 1.45c1.64-3.55 5.59-6.12 6.89-9.95a11.11 11.11 0 0 0 .52-3.15 11 11 0 0 1-.9 1.69c.73-4.33-1.17-9.23 1.06-13 .15-.25.32-.5.49-.73a12 12 0 0 0-.13 1.48c.11-.25.23-.5.37-.75 1.05-1.78 2.91-3.09 3.45-5.09a5.82 5.82 0 0 0 .08-2.24 10 10 0 0 1-.68.93 12.53 12.53 0 0 0-.41-2.77c-1.59-6.86-3.91-14.65-10.34-17.5-1.95-.87-4.2-1.23-5.76-2.69-3.57-3.32-1.64-10.42-5.75-13-1.81-1.15-4.59-1.27-5.28-3.3-.39-1.15.14-2.47-.29-3.62-.91-2.45-4.48-1.57-7.09-1.48-3.62.14-7.36-3.05-6.83-6.63a19 19 0 0 0-15.76-.74c-2.64 1.07-5.23 2.78-8.06 2.52-1.37-.13-2.64-.71-4-.95-5.6-1-10.39 3.81-15.72 5.8-5.55 2.07-12.37 1.25-16.79 5.21-3.88 3.49-4.59 9.67-8.7 12.88-2.19 1.7-5 2.31-7.33 3.87s-3.89 4.92-2.13 7.07c2.22 2.72 7.92 1.26 9 4.6.87 2.69-2.47 4.69-3.75 7.2a5.59 5.59 0 0 0 3.85 7.7v.08a36.22 36.22 0 0 0 17.26 43.56c.5.9 1 1.91 1.56 3 3.11 6.18 6.72 14.84 7.79 23.28-3.74-1.23-11.61 5.93-11.61 5.93a85.92 85.92 0 0 1-12.13 2.21c-8.41 1.1-7.73 4.39-7.72 4.42l-.53.48C865.57 467.54 836 494 831.26 495l.25 1-1.22.9-14.65 10.85s-11.22.74-22.25 2-26.66 4.61-15.26 17.87c.32.38.64.72 1 1L734.91 526a1.94 1.94 0 0 0 .49-1.17c0-1-1.14-2-3.1-2.75l-.07-.31c5.57-.16 12.49-.41 17.11-.83 1.2-.12 2.23-.24 3-.37 6.9-1.11-.55-6.36 2.76-10.5s0-19.63.27-22.94-2.2-16.58-4.41-19.35-2.48-14.65-2.48-14.65-5.24-4.7-8.27-20.73-15.17-24.32-19-25.15-9.65-4.14-9.65-5-6.62-1.11-9.38-2.21-4.14-2.49-6.34-2.77a12.31 12.31 0 0 0 1.95-2.92 6.73 6.73 0 0 1 2.39-2.67 3.56 3.56 0 0 1 .61-.25 2.37 2.37 0 0 1 .65-.09 1.88 1.88 0 0 1 .66.09c.82.23 1.66.92 2.39.51a.87.87 0 0 0 .27-.23 2.23 2.23 0 0 0 .43-1c.09-.41.16-.83.21-1.25v-.09c.05-.43.08-.86.1-1.29.15-3.12-.29-6.35 1.16-9.06l.09-.13c1.46-2.6 4.33-4 6.66-5.91q.72-.58 1.38-1.23c.17-.16.32-.34.49-.52s.51-.53.75-.81.38-.49.57-.73.36-.47.52-.71.4-.59.59-.9.25-.4.36-.6.39-.7.57-1.07c.08-.16.16-.33.23-.49.19-.4.36-.81.52-1.22.05-.13.09-.26.13-.38.17-.46.32-.91.45-1.38v-.23a18.59 18.59 0 0 0 .57-3A19.68 19.68 0 0 0 716 345.3c-2.55-3-6.21-5.62-6.41-9.53a14.94 14.94 0 0 1 1.2-5.36 13.36 13.36 0 0 0 .58-2.3 6.35 6.35 0 0 0 .09-1.07c0-2.91-1.84-5.5-4-7.49a25.68 25.68 0 0 0-23.11-6.1c-2.13.52-4.28 1.32-6.46 1.05-2.54-.32-4.64-2-6.92-3.17-7.46-3.78-17.57-1-22.09 6-2.61 4.08-3.63 9.39-7.53 12.25-2.3 1.69-5.48 2.43-7.13 4.62a4.86 4.86 0 0 0-.52.81 6.12 6.12 0 0 0-.59 2.74 18.65 18.65 0 0 0 .24 2.88 13.21 13.21 0 0 0 4.19 8.05l.57.6.13.14c.4.44.78.88 1.12 1.33l.06.09.31.44c-.14.17-.29.33-.42.5a33.2 33.2 0 0 0 4.9 46.38v1.06c-.09 1.85-.22 3.81-.38 5.81a4.75 4.75 0 0 0-3.77-1.31 4 4 0 0 0-1.88.18 4.82 4.82 0 0 1-1.08.22c-1.42-.12-2.74-.63-4.13-.48a4.63 4.63 0 0 0-3.89 1.36c-2.74 2.52-12.27 5.79-16.89 6.06a2.88 2.88 0 0 1-1-.25 2.45 2.45 0 0 0-1.52-.14c-2.91-.65-11 5-12.82 8.43-1.93 3.59-8.27 13.26-8.27 13.26s-5.52 6.64-4.69 10.23-1.93 7.74-5.24 9.4-9.93 18.24-9.93 18.24-7.17 15.2-14.62 19.07c-2.92 1.52-3.84 5-3.89 8.75-1.72.09-3 .09-3 .09s-23.17 5.9-30.52 1.47-33.1-5.52-33.1-5.52L457.31 466l-1.06-1.14c4.64-3.95-3.18-6.85-3.18-9.75s-2.94-4.06-2.94-4.06-.13.17-.34.4a5.13 5.13 0 0 0-.76-.4 7.27 7.27 0 0 1-2.17 1.85c-.54-.35-.89-1.39-.77-3.69.22-4.49-2.69-9.24-5-12.27 3.31-10.76 9.5-22.86 14.24-31.3.27-.5.55-1 .82-1.45a32.35 32.35 0 0 0 11-50.91c-.34-.39-.69-.76-1.05-1.13a6.89 6.89 0 0 1 .81-.23 6 6 0 0 1 1.05-.1c2.37.06 5.1 1.15 7.31 1.05a4.33 4.33 0 0 0 2.05-.4c2.42-1.2 1.85-4.42.43-6.05-1.75-2-4.5-3.33-5.77-5.57a17.81 17.81 0 0 1-1.31-4.28 15.28 15.28 0 0 0-9.32-9.64 19.66 19.66 0 0 0-14.66.32c-2.17 1-4.08 2.31-6.33 3.12-4.65 1.68-10 .76-14.81-.58-2.81-.78-5.61-1.7-8.46-2.33a42.35 42.35 0 0 0-3.89-12.31c-.15-.31-.33-.6-.49-.91 4.8-1.66 11.06-1.36 13.56-5.71a9.56 9.56 0 0 0 4.55-.59c1.38-.69 2.42-2.35 1.86-3.8a3 3 0 0 0-.61-.92 11.47 11.47 0 0 0-2-1.51 11.82 11.82 0 0 1-5.08-9.1c0 .08 0 .16.07.25a10.77 10.77 0 0 1 0-1.27c.08-1.91.63-3.79.51-5.7a7.28 7.28 0 0 0-.54-2.31v.15a8.42 8.42 0 0 0-7.91-5.39c-1.25.06-2.48.4-3.73.44-6 .17-10.95-6.56-16.76-5.2-1.24.29-2.42 1-3.69.95-2.93 0-4.74-3.36-7.54-4.24-2.22-.71-4.64.27-7 0s-4.12-1.58-6.08-2.65c-4.19-2.29-9.8-3.3-13.47-.24a12.21 12.21 0 0 1-2.62 2.1 7.6 7.6 0 0 1-3.8.22 35.23 35.23 0 0 0-11.35.77 4.28 4.28 0 0 0-2.6 1.35 7.6 7.6 0 0 0-.82 2.65c-1.12 4.35-6.48 5.82-10.95 6.19a6.3 6.3 0 0 0-3.3.89c-1.61 1.23-1.56 3.7-.85 5.6s1.92 3.63 2.18 5.64c.65 5-4.78 8.87-5.68 13.88-1.26 6.92 6.41 13.72 3.8 20.26-1.15 2.9-4.23 5.14-4.09 8.26s3.16 4.92 5 7.3 2.51 5.17 3.21 8c1.08 4.33 1.28 12.5 5.92 14.58a4.69 4.69 0 0 0 .6.24 6.82 6.82 0 0 0 .78.19c-.22.32-.43.64-.65.95-5.42 7.74-11.49 15.27-17.17 19.91-.2.17-.41.33-.62.49a4.46 4.46 0 0 0-2.45-1.08c-3.31-.37-11.77 5.53-11.77 8.47S293.86 402 285 410.47s-8.82 49-5.88 56.75c1.16 3.07 2.79 11.06 4.33 19.58a10.84 10.84 0 0 0-4 5.85c-3.31 14 1.47 25.05 5.51 26.16S288 514 288 514c-3.23-7-3.84-12.41-2.63-16.52C286.85 506.55 288 514 288 514s10.67 33.9 14.71 44.22 18.39 74.81 18.39 74.81 1.57 2 4.38 4.85l3.34 18.36 5.51 11.06h.41l-.83 7.88s.73 33.17-1.11 38.14-18.2 95.08-18.2 95.08-5.15 31.69-4.78 39.43l11.95 2.58s-2.39-6.82 1.11-19.53 10.29-36.48 10.29-36.48l7-31.69.53 22.66s-6.25 28.19-5 29.66 10.84 2 10.84 2 0-15.11 2-23.4c1.76-7.23 21.28-82.13 26.24-101.18a47.05 47.05 0 0 1 21.56-3.48c24.77 1.38 38.63 10.44 46.37 19.73-17.75 9.38-32.7 17.12-32.7 17.12l.18 1-.16.09-.38.23-.19.11-.36.22-.27.15-.41.25-.26.15-.5.29-.23.13-1.64 1-.18.1-.71.41-.21.12-.75.43-.2.12-.85.49-.11.06-1 .56-1 .58-.1.06-.91.51-.25.14-.74.42-.35.2-.68.37-.34.19-.75.41-.26.15-1 .55-.94.51-.26.13-.71.38-.3.16-.62.32-.33.17-.61.32-.27.14-.72.36-.12.06-.8.4-.18.08-.56.27-.24.11-.45.2-.24.11-.39.16-.22.09-.36.14-.17.07-.45.15c-4.73 1.43-8.11 13.42-3 21.13s4.05 21.13 1.35 26.27.67 14.28 1.35 16.57c.51 1.74 6.71 3.63 16.49 3.19a69.52 69.52 0 0 0 15.72-1.19c15.55-2.86 9.8-9.14 8.11-13.71s-2-17.71.34-23.7q.24-.63.42-1.29c3.66-4.07 9.5-10.74 14.17-16.82 2.15-2.8 7.58-5.29 14.18-7.41 5.28 21.65 15.8 64.51 18.12 71.35 3.12 9.21 4.78 31.88 4.78 31.88l12.13-1.11-4-60.25-4.35-48c5.74-1 10.18-1.63 11.62-1.83 5.92 22.78 11.55 44.48 12.46 48.21 2 8.29 2 23.4 2 23.4s9.56-.55 10.85-2-5-29.67-5-29.67l1.17-49.86c13.73-6.43 30.43-14.19 37.81-17.4 6.94-3 18.47-10.13 28.11-16.4l17 138.75 9.93.83 5.31-1.21 6.82-1.55 15.6-125.07c.62.49 1.19.95 1.69 1.37-.34 3.13-.65 8.45.64 12.32 1.93 5.8 1.65 18.51.27 22.94s-6.06 10.5 6.62 13.26 21.24.28 21.79-1.93 3.31-11.06 1.1-16-3-18 1.1-25.43 1.38-19.07-2.48-20.45c-2.56-.92-6.32-2.56-8.58-3.57l-.72-.91a18.73 18.73 0 0 1 6-5.2c6.62-3.31 5.24-10.77 5.24-10.77s6.9 0 11.86-8.3c3.48-5.81 7.49-11.61 9.59-15.81.42 2.67.9 6 1.17 8.81.55 5.9 7.35 63.2 10.48 68s.55 22.85.55 22.85h10.11l-.73-27.64s-11.4-81.25-1.84-89.55c1.67-1.45 3.3-2.94 4.85-4.4l18.86 137.91c-.05 1-.09 1.72-.12 2.26s-.06 1-.06 1-8.09 4.06-2.2 8.1a15.06 15.06 0 0 0 4.16 1.74l.41 3a42.91 42.91 0 0 1-6.41 0c-1.29-.55-1.29 17.13-1.29 17.13s-7.17 14.38-8.09 17.88-8.09 12.16-8.09 12.16-10.3 7.55 4.78 10.5 31.62-.92 31.62-.92 11-19.16 12-18.06 0 10.14 0 10.14l6.44-1.66s-1.11-12 1.47-18.43c2-5.12-2.41-21.29-4.33-27.72l1.2.09s1.1-2.21 2.21-8.85q0-.31.09-.6a85.57 85.57 0 0 1 3.59-14.14c1.83-5.9 0-5.16 0-8.85a134.22 134.22 0 0 1 2-18.93c0-.19.07-.37.11-.56a8.82 8.82 0 0 0 2.68 1.19c1.1 3.06 2.26 6.57 3 9.5-2 .62-3.35 1.34-3.57 2.17-1.11 4.06.36 12.71.36 12.71s1.65 19.54-1.47 22.49-9.56 8.29-5.33 13.82a7 7 0 0 0 1.47 1.37c3 2.18 8.76 3.75 14.56 4l-2.42 36.1 12.02 1.12s1.65-22.67 4.78-31.88c.69-2 2.12-7.32 3.92-14.28 4.55-6.83 7.11-11.7 7.11-11.7l3.13 12.9 10.84-2.77s-5.88-11.42-5.15-15.47-3.12-9.76-6.24-14.37c-.39-.57-.81-1.3-1.26-2.13 4.65-18.87 8.79-36 8.79-36s2.94-38.3 56.08-41.3a47 47 0 0 1 21.55 3.48c5 19 24.49 94 26.25 101.18 2 8.29 2 23.4 2 23.4s9.56-.55 10.85-2-5-29.66-5-29.66l.53-22.66 7 31.69s6.8 23.76 10.29 36.48 1.1 19.53 1.1 19.53l11.95-2.58c.37-7.74-4.78-39.43-4.78-39.43s-16.36-90.1-18.2-95.08-1.1-38.14-1.1-38.14l-.81-7.72c13-9.15 20.3-58.06 20.3-58.06l13.56-75.82a91.85 91.85 0 0 0 5.4-12.16v-.07l1.62 1.82 7.88 19.35c15.62 21.93 31.25 21.19 31.25 21.19a1.11 1.11 0 0 0 .07-.16 10.35 10.35 0 0 0 8-2.1l.16-.13c5.67-4.43-6.09-36.12-10.88-40.18zM739.39 551c-.9-3.62-1.88-7.58-2.91-11.74l3.13-.06zm-47.08-153a9.08 9.08 0 0 0-.94.66c-.29-.74-.56-1.5-.83-2.26a5.25 5.25 0 0 0 1.77 1.6zm-94.63 160.42c-4.69 6.09-5.24 10-5.24 10l1.18.27-8.51 7.61-4.29-36.87 20.75.9c-1.17 9.11-2.5 16.28-3.89 18.09zm20.13 76.84s4.28-1 9.86-2.62l-1.77 13.3c-5-6.49-8.09-10.68-8.09-10.68zm-11.91-146l.15-.34v.35zm-106.13 91.46c-4.64-2.1-37.42-12.17-49.35-15.82a2.42 2.42 0 0 1-.29-1.87c1.11-3.68-7.35-13.63-10.66-16.21s-7.72-7.37-4.05-10.32a6.24 6.24 0 0 0 1.79-3.35l34.18 1.49a83.78 83.78 0 0 0 10 3s5.81-.76 13.45-2l67.64 2.93 6.42 52.31c-4.21 3.86-7.07 6.56-7.07 6.78 0 .48-4.53 8.2-5.08 18.37l-35.29-11a5.1 5.1 0 0 0 .19-.55c3.35-12.15-16.18-21.18-21.88-23.76zm-61.87-56.11c-.06-2.47-.27-4.33-.27-4.33l-.76-8.24c6.66 4.07 13.86 8.59 19 12.12zm159.32 155.74l.73-.5a10.09 10.09 0 0 0 5-3.46c2.95 2.57 5.7 4.94 8.11 7-2.82 2.6-7.78 6.83-12.45 9.06zm140.88-57.61l-1.3 71.64-9.91-66.38c2.8-1.39 7.18-3.42 11.21-5.26zm61.9-97.48s10.66 13.27 18.94 8.84c1.86.24 15.41-7.08 24.1-11.9a39.44 39.44 0 0 0 4.21 5.08l5.26-2.72 1.05-.54c.52 5.71 1.42 15.22 2.15 21.32 1.1 9.17-14.2 21.63-14.34 21.74s.06.46.1 1.18c-.75.67-1.2 1-1.2 1l1.23-.22c.11 2.89-.1 8-2.71 9.07-3.67 1.48-5.88 2.58-13.24.37a137.55 137.55 0 0 0-27.28-4.48c-12.77-.74-26.44.64-33 8.16-.23.27-.45.56-.66.86s-.22.33-.33.49a3.24 3.24 0 0 0-.66.31s0 .24.1.62c-3.56 6.42-4.55 18.29-4.33 31.07l-1.1.47-.54.25-.41.2c-.38.17-.76.36-1.14.55l-.68.34-.88.47-1 .55-.57.34c-.42.24-.84.5-1.26.77l-.3.19c-.48.32-1 .64-1.43 1l-.12.1c-.18.12-.35.25-.52.38l1.24-82.12 54.39-1-.83-7.74-8.4-.51a23.12 23.12 0 0 0 4.16-4.49zM409.81 729.89l.3-.75c0-.06.05-.12.08-.19l.29-.66.29 1.57c-.4.23-.8.47-1.22.7.09-.22.17-.44.25-.65zM602 721.4a81.33 81.33 0 0 0 14.37-4l-7.93 59.36zm135.47 52.53c.72.17 1.47.33 2.24.49v1.73l-2.34.12z"
        transform="translate(-37.44 -49.53)"
        fill="url(#a)"
      />
      <path
        d="M1110.55 744.39c0-2.14-8.71-4-21.52-5-3.48-5.8-8.94-12.1-9.5-14.67-.76-3.48-9.23-3-16.25-1.27 4.42-5.68 10.79-12.35 16.43-12.52 5.9-.16 5.94-4.53 2.7-10.61a20.52 20.52 0 0 0 3.55-1.59c2.21-1.22 1.07-.83.9-1.14s.71-1.19-1.51 0a20.75 20.75 0 0 0-3.22 2.09 19.68 19.68 0 0 0 .32-4c0-2.53-.21-1.34-.56-1.34s-.7-1.19-.7 1.34a26.43 26.43 0 0 0 .12 2.69 84.27 84.27 0 0 0-9.06-11.85v.07c.06.09.15.22.25.4v.05c0 .07.09.16.13.25v.06a7.31 7.31 0 0 1 .36.78.42.42 0 0 1 0 .1l.15.38c1.05 2.91 1.77 8.56-3.63 15.87s-10.32 14.07-12 19.69c-1.65-5.62-6.47-12.26-12-19.69s-4.68-13-3.63-15.87l.15-.38v-.1q.2-.45.36-.78v-.06c0-.09.09-.18.13-.25v-.05a3.26 3.26 0 0 1 .25-.4v-.07a84.27 84.27 0 0 0-9.06 11.85c.07-.76.12-1.68.12-2.69 0-2.53-.35-1.34-.7-1.34s-.57-1.19-.57 1.34a19.52 19.52 0 0 0 .33 4 20.75 20.75 0 0 0-3.22-2.09c-2.22-1.21-1.34-.33-1.51 0s-1.32-.08.9 1.14a20.52 20.52 0 0 0 3.55 1.59c-3.24 6.08-3.2 10.45 2.7 10.61 6.78.2 14.64 9.83 18.87 15.8-4.22 2.89-16.69 3.58-19.36 3.69h-.51a47.8 47.8 0 0 0 1.06 6.55 28.88 28.88 0 0 0 1.21 3.94c-5.29.95-8.45 2.13-8.45 3.42 0 2.7 13.83 5 32.27 5.51a220.06 220.06 0 0 0 24.36 1.32c.5 0 1 0 1.38-.06h.2c.4 0 .77-.1 1.12-.16l.21-.05a7.37 7.37 0 0 0 .93-.25l.14-.06a6.17 6.17 0 0 0 .73-.33h.09a4.55 4.55 0 0 0 .6-.42l.12-.11a2.74 2.74 0 0 0 .43-.48l.06-.07c12.08-.99 19.78-2.76 19.78-4.78z"
        transform="translate(-37.44 -49.53)"
        fill="url(#b)"
      />
      <path
        d="M385.26 702.94s2 9.38-.34 15.35-2 19-.34 23.6 7.42 10.8-8.09 13.65-26 .28-26.63-2-4.05-11.37-1.35-16.49 3.71-18.48-1.35-26.16-1.69-19.61 3-21 25.09-13.53 25.09-13.53-7.55 13.11.55 16a14.69 14.69 0 0 1 9.46 10.58z"
        fill="#575a88"
      />
      <path
        d="M555.76 630.2s-31.2 21.65-44.76 27.51-58.7 27.15-58.7 27.15-45.48 5.87-52.82 15.41-17.61 20.55-17.61 20.55l-8.07-44.76s89.51-46.23 90.24-49.53 26.42-13.21-48.42-12.84c-65.58.33-89.75 4.59-95.23-4.48a10 10 0 0 1-1.26-4.69c-.74-15 88.05-81.45 88.05-81.45s4.34 2.26 9.52 5.3c5.68 3.32 12.36 7.59 15.43 10.85 5.87 6.23 20.17 8.07 20.17 8.07l87.32 27.18s25.68 8.07 26.41 30.82-10.27 24.91-10.27 24.91z"
        fill="#aac9f5"
      />
      <path
        d="M566.03 605.26c-.73-22.79-26.41-30.79-26.41-30.79l-87.32-27.15s-14.3-1.84-20.17-8.07c-3.07-3.26-9.75-7.53-15.43-10.85-5.18-3-9.52-5.3-9.52-5.3s-88.79 66.4-88.05 81.45a10 10 0 0 0 1.26 4.69c5.48 9.07 29.65 4.81 95.23 4.48 74.84-.37 49.15 9.54 48.42 12.84s-90.24 49.53-90.24 49.53l.18 1c-4.54 2.68-19.78 11.57-23.79 12.77-4.72 1.43-8.09 13.37-3 21s4 21 1.35 26.16.67 14.21 1.35 16.49 11.12 4.83 26.63 2 9.78-9.1 8.09-13.65-2-17.63.34-23.6a12.78 12.78 0 0 0 .42-1.28c3.65-4 9.48-10.69 14.14-16.74 7.34-9.54 52.82-15.41 52.82-15.41s45.13-21.27 58.7-27.15 44.76-27.51 44.76-27.51 10.98-2.18 10.24-24.91zm-190.2 87c-6.07-2.14-3.35-10.05-1.61-13.87l2.57 14.26c-.31-.1-.62-.24-.96-.36z"
        opacity=".1"
      />
      <path
        d="M442.4 627.82s25.31 96.85 27.33 105.1 2 23.3 2 23.3 9.54-.55 10.82-2-5-29.53-5-29.53l1.83-78.51-26.78-22.56z"
        fill="#d5838e"
      />
      <path
        fill="#ffccd0"
        d="M376.42 679.95h19.81v17.06h-19.81z"
      />
      <path
        d="M390.76 702.94s2 9.38-.34 15.35-2 19-.33 23.6 7.41 10.8-8.1 13.65-26 .28-26.63-2-4.05-11.37-1.35-16.49 3.71-18.48-1.35-26.16-1.68-19.61 3-21 25.08-13.53 25.08-13.53-7.54 13.11.55 16a14.69 14.69 0 0 1 9.47 10.58zM409.75 514.47s47.87 14.49 53.56 17.06 25.13 11.56 21.83 23.66-30.27 13.4-30.27 13.4l-41.09-15.23-16.14-32.65z"
        fill="#575a88"
      />
      <path
        d="M425.34 346.47s-2.36 3.67-5.56 9.29c-.26.46-.54.94-.81 1.44-8.75 15.57-22.49 43.59-13.72 52.55 12.39 12.66-28.34-7.15-28.34-7.15l-1-1.79-16.63-30.13s13.07-13.2 20.94-24.78c.13-.18.26-.37.38-.56 3.51-5.25 5.88-10.11 5.37-13.18s3.36-2.84 8.87-.9c11.65 4.03 30.5 15.21 30.5 15.21z"
        fill="#cd828d"
      />
      <path
        d="M425.34 346.47s-2.36 3.67-5.56 9.29c-.26.46-.54.94-.81 1.44a32 32 0 0 1-18.19 1.93 32.07 32.07 0 0 1-20.16-12.69c-.13-.17-.25-.35-.38-.54.13-.18.26-.37.38-.56 3.51-5.25 5.88-10.11 5.37-13.18s3.36-2.84 8.87-.9c11.63 4.03 30.48 15.21 30.48 15.21z"
        opacity=".1"
      />
      <path
        d="M438.82 326.34a32.19 32.19 0 0 1-32.19 32.19 31.44 31.44 0 0 1-5.85-.54 32.18 32.18 0 1 1 38-31.65z"
        fill="#cd828d"
      />
      <path
        d="M430.74 305.03c-1.94.65-3.22 2-5 3-3.11 1.76-7.24 1.71-10.2 3.43-2.45 1.42-2.45 4.4-3.5 6.76-2.75 6.17-12.69 7.75-17.18 13a10.47 10.47 0 0 0-1 1.39c-2.44 4.12-1 9.08.9 13.42a108.86 108.86 0 0 0 6 12c.4.69.81 1.37 1.23 2.05 2.44 4 5.26 8.41 3.76 12.72-2.44 7-14.38 8.63-17.86 15.33-1 2-1.19 4.23-2.28 6.19-1.83 3.32-5.6 5-9.7 6.49l-16.63-30.13s13.5-13.63 21.32-25.34a32.18 32.18 0 0 1 50.12-40.27z"
        opacity=".1"
      />
      <path
        d="M441.31 298.21c-1.74-2-4.48-3.32-5.75-5.55a17.8 17.8 0 0 1-1.31-4.26 15.19 15.19 0 0 0-9.3-9.6 19.66 19.66 0 0 0-14.62.32c-2.16 1-4.07 2.3-6.31 3.11-4.65 1.66-10 .75-14.78-.58s-9.57-3.09-14.62-3.06-10.53 2.52-11.52 6.72a30 30 0 0 0-.32 3.42c-.6 5.08-5.25 9.18-10.29 12s-10.74 4.75-15.41 8-8.32 8.28-7.06 13.28c.78 3.11 3.29 5.65 5.3 8.34 5.07 6.79 7.1 14.85 9 22.73.68 2.74 1.36 5.58.7 8.33-1.18 4.95-6.29 8.39-9.63 12.57-4.14 5.2-5.55 11.7-5.25 18s2.17 12.41 4.1 18.48a23 23 0 0 0 2.82 6.41c2.43 3.47 6.61 5.75 10.64 7.89a12.48 12.48 0 0 0 5.88 1.94c4.43-.06 7-4.26 7.95-7.93a31.13 31.13 0 0 0 .91-9.31 6.78 6.78 0 0 1 .31-3.32 6.29 6.29 0 0 1 2.56-2.44c6.33-3.8 15.9-4.47 19.18-10.43 1.08-2 1.25-4.2 2.28-6.18 3.47-6.71 15.41-8.31 17.86-15.34 1.5-4.31-1.32-8.74-3.76-12.73a105.57 105.57 0 0 1-7.25-14c-1.85-4.34-3.35-9.3-.91-13.42 3.78-6.39 15.21-7.68 18.19-14.37 1.05-2.35 1.05-5.34 3.5-6.76 3-1.71 7.09-1.68 10.2-3.43 2-1.15 3.4-2.75 5.86-3.27 3.21-.67 7.66 1.91 10.39.55 2.45-1.29 1.88-4.49.46-6.11z"
        fill="#663d5c"
      />
      <path
        d="M440.95 298.21c-1.74-2-4.49-3.32-5.76-5.55a18.75 18.75 0 0 1-1.31-4.26 15 15 0 0 0-8.41-9.2 14 14 0 0 1 4.38 6.63 18.09 18.09 0 0 0 1.3 4.26c1.27 2.23 4 3.56 5.76 5.55 1.42 1.62 2 4.83-.43 6-2.72 1.36-7.17-1.21-10.38-.54-2.46.51-3.83 2.11-5.86 3.26-3.11 1.76-7.24 1.72-10.2 3.44-2.45 1.41-2.45 4.4-3.5 6.75-3 6.69-14.41 8-18.2 14.37-2.44 4.12-.93 9.09.92 13.42a107.46 107.46 0 0 0 7.24 14c2.45 4 5.26 8.41 3.77 12.72-2.45 7-14.39 8.63-17.87 15.34-1 2-1.19 4.22-2.27 6.18-3.29 6-12.86 6.64-19.18 10.43a6.29 6.29 0 0 0-2.56 2.44 6.67 6.67 0 0 0-.31 3.32 31.13 31.13 0 0 1-.91 9.31c-.93 3.68-3.53 7.87-7.95 7.93a12.52 12.52 0 0 1-5.89-1.94c-.88-.47-1.78-.95-2.66-1.45a54.5 54.5 0 0 0 6.7 4 12.48 12.48 0 0 0 5.89 1.94c4.42-.06 7-4.26 7.95-7.93a31.12 31.12 0 0 0 .9-9.31 6.78 6.78 0 0 1 .32-3.32 6.27 6.27 0 0 1 2.55-2.44c6.33-3.8 15.9-4.47 19.19-10.43 1.08-2 1.24-4.2 2.27-6.18 3.48-6.71 15.42-8.31 17.86-15.34 1.5-4.31-1.31-8.74-3.76-12.73a106.78 106.78 0 0 1-7.25-14c-1.85-4.34-3.35-9.3-.91-13.42 3.79-6.39 15.21-7.68 18.19-14.37 1.05-2.35 1.06-5.34 3.5-6.76 3-1.71 7.09-1.68 10.2-3.43 2-1.15 3.4-2.75 5.86-3.27 3.21-.67 7.66 1.91 10.39.55 2.41-1.15 1.84-4.35.43-5.97z"
        opacity=".1"
      />
      <path
        d="M794.04 446.22s5 21 16 32.09l4.41-9.58-5.51-17.47z"
        fill="#f26383"
      />
      <path
        d="M808.9 451.26l-14.86-5s5 21 16 32.09"
        opacity=".1"
      />
      <path
        d="M988.66 496.3l-.16.13a10.49 10.49 0 0 1-14.31-1.31l-42-47.13-1.09-1.22 22-25.32 4 2.57.9 1.62c3.44 6.05 15.57 27.21 19.64 30.66 4.8 4.04 16.53 35.59 11.02 40z"
        fill="#ffc1c7"
      />
      <path
        d="M576.67 631.47s-11.28 11.56-19 12.66-14 25.87-3.3 27.79 31.36-5.78 34.39-9.08 14-22.84 14-22.84z"
        fill="#ffd6db"
      />
      <path
        d="M813.12 469.14l-5.48 3.1c-8.46 4.7-23.91 13.13-25.89 12.86-2.75-.36-3.3-26.22-3.3-26.22l14.63-10.81 1.51-1.13 4.41-1.65z"
        fill="#ffc1c7"
      />
      <path
        d="M813.12 469.14l-5.48 3.1a33.59 33.59 0 0 0-14.56-24.17l1.51-1.13 4.41-1.65z"
        opacity=".1"
      />
      <path
        d="M844.12 439.06l-17.06 30.41-11.81 6.09-5.25 2.71c1.47-22.92-16-32.09-16-32.09 4.77-1 34.23-27.39 38.55-31.27l.53-.47 4-.55z"
        fill="#00c7fa"
      />
      <path
        d="M897.87 603.23l-14.49-11 47.32-157 16.7 6.24-12.66 24.94-13.94 77.76s-8.24 55.4-22.93 59.06z"
        fill="#e4aab4"
      />
      <path
        d="M954.18 418.15l-49.89-.37s-43.66 12.11-40-5.5c2.29-11-3.15-24.74-7.57-33.49-.53-1.06-1-2.06-1.55-3-1.91-3.54-3.35-5.73-3.35-5.73s5.19-.86 11.74-1.78c3-.44 6.38-.88 9.62-1.27 1.7-.21 3.36-.38 4.93-.55 6.42-.63 11.47-.78 11.47.3s1 3.67 2.62 7c.25.53.54 1.08.82 1.63a71.67 71.67 0 0 0 7.9 12.11 29 29 0 0 0 5.54 5.34 18.06 18.06 0 0 0 2.33 1.37 14 14 0 0 0 3.88 1.25c5.57.94 10.69-1.49 18 .68 9.94 2.93 23.51 22.01 23.51 22.01z"
        fill="#ffc1c7"
      />
      <path
        d="M690.56 541.05s-42 23.11-44.58 32.28 6.24 16.51 6.24 16.51 1.47 7.89 2 13.76 7.33 62.92 10.45 67.69.55 22.75.55 22.75h10.14l-.73-27.52s-11.38-80.89-1.84-89.15 17.43-17.61 20.18-16.88-2.41-19.44-2.41-19.44z"
        fill="#e4aab4"
      />
      <path
        d="M638.86 508.22s-27.52 52.55-28.07 59.7-23.94 37.42-23.94 37.42l29.17 36.87s3.85-9.35 10.46-12.65 5.22-10.73 5.22-10.73 6.88 0 11.84-8.26 11-16.51 11-20.08 36.32-41 36.32-41l-2.75-39.9-7.43-12.66z"
        fill="#bdd2e8"
      />
      <path
        d="M567.32 511.24l-.24.21c-3.34 3-40.76 36.15-40.76 36.94s-13.48 23.11 3.3 42.37 55.31 50.9 55.31 50.9 16.78 12.11 19 14.59 35.5 0 15.69-22.56-38.52-47.88-38.52-47.88 33-8 35.22-13.48-43.48-74.3-43.48-74.3z"
        opacity=".1"
      />
      <path
        d="M566.22 511.24l-.24.21c-3.34 3-40.76 36.15-40.76 36.94s-13.48 23.08 3.34 42.37 55.31 50.9 55.31 50.9 16.78 12.11 19 14.59 35.5 0 15.69-22.56-38.52-47.88-38.52-47.88 33-8 35.21-13.48 45.68-72.92 45.68-72.92l-89.15-1.38z"
        fill="#bdd2e8"
      />
      <path
        d="M661.42 363.21l-3.3 30s-33.85 13.48-34.67 13.21-22.56-19.81-19-32.74c1.8-6.49 2.62-15.48 3-22.82s.31-12.95.31-12.95 49.25-17.61 44.85-5.51c-1.6 4.39-.88 9.67.69 14.59a67.88 67.88 0 0 0 8.12 16.22z"
        fill="#cf6f80"
      />
      <path
        d="M360.4 300.75l-.07.18a156.68 156.68 0 0 0-9.3 25.59l-.3 1.17a62.7 62.7 0 0 0-2.06 18c.67 13.12 7.33 16.15 7.33 16.15s-100.7-16.5-84.2-19.26c2.66-.44 5.56-2.09 8.58-4.54 5.67-4.62 11.72-12.12 17.12-19.82 2-2.84 3.93-5.72 5.69-8.47.12-.18.25-.37.36-.55 6.58-10.26 11.18-18.9 11.18-18.9s69.34-41.83 45.67 10.45z"
        fill="#ffccd0"
      />
      <path
        d="M859.35 622.47s25.31 96.85 27.33 105.1 2 23.3 2 23.3 9.53-.55 10.82-2-5-29.53-5-29.53l1.83-78.51-26.78-22.56z"
        fill="#d5838e"
      />
      <path
        d="M874.2 591.68c.56 0 25.32.55 25.32.55l1.83 17.43s-.73 33 1.1 38 18.16 94.65 18.16 94.65 5.14 31.55 4.77 39.25l-11.92 2.57s2.38-6.79-1.1-19.44-10.27-36.32-10.27-36.32l-8.62-38.9s-1.47-69-54.48-66-55.95 41-55.95 41-18 74.29-21.1 83.47-4.77 31.73-4.77 31.73l-12.1-1.1 4-60 11.19-123.46 34.49-2.38z"
        fill="#e4aab4"
      />
      <path
        d="M339.8 638.47s-25.31 96.86-27.33 105.11-2 23.3-2 23.3-9.54-.55-10.82-2 4.91-29.57 4.91-29.57l-1.83-78.51 26.83-22.56z"
        fill="#d5838e"
      />
      <path
        d="M324.94 607.64c-.55 0-25.31.55-25.31.55l-1.84 17.42s.74 33-1.1 38-18.13 94.63-18.13 94.63-5.13 31.55-4.77 39.25l11.93 2.57s-2.39-6.79 1.1-19.44 10.27-36.32 10.27-36.32l8.62-38.89s1.47-69 54.48-66 55.92 41.06 55.92 41.06 18 74.29 21.09 83.46 4.77 31.74 4.77 31.74l12.11-1.1-4-60-11.23-123.45-34.48-2.38z"
        fill="#e4aab4"
      />
      <path
        d="M653.31 346.98c-.3.35-.61.68-.91 1a33 33 0 0 1-44.94 2.86c.37-7.29.31-12.95.31-12.95s49.25-17.61 44.85-5.51c-1.6 4.4-.88 9.68.69 14.6z"
        opacity=".1"
      />
      <path
        d="M661.42 324.23a33 33 0 1 1-33-33 32.82 32.82 0 0 1 33 33z"
        fill="#cf6f80"
      />
      <path
        d="M561.26 630.2s-31.18 21.65-44.76 27.51-58.69 27.15-58.69 27.15-45.49 5.87-52.83 15.41-17.61 20.55-17.61 20.55l-8.07-44.76s89.51-46.23 90.25-49.53 26.42-13.21-48.43-12.84c-65.58.33-89.75 4.59-95.23-4.48a10 10 0 0 1-1.26-4.69c-.73-15 88.05-81.45 88.05-81.45s4.34 2.26 9.52 5.3c5.68 3.32 12.36 7.59 15.43 10.85 5.87 6.23 20.18 8.07 20.18 8.07l87.31 27.18s25.69 8 26.44 30.79-10.3 24.94-10.3 24.94z"
        fill="#aac9f5"
      />
      <path
        d="M620.7 394.35s-12.93-28.66-17.34-28.66-11.28 148.25-11.28 148.25l67.41 1.06 2.76-77.84-13.76-69s-12.38 27.25-27.79 26.19z"
        opacity=".1"
      />
      <path
        d="M620.7 396.55s-12.93-28.66-17.34-28.66-11.28 148.25-11.28 148.25l76.48 1.16-6.32-77.94-13.76-69s-12.37 27.25-27.78 26.19z"
        opacity=".1"
      />
      <path
        d="M620.7 395.47s-12.93-28.66-17.34-28.66-11.28 148.25-11.28 148.25l76.48 1.13-6.32-77.93-13.76-69s-12.37 27.21-27.78 26.21z"
        fill="#ffd6db"
      />
      <path
        d="M608.15 357.79s-2.31-3.38-5.61-2.28-5.78-1.93-9.08 1.1-16.51 7.15-19 5.77-11.28 4.68-13.21 8.26-8.25 13.21-8.25 13.21-5.5 6.6-4.68 10.18-1.92 7.7-5.23 9.35-9.9 18.16-9.9 18.16-7.15 15.14-14.58 19-1.93 20.63-1.93 20.63l44-1.37 9.91-22.56s-3.85 66-8.53 72.09-5.23 9.9-5.23 9.9 18.16 3.85 22 7.16 14-.83 14-.83l9.9-87.77s3.58-16.51 3.58-25 1.84-55 1.84-55z"
        opacity=".1"
      />
      <path
        d="M607.05 357.79s-2.31-3.38-5.61-2.28-5.78-1.93-9.08 1.1-16.51 7.15-19 5.77-11.28 4.68-13.21 8.26-8.25 13.21-8.25 13.21-5.5 6.6-4.68 10.18-1.92 7.7-5.23 9.35-9.9 18.16-9.9 18.16-7.16 15.14-14.58 19-1.95 20.62-1.95 20.62l44-1.37 10-22.56s-3.85 66-8.53 72.09-5.23 9.9-5.23 9.9 18.16 3.85 22 7.16 14-.83 14-.83l9.9-87.77s3.58-16.51 3.58-25 1.77-54.99 1.77-54.99z"
        fill="#575a89"
      />
      <path
        d="M546.41 405.58s3.3 9.08 12.38 8.26-12.38-8.26-12.38-8.26zM555.21 391.83s6.05 1.1 8.26 6.32-8.26-6.32-8.26-6.32zM572.27 382.47c0 1.1 3.85 20.36 0 28.34s-3.3 17.34-3.3 17.34zM653.49 351.16s2.15-2.53 4.35-2.26 3.58 1.65 6.33 2.75 9.36 1.38 9.36 2.2 5.78 4.13 9.63 5 16 9.08 19 25 8.24 20.62 8.24 20.62l-29.17 14.31s22.56 95.76 25.33 102.69 3 47.6 3 47.6-17.88 8-22.56 10.46-2.75-23.66-12.38-38.8-20.64-37.14-20.64-37.14l-16.77-47.12s-10.73-62.74-1.65-74.29 18.75-26.89 17.93-31.02z"
        opacity=".1"
      />
      <path
        d="M654.56 351.16s2.15-2.53 4.35-2.26 3.58 1.65 6.33 2.75 9.36 1.38 9.36 2.2 5.78 4.13 9.63 5 16 9.08 19 25 8.27 20.62 8.27 20.62l-29.17 14.31s22.56 95.76 25.32 102.69 3 47.6 3 47.6-17.88 8-22.56 10.46-2.75-23.66-12.38-38.8-20.64-37.14-20.64-37.14l-16.76-47.12s-10.75-62.72-1.65-74.27 18.75-26.91 17.9-31.04z"
        fill="#575a89"
      />
      <path
        d="M714.25 471.62c-.81.13-1.85.25-3.05.36-8.81.81-26.12 1-26.12 1s-12.93-25.59-23.93-24.77c0 0 10.18-11.55 14.3-10.18.7.23 1.13-.27 1.33-1.26 1.11-4.91-2.7-21.85-2.7-21.85l-5.23-22.84 30.27 7.43c2.75.55 11.28 4.95 11.28 4.95s.27 11.83 2.47 14.59 4.68 15.95 4.41 19.26 3 18.71-.28 22.83 4.13 9.38-2.75 10.48z"
        opacity=".1"
      />
      <path
        d="M715.35 471.62c-.81.13-1.85.25-3 .36-8.81.81-26.12 1-26.12 1s-12.93-25.59-23.93-24.77c0 0 10.18-11.55 14.3-10.18.7.23 1.13-.27 1.34-1.26 1.1-4.91-2.71-21.85-2.71-21.85L670 392.08l30.27 7.43c2.75.55 11.28 4.95 11.28 4.95s.27 11.83 2.47 14.59 4.68 15.95 4.41 19.26 3 18.71-.28 22.83 4.08 9.38-2.8 10.48z"
        fill="#575a89"
      />
      <path
        d="M684.26 411.64s25.31 2.75 26.41 9.08-26.41-9.08-26.41-9.08z"
        opacity=".1"
      />
      <path
        d="M601.16 651.85s-1.65 9.08.28 14.85 1.65 18.44.27 22.84-6 10.46 6.61 13.21 21.18.27 21.73-1.93 3.3-11 1.1-16-3-17.88 1.1-25.31 1.38-19-2.47-20.36-10.46-4.4-10.46-4.4 7.16 12.93.55 15.68-18.71 1.42-18.71 1.42z"
        fill="#ffd6db"
      />
      <path
        d="M661.42 324.23a32.82 32.82 0 0 1-9 22.66.6.6 0 0 1-.08-.16c-1-2.09-1.92-4.27-1.84-6.56.09-2.77 1.68-5.27 2.2-8 .65-3.45-.48-7-1.59-10.3-.82-2.44-2.39-5.4-4.95-5.11a5.62 5.62 0 0 1-1.51.18c-1.37-.21-1.64-2-1.8-3.36a15.23 15.23 0 0 0-12.44-13.05 3.81 3.81 0 0 0-2.17.14c-.95.43-1.48 1.47-2.34 2.06-2.79 1.94-6.35-1.77-9.74-1.49-2.88.25-4.64 3.2-5.83 5.84s-2.68 5.64-5.5 6.26a1.72 1.72 0 0 1-1.34-.15c-.88-.64-.27-2 .18-3 1.16-2.62.38-4.7-1-6.56a33 33 0 0 1 58.81 20.61z"
        opacity=".1"
      />
      <path
        d="M603.64 309.08c-.44 1-1.05 2.36-.16 3a1.7 1.7 0 0 0 1.33.15c2.82-.61 4.31-3.63 5.5-6.26s3-5.6 5.83-5.84c3.4-.28 6.95 3.42 9.74 1.49.86-.59 1.39-1.63 2.34-2.06a3.9 3.9 0 0 1 2.17-.14 15.24 15.24 0 0 1 12.45 13.05c.14 1.36.42 3.15 1.78 3.36a5.64 5.64 0 0 0 1.52-.18c2.56-.29 4.13 2.66 4.94 5.1 1.12 3.34 2.25 6.86 1.6 10.32-.51 2.73-2.11 5.23-2.2 8-.07 2.29.89 4.46 1.84 6.55s2.49 4.52 4.76 4.23c1.86-.24 2.89-2.22 3.78-3.87s2.5-3.43 4.31-2.91c.81.24 1.65.92 2.38.51a1.72 1.72 0 0 0 .69-1.2c.88-3.85-.38-8.17 1.49-11.64 1.44-2.68 4.36-4.12 6.73-6a19.28 19.28 0 0 0 2.61-27.6c-2.54-3-6.19-5.6-6.39-9.49-.16-3 1.84-5.71 1.87-8.69s-1.84-5.48-4-7.45a25.6 25.6 0 0 0-22.99-6.04c-2.13.51-4.28 1.3-6.45 1-2.53-.31-4.63-2-6.91-3.15a17.65 17.65 0 0 0-22 6c-2.61 4-3.63 9.35-7.52 12.19-2.56 1.87-6.22 2.57-7.63 5.4-.85 1.7-.61 3.72-.35 5.6a13.07 13.07 0 0 0 4.18 8c2.32 2.42 4.36 4.96 2.76 8.57z"
        fill="#512e4e"
      />
      <path
        fill="#ffceb4"
        d="M571.72 726.69l-.27 53.65-9.91-.83-36.04-293.03 10.64-.32 7.52-.23 28.06 240.76z"
      />
      <path
        fill="#f8bda5"
        d="M571.45 780.34l-9.91-.83-36.04-293.03 10.64-.32-.46 1.69 35.77 292.49z"
      />
      <path
        fill="#ffceb4"
        d="M619.88 487.03l-36.33 290.56-6.8 1.54-5.3 1.21.27-53.65 31.92-238.56.63-.05 15.61-1.05z"
      />
      <path
        fill="#f8bda5"
        d="M576.68 778.97l.07.16-5.3 1.21.27-53.65 31.92-238.56.63-.05 6.52 1.42-34.11 289.47zM702.97 665.88l-.83 19.05-2.2 50.84-34.11-249.02 7.79-.85 2.39-.25 26.96 180.23z"
      />
      <path
        fill="#ffceb4"
        d="M702.97 665.88l-.83 19.05-28.06-196.8-.46-2.23 2.39-.25 26.96 180.23z"
      />
      <path
        fill="#f8bda5"
        d="M712.33 576.45l.82 121.34-4.6-.17-9.71-.38 3.86-212.41 7.4.92 3.6.45-1.37 90.25z"
      />
      <path
        fill="#ffceb4"
        d="M712.33 576.45l.82 121.34-4.6-.17 1.55-211.87 3.6.45-1.37 90.25z"
      />
      <path
        fill="#f8bda5"
        d="M397.28 484l.55-8.25 47.32.27 142.26-2.2 109.78 6.05 69.89 1.38.83 7.7-179.68 3.31L397.28 484z"
      />
      <path
        fill="#ffceb4"
        d="M397.83 475.75l140.32 6.05 228.93-.55-171.14-10.46-198.11 4.96z"
      />
      <path
        d="M360.4 300.75l-.07.18a156.68 156.68 0 0 0-9.3 25.59l-.3 1.17a42.15 42.15 0 0 1-11.79 1.68c-10.62 0-15.41-11.14-22.84-17.61-2.92-2.53-10.42 1.77-12.55-1.47a5.21 5.21 0 0 1-.36-.55c.12-.18.25-.37.36-.55 6.58-10.26 11.18-18.9 11.18-18.9s69.34-41.82 45.67 10.46z"
        opacity=".1"
      />
      <path
        d="M381.32 285.89a42.37 42.37 0 1 1-4.41-18.82 42.41 42.41 0 0 1 4.41 18.82z"
        fill="#ffccd0"
      />
      <path
        d="M356 361.83s-100.7-16.5-84.2-19.26c2.66-.44 5.56-2.09 8.58-4.54a7.16 7.16 0 0 1 1.33 2.34l18.71-2.2s23.85-5.14 33.38.74a75.12 75.12 0 0 0 14.87 6.77c.67 13.12 7.33 16.15 7.33 16.15zM422.2 528.37a5.64 5.64 0 0 1-1.81.94c-4.77 1.47-10.65 23.48-10.65 23.48s-61.12 58.68-83.85 56.42a10 10 0 0 1-1.26-4.69c-.73-15 88.05-81.45 88.05-81.45s4.34 2.26 9.52 5.3z"
        opacity=".1"
      />
      <path
        d="M583.04 466.62c0 5.57-9.74 11.14-21.76 11.14s-21.72-5.57-21.72-11.14 9.74-9 21.75-9 21.73 3.43 21.73 9z"
        fill="#e8eaf2"
      />
      <path
        d="M583.04 466.62c0 5.57-9.74 11.14-21.76 11.14s-21.72-5.57-21.72-11.14 9.74-9 21.75-9 21.73 3.43 21.73 9z"
        opacity=".1"
      />
      <ellipse
        cx="561.29"
        cy="466.62"
        rx="21.75"
        ry="10.08"
        fill="#e8eaf2"
      />
      <ellipse
        cx="561.35"
        cy="467"
        rx="12.98"
        ry="5.23"
        opacity=".05"
      />
      <path
        d="M591.4 454.86c-.44-2.74-4.05-4.54-8.68-4.64a19.45 19.45 0 0 0-3.67.26c-6.26 1-10.89 4.6-10.34 8 .43 2.7 4 4.5 8.53 4.63a20 20 0 0 0 3.81-.25c6.27-.98 10.9-4.58 10.35-8zm-10.63 6.27a13.74 13.74 0 0 1-2 .18c-3.62.1-6.53-1.23-6.87-3.32-.39-2.46 2.93-5 7.42-5.76a14.28 14.28 0 0 1 3.23-.16c3 .21 5.32 1.46 5.61 3.3.4 2.46-2.9 5.04-7.39 5.76zM571.74 466.11a2.31 2.31 0 0 1-.53 1.43c-1.36 1.79-5.18 3.08-9.69 3.08-4.2 0-7.81-1.11-9.39-2.71a2.59 2.59 0 0 1-.84-1.8c0-2.5 4.58-4.52 10.23-4.52s10.22 2.02 10.22 4.52z"
        fill="#f1cec8"
      />
      <path
        d="M571.74 466.11a2.31 2.31 0 0 1-.53 1.43 19.63 19.63 0 0 1-8.7 2h-2.45a19.78 19.78 0 0 1-7.93-1.65 2.59 2.59 0 0 1-.84-1.8c0-2.5 4.58-4.52 10.23-4.52s10.22 2.04 10.22 4.54zM582.72 450.22c0 .62-.07 1.24-.15 1.85a14.28 14.28 0 0 0-3.23.16c-4.49.73-7.81 3.3-7.42 5.76.34 2.09 3.25 3.42 6.87 3.32a20.81 20.81 0 0 1-1.55 1.83c-4.56-.13-8.1-1.93-8.53-4.63-.55-3.43 4.08-7 10.34-8a19.45 19.45 0 0 1 3.67-.29z"
        opacity=".1"
      />
      <path
        d="M540.3 446.65v2.82a19.76 19.76 0 0 0 19.76 19.76h2.5a19.76 19.76 0 0 0 19.71-19.76v-2.82z"
        fill="#f1cec8"
      />
      <ellipse
        cx="561.19"
        cy="446.03"
        rx="21.09"
        ry="6"
        fill="#f6e2df"
      />
      <ellipse
        cx="561.29"
        cy="445.65"
        rx="19.99"
        ry="5.42"
        opacity=".1"
      />
      <ellipse
        cx="561.35"
        cy="445.45"
        rx="19.53"
        ry="5.42"
        fill="#fdf9f9"
      />
      <path
        d="M547.07 446.89a.55.55 0 1 1 .55-.54.55.55 0 0 1-.55.54zm0-.89a.35.35 0 0 0-.35.35.35.35 0 1 0 .7 0 .35.35 0 0 0-.35-.35zM547.71 445.74a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 .34.35.35.35 0 0 0-.34-.35zM547.07 443.99a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM551.11 448.07a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.34.34 0 0 0-.35.35.35.35 0 1 0 .69 0 .34.34 0 0 0-.34-.35zM567.3 446.99a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1zm0-.9a.35.35 0 1 0 0 .7.35.35 0 1 0 0-.7zM570.9 448.41a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 0 0-.35.35.35.35 0 0 0 .7 0 .35.35 0 0 0-.35-.39zM571.02 446.09a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM572.72 442.39a.55.55 0 1 1 .55-.55.54.54 0 0 1-.55.55zm0-.9a.35.35 0 0 0-.34.35.35.35 0 1 0 .69 0 .35.35 0 0 0-.35-.37zM571.89 447.47a.55.55 0 1 1 .55-.54.55.55 0 0 1-.55.54zm0-.89a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.38zM573.89 446.35a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 .34.35.35.35 0 0 0-.34-.33zM573.69 447.64a.55.55 0 1 1 .54-.55.54.54 0 0 1-.54.55zm0-.89a.35.35 0 1 0 0 .69.35.35 0 1 0 0-.69zM573.07 444.34a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.32zM576.07 443.64a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM567.3 442.32a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1zm0-.9a.35.35 0 1 0 0 .7.35.35 0 1 0 0-.7zM565.22 441.47a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.89a.35.35 0 1 0 .35.34.35.35 0 0 0-.35-.39zM560.64 441.77a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 .34.35.35.35 0 0 0-.34-.35zM564.56 447.17a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 0 .7.35.35 0 0 0 0-.7zM549.69 447.72a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM552 446.47a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.38zM553.97 447.09a.55.55 0 1 1 .55-.54.55.55 0 0 1-.55.54zm0-.89a.35.35 0 0 0-.35.35.35.35 0 0 0 .7 0 .35.35 0 0 0-.35-.35zM554.32 445.72a.55.55 0 1 1 .55-.54.55.55 0 0 1-.55.54zm0-.89a.35.35 0 0 0-.35.35.35.35 0 1 0 .7 0 .35.35 0 0 0-.35-.35zM554.33 444.47a.55.55 0 1 1 .55-.54.55.55 0 0 1-.55.54zm0-.89a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.32zM554.88 448.85a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM560.35 448.98a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 .34.35.35.35 0 0 0-.34-.35zM559.66 447.64a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.89a.35.35 0 1 0 .35.34.35.35 0 0 0-.35-.34zM556.91 446.99a.55.55 0 1 1 .54-.55.55.55 0 0 1-.54.55zm0-.9a.35.35 0 1 0 0 .7.35.35 0 1 0 0-.7zM562.78 444.83a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM560.29 446.35a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.33zM563.19 443.25a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM562.98 441.76a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM561.83 443.29a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM559.01 445.87a.55.55 0 1 1 .55-.54.54.54 0 0 1-.55.54zm0-.89a.35.35 0 1 0 0 .69.35.35 0 1 0 0-.69zM556.91 445.47a.55.55 0 1 1 .54-.55.54.54 0 0 1-.54.55zm0-.89a.35.35 0 1 0 0 .69.35.35 0 1 0 0-.69zM559.66 442.9a.55.55 0 1 1 .55-.55.55.55 0 0 1-.55.55zm0-.9a.35.35 0 1 0 .35.35.35.35 0 0 0-.35-.35zM555.62 443.47a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM556.68 444.14a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0 0 .44.22.22 0 1 0 0-.44zM561.88 441.34a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 .22.22.22.22 0 0 0-.22-.22zM562.64 447.19a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0 0 .44.22.22 0 1 0 0-.44zM563.56 447.6a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.22zM562.44 446.22a.35.35 0 0 1-.35-.35.35.35 0 1 1 .7 0 .35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.22zM569.27 442.97a.35.35 0 1 1 .35-.34.35.35 0 0 1-.35.34zm0-.57a.22.22 0 0 0-.22.23.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.23zM569.7 443.86a.35.35 0 1 1 .34-.35.35.35 0 0 1-.34.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM569.35 444.69a.35.35 0 0 1-.35-.35.34.34 0 0 1 .35-.35.35.35 0 0 1 .35.35.35.35 0 0 1-.35.35zm0-.57a.21.21 0 0 0-.22.22.22.22 0 0 0 .22.22.22.22 0 0 0 .22-.22.22.22 0 0 0-.22-.22zM568.44 447.24a.35.35 0 1 1 .35-.34.35.35 0 0 1-.35.34zm0-.57a.22.22 0 0 0-.22.23.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.23zM573.97 444.85a.35.35 0 0 1-.35-.35.35.35 0 1 1 .7 0 .35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.22zM565.77 446.97a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 .22.22.22.22 0 0 0-.22-.22zM568.66 445.54a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0 0 .44.22.22 0 1 0 0-.44zM567.5 447.95a.35.35 0 0 1-.35-.35.35.35 0 1 1 .7 0 .35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.22zM575.12 445.53a.35.35 0 0 1-.35-.35.35.35 0 1 1 .69 0 .35.35 0 0 1-.34.35zm0-.58a.23.23 0 1 0 0 .45.22.22 0 0 0 .22-.22.22.22 0 0 0-.22-.23zM570.68 441.77a.35.35 0 1 1 .34-.35.35.35 0 0 1-.34.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM558.88 441.34a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 .22.22.22.22 0 0 0-.22-.22zM548.94 444.28a.35.35 0 0 1-.35-.35.35.35 0 1 1 .7 0 .35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 0 0 .44 0 .22.22 0 0 0-.22-.22zM557.61 441.77a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM549.85 445.89a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM551.11 443.79a.35.35 0 1 1 .34-.35.35.35 0 0 1-.34.35zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM544.79 445.23a.35.35 0 1 1 .35-.35.35.35 0 0 1-.35.35zm0-.57a.22.22 0 0 0-.22.22.22.22 0 1 0 .44 0 .22.22 0 0 0-.22-.22zM553.62 448.3a.35.35 0 0 1 0-.7.35.35 0 1 1 0 .7zm0-.57a.22.22 0 1 0 0 .44.22.22 0 1 0 0-.44zM556.14 448.47a.35.35 0 1 1 0-.7.35.35 0 0 1 0 .7zm0-.57a.22.22 0 1 0 0 .44.22.22 0 0 0 0-.44z"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="545.89"
        cy="446.25"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="547.9"
        cy="442.39"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="550.67"
        cy="444.14"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="548.87"
        cy="441.64"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="558.99"
        cy="443.51"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="550.24"
        cy="443.09"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="549.22"
        cy="442.97"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="551.22"
        cy="445.05"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="566.42"
        cy="443.44"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="570.48"
        cy="444.23"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="569.35"
        cy="447.72"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="570.9"
        cy="446.55"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="566.34"
        cy="447.99"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="565.32"
        cy="443.41"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="561.94"
        cy="447.38"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="568.05"
        cy="444.34"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="565.08"
        cy="448.26"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="552.83"
        cy="447.72"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="569.7"
        cy="445.25"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="576.07"
        cy="444.78"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="574.24"
        cy="443.17"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="567.85"
        cy="442.74"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="555.62"
        cy="445.25"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="572.44"
        cy="444.68"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="566.54"
        cy="442.43"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="571.57"
        cy="443.38"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="568.53"
        cy="441.34"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="566.34"
        cy="440.99"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="556.34"
        cy="441.97"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="558.54"
        cy="442.23"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="552.98"
        cy="444.23"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="564.18"
        cy="444.34"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="565.47"
        cy="444.64"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="558.09"
        cy="444.99"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="561.35"
        cy="445.34"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="557.84"
        cy="442.85"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="565.22"
        cy="445.34"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="564.11"
        cy="445.54"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="547.07"
        cy="442.43"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="553.82"
        cy="443.17"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="551.49"
        cy="441.64"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="550.56"
        cy="445.32"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="551.66"
        cy="442.87"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="545.25"
        cy="443.71"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="573.01"
        cy="442.87"
        r=".2"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="575.31"
        cy="442.54"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="577.24"
        cy="445.45"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="575.8"
        cy="443.99"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="576.42"
        cy="445.89"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="577.24"
        cy="444.41"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="575.03"
        cy="444.14"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="578.11"
        cy="444.14"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="552.35"
        cy="443.57"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="556.23"
        cy="440.91"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="560.99"
        cy="446.67"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="555"
        cy="440.87"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="553.33"
        cy="441.1"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="560.68"
        cy="442.62"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="545.98"
        cy="444.5"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="548.4"
        cy="446.97"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="557.62"
        cy="448.18"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="555.51"
        cy="446.97"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <circle
        cx="561.88"
        cy="448.45"
        r=".27"
        fill="#42312e"
        opacity=".3"
      />
      <path
        d="M554.56 441.73s-10.93.53-5.78 4 19.93 1.53 19.93 1.53 8.17-2.06 2.92-4.49-13.19-.89-13.19-.89-9.06 1.66-2.09 3.12c0 0 8.4.76 8.77-.93s-4.72-.5-4.72-.5 2.69.6.83.9-4-.2-4-.73 2.76-.93 3.56-.9 5-.66 6.56 1.2a.69.69 0 0 1-.25 1.09c-1.48.63-5.31 1.82-11.43.88-8.03-1.23-1.11-4.28-1.11-4.28z"
        opacity=".1"
      />
      <path
        d="M300.42 339.27s23.85-5.13 33.39.74a78.51 78.51 0 0 0 20.54 8.46s17.61 4.41 23.48 10.64 11.37 2.2 13.94 10.28 10.27 15.77 10.27 15.77l-3.67 54.66 2.94 31.56s1.47 13.2-2.2 16.14.73 7.7 4 10.27 11.74 12.47 10.64 16.14 8.81 7.71 8.81 7.71.36 6.23-4.4 7.7-10.6 23.45-10.6 23.45-64.22 61.68-85.49 56.13-37.06-25.31-37.06-25.31-14.31-64.2-18.34-74.48-14.68-44-14.68-44-5.87-38.89-8.8-46.59-2.94-48.06 5.87-56.5 16.5-13.23 16.5-16.16 8.44-8.81 11.74-8.44 4.4 4 4.4 4z"
        fill="#ff748e"
      />
      <path
        d="M564.2 462.54c-10.28 18-49.16 14.31-49.16 14.31s-13.57-2.94-22 1.84-48.07 9.9-48.07 9.9-15-3.3-18.71-8.08c-3.19-4.15-33.6-22.19-41.45-26.8l-1.56-.92a2.08 2.08 0 0 1-.25-.15l.06-.07 32.59-41 5.33 5.7 26.21 28s25.69 1.1 33 5.51 30.46-1.47 30.46-1.47 11.37 0 12.1-2.56 51.72-2.18 41.45 15.79z"
        fill="#ffccd0"
      />
      <path
        d="M376.91 267.07a9.48 9.48 0 0 0-5 3.18c-1.93 2.62-1.68 6.2-2.42 9.37-1.22 5.18-5.27 9.86-4.5 15.12.28 1.85 1.09 3.92 0 5.43-1 1.35-3.06 1.35-4.63.76h-.12c-4.07-1.64-6.3-5.87-9.19-9.17s-8.11-5.74-11.46-2.92c-2.81 2.37-2.31 6.72-2.05 10.4s-.76 8.38-4.38 9c-1.45.27-3-.26-4.41.07-4.55 1.06-4.19 8.92-8.62 10.36-1.55.49-3.24 0-4.83-.39a16 16 0 0 0-4.1-.36c-4.66.09-9.53 1.5-13.67.32 2.15-3 4.19-6.09 6.05-9a42.37 42.37 0 1 1 73.36-42.12z"
        opacity=".1"
      />
      <path
        d="M315.27 317.15c1.6.38 3.27.88 4.83.38 4.44-1.43 4.08-9.3 8.61-10.35 1.44-.34 3 .19 4.42-.06 3.62-.65 4.65-5.36 4.38-9s-.76-8 2.05-10.39c3.35-2.82 8.57-.36 11.46 2.92s5.12 7.54 9.18 9.17c1.6.65 3.73.67 4.76-.72s.29-3.57 0-5.42c-.77-5.27 3.28-9.94 4.5-15.13.74-3.17.49-6.74 2.42-9.36 4.08-5.52 14.57-2.73 18-8.68a9.4 9.4 0 0 0 4.54-.58c1.38-.69 2.41-2.34 1.85-3.78-.43-1.11-1.6-1.71-2.59-2.38a11.76 11.76 0 0 1-5.1-10.08c.08-1.9.63-3.78.51-5.67a8.33 8.33 0 0 0-8.37-7.51c-1.25.05-2.47.4-3.72.43-5.95.18-10.93-6.52-16.72-5.17-1.24.29-2.42.95-3.69.95-2.92 0-4.73-3.35-7.52-4.23-2.22-.7-4.63.28-6.94 0s-4.12-1.57-6.07-2.64c-4.19-2.28-9.78-3.28-13.44-.24a12 12 0 0 1-2.61 2.09 7.49 7.49 0 0 1-3.8.23 35.32 35.32 0 0 0-11.32.76 4.25 4.25 0 0 0-2.59 1.35 7.29 7.29 0 0 0-.82 2.63c-1.12 4.33-6.47 5.8-10.92 6.17a6.12 6.12 0 0 0-3.3.89c-1.61 1.21-1.56 3.68-.85 5.56s1.92 3.62 2.18 5.62c.65 5-4.77 8.83-5.68 13.82-1.24 6.89 6.4 13.66 3.8 20.17-1.15 2.89-4.22 5.12-4.08 8.22s3.15 4.9 5 7.27 2.5 5.15 3.2 7.94c1.13 4.5 1.28 13.18 6.53 14.76 5.42 1.61 12.07-1.31 17.91.06z"
        fill="#ffedba"
      />
      <path
        d="M316.93 464.74c6.24 8.07 28.25 27.15 42.92 31.92s-42.92-31.92-42.92-31.92zM320.23 505.1c2.57 1.83 14.31 23.84 26.78 25.68s-26.78-25.68-26.78-25.68zM323.17 486.02c.73 1.1 29.71 26.41 40.35 28.62s1.47-8.81-11.74-13.95-28.61-14.67-28.61-14.67zM323.17 539.95s19.44 7 32.65 5.14-32.65-5.14-32.65-5.14zM345.91 582.14s19.08-13.94 28.65-14.67-28.65 14.67-28.65 14.67zM260.06 357.25s46.23 5.13 33.39 7.34-33.39-7.34-33.39-7.34zM259.7 381.1s22 0 30.08-3.67-30.08 3.67-30.08 3.67zM252.73 427.32c4-1.1 20.91-36.32 27.51-26.78s-27.51 26.78-27.51 26.78zM319.5 418.15s5.87 5.5 24.21 10.64-24.21-10.64-24.21-10.64zM428.09 543.25s10.27 5.5 2.57 17.24-2.57-17.24-2.57-17.24z"
        opacity=".1"
      />
      <path
        d="M320.56 590.21l-.13-1.56c.45-5.18.13 1.56.13 1.56z"
        fill="#e4aab4"
      />
      <path
        d="M327.56 620.66l-29.35-2.93-5.5-11-30.47-167.4-.71-3.93 46.58.37.43 5.32 11.92 147.56c-.06.75-.13 1.73-.23 3-.74 10.3 7.33 29.01 7.33 29.01z"
        fill="#e4aab4"
      />
      <path
        d="M893.05 375.39l-.82.58c-3.13 2.13-7.33-5.48-11-4.41-3.15.9-5.75 10.64-9.18 10.64a35.81 35.81 0 0 1-15.27-3.41c-.53-1.06-1-2.06-1.55-3-1.91-3.54-3.35-5.73-3.35-5.73s5.19-.86 11.74-1.78c3-.44 6.38-.88 9.62-1.27 1.7-.21 3.36-.38 4.93-.55 6.42-.63 11.47-.78 11.47.3s1 3.67 2.62 7c.22.53.51 1.08.79 1.63z"
        opacity=".1"
      />
      <path
        d="M907.96 344.04a36 36 0 1 1-36-35.95 35.91 35.91 0 0 1 36 35.95z"
        fill="#ffc1c7"
      />
      <path
        d="M901.35 412.74l-10.73 1.1s1.1-9.63 5.78-12.66c3.1-2 8.89-5.12 12.42-7a14 14 0 0 0 3.88 1.25c-16.49 10.6-11.35 17.31-11.35 17.31z"
        fill="#fff"
      />
      <path
        d="M781.02 459.24l-2.57-.37s-11.19.74-22.19 2-26.6 4.59-15.23 17.79 21.83-2.38 21.83-2.38 10.64 13.21 18.89 8.8-.73-25.84-.73-25.84zM735.71 669.64s7 16.87 6.42 21.64 23.3-4.58 23.3-4.58-5.51-12.84-2.57-15.59-27.15-1.47-27.15-1.47zM702.7 715.13h18.99v24.21H702.7z"
        fill="#ffc1c7"
      />
      <path
        d="M739.93 662.85c-1.89 3-3.25 8.15-4.21 13.44a134 134 0 0 0-2 18.84c0 3.68 1.82 2.94 0 8.81a85 85 0 0 0-3.58 14.07c0 .2-.07.4-.1.61-1.1 6.6-2.2 8.8-2.2 8.8s-27.88-1.83-33.74-5.87 2.2-8.07 2.2-8.07v-1c.59-11.21 6.31-119.28 8.75-130.76a14.63 14.63 0 0 1 3.57-6.64c3.37-3.77 8.37-6.6 12.58-8.48a59.79 59.79 0 0 1 7.69-2.85s1.46 8.47 3.37 20.48c4.37 27.45 10.99 73.24 7.67 78.62z"
        fill="#575988"
      />
      <path
        d="M732.29 584.28c-2.15 3.93-4.34 6.39-5.93 4.47-2.73-3.3-11.47-9.44-17.71-13.62 6.8-7.62 20.27-11.33 20.27-11.33s1.46 8.47 3.37 20.48z"
        fill="#ffc1c7"
      />
      <path
        d="M896.36 554.71c-.27 4.08-.76 9-1.61 15a45.94 45.94 0 0 1-25 34.86s-67.5 0-79.25-3.3c-5.93-1.68-11.12.32-14.79 2.69-.42.27-.81.54-1.19.82a25.73 25.73 0 0 0-4.55 4.19s-7.34-29.72-7.34-31.18 4-14.68 11.37-23.85 50.62-10.64 53.2-11c1.71-.24 17.47-7.11 27.88-11.71 5.27-2.32 9.17-4.06 9.17-4.06l17 5.4.63.19 13.58 4.32s1.76 4.05.9 17.63z"
        fill="#575988"
      />
      <path
        d="M881.91 532.7c-3.24 1.35-8.37 3.42-14.32 5.56-12.94 4.7-29.77 9.84-39.61 9-17.61-1.47-37.79 2.56-37.79 2.56a66.35 66.35 0 0 0-17.63 11.41c-9.17 8.07-1.1 10.63 2.94 20.18 1.65 3.91 1.27 13.06.24 22.5-.42.27-.81.54-1.19.82a25.73 25.73 0 0 0-4.55 4.19s-7.34-29.72-7.34-31.18 4-14.68 11.37-23.85 50.62-10.64 53.2-11c1.71-.24 17.47-7.11 27.88-11.71 5.27-2.32 9.17-4.06 9.17-4.06l17 5.4zM739.93 662.85c-1.89 3-3.25 8.15-4.21 13.44a9.23 9.23 0 0 1-2-1.33c-3.37-2.85-3.08-8.26-2.61-11.71.19-1.43.41-2.53.41-3 0-1.48 1.46-14.69-1.48-19.45s-3.66-23.48-3.66-23.48-4.66-26.84-5.13-50.71a59.79 59.79 0 0 1 7.69-2.85s1.46 8.47 3.37 20.48c4.32 27.44 10.94 73.23 7.62 78.61z"
        opacity=".1"
      />
      <path
        d="M884.48 531.14s-1.17.52-3.2 1.37c-3.2 1.33-8.54 3.5-14.79 5.75-12.94 4.7-29.78 9.84-39.61 9-17.61-1.47-37.79 2.56-37.79 2.56a66.35 66.35 0 0 0-17.61 11.38c-9.17 8.07-1.1 10.63 2.94 20.18 1.69 4 1.24 13.59.15 23.32-1.49 13.33-4.19 26.94-4.19 26.94s-1.1 3.67-.36 5.87.72 19.07.72 19.07a10 10 0 0 0-1.57 4.81 6.31 6.31 0 0 0 1.21 4c2.94 4 .74 14.68.74 14.68s-6.24 1.1-16.89-1.48-14.67.38-19.43-3.66c-3.37-2.85-3.08-8.26-2.61-11.71.19-1.43.41-2.53.41-3 0-1.48 1.46-14.69-1.48-19.45s-3.66-23.48-3.66-23.48-11.68-67.21.07-83.53a9.58 9.58 0 0 1 .66-.85c6.55-7.5 20.19-8.86 32.93-8.12a137.64 137.64 0 0 1 27.23 4.45c7.34 2.21 9.55 1.1 13.21-.37 2.61-1 2.82-6.15 2.71-9v-.81c0-.72-.1-1.18-.1-1.18l3.25-1.77 13.62-7.39z"
        fill="#575988"
      />
      <path
        d="M892.23 373.76a72.3 72.3 0 0 0 8.72 13.71 5.52 5.52 0 0 1-3.54.09c-1.2-.47-2.07-1.54-3.23-2.09-3-1.41-6.34.58-9.35-1.28-2.35-1.46-2.85-3.3-2.92-5.61v-1c0-3.21-.34-9.58-3.74-11.16a5.25 5.25 0 0 0-4.14.14 4.94 4.94 0 0 0-.79.41c-2.27 1.34-3.91 4.19-6.49 4a3.88 3.88 0 0 1-3.13-2.69 17.9 17.9 0 0 1-1.06-4.49c-.77-5.87-3-11.44-5.19-16.94-.42-1.05-1-2.26-2.18-2.36-1.82-.15-2.27 2.68-1.27 4.21s2.73 2.7 3 4.51c.42 3-4.07 4.75-6.52 3s-2.89-5.31-2.37-8.3 1.8-5.84 2-8.88-1.17-6.51-4.09-7.36c-2.55-.76-5.24.76-7.89.8a36 36 0 1 1 54.27 41.3z"
        opacity=".1"
      />
      <path
        d="M875.11 366.64c-2.72 1-4.42 4.63-7.31 4.36s-3.8-4.19-4.19-7.18c-.77-5.87-3-11.44-5.19-16.94-.42-1.05-1.05-2.26-2.18-2.36-1.82-.15-2.27 2.68-1.27 4.21s2.74 2.7 3 4.51c.43 3-4.06 4.75-6.51 3s-2.9-5.31-2.38-8.3 1.79-5.85 2-8.88-1.18-6.51-4.09-7.37-6 1.23-9 .73a5.57 5.57 0 0 1-3.85-7.66c1.29-2.5 4.61-4.5 3.75-7.17-1.08-3.33-6.76-1.87-9-4.59-1.75-2.13-.15-5.48 2.13-7s5.13-2.16 7.31-3.86c4.1-3.19 4.8-9.34 8.68-12.81 4.41-4 11.21-3.13 16.75-5.19 5.32-2 10.1-6.77 15.68-5.77 1.35.24 2.62.81 4 .94 2.83.26 5.41-1.44 8-2.51a19.05 19.05 0 0 1 15.72.73c-.52 3.58 3.2 6.75 6.81 6.61 2.61-.09 6.17-1 7.08 1.48.43 1.13-.11 2.45.29 3.6.68 2 3.46 2.14 5.26 3.28 4.1 2.6 2.19 9.67 5.74 13 1.56 1.45 3.81 1.8 5.75 2.67 6.41 2.84 8.73 10.59 10.32 17.42a8.55 8.55 0 0 1 .27 4.07c-.53 2-2.4 3.29-3.44 5.06-2.48 4.22.17 9.8-1.41 14.43s-6.79 7.26-7.51 12c-.25 1.6.08 3.25-.18 4.85-.7 4.34-5.27 6.84-9.48 8.12-1.18.35-2.52.78-3.05 1.9-.23.5-.27 1.07-.46 1.59-.47 1.23-1.76 1.91-3 2.47q-8.22 3.88-16.76 7.07c-1.58.59-3.35 1.17-4.93.56-1.2-.47-2.06-1.55-3.23-2.09-3-1.42-6.34.58-9.34-1.28-2.68-1.66-3-3.81-3-6.58.08-4.29-.47-13.94-7.78-11.12z"
        fill="#b97482"
      />
      <path
        d="M730.12 718.01c0 .2-.07.4-.1.61-1.1 6.6-2.2 8.8-2.2 8.8s-27.88-1.83-33.74-5.87 2.2-8.07 2.2-8.07v-1c9.65 2.47 26.28 6.12 33.84 5.53z"
        fill="#575988"
      />
      <path
        d="M730.12 718.01c0 .2-.07.4-.1.61-1.1 6.6-2.2 8.8-2.2 8.8s-27.88-1.83-33.74-5.87 2.2-8.07 2.2-8.07v-1c9.65 2.47 26.28 6.12 33.84 5.53z"
        opacity=".1"
      />
      <path
        d="M725.81 724.67s-32.29 2.2-33.57 1.65-1.29 17.06-1.29 17.06-7.15 14.31-8.07 17.79-8.07 12.11-8.07 12.11-10.25 7.52 4.75 10.45 31.55-.91 31.55-.91 11-19.08 11.92-18 0 10.09 0 10.09l6.42-1.65s-1.1-11.92 1.47-18.34-5.11-30.25-5.11-30.25z"
        fill="#d3878a"
      />
      <path
        d="M771.12 679s-6.24 1.1-16.89-1.48-14.67.38-19.43-3.66c-3.37-2.85-3.08-8.26-2.61-11.71 4.66-1 11.88-2.53 17.47-3.34s13.63.26 19.51 1.51a6.27 6.27 0 0 0 1.21 4c2.94 4.03.74 14.68.74 14.68z"
        opacity=".1"
      />
      <path
        d="M771.12 680.1s-6.24 1.1-16.89-1.48-14.67.38-19.43-3.66c-3.37-2.85-3.08-8.26-2.61-11.71 4.66-1 11.88-2.53 17.47-3.34s13.63.26 19.51 1.51a6.31 6.31 0 0 0 1.21 4c2.94 4.05.74 14.68.74 14.68z"
        fill="#575988"
      />
      <path
        d="M771.12 680.1s-6.24 1.1-16.89-1.48-14.67.38-19.43-3.66c-3.37-2.85-3.08-8.26-2.61-11.71 4.66-1 11.88-2.53 17.47-3.34s13.63.26 19.51 1.51a6.31 6.31 0 0 0 1.21 4c2.94 4.05.74 14.68.74 14.68z"
        opacity=".1"
      />
      <path
        d="M786.89 732.19l-10.82 2.75-3.12-12.84s-2.72 5.16-7.53 12.31c-.64.94-1.3 1.92-2 2.92-5.52 7.87-24.08 5.95-30.45 1.36a6.66 6.66 0 0 1-1.46-1.36c-4.23-5.5 2.2-10.83 5.31-13.76s1.47-22.38 1.47-22.38-1.47-8.62-.37-12.66 28.81-5.5 28.81-5.5 5.67 14.85 8.8 19.44 7 10.27 6.23 14.31 5.13 15.41 5.13 15.41z"
        fill="#d3878a"
      />
      <path
        d="M772.56 541.6c-4.73 6-35.51 1.47-45-7.77a9.58 9.58 0 0 1 .66-.85c6.55-7.5 20.19-8.86 32.93-8.12 5.83 4.19 15.17 11.96 11.41 16.74z"
        fill="#ffc1c7"
      />
      <path
        d="M742.87 546s-5.31-7.53-10.09-3.85-6.24-6.42-6.24-6.42 2.57-1.83 8.07.92 11.74 7.52 11 8.44-2.74.91-2.74.91z"
        opacity=".1"
      />
      <path
        d="M742.87 544.9s-5.32-7.52-10.09-3.85-6.24-6.42-6.24-6.42 2.57-1.83 8.07.92 11.74 7.52 11 8.44-2.74.91-2.74.91z"
        fill="#575988"
      />
      <path
        d="M842.29 546s27.15 12.47 21.09 17.47S842.29 546 842.29 546zM732.78 631.85s17.24 2 21.09 4.59a19.47 19.47 0 0 0 9.91 3.48c2.2 0-23.3-14.31-31-8.07zM753.5 621.76s-6.6 4.59.92 6.42-.92-6.42-.92-6.42zM716.63 682.85s9.73 12.1 13.21 8.8-13.21-8.8-13.21-8.8zM710.4 706.69c.73 0 3.12-.36 7.89 2.94s5.13-2.57 3.3-5-11.19 2.06-11.19 2.06zM699.39 436.4c1.65.55 11.28 3 13.21 8.81s-13.21-8.81-13.21-8.81zM308.56 441.08l-.79-.19s-28.1-6.31-45.51-1.57l-.71-3.93 46.58.37z"
        opacity=".1"
      />
      <path
        d="M283.56 428.79s70.44.37 95 48.79 30.09 140.89 30.09 140.89 4 13.21-1.84 13.57-8.44-12.1-8.44-12.1 2.21-9.17.37-13.21-24.18-116.26-24.18-116.26-2.57-35.22-66.77-50.63c0 0-75.21-16.87-55.77 25.32 0 0 1.1 5.87-2.93 4.77s-8.81-12.11-5.5-26 39.97-15.14 39.97-15.14z"
        fill="#e4aab4"
      />
      <path
        d="M420.95 417.25l-.2.17c-5 4-23.49 35.42-35.95 36.29a4.51 4.51 0 0 1-.73 0s-.29-.35-.83-.95a.93.93 0 0 0-.19-.22l32.59-41z"
        opacity=".1"
      />
      <path
        d="M384.43 378.16l16.51 7s8.07 8.07 7.71 15.41 4 1.83 4 1.83 2.94 1.1 2.94 4 8.07 5.87 2.93 9.9-24.21 36.69-36.68 36.32a251.39 251.39 0 0 0-23.85-23.84c-12.81-11-24.55-67.5 26.44-50.62z"
        opacity=".1"
      />
      <path
        d="M385.56 378.16l16.51 7s8.07 8.07 7.71 15.41 4 1.83 4 1.83 2.94 1.1 2.94 4 8.07 5.87 2.93 9.9-24.21 36.69-36.68 36.32a251.39 251.39 0 0 0-23.85-23.84c-12.84-11-24.56-67.5 26.44-50.62z"
        fill="#ff748e"
      />
      <path
        d="M844.12 439.06l-17.06 30.41-11.81 6.09c-.29-3.2-.48-5.36-.48-5.36s-7.71-18 12.11-31.55c17.37-11.91 8.22-21.56 5.71-23.74l.53-.47 4-.55zM958.02 425.64c-2.7 6-25.85 22.23-25.85 22.23a1.09 1.09 0 0 1 0 .12l-1.09-1.22 22-25.32 4 2.57zM896.36 554.71a56.11 56.11 0 0 1-9.68.28 144 144 0 0 0-20.19-16.73c-3.46-2.39-7.27-4.81-11.36-7.09-14.49-8-32.5-14.31-50.86-11.25-.41.06-.83.14-1.23.22 0 0 .45-.37 1.2-1s1.9-1.69 3.15-2.95l13.62-7.39 63.47 22.37s-1.17.52-3.2 1.37l14.21 4.51s1.73 4.08.87 17.66z"
        opacity=".1"
      />
      <path
        d="M876.04 407.88s49.16 4.77 71.54 2.2c0 0 11 8.44 9.54 13.94s-26 22.74-26 22.74-1.83 42.93-11.74 53.2-18.76 36.69-14.36 45.51-17.24 7.34-17.24 7.34-41.09-42.92-83.65-34.85c0 0 15.41-12.48 14.31-21.65s-2.57-26.05-2.57-26.05-7.7-18 12.11-31.55 5.14-24.24 5.14-24.24-.74-3.3 7.7-4.4a86.81 86.81 0 0 0 12.11-2.2s8.07-7.34 11.74-5.87 11.37 5.88 11.37 5.88z"
        fill="#00c7fa"
      />
      <path
        d="M932.17 441.47s5.87 11.55-.55 17.6a77.06 77.06 0 0 0-6.89 8.35 250.28 250.28 0 0 0-29.57 51.4c-13.55 31.58-36.91 85.26-40.4 88.1-5 4-5.32 12.29-.37 12.48s7.89-6.61 7.89-6.61 4.95-14.12 8.07-19.81 35.59-80.16 35.59-80.16 12.11-31.92 25.68-39.25c0 0 11.74-19.45 9.72-28.07s-9.17-4.03-9.17-4.03z"
        opacity=".1"
      />
      <path
        d="M932.17 440.34s5.87 11.56-.55 17.61a77.06 77.06 0 0 0-6.89 8.35 250.28 250.28 0 0 0-29.57 51.4c-13.55 31.58-36.91 85.26-40.4 88.1-5 4-5.32 12.29-.37 12.48s7.89-6.61 7.89-6.61 4.95-14.12 8.07-19.81 35.59-80.16 35.59-80.16 12.11-31.92 25.68-39.25c0 0 11.74-19.45 9.72-28.07s-9.17-4.04-9.17-4.04z"
        fill="#e4aab4"
      />
      <path
        d="M982.12 479.05c1.17 6.6 1.11 13.57-1.71 19.63 0 0-15.59.73-31.18-21.1l-9.36-22.93s-10.45-17.79-16.69-16.87-11 32.1-25.86 29.16-7-40.35 12.65-44.21l7.58-1.93a18.29 18.29 0 0 1 15.91 3.37c3.64 2.87 8.56 6.68 14.49 11 4.86 3.58 9.47 7.08 13.35 10.08a55 55 0 0 1 20.82 33.8z"
        fill="#ffc1c7"
      />
      <path
        d="M819.63 477.4s7.43 9.08 19.54 11 19-1.92 29.17 2.21-48.71-13.21-48.71-13.21zM920.89 460.34s-22.84 19.53-22 24.76 22-24.76 22-24.76z"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M858.35 352.17a4.65 4.65 0 0 1-5.44.36c-2.14-1.56-2.75-4.44-2.52-7.14-.23.83-.44 1.66-.59 2.51-.52 3-.07 6.51 2.38 8.3s6.94 0 6.52-3a4 4 0 0 0-.35-1.03zM851.72 339.54a20 20 0 0 0 .79-4.19c.18-3-1.18-6.51-4.09-7.37s-6 1.24-9 .73a5.53 5.53 0 0 1-4.26-4.54 4.37 4.37 0 0 0-.32.55 5.56 5.56 0 0 0 3.84 7.66c3 .5 6.1-1.59 9-.73s4.27 4.34 4.09 7.37c0 .18-.03.35-.05.52zM838.44 317.26a3.7 3.7 0 0 0 .87-3.38c-1.08-3.33-6.77-1.87-9-4.58a3.44 3.44 0 0 1-.62-1.22c-1 1.59-1.25 3.49-.11 4.88 2.16 2.63 7.54 1.36 8.86 4.3zM928.13 370.33c-1.18.35-2.52.78-3.05 1.9-.24.5-.27 1.07-.47 1.59-.47 1.23-1.75 1.91-2.94 2.47-5.48 2.59-11.08 4.95-16.76 7.07-1.59.59-3.35 1.17-4.93.56-1.2-.47-2.07-1.55-3.23-2.09-3-1.41-6.34.58-9.34-1.28-2.69-1.66-3-3.8-3-6.57 0-4.2-.57-13.83-7.87-11-2.72 1-4.42 4.63-7.32 4.36s-3.79-4.19-4.18-7.18c-.77-5.87-3-11.44-5.19-16.94-.42-1.05-1.05-2.26-2.18-2.36-1.67-.14-2.18 2.24-1.48 3.81a1.4 1.4 0 0 1 .75-.14c1.12.1 1.75 1.31 2.17 2.36 2.21 5.5 4.43 11.07 5.19 16.94.39 3 1.19 6.9 4.19 7.18s4.6-3.32 7.31-4.36c7.31-2.82 7.87 6.81 7.88 11 0 2.77.27 4.92 3 6.58 3 1.86 6.33-.14 9.35 1.28 1.16.54 2 1.62 3.22 2.09 1.58.61 3.35 0 4.94-.56q8.52-3.18 16.75-7.07c1.19-.56 2.48-1.24 3-2.47.2-.52.23-1.09.47-1.59.52-1.12 1.86-1.55 3.05-1.9 4.2-1.28 8.78-3.78 9.47-8.12a9.7 9.7 0 0 0 .1-1.71c-1.6 3.14-5.38 5.08-8.9 6.15zM946.71 330.96a9.07 9.07 0 0 0-1.11 4.42 6.61 6.61 0 0 1 .38-.75c1-1.77 2.9-3.08 3.43-5.06a5.82 5.82 0 0 0 .08-2.24c-.79 1.27-2.01 2.33-2.78 3.63zM937.78 357.36a10.79 10.79 0 0 0-.09 1.61c1.63-3.54 5.57-6.1 6.87-9.91a10.69 10.69 0 0 0 .52-3.13c-1.75 4.19-6.6 6.91-7.3 11.43z" />
      </g>
      <path
        d="M777.35 712.75a109 109 0 0 0-11.74 9c-4.77 4.41-16.69 8.07-16.69 8.07zM718.65 759.15s-22.56 20.18-26.23 19.82 26.23-19.82 26.23-19.82zM765.42 734.41c-.64.94-1.3 1.92-2 2.92-5.52 7.87-24.08 5.95-30.45 1.36 5.68-1.92 23.22-7.33 32.45-4.28z"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M673.87 282.32a14.54 14.54 0 0 0 .59-2.29 14.54 14.54 0 0 0-.59 2.29zM604.2 306.7a8.9 8.9 0 0 1 .55-1.47c1.59-3.59-.45-6.15-2.82-8.56a13.15 13.15 0 0 1-4.18-8 21.78 21.78 0 0 1-.24-2.55 5.44 5.44 0 0 0-.51.8c-.85 1.7-.61 3.72-.35 5.6a13.07 13.07 0 0 0 4.18 8c1.81 1.84 3.42 3.77 3.37 6.18zM666.27 339.23c-1.81-.52-3.41 1.26-4.31 2.91s-1.92 3.63-3.78 3.87c-2.27.29-3.82-2.15-4.76-4.23s-1.86-4.31-1.86-6.55a7.34 7.34 0 0 1 .08-.82 14.8 14.8 0 0 0-1.18 4.67c-.07 2.29.89 4.46 1.84 6.55s2.49 4.52 4.76 4.23c1.86-.24 2.89-2.22 3.78-3.87s2.5-3.43 4.31-2.91c.81.24 1.65.92 2.38.51a1.72 1.72 0 0 0 .69-1.2 14.45 14.45 0 0 0 .33-2.62c-.7.32-1.5-.3-2.28-.54zM677.56 320.88c-2.37 1.9-5.29 3.34-6.73 6a9.48 9.48 0 0 0-1 3.72c1.46-2.59 4.32-4 6.65-5.88a19.55 19.55 0 0 0 6.94-11.77 19.5 19.5 0 0 1-5.86 7.93zM652.74 330.61a21.83 21.83 0 0 0 1-3.4c.65-3.45-.48-7-1.59-10.31-.82-2.44-2.39-5.4-5-5.1a5.64 5.64 0 0 1-1.52.18c-1.35-.22-1.64-2-1.78-3.36a15.24 15.24 0 0 0-12.44-13 3.93 3.93 0 0 0-2.18.14c-1 .43-1.48 1.46-2.34 2.06-2.79 1.93-6.34-1.77-9.74-1.49-2.88.24-4.64 3.2-5.83 5.83s-2.68 5.65-5.5 6.27a1.66 1.66 0 0 1-1.33-.16 1 1 0 0 1-.44-.82 6 6 0 0 1-.5 1.68c-.44 1-1.05 2.36-.16 3a1.7 1.7 0 0 0 1.33.15c2.82-.61 4.31-3.63 5.5-6.26s3-5.6 5.83-5.84c3.4-.28 6.95 3.42 9.74 1.49.86-.59 1.39-1.63 2.34-2.06a3.9 3.9 0 0 1 2.17-.14 15.24 15.24 0 0 1 12.54 13c.14 1.36.42 3.15 1.78 3.36a5.64 5.64 0 0 0 1.52-.18c2.56-.29 4.13 2.66 4.94 5.1 1.07 3.19 2.13 6.55 1.66 9.86z" />
      </g>
      <path
        d="M670.99 446.04s-14 4.26-20.36 4.26-31.07-.13-31.07-.13-64.66-21.6-45.26 8 50.07 13.07 50.07 13.07l5.49 1.23c3 .69 61.49.14 63.42-2.2s-22.29-24.23-22.29-24.23z"
        fill="#cf6f80"
      />
      <path
        d="M711.2 471.98c-8.81.81-26.12 1-26.12 1s-12.93-25.59-23.93-24.77c0 0 10.18-11.55 14.3-10.18.7.23 1.13-.27 1.33-1.26 10.79 3.29 31.33 11.34 33.34 25.48.54 3.8.88 7.01 1.08 9.73z"
        opacity=".1"
      />
      <path
        d="M712.3 471.98c-8.81.81-26.12 1-26.12 1s-12.93-25.59-23.93-24.77c0 0 10.18-11.55 14.3-10.18.7.23 1.13-.27 1.34-1.26 10.78 3.29 31.32 11.34 33.33 25.48.54 3.8.88 7.01 1.08 9.73z"
        fill="#575a89"
      />
      <path
        d="M712.3 471.98c-8.81.81-26.12 1-26.12 1s-12.93-25.59-23.93-24.77c0 0 10.18-11.55 14.3-10.18.7.23 1.13-.27 1.34-1.26 10.78 3.29 31.32 11.34 33.33 25.48.54 3.8.88 7.01 1.08 9.73zM635.01 545.64s24.76-6.06 28.61-2.76-28.61 2.76-28.61 2.76zM564.02 569.3s10.45 6 11.55 11-11.55-11-11.55-11z"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M388.1 240.91a11.37 11.37 0 0 0 .58 4v-1.26c.09-1.9.64-3.78.52-5.68a7.74 7.74 0 0 0-.54-2.29c-.01 1.79-.48 3.48-.56 5.23zM286.48 239.28c.49 1.28 1.2 2.49 1.68 3.77a5.62 5.62 0 0 0-.05-.91c-.24-1.91-1.37-3.59-2.08-5.39a7.21 7.21 0 0 0 .45 2.53zM396.35 256.12a2.74 2.74 0 0 0-.61-.92 3.74 3.74 0 0 1-1.8 1.94 9.48 9.48 0 0 1-4.53.59c-3.43 5.94-13.92 3.16-18 8.68-1.94 2.62-1.68 6.19-2.43 9.36-1.21 5.18-5.27 9.86-4.49 15.13.27 1.84 1.09 3.92 0 5.42s-3.15 1.36-4.75.72c-4.06-1.64-6.3-5.88-9.19-9.17s-8.1-5.75-11.45-2.93c-2.82 2.37-2.32 6.73-2 10.4s-.76 8.39-4.39 9c-1.45.26-3-.27-4.41.06-4.54 1.06-4.18 8.93-8.61 10.36-1.56.5-3.24 0-4.83-.38-5.84-1.38-12.5 1.55-17.9-.08-3-.91-4.34-4.14-5.15-7.58.76 4.31 1.89 9.18 5.7 10.33 5.4 1.63 12.06-1.29 17.9.08 1.59.38 3.27.88 4.83.38 4.43-1.43 4.07-9.3 8.61-10.36 1.44-.33 3 .2 4.41-.06 3.63-.64 4.66-5.36 4.39-9s-.77-8 2.05-10.4c3.35-2.81 8.56-.36 11.45 2.93s5.13 7.53 9.19 9.17c1.6.64 3.72.67 4.75-.72s.29-3.58 0-5.42c-.78-5.27 3.28-9.95 4.49-15.13.75-3.17.49-6.74 2.43-9.36 4.08-5.52 14.57-2.74 18-8.68a9.36 9.36 0 0 0 4.53-.59c1.33-.68 2.36-2.34 1.81-3.77zM290.36 299.56c-.7-2.79-1.44-5.66-3.21-7.93-1.38-1.78-3.43-3.29-4.42-5.21a5.3 5.3 0 0 0 0 .69c.13 3 3.15 4.9 5 7.27s2.49 5.09 3.18 7.86c-.19-.98-.35-1.89-.55-2.68zM286.75 272.53c-.29-3.71-2.71-7.51-3.85-11.34.34 3.83 2.72 7.62 3.85 11.34z" />
      </g>
      <path
        d="M479.27 615.25s30.77-.92 23.43 2.38-28.11 3-28.11 3zM605.84 680.83s14.31-2.2 18 .18-18-.18-18-.18z"
        opacity=".1"
      />
      <ellipse
        cx="1031.83"
        cy="694.45"
        rx="40.86"
        ry="5.61"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M1034.48 636.9s5.48 7.16-2.53 18-14.6 19.93-11.93 26.67c0 0 12.07-20.07 21.9-20.35s3.37-12.25-7.44-24.32z"
        fill="#00c7fa"
      />
      <path
        d="M1034.48 636.9a8.66 8.66 0 0 1 1.12 2.24c9.59 11.27 14.7 21.78 5.48 22.05-8.59.24-18.88 15.59-21.35 19.47a9.06 9.06 0 0 0 .29.88s12.07-20.07 21.9-20.35 3.37-12.22-7.44-24.29z"
        opacity=".1"
      />
      <path
        d="M1044.66 646.02c0 2.52-.28 4.57-.63 4.57s-.63-2-.63-4.57.35-1.33.7-1.33.56-1.22.56 1.33z"
        fill="#ffd037"
      />
      <path
        d="M1048.15 649.03c-2.21 1.21-4.14 1.94-4.31 1.63s1.5-1.53 3.71-2.74 1.34-.33 1.51 0 1.31-.09-.91 1.11z"
        fill="#ffd037"
      />
      <path
        d="M1005.56 636.9s-5.48 7.16 2.53 18 14.6 19.93 11.93 26.67c0 0-12.07-20.07-21.9-20.35s-3.37-12.25 7.44-24.32z"
        fill="#00c7fa"
      />
      <path
        d="M1005.56 636.9a9.06 9.06 0 0 0-1.12 2.24c-9.59 11.27-14.7 21.78-5.48 22.05 8.59.24 18.89 15.59 21.35 19.47a7 7 0 0 1-.29.88s-12.07-20.07-21.9-20.35-3.37-12.22 7.44-24.29z"
        opacity=".1"
      />
      <path
        d="M995.38 646.02c0 2.52.28 4.57.63 4.57s.64-2 .64-4.57-.36-1.33-.71-1.33-.56-1.22-.56 1.33z"
        fill="#ffd037"
      />
      <path
        d="M991.89 649.03c2.21 1.21 4.14 1.94 4.31 1.63s-1.49-1.53-3.71-2.74-1.34-.33-1.5 0-1.31-.09.9 1.11z"
        fill="#ffd037"
      />
      <path
        d="M997.13 680.61s15.3-.47 19.92-3.76 23.55-7.21 24.69-1.94 23 26.21 5.72 26.35-40.16-2.7-44.76-5.5-5.57-15.15-5.57-15.15z"
        fill="#a8a8a8"
      />
      <path
        d="M1047.77 699.47c-17.28.14-40.16-2.69-44.76-5.5-3.51-2.13-4.91-9.8-5.37-13.33h-.51s1 12.34 5.57 15.15 27.48 5.63 44.76 5.5c5 0 6.72-1.82 6.62-4.45-.69 1.56-2.6 2.55-6.31 2.63z"
        opacity=".2"
      />
      <path
        d="M698.4 475.86c0 2.81-8.83 6.12-19.72 6.12s-19.72-3.31-19.72-6.12 8.83-4.08 19.72-4.08 19.72 1.26 19.72 4.08z"
        fill="#e8eaf2"
      />
      <path
        d="M698.4 475.86c0 2.81-8.83 6.12-19.72 6.12s-19.72-3.31-19.72-6.12 8.83-4.08 19.72-4.08 19.72 1.26 19.72 4.08z"
        opacity=".1"
      />
      <ellipse
        cx="678.68"
        cy="475.86"
        rx="19.72"
        ry="5.1"
        fill="#e8eaf2"
      />
      <ellipse
        cx="678.68"
        cy="475.86"
        rx="11.15"
        ry="2.88"
        opacity=".1"
      />
      <path
        d="M694.83 469.75a8.68 8.68 0 0 1-7.12 4.51 11.13 11.13 0 0 1-3.44-.24l1.36-2a6.78 6.78 0 0 0 2.63 0 5.1 5.1 0 0 0 3.46-2.57c1.44-2.54-.36-2.91-1.62-2.89a6.89 6.89 0 0 0-.77 0l1.08-1.58s.44-.08 1.08-.13c2.07-.1 6.07.17 3.34 4.9zM686.13 476.71a24.77 24.77 0 0 1-15.23 0l.11-.76.08-.57 14.84-.19.12.91z"
        fill="#f1cec8"
      />
      <path
        d="M688.26 472.01a12.21 12.21 0 0 1-.55 2.25 11.13 11.13 0 0 1-3.44-.24l1.36-2a6.78 6.78 0 0 0 2.63-.01zM691.49 464.89a2.2 2.2 0 0 1-.42.57l-.11.11a8.74 8.74 0 0 0-.86 1 6.89 6.89 0 0 0-.77 0l1.08-1.58s.44-.05 1.08-.1zM686.05 476.1c-2.63 1-12.5 1.24-15-.15l.08-.57 14.84-.19z"
        opacity=".1"
      />
      <path
        d="M690.79 465.47l-.12.11a8.28 8.28 0 0 0-2.5 4.95c-.46 4.37-1.4 4.81-1.51 5-.76 1.32-14 1.84-16 0-1.64-1.52-3.24-4.83-2.5-6.7.39-1-.44-2.11-1.29-2.91-1.1-1-.7-2.52.88-3.21 3.75-1.66 10.41-1.74 10.41-1.74 5.68-.3 9.31.45 11.53 1.27l.28.12a2.44 2.44 0 0 1 1.3 1.27 1.69 1.69 0 0 1-.48 1.84z"
        fill="#f1cec8"
      />
      <ellipse
        cx="678.48"
        cy="465.04"
        rx="10.05"
        ry="1.63"
        opacity=".1"
      />
      <ellipse
        cx="678.48"
        cy="465.23"
        rx="10.05"
        ry="1.63"
        fill="#42312e"
      />
      <path
        d="M680.56 464.21s-7.23.16-7 1.92a23.31 23.31 0 0 1 7-1.92zM682.63 464.66s-4.31 0-3.62 1.47c0 0 1-.11.86-.49s2.76-.77 2.76-.77z"
        fill="#fff"
        opacity=".2"
      />
      <path
        d="M667.28 464.21s-.28 3 11 2.86 11.22-2.18 11.32-2.86h-.62s-.14 2.47-10.54 2.41-10.68-2.41-10.68-2.41z"
        fill="#f6e2df"
      />
      <path
        d="M691.27 463.71l-6.8 2.49a.87.87 0 0 1-.81-.11l-.11-.1c-.32-.27-.22-.66.2-.84l6.22-2.71a2.44 2.44 0 0 1 1.3 1.27z"
        opacity=".1"
      />
      <path
        d="M683.75 465l17.64-7.67a3.54 3.54 0 0 1 1.32-.29c.89 0 2.15.1 1.74 1.07a2.14 2.14 0 0 1-1.32 1.11l-18.66 6.83a.85.85 0 0 1-.81-.11l-.11-.1c-.32-.26-.22-.66.2-.84z"
        fill="#e8eaf2"
      />
      <path
        d="M683.75 465l17.64-7.67a3.54 3.54 0 0 1 1.32-.29c.89 0 2.15.1 1.74 1.07a2.14 2.14 0 0 1-1.32 1.11l-18.66 6.83a.85.85 0 0 1-.81-.11l-.11-.1c-.32-.26-.22-.66.2-.84z"
        opacity=".1"
      />
      <path
        d="M683.75 464.9l17.64-7.67a3.75 3.75 0 0 1 1.32-.29c.89 0 2.15.1 1.74 1.07a2.18 2.18 0 0 1-1.32 1.12l-18.66 6.83a.85.85 0 0 1-.81-.12l-.11-.09c-.32-.28-.22-.66.2-.85z"
        fill="#e8eaf2"
      />
      <path
        d="M682.77 465.12s1.88-.28 1.64.06.81.78.81.78a8.09 8.09 0 0 1-2.23.12c-.29-.2-.22-.96-.22-.96z"
        opacity=".1"
      />
      <path
        d="M682.63 465.17s1.88-.28 1.64.06.81.78.81.78a8.14 8.14 0 0 1-2.24.12c-.28-.2-.21-.96-.21-.96z"
        fill="#42312e"
      />
      <path
        d="M679.68 451.74a4.64 4.64 0 0 0-1.69 2.16 5 5 0 0 0 .11 2.23 9.27 9.27 0 0 0 .38 1.51c.1.28.38.6.58.4 0-.7-.22-1.39-.18-2.08a3.88 3.88 0 0 1 .92-2.07 10.14 10.14 0 0 0 1.29-1.8c.14-.3.69-3.05-.07-2.57-.15.1-.33 1-.47 1.23a4.87 4.87 0 0 1-.87.99zM679.97 456.27c.06.25.37.45.51.68a1.19 1.19 0 0 1 .13.48 2.54 2.54 0 0 1-.51 2.28 1.83 1.83 0 0 0 1.28-1.17 3.19 3.19 0 0 0 .17-.79 6.61 6.61 0 0 0 0-.77c0-.38.17-1.37-.51-1.56a.85.85 0 0 0-1.07.85z"
        fill="#f2dcdc"
      />
      <path
        d="M668.26 468.27s.85.88 3.24 1a8.86 8.86 0 0 1-3.41-.28z"
        opacity=".1"
      />
      <path
        fill="#e4aab4"
        d="M438.86 614.08l36.99-.11-12.11 19.32-23.85 12.09-1.03-31.3z"
      />
    </svg>
  );
}

function UsersIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      data-name="Layer 1"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1077.87 813.02"
    >
      <defs>
        <linearGradient
          id="a"
          x1="975.77"
          y1="484.92"
          x2="975.77"
          y2="87.89"
          gradientTransform="translate(-77.03)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="gray"
            stopOpacity=".25"
          />
          <stop
            offset=".54"
            stopColor="gray"
            stopOpacity=".12"
          />
          <stop
            offset="1"
            stopColor="gray"
            stopOpacity=".1"
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1="649.11"
          y1="832.85"
          x2="649.11"
          y2="382.11"
          xlinkHref="#a"
        />
      </defs>
      <path
        d="M663.83 111.35c-46.25 39.26-106.24 36.72-158.81 16.29S404.16 70.85 352.94 45C310 23.33 264.94 9.1 219.33 2.77c-65.28-9.06-138.18 2-183.66 65.44-50.65 70.68-46.76 198.16 8 263 27.87 33 64.36 49.2 96.18 75s61.29 68.56 58.58 118.3c-2.51 46-31.68 81.37-61.87 103.54-23.33 17.13-52.06 35.84-54.87 71.33-2.72 34.33 21.44 61.24 44.51 76.54 75.26 49.91 168 49.43 243-1.26 26.74-18.09 51.3-42.15 79.35-56.23 73.65-37 154.81.24 232.8 13.87 66 11.53 133.69 5.55 198-17.48 38.62-13.83 77.39-35 104.52-74.36 19.57-28.4 31.76-64.35 43.2-99.85q18.3-56.77 35.19-114.36c6.75-23.05 13.4-46.54 15.15-71.19 3.16-44.68-10.16-88.85-28.3-126.55-43.07-89.53-115.61-152.48-194.17-168.47s-161.67 15.24-222.6 83.58"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="489.56"
        cy="532.53"
        rx="226.98"
        ry="10.36"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M481.94 489.75c-113.47 0-205.78-92.31-205.78-205.78S368.44 78.19 481.94 78.19s205.75 92.32 205.75 205.78-92.32 205.78-205.75 205.78zm0-409.56c-112.37 0-203.78 91.42-203.78 203.78s91.38 203.78 203.78 203.78 203.78-91.42 203.78-203.78S594.27 80.19 481.94 80.19z"
        fill="#fff"
      />
      <path
        d="M481.94 443.57c-88 0-159.61-71.6-159.61-159.6s71.61-159.6 159.61-159.6 159.6 71.6 159.6 159.6-71.6 159.6-159.6 159.6zm0-317.2c-86.91 0-157.61 70.7-157.61 157.6s70.7 157.6 157.61 157.6 157.6-70.7 157.6-157.6-70.73-157.6-157.6-157.6z"
        fill="#fff"
      />
      <path
        d="M481.94 393.97a110 110 0 1 1 110-110 110.13 110.13 0 0 1-110 110zm0-218a108 108 0 1 0 108 108 108.13 108.13 0 0 0-108-108z"
        fill="#fff"
      />
      <ellipse
        cx="979.99"
        cy="403.16"
        rx="14.27"
        ry="4.72"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="178.55"
        cy="651.82"
        rx="84.04"
        ry="13.79"
        fill="#00c7fa"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M325.87 269.72H69.48a13.44 13.44 0 0 0-13.4 13.4v162a13.44 13.44 0 0 0 13.4 13.4h201.13s5.21 27.66-11.91 30.64c0 0 38.34 2.75 31.64-30.64h35.53a13.44 13.44 0 0 0 13.4-13.4v-162a13.44 13.44 0 0 0-13.4-13.4z" />
        <g opacity=".2">
          <rect
            x="93.82"
            y="312.72"
            width="207.7"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="93.82"
            y="369.3"
            width="207.7"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="93.82"
            y="397.58"
            width="174.18"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="93.82"
            y="341.01"
            width="90.06"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
        </g>
      </g>
      <path
        d="M328.11 268.6H71.71a13.44 13.44 0 0 0-13.4 13.4v162a13.44 13.44 0 0 0 13.4 13.4h201.13s5.22 27.66-11.91 30.63c0 0 38.34 2.75 31.64-30.63h35.54A13.43 13.43 0 0 0 341.5 444V282a13.43 13.43 0 0 0-13.39-13.4z"
        fill="#fff"
      />
      <g
        opacity=".2"
        fill="#00c7fa"
      >
        <rect
          x="96.06"
          y="311.6"
          width="207.7"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="96.06"
          y="368.18"
          width="207.7"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="96.06"
          y="396.47"
          width="174.18"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="96.06"
          y="339.89"
          width="90.06"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
      </g>
      <path
        d="M232.94 266.03l-14.21 30.22s-2.1 5.67-3.45 6.72-7.32 19-7.32 19l-15.23 23.54-1 1.6-6-1.65-4.19-15.67.26-4.55v-.57s9.43-9.86 11.52-10.61c0 0 1.64.19 4.79-7.45s6-9.3 6-9.3l1.64-5.54 17.66-28.11s14.8-21.23 18.83-11.81-9.3 14.18-9.3 14.18zM173.94 480.68a3.4 3.4 0 0 1-.48 1.45c-1.64 2.39-10.91 51.29-10.91 51.29.74 3.3-1.34 9.88-2.7 12.87s-4.34 18.54-4.34 18.54-.74 33.5-2.68 38.73.62 16.45.62 16.45c-.19 5.16 2.91 10.61 4.75 13.39.14.18.25.36.36.51.6.86 1 1.35 1 1.35a7.79 7.79 0 0 0 2.09 2.59c.13.11.27.21.42.32a23.81 23.81 0 0 0 8.38 3.54l.29.06c1.2.27 2 .37 2 .37l.74 4-7.92 1.64-15.1 1s-17.8 1.35-13.76-6.58a12.54 12.54 0 0 0 .73-1.68c.15-.38.29-.78.41-1.18 2.43-7.62.79-16.88.79-16.88l-3.48-26.95c-5.67-25.12 4.48-53.09 4.48-53.09s-.89-2.24 1.06-7.92 0-18.09 0-18.09-1-16-2.39-23.93a48.35 48.35 0 0 1-.54-10.07 50.3 50.3 0 0 1 .54-5.9l34.1-4.52s1.92 5.52 1.54 8.69z"
        fill="#ffd2c6"
      />
      <path
        d="M173.44 646.19l-7.92 1.64-15.1 1s-17.8 1.35-13.76-6.58a12.54 12.54 0 0 0 .73-1.68c.15-.38.29-.78.41-1.18a27.39 27.39 0 0 1 9 1.82c5.07 2 8.89-3.15 8.89-3.15l2.46-4.7.36-.68c.6.86 1 1.35 1 1.35a8 8 0 0 0 2.51 2.9l-.42.88-2.39 5s3.06.31 7.25 1a3.24 3.24 0 0 0 3.94-2.16l.29.06c1.2.27 2 .37 2 .37z"
        opacity=".1"
      />
      <path
        d="M180.77 649.92c-.6 2.69-17.27 3.52-17.27 3.52s-9.28-.9-11.88 1.27-10.26 1.65-10.56 1.65-4.33-.16-5.91-7.4c-1.53-7.06 2.06-8.29 2.24-8.35a27.13 27.13 0 0 1 9.43 1.83c5.07 2 8.89-3.14 8.89-3.14l2.82-5.39c.6.86 1 1.35 1 1.35a7.9 7.9 0 0 0 2.51 2.91l-2.81 5.91s3.06.31 7.25 1c3.35.54 4.08-2.19 4.23-3.29a3.4 3.4 0 0 0 0-.45s2.61.75 5.82 1.65a6 6 0 0 1 4.24 6.93z"
        fill="#626696"
      />
      <path
        d="M212.18 516.32c-.4 2.39-.81 8.58-.81 8.58 1.4 5.18-2.19 17.49-2.19 17.49l-1.79 7c.8 9-4.93 30.91-4.93 30.91s-3.84 20.34-5.84 29.12a24.21 24.21 0 0 0 1 14.66c.1.24.16.36.16.36 0 .17.07.33.12.49s.13.48.21.71a10.8 10.8 0 0 0 2 3.34 10.12 10.12 0 0 0 1.07 1.1l.06.06a21.64 21.64 0 0 0 6.36 3.91l1 .4a30.07 30.07 0 0 0 3.17 1 3.29 3.29 0 0 0 .36.08l-.81 4.7-10.56-2.7-14.15-4.59-7-4s.08-.38.22-1.11v-.12c.06-.31.12-.68.21-1.1 1.19-6.1 3.9-23.4 2.54-36.1-1.69-15.75 4.87-37.49 6.47-42.67a25.87 25.87 0 0 0 1.2-9.17c-2.6-3.8-3.2-18.94-3.2-18.94s-4.78-9.78-8.74-20.15a53 53 0 0 1-2.85-10.48 36.65 36.65 0 0 1-.58-7.66s32.12-29.31 35.64-.93c.12 1 .23 1.88.34 2.78 3.08 25.94 1.7 30.72 1.32 33.03z"
        fill="#ffd2c6"
      />
      <path
        d="M212.18 635.56l-.81 4.7-10.56-2.7-14.15-4.59-7-4s.08-.38.22-1.11v-.12c.06-.31.12-.68.21-1.1l1-.1h.08a13.32 13.32 0 0 1 5.93.8c2.3.87 5.32 1.86 5.94 1.44a7.56 7.56 0 0 1 3.39-.6l1.47-3.22.21-.49a10.68 10.68 0 0 0 2 3.34 11.29 11.29 0 0 0 1.13 1.16l-.06 1.14-.08 1.61a20.58 20.58 0 0 0 5.08 2.35 2.94 2.94 0 0 0 1.42 0l1 .4a30.07 30.07 0 0 0 3.17 1 3.29 3.29 0 0 0 .41.09z"
        opacity=".1"
      />
      <path
        d="M206.94 645.59c-2.95-.85-10.06-2.2-11.21-1.15s-11 0-11 0a6 6 0 0 1-5.09-3c-2-3.19-.39-13.51-.39-13.51l.73-.07 1.22-.12h.08a13.17 13.17 0 0 1 5.93.8c2.3.86 5.32 1.85 5.94 1.44a7.42 7.42 0 0 1 3.39-.6l1.68-3.71a10.8 10.8 0 0 0 2 3.34 11.29 11.29 0 0 0 1.13 1.16l-.14 2.75a20.71 20.71 0 0 0 5.08 2.34 2 2 0 0 0 2.44-.77 1.51 1.51 0 0 0 .18-.41c.09.17 1.06.5 4.17 1.39 3.38-.19 6.64 1.28 8.14 5.86s-11.39 5.1-14.28 4.26z"
        fill="#626696"
      />
      <path
        d="M173.94 480.68c-.66.19-1.26.37-1.82.55a25.23 25.23 0 0 1-4.41.93c-9.43 1.33-25 .53-29.93.22a50.3 50.3 0 0 1 .54-5.9l34.1-4.52s1.9 5.55 1.52 8.72z"
        opacity=".1"
      />
      <path
        d="M203.66 472.4s-12.52 1.94-22.7 4.17c-3.4.74-6.54 1.51-8.86 2.27a27.21 27.21 0 0 1-4.41.93c-11.34 1.59-31.48.12-31.48.12-5.53-17.94 6.72-40.53 6.72-40.53-.29-1.8 2.55-7.32 2.55-7.32l.05-.18 1.74-6.4h46.51l.57 2.75 1.18 5.6 7.3 34.67z"
        fill="#626696"
      />
      <path
        d="M210.86 483.28l-.28.12-5.44 2.41c-5.89 2.72-23.52 3.23-29.68 3.28a36.65 36.65 0 0 1-.58-7.66s32.12-29.31 35.64-.93c.12 1.01.23 1.88.34 2.78z"
        opacity=".1"
      />
      <path
        d="M211.72 480.51l-1.14.5-5.44 2.42c-6 2.76-24.19 3.25-30 3.28h-1.53c-2.69-.09-5.38-2.61-5.38-3.27 0-.36-.28-2.13-.52-3.65-.2-1.22-.38-2.27-.38-2.27s-12-5.18-18.09-9.37c-4.57-3.11-3.42-25.21-2.53-36.32.31-3.83.58-6.35.58-6.35l47.08 2.75 6.6.38 3.78.84 1 .21s2.7 19.74 4 21.38.46 7.18.3 10.33a19.19 19.19 0 0 1-.44 4s1.94 5.54 1.48 8.64a17.23 17.23 0 0 0 .63 6.5z"
        fill="#626696"
      />
      <circle
        cx="161.33"
        cy="297.29"
        r="19.29"
        fill="#ffd2c6"
      />
      <path
        d="M151.94 305.34s1.34 18.27-2.39 22.46-13.46 12.11-13.46 12.11l3 12.41 16.9 1.95 19.74-21.09-4.49-5.53s-3.44-11.67-.6-17.5-18.7-4.81-18.7-4.81z"
        fill="#ffd2c6"
      />
      <path
        d="M192.73 345.51l-1 1.6-6-1.65-4.19-15.67.26-4.55 1.23-1.77s6.58.16 6.29 6.14c-.29 5.25 2.7 13.9 3.41 15.9zM205.74 432.04s-4.76 1.06-10.21 1.77-11.74 1.07-14.32-.43c-4.33-2.56-27.79-1.83-34.52-1.57-.48 0-.86 0-1.16.05l1.74-6.4h46.51l.57 2.75 6.6.38 3.78.84c.63 1.55 1.01 2.61 1.01 2.61z"
        opacity=".1"
      />
      <path
        d="M181.82 324.66s6.58.15 6.28 6.13 3.59 16.3 3.59 16.3l-1.5 3.44s-2.09 8.37-.45 10.47 7.63 2.09 4.19 19.29c0 0-.74 12.86 1.05 17.05s1.79 14.2 4.48 18.39 6.29 13.91 6.29 13.91-19.45 4.33-24.53 1.34-36.34-1.47-36.34-1.47.15-5.24 0-5.83a5 5 0 0 1 .75-3.82c1-1.42 2.69-3.81 1.79-5.9s2.25-5.18.6-8.42-3.65-3.89-3.25-5.66-.64-4.17-1.83-5.66-9.28-17.3-9.28-17.3l-1.34-7.41s-10.41-7.63-10.22-11.22 3.94-8.56 3.94-8.56l10-9.83s5.53 6 10.91 3.89 16.99-12.11 16.99-12.11 4.14-2.24 4.44-3.88 2.84-.15 2.84-.15 3.74-2.05 4.49-1.33 4 1.33 4 1.33z"
        fill="#ffcde5"
      />
      <path
        d="M125.29 355.81l-3.19 2.49s-3.24 5.84-4 16.3-4 25.26-4 25.26l-6.28 11.23s-10.35 21.67-11.69 27.42-7.48 15.48-7.48 15.48-20.79 18.68-6.28 22 14.95-14.87 14.95-14.87 3.39-3.74 3.94-6.28 18.94-35.07 18.94-35.07 6.44-8.75 5.09-13.38c0 0 8.37-19.69 8.37-24.63a87.48 87.48 0 0 0-1.34-12.25l1.34-10.32z"
        fill="#ffd2c6"
      />
      <path
        d="M168.36 397.04s-14.66 7.67-17.5 8.07 12.41-1.6 12.41-1.6zM180.32 403.02s-19.44 6.58-28 5.38c.04 0 21.27 4.04 28-5.38z"
        opacity=".1"
      />
      <path
        d="M181.52 405.17s-17.5 11-27.82 9.21c0 0 24.08 4.79 27.82 2.25l-10.77-3s11.97-6.32 10.77-8.46zM161.36 263.35c-5.06-1-10.67-.4-14.72 2.78-3 2.36-5 6-8.37 7.72a49.24 49.24 0 0 1-5.47 1.93 15.78 15.78 0 0 0-9.63 17c.53 3 1.92 5.7 2.6 8.62 1.22 5.22.15 10.69-1.18 15.88a167.1 167.1 0 0 1-16.65 41.23 4.32 4.32 0 0 0-.83 2.77 4 4 0 0 0 1 1.77c6.91 8 18.16 10.73 28.72 11.09 3.89.13 8 0 11.38-1.89a17.2 17.2 0 0 0 5.55-5.09 27 27 0 0 0 5.18-17.41c-.29-5-2-10.09-.71-14.94a4 4 0 0 1 .9-1.83c1.14-1.16 3-.86 4.64-1.05 4.39-.51 7.23-5.14 7.75-9.52s-.58-8.81-.6-13.22a27.69 27.69 0 0 1 5.21-16.28c1.46-2 3.33-4 3.82-6.51.62-3.15-1.21-5.47-2.79-8-2.45-3.88-3.65-8.41-7.38-11.37a19.92 19.92 0 0 0-8.42-3.68z"
        opacity=".1"
      />
      <path
        d="M160.16 262.15c-5.05-1-10.67-.4-14.72 2.79-3 2.35-5 6-8.37 7.72a48.32 48.32 0 0 1-5.46 1.92 15.79 15.79 0 0 0-9.64 17c.53 3 1.92 5.7 2.61 8.63 1.22 5.22.14 10.68-1.18 15.87a167.2 167.2 0 0 1-16.62 41.23 4.23 4.23 0 0 0-.82 2.76 3.85 3.85 0 0 0 1 1.77c6.92 8 18.16 10.73 28.72 11.09 3.89.14 8 0 11.38-1.88a17.24 17.24 0 0 0 5.55-5.1 27 27 0 0 0 5.15-17.37c-.29-5-2-10.09-.7-14.95a4 4 0 0 1 .89-1.83c1.14-1.16 3-.86 4.65-1 4.39-.51 7.22-5.14 7.74-9.53s-.57-8.8-.6-13.22a27.69 27.69 0 0 1 5.2-16.33c1.46-2 3.32-4 3.81-6.52.62-3.15-1.2-5.46-2.78-8-2.45-3.88-3.65-8.41-7.39-11.36a19.82 19.82 0 0 0-8.42-3.69z"
        fill="#985c7e"
      />
      <path
        d="M153.7 449.13s3.84 17.94 10.22 22.83z"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M123.11 295.58c-.2-.7-.43-1.4-.67-2.09.2.7.43 1.4.67 2.09zM177.67 279.92a6.49 6.49 0 0 1-.08 1.69c-.5 2.53-2.36 4.5-3.82 6.52a27.61 27.61 0 0 0-5.21 16.27c0 4.42 1.11 8.83.59 13.22s-3.35 9-7.74 9.53c-1.62.19-3.51-.12-4.64 1a4 4 0 0 0-.9 1.83c-1.27 4.86.42 9.94.7 14.95a27 27 0 0 1-5.14 17.37 17.34 17.34 0 0 1-5.55 5.1c-3.43 1.85-7.49 2-11.39 1.88-10.38-.35-21.42-3-28.36-10.71a2.74 2.74 0 0 0-.17 1.44 3.85 3.85 0 0 0 1 1.77c6.92 8 18.16 10.73 28.72 11.09 3.89.14 8 0 11.38-1.88a17.34 17.34 0 0 0 5.55-5.1 27 27 0 0 0 5.15-17.37c-.29-5-2-10.09-.7-14.95a4 4 0 0 1 .89-1.83c1.14-1.16 3-.86 4.65-1 4.39-.51 7.22-5.14 7.74-9.53s-.57-8.8-.6-13.22a27.69 27.69 0 0 1 5.2-16.27c1.46-2 3.32-4 3.81-6.52a7.41 7.41 0 0 0-1.08-5.28z" />
      </g>
      <path
        d="M521.27 763.98s-38.05-2.3-33.56 24.36c0 0-.89 4.71 3.38 6.85 0 0 .07-2 3.9-1.3a17.51 17.51 0 0 0 4.13.2 8.63 8.63 0 0 0 5.06-2.09s10.69-4.42 14.85-21.9c0 0 3.08-3.81 3-4.79l-6.42 2.74s2.19 4.63.46 8.48c0 0-.2-8.31-1.44-8.11-.25 0-3.33 1.6-3.33 1.6s3.77 8.07.92 13.93c0 0 1.08-9.94-2.1-13.34l-4.52 2.63s4.41 8.34 1.42 15.14c0 0 .77-10.43-2.37-14.49l-4.1 3.19s4.15 8.21 1.62 13.85c0 0-.33-12.14-2.51-13 0 0-3.58 3.15-4.12 4.45 0 0 2.83 6 1.07 9.11 0 0-1.08-8.09-2-8.12 0 0-3.57 5.36-3.94 9a19.48 19.48 0 0 1 3.07-9.55 10.71 10.71 0 0 0-5.46 2.83s.55-3.79 6.34-4.12c0 0 3-4.06 3.74-4.31 0 0-5.76-.48-9.25 1.07 0 0 3.07-3.58 10.31-2l4-3.3s-7.58-1-10.8.11c0 0 3.7-3.17 11.89-.86l4.4-2.64s-6.46-1.39-10.31-.89c0 0 4.06-2.19 11.6.19l3.15-1.42s-4.74-.93-6.12-1.07-1.46-.53-1.46-.53a16.36 16.36 0 0 1 8.89 1s6.72-2.48 6.61-2.9z"
        fill="#00c7fa"
      />
      <ellipse
        cx="495.06"
        cy="797.52"
        rx="26.93"
        ry="4.55"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M819.38 731.38s-38-2.29-33.56 24.37c0 0-.89 4.71 3.38 6.85 0 0 .07-2 3.9-1.31a17.62 17.62 0 0 0 4.14.2 8.54 8.54 0 0 0 5.05-2.09s10.7-4.41 14.85-21.89c0 0 3.08-3.82 3-4.8l-6.46 2.8s2.19 4.63.47 8.48c0 0-.21-8.32-1.44-8.12-.25 0-3.34 1.6-3.34 1.6s3.77 8.07.93 13.94c0 0 1.08-9.94-2.11-13.35l-4.52 2.64s4.41 8.33 1.42 15.13c0 0 .77-10.43-2.37-14.49l-4.09 3.17s4.14 8.22 1.61 13.86c0 0-.33-12.15-2.5-13.06 0 0-3.58 3.16-4.13 4.46 0 0 2.84 6 1.08 9.1 0 0-1.08-8.08-2-8.12 0 0-3.57 5.36-3.94 9a19.45 19.45 0 0 1 3.08-9.55 10.76 10.76 0 0 0-5.47 2.83s.56-3.78 6.35-4.12c0 0 3-4.06 3.74-4.31 0 0-5.76-.48-9.26 1.07 0 0 3.08-3.58 10.31-1.95l4-3.3s-7.59-1-10.8.11c0 0 3.7-3.16 11.89-.86l4.4-2.63s-6.47-1.4-10.32-.89c0 0 4.06-2.19 11.61.18l3.15-1.41s-4.74-.93-6.13-1.08-1.46-.53-1.46-.53a16.39 16.39 0 0 1 8.9 1s6.76-2.51 6.64-2.93z"
        fill="#00c7fa"
      />
      <ellipse
        cx="793.17"
        cy="764.92"
        rx="26.93"
        ry="4.55"
        fill="#00c7fa"
        opacity=".1"
      />
      <ellipse
        cx="848.09"
        cy="436.83"
        rx="77.55"
        ry="12.72"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M999.44 229.49c3.17-10.63 0-21.26 0-21.26v-10s3.62-19.61-12.5-32.19l-10.7-9.43s-6-5.14-7.73-5.47a7.85 7.85 0 0 0-1-.15l-.32-.18a32.21 32.21 0 0 1-2.34-4.93 4.57 4.57 0 0 0 3.81-1.3 5 5 0 0 0 .9-1.5c.62-1.39.72-3.07 1.25-4.55a10.62 10.62 0 0 1 2-3.27c-.11.18-.22.35-.32.53 1.51-1.88 3.49-3.5 4.9-5.49a12 12 0 0 0 .78-1.22l-.21.25c2-3.16 2.57-7 3.14-10.68a9.64 9.64 0 0 0 .06-3.82 12.73 12.73 0 0 0-1.07-2.42c-2.32-4.8-2.27-10.82-6-14.65-2.79-2.87-7-3.75-11-4.24s-8.17-.77-11.59-2.86a12.55 12.55 0 0 0-3.14-1.73 2.59 2.59 0 0 0-3.09 1.15 2 2 0 0 1-.41.83 1.33 1.33 0 0 1-1.19.07l-5.3-1.42.06.27h-.13l.19.84c.17 0 .35 0 .5.29l-.85 1.31a13.13 13.13 0 0 1-4.79-1 2.26 2.26 0 0 0 0 .26h-.07c-.1 1.5 1.6 2.47 2.12 3.88a2.94 2.94 0 0 1 0 1.9 4.32 4.32 0 0 1-1 1.52c-1.89 1.86-4.29 1.49-6.46 2.67a1.38 1.38 0 0 0-.79.87.67.67 0 0 0-.07.48 1.12 1.12 0 0 0 .44.55 10 10 0 0 0 2.06 1.28l-.62.6a23.74 23.74 0 0 0 8.2 38.71c.08.41.14.83.2 1.28v.12l.06.57-7.15 3a5.69 5.69 0 0 1-5.12-3.29c-1.66-3.44-7.53 0-7.53 0s-17.93-1.35-24.56 1.95c0 0-10.7-4.49-12.2-4.79s-3.77-1.5-4.83-1.2-2.41-2-3.16-1.8-1-1.49-3.46-2.09-3.32.15-6-2.55-24.71-13.32-24.71-13.32l-9.94-8.09-10.55-8.38-.19.35c-.06-.25-.13-.51-.2-.78a100 100 0 0 0-3.91-12.3c-.68-1.62-1-3.67-1.89-2.59-.56.65-1.52-.77-3-1.73a2.49 2.49 0 0 0-3.72 1.08c-8.21 12.87-11.15 13.8-6.39 18.51 4.23 4.2 7.05 7.91 10.51 9l.41.13a.58.58 0 0 1-.23 0l20 23.95s14.46 12.58 24.41 16.62 9.19 5.24 9.19 5.24 30.13 15.27 34.8 15 3.77 31.29 1.81 36.38-5.12 41.92-5.12 41.92-3 7.78.15 13.17c0 0 .7 10.32.07 12.79-2.75 4.23-6.66 11.41-7.3 18.8 0 .39-.08.76-.12 1.14a2.59 2.59 0 0 1-.71.58s.26-.06.67-.2a38 38 0 0 1-2 9 36.67 36.67 0 0 0-2.46 13v23.79L881 363s-2.41 11.17 0 13.77a6.33 6.33 0 0 1 1.32 4.59 8.5 8.5 0 0 0 1.54 5.35 4.06 4.06 0 0 1 1 3.44c-.8 2.59 1.18 30.13 1.18 30.13s-.58 7.59-1.38 8S886 437 886 437s-8.14 6.79-6.07 10.39l2.08 3.19-.55.54-.34.34a3.17 3.17 0 0 0-2.07-.39 77.61 77.61 0 0 1-8.19 7.29c-3.67 2.65-13.66 6.49-13.66 6.49l-7.88.64h-.15s-3.77-.35-1.66 5.49 21 4 21 4l11-1.74s19.68.09 25.31-1.15c2.36-.53 2.92-1.78 2.77-3.06l-.06-.06a7.86 7.86 0 0 0-1.61-3.31 1.56 1.56 0 0 0-.14-.17l.36-4c8.35-4.81-2.36-14.28-2.36-14.28s3.66-8 5.55-10.57 1.88-40.72 1.88-40.72 1-13.78-1.61-17a5.75 5.75 0 0 1 2.81-5.19c1.86-1.27 7.48-18.76 11.89-33.28l2.78 17.11s-.6 8.18 1.21 10.58a4.07 4.07 0 0 1 .74 3.18 14.15 14.15 0 0 0 .41 6.93 4.48 4.48 0 0 0 1.45 2.46c1.61.8 1.71 3.65 2.31 4.25s4.32-.85 4.52 1.34a48.94 48.94 0 0 1 0 5.79l1.21 35.53s-2 3-2.41 10.78c-.17 3.36-.8 5.27-1.45 6.36a3.25 3.25 0 0 0 .3 3.82l.35.4-1.49 1.15a3.25 3.25 0 0 0-.92 4 3.21 3.21 0 0 0-.93 3.45 4 4 0 0 0 .26.56 5.63 5.63 0 0 0-3 1.48 24.6 24.6 0 0 1-5.3 5.34 99.92 99.92 0 0 0-8.46 7.24 12.14 12.14 0 0 1-4.94 4 8 8 0 0 1-1.49.44c-4 .81-2.71 4.95.5 5.6s13.86 3.94 22.15 2c0 0 2.46 1 6.07-.84s11.83-4 11.83-4 4.52 0 5.12-1.8a6.89 6.89 0 0 0 .26-1.75l.13-.12-.12-.11a23.56 23.56 0 0 0-.31-4c-.11-.68-.24-1.3-.36-1.79-.39-1.5-1.1-3.43-1.41-4.25a1.53 1.53 0 0 0 .14-.21c1.72-2.91-1.14-10-1.14-10a19.11 19.11 0 0 1 3.41-4c1.61-1.19 5.83-32.33 5.83-32.33s-.2-8 2-11.58-3-25.35-3-25.35-2.21-5-1.4-6.79-.81-8.38-.81-8.38v-7.86a8.64 8.64 0 0 0-.46-2.76c-.62-1.85-1.54-5.4-.54-8 1.41-3.59 4.62-25.75 4.62-25.75s-2.51-9.77 1.16-17.55a16.79 16.79 0 0 1 1-1.81c2.72-4.28 1.91-11.88.57-18-.21-.95-.43-1.86-.65-2.73-.1-.37-.2-.72-.29-1.07l.43-.18s0-.59.13-1.58a11 11 0 0 0 7.25-5s9.19-10.33 17.33-14.67 8.74-10.63 8.74-10.63c-1.21-2.1 2.15-10.63 2.15-10.63zm-32-78.38zm5.53 92.15l-8.7 10.09a.21.21 0 0 1 0-.06c-2.26-3.14 2.11-10.18 2.11-10.18l7.19-16.11c-.06 2.08-.31 3.9-.94 4.76-2 2.7 3.61 7.19 3.61 7.19-3.01-.03-3.31 4.31-3.31 4.31z"
        transform="translate(-61.06 -43.49)"
        fill="url(#a)"
      />
      <path
        d="M758.68 67.51l-4.74 9.21a18.35 18.35 0 0 1-4.42-.92 16.77 16.77 0 0 1-10.38-9c-4.24-9.38 2.78-15.44 6.05-17.22s6.3-3.83 8.75 2a101.43 101.43 0 0 1 3.86 12.22c.54 2.22.88 3.71.88 3.71zM909.6 115.51l-7.58 11.31s-35.86 17.1-29-3c3-8.85 3.37-15.33 2.83-19.81v-.12c-.7-5.6-2.81-8-2.81-8s34.95-17.88 29.75-5.65a17 17 0 0 0-1.24 8.05 27.42 27.42 0 0 0 3.77 11.17 37 37 0 0 0 4.28 6.05z"
        fill="#cc818c"
      />
      <path
        d="M898.74 339.3s5.16 21.62 3 25.19-2 11.5-2 11.5-4.17 30.95-5.76 32.14a19 19 0 0 0-3.37 4s2.83 7 1.13 9.9a2.35 2.35 0 0 1-1.13 1c-2.66 1.12-12.48-3.85-18.07-6.9a3.08 3.08 0 0 1-1.48-1.77 3.15 3.15 0 0 1 .91-3.42 3.26 3.26 0 0 1 .91-4l1.47-1.14-.34-.4a3.25 3.25 0 0 1-.3-3.8c.64-1.08 1.26-3 1.43-6.31.4-7.74 2.38-10.71 2.38-10.71l-1.19-35.31a50.69 50.69 0 0 0 0-5.75c-.2-2.18-3.87-.74-4.46-1.34s-.7-3.42-2.28-4.22a4.44 4.44 0 0 1-1.44-2.44 14.22 14.22 0 0 1-.41-6.89 4.06 4.06 0 0 0-.73-3.16c-1.79-2.38-1.19-10.51-1.19-10.51l-2.74-17c-4.36 14.43-9.91 31.81-11.74 33.07a5.72 5.72 0 0 0-2.78 5.16c2.58 3.17 1.59 16.86 1.59 16.86s0 37.88-1.86 40.46-5.48 10.51-5.48 10.51 10.63 9.46 2.27 14.23l-.09.05c-8.53 4.76-26.18-8.52-26.18-8.52l1.84-1.84.54-.54-2-3.18c-2.05-3.57 6-10.31 6-10.31s-2.14-8.33-1.35-8.73 1.35-7.94 1.35-7.94-1.95-27.37-1.16-29.94a4 4 0 0 0-.94-3.42 8.54 8.54 0 0 1-1.52-5.31 6.32 6.32 0 0 0-1.3-4.56c-2.38-2.58 0-13.69 0-13.69l2-14.68v-23.38a37 37 0 0 1 2.4-13.12 39.6 39.6 0 0 0 2.16-10.56c.65-7.52 4.69-14.83 7.41-19 1.44-2.2 2.51-3.52 2.51-3.52l63.47-2.49s1 2.83 2 6.76c.22.86.44 1.76.64 2.71 1.33 6.1 2.13 13.65-.56 17.91a14.09 14.09 0 0 0-1 1.79c-3.63 7.73-1.15 17.44-1.15 17.44s-3.17 22-4.56 25.59c-1 2.53-.08 6.06.54 7.9a8.79 8.79 0 0 1 .45 2.74v7.81s1.59 6.54.8 8.33 1.36 6.75 1.36 6.75z"
        fill="#444053"
      />
      <path
        d="M901.66 261.51a16.43 16.43 0 0 0-1 1.79l-3.57-.2c.34-1.84-2.09-19.09-2.09-19.09l7.2-.41c1.34 6.14 2.15 13.7-.54 17.91z"
        opacity=".1"
      />
      <path
        d="M902.25 260.96a14.09 14.09 0 0 0-1 1.79l-3.58-.2c.35-1.84-2.08-19.1-2.08-19.1l7.19-.4c1.36 6.1 2.16 13.65-.53 17.91z"
        fill="#444053"
      />
      <path
        d="M902.25 260.96a14.09 14.09 0 0 0-1 1.79l-3.58-.2c.35-1.84-2.08-19.1-2.08-19.1l7.19-.4c1.36 6.1 2.16 13.65-.53 17.91z"
        opacity=".05"
      />
      <path
        d="M891.74 422a2.35 2.35 0 0 1-1.13 1c-2.66 1.12-12.48-3.85-18.07-6.9a3.08 3.08 0 0 1-1.48-1.77c3.18-.58 5.27 3 5.27 3a4.69 4.69 0 0 1 6.54 1.59c2.73 4 8.58 2.32 8.58 2.32s.12.27.29.76z"
        opacity=".1"
      />
      <path
        d="M893.39 434.16c-.6 1.78-5.06 1.78-5.06 1.78s-8 2.29-11.56 4.07-6 .84-6 .84c-8.19 1.89-18.7-1.38-21.87-2s-4.42-4.76-.5-5.55a7.84 7.84 0 0 0 1.47-.45 11.94 11.94 0 0 0 4.88-4 101.18 101.18 0 0 1 8.35-7.2 24.16 24.16 0 0 0 5.24-5.3c4.66-4.12 8 1.54 8 1.54a4.69 4.69 0 0 1 6.54 1.59c2.73 4 8.58 2.32 8.58 2.32s1 2.68 1.54 4.61c.12.49.25 1.11.36 1.79a15.65 15.65 0 0 1 .03 5.96z"
        fill="#ff748f"
      />
      <circle
        cx="879.75"
        cy="421.07"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="875.09"
        cy="425.43"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="870.35"
        cy="429.35"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="872.8"
        cy="427.6"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="877.52"
        cy="423.11"
        r=".55"
        fill="#575988"
      />
      <path
        d="M893.39 434.16c-.6 1.78-5.06 1.78-5.06 1.78s-8 2.29-11.56 4.07-6 .84-6 .84c-8.19 1.89-18.7-1.38-21.87-2s-4.42-4.76-.5-5.55a7.84 7.84 0 0 0 1.47-.45 38 38 0 0 0 10.73 2c8.08.34 14.48 0 14.48 0l8.18-2.63a13.69 13.69 0 0 1 5.06-1.84 13 13 0 0 0 5-2.18 15.65 15.65 0 0 1 .07 5.96z"
        fill="#dce6f2"
      />
      <path
        d="M873.03 439.29a6.75 6.75 0 0 1-1.36-.14l.12-.58a8.59 8.59 0 0 0 4.9-.68c.73-.29 1.46-.63 2.17-1s1.7-.8 2.58-1.13l.81-.28c.45-.15.9-.3 1.33-.49.25-.1.49-.22.73-.33a8.14 8.14 0 0 1 1.84-.7 8.55 8.55 0 0 1 1-.13 8.51 8.51 0 0 0 .9-.11 7.82 7.82 0 0 0 1.72-.64 8.35 8.35 0 0 1 1.85-.68l.44-.08a2.11 2.11 0 0 0 1.28-.47l.43.41a2.67 2.67 0 0 1-1.62.65l-.41.07a7.82 7.82 0 0 0-1.72.64 8.35 8.35 0 0 1-1.85.68 6.59 6.59 0 0 1-1 .12 8.73 8.73 0 0 0-.93.12 7.56 7.56 0 0 0-1.7.66l-.75.34c-.46.19-.92.35-1.38.5l-.79.28c-.86.32-1.71.72-2.54 1.1s-1.45.69-2.2 1a10.58 10.58 0 0 1-3.85.87z"
        fill="#575988"
        opacity=".5"
      />
      <path
        d="M874.94 340.74s4.12-6 11.16-5.9 10.06-.79 10.06-.79-4.51 2.67-7.63 3-13.59 3.69-13.59 3.69zM877.32 342.13s3.72-2.58 5.85-2.68 4-.3 4-.3a11.3 11.3 0 0 1-3.27 1.59c-1.82.5-6.58 1.39-6.58 1.39zM878.11 343.91s5.61.45 5.66 1.94M825.94 260.29c.29.05 5.29-5.21 5.64-7.29a5.1 5.1 0 0 1 2.18-3.2s3.23 1.29.35 5.24-8.17 5.25-8.17 5.25zM902.76 90.18c-1.14 2.7-2.15 2.9-1.93 5.52a19.88 19.88 0 0 1-4.54 3.57c-3.55 2.11-7.41 6.23-11.83 6.23a23.45 23.45 0 0 1-8.64-1.63c-.7-5.6-2.81-8-2.81-8s34.93-17.92 29.75-5.69z"
        opacity=".1"
      />
      <path
        d="M908.11 80.66a23.65 23.65 0 1 1-23.65-23.65 23.64 23.64 0 0 1 23.65 23.65z"
        fill="#cc818c"
      />
      <path
        d="M909.6 115.51l-7.58 11.31s-35.86 17.1-29-3c3-8.85 3.37-15.33 2.83-19.81h.06a18.76 18.76 0 0 1 .71 4.56c.11 3.08.19 7 7.85 8.28 12.77 2.15 19.63-5.84 20.83-7.41a37 37 0 0 0 4.3 6.07zM758.68 67.51l-4.74 9.21a18.35 18.35 0 0 1-4.42-.92l-.41-.49c1.94.74 8.48-11.61 8.48-11.61l.21.17c.54 2.15.88 3.64.88 3.64zM902.17 240.34c-15.31 6.65-68.29 1-68.29 1a6.68 6.68 0 0 0 .27-1.73c1.44-2.2 2.51-3.52 2.51-3.52l63.47-2.49s1.03 2.81 2.04 6.74z"
        opacity=".1"
      />
      <path
        d="M875.94 104.56l-7.06 3a5.64 5.64 0 0 1-5.06-3.28c-1.63-3.42-7.43 0-7.43 0s-17.71-1.34-24.25 1.94c0 0-10.56-4.47-12-4.76s-3.72-1.49-4.76-1.19-2.38-1.94-3.12-1.79-1.05-1.49-3.43-2.08-3.27.15-5.95-2.53-24.39-13.24-24.39-13.24l-9.82-8-10.41-8.33s-6.55 12.34-8.48 11.6l19.78 23.8s14.28 12.5 24.1 16.51 9.07 5.21 9.07 5.21 29.76 15.17 34.37 14.88 3.72 31.09 1.78 36.15-5.05 41.65-5.05 41.65-3 7.73.14 13.09c0 0 .75 11 0 12.94 0 0 53.31 5.7 68.43-1 0 0 2.23-24.69 0-27.82s2.09-10.11 2.09-10.11l9.45-21.32 23.18-23.37s3.57-19.49-12.34-32l-10.57-9.37s-5.91-5.11-7.63-5.43-1.09 0-1.09 0-6.9 10-21 7.66c-7.66-1.29-7.74-5.19-7.85-8.28a18.76 18.76 0 0 0-.7-4.53z"
        fill="#67647e"
      />
      <path
        d="M904.99 184.64s-32.73 1.34-39.27 11.61c0 0 8.48-4 16.06-2.83s23.21-8.78 23.21-8.78zM868.84 220.51s15.47 1 18.75-2.23 3.28-5.2 3.28-5.2zM908.11 153.11s-13.09 15.47 2.83 22.16zM830.61 123.21s4.76 9.71 7.14 10.36zM814.55 119.04s11.9 10.71 14.13 11.75c0 0-12.35-11.75-14.13-11.75zM862 108.78s-11.46 17.1-4 27.52c-.06 0-4.18-12.35 4-27.52z"
        opacity=".1"
      />
      <path
        d="M890.87 238.35l-3.5 3.29-.49.46-4.05 3.83c-.3.22-.58.44-.87.64-16.5 11.83-19.81-6.14-19.81-6.14s-7.29 4.76-8.33.89 17-9.37 19.63-9.07a3.48 3.48 0 0 0 .72 0 11.31 11.31 0 0 0 3.7-1.31c.27-.14.54-.28.8-.43a29.63 29.63 0 0 0 2.67-1.68z"
        fill="#cc818c"
      />
      <path
        d="M908.71 80.66a23.65 23.65 0 0 1-11.56 20.33 13.8 13.8 0 0 1-.86-1.72c-.85-2-1.37-4.09-2.22-6.07a18.94 18.94 0 0 0-4-5.79 2.53 2.53 0 0 0-1-.73 2.87 2.87 0 0 0-2.17.6 9.82 9.82 0 0 1-3.3 1.45 3.51 3.51 0 0 1-3.31-1c-.92-1.1-.79-2.72-.52-4.13.57-3.08 1.54-6.1 1.54-9.23s-1.18-6.51-3.9-8.06c-2.4-1.36-5.38-1-8.05-1.75a8.66 8.66 0 0 1-1.21-.42 23.66 23.66 0 0 1 40.59 16.52z"
        opacity=".1"
      />
      <path
        d="M866.52 60.38c-.43.23-.9.64-.77 1.12a1.1 1.1 0 0 0 .43.55 10.24 10.24 0 0 0 3.74 1.92c2.67.72 5.66.38 8.06 1.75 2.71 1.55 3.91 4.92 3.9 8.05s-1 6.16-1.55 9.23c-.26 1.42-.4 3 .53 4.14a3.53 3.53 0 0 0 3.31 1 9.75 9.75 0 0 0 3.29-1.44 2.85 2.85 0 0 1 2.17-.6 2.64 2.64 0 0 1 1.06.72 18.78 18.78 0 0 1 4 5.8c.86 2 1.38 4.08 2.22 6.07a9.79 9.79 0 0 0 4 4.94 5 5 0 0 0 6-.63c1.38-1.52 1.34-3.82 2-5.77 1.18-3.37 4.48-5.49 6.54-8.4 2.32-3.27 3-7.4 3.59-11.36a9.54 9.54 0 0 0 .06-3.8 13.76 13.76 0 0 0-1.05-2.4c-2.3-4.76-2.25-10.75-5.92-14.56-2.76-2.85-6.94-3.72-10.88-4.2s-8.07-.78-11.45-2.85a12.6 12.6 0 0 0-3.1-1.72 2.55 2.55 0 0 0-3.05 1.14 2 2 0 0 1-.41.83 1.3 1.3 0 0 1-1.16.07l-5.24-1.41.6 2.64a13.08 13.08 0 0 1-5.56-1c-.1 1.49 1.58 2.46 2.1 3.85a3.56 3.56 0 0 1-1 3.63c-1.94 1.89-4.32 1.52-6.46 2.69z"
        fill="#585268"
      />
      <path
        d="M845.29 415.81l-.21 2.38-.09.05c-8.53 4.76-26.18-8.52-26.18-8.52l1.84-1.84a3.2 3.2 0 0 1 .8 2.48l3.61.2 4.31 4.66s11.67 1.35 14.83.59z"
        opacity=".1"
      />
      <path
        d="M843.8 428.76c-5.55 1.23-25 1.14-25 1.14l-10.86 1.73s-18.69 1.79-20.77-4 1.63-5.45 1.63-5.45h.14l7.78-.63s9.87-3.82 13.49-6.45a77.82 77.82 0 0 0 8.08-7.24s3.25-.63 3.19 3.13l3.61.2 4.31 4.65s11.67 1.36 14.83.6h1.09l-.5 5.75.14.18c.69.89 3.8 5.28-1.16 6.39z"
        fill="#ff748f"
      />
      <circle
        cx="823.66"
        cy="414.31"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="809.68"
        cy="420.38"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="802.48"
        cy="422.57"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="813.35"
        cy="419.22"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="806.07"
        cy="421.48"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="817.06"
        cy="417.5"
        r=".55"
        fill="#575988"
      />
      <circle
        cx="820.73"
        cy="415.91"
        r=".55"
        fill="#575988"
      />
      <path
        d="M843.8 428.76c-5.55 1.23-25 1.14-25 1.14l-10.86 1.73s-18.69 1.79-20.77-4 1.63-5.45 1.63-5.45h.14c1.19 1.54 3.58 3.3 8.28 3.38l13.44.55 13.93-1s13-.4 15.17-.84a31.52 31.52 0 0 0 5.2-1.91c.69.9 3.8 5.29-1.16 6.4z"
        fill="#dce6f2"
      />
      <path
        d="M808.94 430.32a8.77 8.77 0 0 1-2.2-.27l.2-.54a10.79 10.79 0 0 0 5.54-.25c.66-.17 1.31-.36 2-.56a22.68 22.68 0 0 1 9.65-1.09h.43a91.35 91.35 0 0 0 17.85-.8 6.64 6.64 0 0 0 3.82-1.53l.43.42a7.24 7.24 0 0 1-4.15 1.7 92.71 92.71 0 0 1-18 .8h-.42a29.2 29.2 0 0 0-5.91.17 30.71 30.71 0 0 0-3.55.89c-.66.2-1.32.4-2 .57a14.87 14.87 0 0 1-3.69.49z"
        fill="#575988"
        opacity=".5"
      />
      <path
        d="M890.87 238.35l-3.5 3.29-8.7-11.13a29.63 29.63 0 0 0 2.67-1.68z"
        opacity=".1"
      />
      <path
        d="M930.28 147.01l6.84 9.52v10s3.13 10.57 0 21.13l.35 9.22s-3.32 8.48-2.13 10.56c0 0-.6 6.25-8.63 10.57s-17.11 14.5-17.11 14.5-3.42 6.55-12.64 5.06l-8.78 3.72-10.11-12.94 13.68-7.44s4.76-6.4 7.59-6.1l11.6-13.51s.3-4.31 3.27-4.31c0 0-5.5-4.46-3.57-7.14s.3-14.58.3-14.58z"
        fill="#67647e"
      />
      <path
        d="M917.49 190.44s15.62-.29 17.55 3.72-12.79-5.95-17.55-3.72zM886.94 241.32a4.1 4.1 0 0 1-.06.78 5.26 5.26 0 0 1-4.92 4.47h-.28a5.25 5.25 0 0 1-5.25-5.25 5.38 5.38 0 0 1 .29-1.71c-2.48-2-2.61-5.58-2.55-7.37a11.31 11.31 0 0 0 3.7-1.31 24.6 24.6 0 0 0 2.59 5.29 5 5 0 0 1 1.22-.15 5.25 5.25 0 0 1 5.26 5.25z"
        opacity=".1"
      />
      <path
        d="M878.34 229.77s-3.52.79-3.52 1.43-.79 6.45 3.07 8.83 3.48-3.32 3.48-3.32-3.33-5.11-3.03-6.94z"
        fill="#575988"
      />
      <circle
        cx="882.28"
        cy="241.32"
        r="5.26"
        fill="#e4aab4"
      />
      <circle
        cx="882.28"
        cy="241.32"
        r="4.51"
        fill="#dce6f2"
      />
      <path
        d="M861.8 243.35s11.11 9.22 25.39 3.38v4.46s-9.52 6.54-18.15 2.58-7.24-10.42-7.24-10.42z"
        opacity=".1"
      />
      <path
        d="M861.8 242.16s11.14 9.22 25.39 3.35v4.46s-9.52 6.54-18.15 2.58-7.24-10.39-7.24-10.39z"
        opacity=".1"
      />
      <path
        d="M861.8 242.16s11.14 9.22 25.39 3.35v4.46s-9.52 6.54-18.15 2.58-7.24-10.39-7.24-10.39z"
        fill="#444053"
      />
      <path
        d="M862.1 242.16s11.11 9.22 25.39 3.38V250s-9.55 6.51-18.15 2.58-7.24-10.42-7.24-10.42z"
        opacity=".05"
      />
      <path
        d="M826.94 407.83s14.88 2.73 17.06 3.32-.6 1.64-.6 1.64-13.63-2.43-16.46-4.96zM826.55 399.95c.24 0 10.11-2.78 12.24-7.54M840.94 343.02s4 5.26 6.58 5.11-4.23-5.31-6.58-5.11zM843.16 351.75s1.68 3.72 4.16 2.53"
        opacity=".1"
      />
      <path
        d="M852.53 270.08l10.55 27.82s1.49-17.9-1.66-23.26a9.29 9.29 0 0 0-8.89-4.56z"
        opacity=".05"
      />
      <g opacity=".1">
        <path d="M878.5 49.64l-.09-.4-1.7-.45.19.83a12.18 12.18 0 0 0 1.6.02zM873.84 56.33l.18-.16a3.55 3.55 0 0 0 1-3.62 4.91 4.91 0 0 0-.84-1.35 13 13 0 0 1-2.45-.72c-.1 1.49 1.58 2.45 2.1 3.85a3 3 0 0 1 .01 2zM901.94 102.06a9.83 9.83 0 0 1-4-4.94c-.85-2-1.36-4.1-2.22-6.07a18.65 18.65 0 0 0-4-5.79 2.53 2.53 0 0 0-1.05-.73 2.84 2.84 0 0 0-2.17.6 10 10 0 0 1-3.3 1.45 3.57 3.57 0 0 1-3.31-1c-.92-1.1-.79-2.72-.52-4.13.58-3.08 1.54-6.11 1.55-9.24s-1.19-6.5-3.91-8c-2.4-1.37-5.38-1-8-1.75a10.16 10.16 0 0 1-3.74-1.92l-.21-.19a6.39 6.39 0 0 0-.65.31c-.43.23-.89.64-.77 1.11a1.19 1.19 0 0 0 .44.56 10.3 10.3 0 0 0 3.74 1.91c2.67.73 5.65.39 8.05 1.76 2.72 1.54 3.91 4.92 3.91 8s-1 6.16-1.55 9.23c-.27 1.41-.4 3 .52 4.13a3.52 3.52 0 0 0 3.31 1 10 10 0 0 0 3.3-1.44 2.89 2.89 0 0 1 2.17-.61 2.63 2.63 0 0 1 1 .73 18.88 18.88 0 0 1 4 5.79c.86 2 1.37 4.09 2.22 6.07a9.81 9.81 0 0 0 4 5c1.89 1 4.51 1 6-.63a4.72 4.72 0 0 0 .89-1.49 5.1 5.1 0 0 1-5.7.28zM910.48 94.51c1.49-1.88 3.44-3.48 4.84-5.46a13.93 13.93 0 0 0 .77-1.22c-1.8 2.29-4.27 4.14-5.61 6.68z" />
      </g>
      <g opacity=".1">
        <path d="M822.23 66.41h-236.6a12.4 12.4 0 0 0-12.37 12.36v149.49a12.4 12.4 0 0 0 12.37 12.36h185.6s4.81 25.53-11 28.27c0 0 35.38 2.54 29.2-28.27h32.79a12.39 12.39 0 0 0 12.36-12.36V78.77a12.39 12.39 0 0 0-12.35-12.36z" />
        <g opacity=".2">
          <rect
            x="608.09"
            y="106.09"
            width="191.66"
            height="11.68"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="608.09"
            y="158.29"
            width="158.15"
            height="11.68"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="608.09"
            y="132.19"
            width="113.85"
            height="11.68"
            rx="5.67"
            ry="5.67"
          />
        </g>
      </g>
      <path
        d="M825.32 64.34h-236.6a12.41 12.41 0 0 0-12.37 12.37V226.2a12.4 12.4 0 0 0 12.37 12.36h185.6s4.81 25.53-11 28.27c0 0 35.38 2.54 29.2-28.27h32.79a12.39 12.39 0 0 0 12.36-12.36V76.71a12.4 12.4 0 0 0-12.35-12.37z"
        fill="#fff"
      />
      <g
        opacity=".2"
        fill="#00c7fa"
      >
        <rect
          x="611.18"
          y="104.02"
          width="191.66"
          height="11.68"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="611.18"
          y="156.23"
          width="158.15"
          height="11.68"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="611.18"
          y="130.13"
          width="113.85"
          height="11.68"
          rx="5.67"
          ry="5.67"
        />
      </g>
      <path
        d="M81.13 552.99s3.56 4.66-1.65 11.7-9.51 13-7.77 17.37c0 0 7.86-13.07 14.26-13.25s2.2-7.96-4.84-15.82z"
        fill="#00c7fa"
      />
      <path
        d="M81.13 552.99a5.88 5.88 0 0 1 .72 1.46c6.25 7.34 9.57 14.18 3.57 14.36-5.59.16-12.29 10.15-13.9 12.68 0 .19.12.38.19.57 0 0 7.86-13.07 14.26-13.25s2.2-7.96-4.84-15.82z"
        opacity=".1"
      />
      <path
        d="M87.75 558.93c0 1.64-.18 3-.41 3s-.41-1.33-.41-3 .23-.87.46-.87.36-.77.36.87z"
        fill="#ffd037"
      />
      <path
        d="M90.03 560.89c-1.44.79-2.7 1.26-2.81 1.06s1-1 2.41-1.78.88-.21 1 0 .84-.06-.6.72z"
        fill="#ffd037"
      />
      <path
        d="M62.29 552.99s-3.56 4.66 1.65 11.7 9.51 13 7.77 17.37c0 0-7.86-13.07-14.26-13.25s-2.2-7.96 4.84-15.82z"
        fill="#00c7fa"
      />
      <path
        d="M62.29 552.99a5.88 5.88 0 0 0-.72 1.46c-6.25 7.34-9.57 14.18-3.57 14.36 5.59.16 12.29 10.15 13.9 12.68-.05.19-.12.38-.19.57 0 0-7.86-13.07-14.26-13.25s-2.2-7.96 4.84-15.82z"
        opacity=".1"
      />
      <path
        d="M55.67 558.93c0 1.64.18 3 .41 3s.41-1.33.41-3-.23-.87-.46-.87-.36-.77-.36.87z"
        fill="#ffd037"
      />
      <path
        d="M53.39 560.89c1.44.79 2.7 1.26 2.81 1.06s-1-1-2.41-1.78-.88-.21-1 0-.85-.06.6.72z"
        fill="#ffd037"
      />
      <ellipse
        cx="71.71"
        cy="612.01"
        rx="37.28"
        ry="5.72"
        fill="#00c7fa"
        opacity=".1"
      />
      <path
        d="M90.94 575.78l-.18 1.45-.25 2.06-.11.86-.25 2.05-.1.86-.25 2.06-2.86 23.39c-.25 2.09-3.66 3.72-7.78 3.72H64.3c-4.12 0-7.52-1.63-7.78-3.72l-2.86-23.38-.25-2.06-.1-.86-.25-2.05-.11-.86-.25-2.06-.18-1.45c-.14-1.18 1.71-2.18 4-2.18h30.31c2.36-.01 4.21.99 4.11 2.17z"
        fill="#65617d"
      />
      <path
        fill="#9d9cb5"
        d="M90.71 577.23l-.25 2.06H52.95l-.25-2.06h38.01zM90.36 580.15l-.25 2.05h-36.8l-.26-2.05h37.31zM90 583.06l-.25 2.06H53.66l-.25-2.06H90z"
      />
      <ellipse
        cx="645.79"
        cy="789.35"
        rx="84.04"
        ry="13.79"
        fill="#00c7fa"
        opacity=".1"
      />
      <g opacity=".1">
        <path d="M743.13 365.87H486.74a13.44 13.44 0 0 0-13.4 13.4v162a13.44 13.44 0 0 0 13.4 13.4h201.13s5.21 27.66-11.91 30.63c0 0 38.33 2.75 31.63-30.63h35.54a13.44 13.44 0 0 0 13.4-13.4v-162a13.44 13.44 0 0 0-13.4-13.4z" />
        <g opacity=".2">
          <rect
            x="511.08"
            y="465.45"
            width="207.7"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
          <rect
            x="511.08"
            y="437.16"
            width="90.06"
            height="12.66"
            rx="5.67"
            ry="5.67"
          />
        </g>
      </g>
      <path
        d="M740.94 363.64H484.5a13.44 13.44 0 0 0-13.4 13.4v162a13.44 13.44 0 0 0 13.4 13.4h201.13s5.21 27.66-11.91 30.64c0 0 38.34 2.75 31.64-30.64h35.58a13.44 13.44 0 0 0 13.4-13.4v-162a13.44 13.44 0 0 0-13.4-13.4z"
        fill="#fff"
      />
      <g
        opacity=".2"
        fill="#00c7fa"
      >
        <rect
          x="508.85"
          y="463.22"
          width="207.7"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
        <rect
          x="508.85"
          y="434.93"
          width="90.06"
          height="12.66"
          rx="5.67"
          ry="5.67"
        />
      </g>
      <path
        d="M755.21 823.46c-1.21-5.13-2-9.64-2-9.64s.28-5.59-2.23-9.79V792.3a34.65 34.65 0 0 1 2.61-5.41c1.86-3.25 0-15.15 0-15.15s-6.9-16.78-5.22-27.42-14.17-47.27-14.17-47.27a46.49 46.49 0 0 1 1.49-10.46 8.09 8.09 0 0 0 .2-2.19 2.35 2.35 0 0 0 0-.27v.09c-.24-7-5.79-20.18-5.79-20.18l.75-25.07s3.54-14.79-2.24-34.64c-2-6.92-3.31-12.47-4.13-16.74-.09-.49-.18-1-.26-1.4 11.9-1.81 21-3.32 21-3.32S738.34 554 733.68 549s-8.38-21-8.38-21-2.43-20.39 1.49-26.34 4.47-16.23 4.47-16.23 9-6.5 10.07-9.38 3-9.38 3-12.81-1.12-6.5-.75-8.3-2.61-8.66-1.12-11.91a8.75 8.75 0 0 0 .6-3.13v-.09a44.22 44.22 0 0 0-.79-8.46 24 24 0 0 0-8.85-4.73l-.2-.78-.5-2c-.3-.2-.59-.37-.88-.53v-.74l-.09-2.93 1.41-6.58c2.75-11.46-12.54-13.17-12.54-13.17a8 8 0 0 0-4.33-3.79c-3.08-1.08-.51 17.23.93 18.4 1.08.88 4.42 6.62 6 9.44l.26.47a5.61 5.61 0 0 0-.7.73l.58 4 .09.61a16.66 16.66 0 0 0-2.44 4.16s2.8 3.07 2.24 6.5.85 7.7.92 7.93c-.16-.19-2.13-2.32-4.09-1.8s-7.46 2.17-7.46 2.17-4.1.72-3.72 1.62-2.8 4.87-2.8 4.87l-11-10.44c-.1-.31-.22-.62-.32-.95a26.19 26.19 0 0 1-1-4.57 26.15 26.15 0 0 0 3.52-1.12 7.62 7.62 0 0 0 3-1.95c1.11-1.32 1.32-3.11 1.77-4.75.88-3.21 2.75-6.07 4.09-9.12a29.6 29.6 0 0 0 2.2-16.37 10.81 10.81 0 0 0-1.69-4.79c-1.8-2.48-5.06-3.48-7.44-5.46s-3.9-5-6.66-6.47c-2.5-1.34-5.55-1.18-8.37-.72a45.09 45.09 0 0 0-15.61 5.68c-1.61.95-3.37 2.05-5.22 1.72-1.58-.29-2.74-1.56-3.77-2.77 0-.05 0-.1.05-.15l-.12-.14a19.37 19.37 0 0 0-1.63 8.17c0 .44 0 .88.05 1.32V403.16a2 2 0 0 1-.08.59 4.3 4.3 0 0 1-1 1.49 7.84 7.84 0 0 0-.9 1.22 4 4 0 0 1 .15-.45 6.55 6.55 0 0 0-1.14 3.48 3.44 3.44 0 0 0 .82 2.48 12 12 0 0 0 1.8 1.45 21 21 0 0 0 10 21.84c.13.31.26.63.38.95 1.41 3.71 2.47 8 2 12 0 .3-.08.59-.14.88s-.27.3-.39.46-18.19.18-22.48-3.7-10.81 9.47-10.81 9.47-6.52 1.26-7.82 0-8.95-.18-8.95-.18a16.45 16.45 0 0 0-11.32-4.14 33.64 33.64 0 0 0-8.34-4.64l-.2-.07a9.38 9.38 0 0 0-4.1-.52s-8.95-7.4-11.56-11.36-15-18.69-15.09-18.76v-.71l-.14-2.15a7.11 7.11 0 0 1-1.11.1c-.07-.21-.15-.46-.25-.74a41.55 41.55 0 0 0-2.64-6.07s0-2.7.79-3.38-.33-10.6-.33-10.6-8.06-18.85-15.28-4.78c0 0-13.65 9.11-2.19 19.71 0 0 4.57 2.21 5.21 4 .43 1.14 2 4.32 3 6.43l.47.95-.13.11.17 1.77.07.68c-2.16 1.23-3.62 2.44-3.27 3.36a20.34 20.34 0 0 1 1.31 4.87s15.78 19.8 17.83 28.3c0 0 42.49 25.25 56.47 27.05l-2.42 12.63a101 101 0 0 0-.56 10.28c.18 2.71-1.68 15-1.68 15s-2.42 18-4.47 20.56-1.63 13.33-1.63 13.33a91.14 91.14 0 0 1-2.8 15.33c-2 6.86-.56 15.34-.56 15.34s-7.08 16.23 9.88 5.23c0 0 8.33-.52 17.92-.85v1c0 1.23 0 2.57-.06 4-.13 9.3-.18 22.11.24 31.81.75 17.13 6 51.05 6 51.05v17a23.4 23.4 0 0 0-.49 4.87 31.75 31.75 0 0 0 4.59 17.06l1.31 11.36s3.06 7.49 3.12 12a6.93 6.93 0 0 1-.13 1.09 7.76 7.76 0 0 0-.15 1.74c-.17 5.16 2.94 17.5 2.94 17.5s.18 12.45 2 13.17c1.59.62-2.13 7.18-3.24 9.06 0-.12 0-.24-.07-.36l-.23.38a8.72 8.72 0 0 0-.58 3.14 4.53 4.53 0 0 0 2.07 4.38c3.54 2.16 5.44 4 2.43 4.69a32.28 32.28 0 0 0-3.28.69l-.16-.42a2 2 0 0 0-1.22 2.18 9.08 9.08 0 0 0 1.11 4.22c3 6.68 5 9.2 5 9.2l1.44-.16a7.71 7.71 0 0 1-.83 1.54 5.94 5.94 0 0 1-2.11 1.87 6.36 6.36 0 0 1-2.55.87 7.21 7.21 0 0 0-5.28 2.57c-1.86 2.41-3 5.68.65 8.56l13.33 4.6s22.92 3 21.71-2.17-2-9.65-2-9.65a20.32 20.32 0 0 0-1.86-9.12 12.23 12.23 0 0 0-.81-1.34l.81-.09s1.68-11.37 3.91-13.53c.52-.5.64-.88.51-1.18.23-.62-.35-1-1.1-1.19l-.16.45a10.91 10.91 0 0 0-2.23-.25s-.74-5.95 1.68-8.11a2.3 2.3 0 0 0 .47-1.77 9.94 9.94 0 0 0-.25-2.43l-.09.14c-1.22-5.4-5.35-14-5.35-14s-.19-5.41 1.31-7.58-.19-29.4-.19-29.4.56-13.17-1.12-19.3 2.05-13.35 2.05-13.35v-.4l.05-.09s-.09-.81-.22-2.07v.12c-.38-3.48-1.09-9.8-1.61-12.72-.75-4.15.18-24 .18-24l3.36-8.48 6 14.62 6.34 19.48s3.14 4.11 3.21 8.28a4.08 4.08 0 0 1 0 .61 11.75 11.75 0 0 0-.07 1.31 11.54 11.54 0 0 0 1.93 6.93s1.68 9.2 4.29 11.55 2.61 6.85 2.61 6.85 3.16 13.35 4.66 15.7c1.25 2 1.32 7.41 1.31 9.07v.49s.44 4.77.42 8.78v1.43a.43.43 0 0 1 0-.11 14.65 14.65 0 0 1-.39 3.25s0 .12-.06.19l.06-.68a34.37 34.37 0 0 0-1 8.32c-.09 4.8.64 10.48 3.55 13.81 5 5.78 8.2 5.06 8.2 5.06s-2.42 7.21-5.41 8.65a1.69 1.69 0 0 0-.31.21c0-.14-.06-.28-.08-.42a3.5 3.5 0 0 0-.87 2.69c-.22 3.17 1.78 8.32 3.69 10.69a5.82 5.82 0 0 0 2.52 1.47l-.47.29a10.25 10.25 0 0 1-1 .49 4.83 4.83 0 0 1-1.52.39 7.14 7.14 0 0 0-5.28 2.57c-1.86 2.4-3 5.67.65 8.55l13.33 4.6s22.77 2.94 21.56-2.21z"
        transform="translate(-61.06 -43.49)"
        fill="url(#b)"
      />
      <path
        d="M606.59 788.51l-12.9-4.6c-3.56-2.88-2.42-6.15-.63-8.56a6.9 6.9 0 0 1 5.11-2.57 6 6 0 0 0 2.47-.87 5.79 5.79 0 0 0 2-1.87 9.43 9.43 0 0 0 1.47-5s14.17-4.15 18 0a10.66 10.66 0 0 1 1.72 2.51 21 21 0 0 1 1.8 9.12s.73 4.51 1.89 9.65-20.93 2.19-20.93 2.19zM669.73 782.14l-12.9-4.6c-3.56-2.88-2.43-6.15-.63-8.55a6.83 6.83 0 0 1 5.11-2.57 4.53 4.53 0 0 0 1.47-.39 7.58 7.58 0 0 0 1-.49c3.6-2 3.51-6.85 3.51-6.85s14.16-4.15 18 0a9.67 9.67 0 0 1 1.35 1.84c2.44 4.2 2.17 9.8 2.17 9.8s.72 4.51 1.89 9.65-20.97 2.16-20.97 2.16z"
        fill="#2d293d"
      />
      <path
        d="M622.19 765.05a10.66 10.66 0 0 1 1.72 2.51l-21.23 2.46a9.43 9.43 0 0 0 1.47-5s14.17-4.12 18.04.03zM686.68 760.51v4c-3.29 5.44-19.26 4.25-23.9 1.52a7.58 7.58 0 0 0 1-.49c3.6-2 3.51-6.85 3.51-6.85s14.16-4.15 18 0a9.67 9.67 0 0 1 1.39 1.82z"
        opacity=".1"
      />
      <path
        d="M689.21 743.4a36.78 36.78 0 0 0-2.53 5.41v14.25c-3.6 6-22.36 4-24.89.72s-5.23-11.72-2.34-13.16 5.23-8.66 5.23-8.66-3.07.72-7.94-5.05-3.43-18.58-2.52-21.65 0-13.35 0-13.35.18-7.21-1.27-9.56-4.51-15.69-4.51-15.69 0-4.51-2.52-6.86-4.15-11.54-4.15-11.54a11.85 11.85 0 0 1-1.83-7.75c.55-4.51-3.06-9.38-3.06-9.38l-6.13-19.48-5.78-14.61-3.22 8.47s-.91 19.84-.18 24 1.8 15.15 1.8 15.15-3.61 7.22-2 13.35 1.08 19.3 1.08 19.3 1.62 27.24.18 29.4-1.26 7.58-1.26 7.58 7.39 15.87 5 18-1.63 8.12-1.63 8.12 5 0 2.89 2.16-3.69 13.56-3.69 13.56l-21.81 2.52s-2-2.52-4.89-9.2.54-6 3.45-6.67 1.06-2.53-2.36-4.69-1.45-7-1.45-7 5.23-8.84 3.43-9.57-2-13.16-2-13.16-3.61-14.8-2.71-18.76-2.89-13.53-2.89-13.53l-1.26-11.37a31.27 31.27 0 0 1-4-21.46v-17.53s-5-33.91-5.77-51.05c-.46-11-.33-25.95-.18-35.3.09-5.24.18-8.71.18-8.71l77.95-8.14a64.36 64.36 0 0 0 1.41 11.57c.79 4.28 2 9.82 4 16.75 5.59 19.84 2.16 34.63 2.16 34.63l-.72 25.08s6.86 16.77 5.41 22.55a48 48 0 0 0-1.44 10.46s15.33 36.62 13.71 47.26 5 27.42 5 27.42 1.85 11.92.05 15.17z"
        fill="#575988"
      />
      <path
        d="M644.65 649.42l23.73-3.16s-13.44 13.71-23.73 3.16z"
        opacity=".05"
      />
      <path
        d="M664.94 623.08s.81 8.39-4.33 11.55c.01 0 9.21-1.45 4.33-11.55zM663.49 596.39s-19.83 16.32-27 15 27-15 27-15zM615.25 657.09s-15.06 3.42-15.51 9.47 15.51-9.47 15.51-9.47z"
        opacity=".1"
      />
      <path
        d="M618.56 732.31s-21.28 4-15.24 6.67 16 4.87 16 4.87 6.82.36-.76-11.54z"
        opacity=".05"
      />
      <g opacity=".05">
        <path d="M599.02 743.28a4.24 4.24 0 0 1-1.94-3.09l-.22.38s-2 4.87 1.44 7c.4.25.77.5 1.11.74.64-.12 1.32-.21 2-.37 2.88-.7 1.04-2.5-2.39-4.66zM626.44 741.83c.59-.54.57-1.93.21-3.71a10.06 10.06 0 0 0-1.21 5.23 4.38 4.38 0 0 1 1-1.52zM623.17 652.09a24.26 24.26 0 0 0-1.44 6.63 26.12 26.12 0 0 1 1.65-4.56s-.08-.81-.21-2.07zM671.94 642.62a8.3 8.3 0 0 0 .2-2c-.27 1.34-.46 2.59-.59 3.69.07-.53.2-1.1.39-1.69zM622.65 716.22a11.5 11.5 0 0 0 .54-4 13.59 13.59 0 0 0-1 5.06 4.88 4.88 0 0 1 .46-1.06zM627.12 750.23a71 71 0 0 0-2.48 11.08l-21.81 2.53s-2-2.53-4.89-9.2c-.25-.59-.45-1.11-.61-1.59-1.31.6-1.82 2-.11 5.92 2.89 6.67 4.88 9.2 4.88 9.2l21.84-2.53s1.62-11.36 3.78-13.53c1.05-1.06.37-1.6-.6-1.88zM598.3 717.84s.18 12.45 2 13.17c.91-2.06 1.52-4 .71-4.34-1.81-.72-2-13.17-2-13.17s-3.6-14.79-2.7-18.76-2.89-13.53-2.89-13.53l-1.26-11.36a31.23 31.23 0 0 1-4-21.47v-17.5s-5-33.91-5.77-51c-.46-11-.33-26-.18-35.3 0-1.69.05-3.19.08-4.45l-.62.06s-.1 3.47-.18 8.72c-.16 9.34-.29 24.32.18 35.29.72 17.14 5.77 51.05 5.77 51.05v17.5a31.23 31.23 0 0 0 4 21.47l1.27 11.29s3.79 9.56 2.89 13.53 2.7 18.8 2.7 18.8zM662.52 758.97a21 21 0 0 1-3.45-8.57c-2.23 2 .33 9.81 2.73 12.9 2.52 3.24 21.28 5.23 24.89-.72v-3.44c-4.88 4.84-21.75 2.9-24.17-.17zM689.94 738.59a35 35 0 0 0-2.53 5.41v2.51c.41-.93 1-2.16 1.81-3.62a10.79 10.79 0 0 0 .79-4.46.61.61 0 0 0-.07.16zM663.63 741.43a34.82 34.82 0 0 0 1.78-4.29s-3.07.72-7.94-5c-3.55-4.2-3.75-12.13-3.24-17.31-.91 3.06-2.35 15.87 2.52 21.64 3.19 3.73 5.59 4.72 6.88 4.96zM654.22 701.43a96.4 96.4 0 0 1 .36 10.69 15.59 15.59 0 0 1 .37-1.68c.91-3.06 0-13.34 0-13.34s.18-7.22-1.26-9.56-4.51-15.7-4.51-15.7 0-4.51-2.52-6.85-4.15-11.55-4.15-11.55a11.81 11.81 0 0 1-1.81-7.75c.54-4.51-3.06-9.38-3.06-9.38l-6.14-19.49-5.77-14.61-3.25 8.48s0 1.07-.11 2.74l2.64-6.89 5.77 14.61 6.16 19.49s3.61 4.87 3.07 9.38a11.81 11.81 0 0 0 1.81 7.75s1.62 9.2 4.14 11.55 2.53 6.85 2.53 6.85 3.07 13.35 4.51 15.7 1.22 9.56 1.22 9.56z" />
      </g>
      <path
        d="M669.37 369.51l-1.36 6.58.08 2.93.06 2.17-7.53.77-.84-1.56c-1.56-2.82-4.79-8.56-5.84-9.44-1.39-1.17-3.87-19.48-.89-18.4a7.88 7.88 0 0 1 4.19 3.8s14.79 1.74 12.13 13.15z"
        fill="#ffcdd3"
      />
      <path
        d="M668.15 381.23l-7.53.77-.84-1.56a6.65 6.65 0 0 1 8.31-1.37z"
        opacity=".1"
      />
      <path
        d="M670.05 384.79l-9.93 2.3-.2-1.48-.57-4s3.93-5.24 9.61-1.31l.49 2z"
        fill="#dce6f2"
      />
      <path
        d="M509.27 370.27l-10.59 5.68-1-2c-1-2.11-2.51-5.29-2.92-6.43-.63-1.75-5.05-4-5.05-4-11.09-10.6 2.12-19.71 2.12-19.71 7-14.07 14.79 4.78 14.79 4.78s1.08 9.93.32 10.6-.77 3.38-.77 3.38a41.06 41.06 0 0 1 2.56 6.07c.37 1.01.54 1.63.54 1.63z"
        fill="#ffcdd3"
      />
      <path
        d="M509.27 370.27l-10.59 5.68-1-2c1.49-1.24 6.8-5.54 8.54-5.35a13.32 13.32 0 0 0 2.51.07c.37.98.54 1.6.54 1.6z"
        opacity=".1"
      />
      <path
        d="M510.35 373.51l-11.9 5.87-.24-2.56-.17-1.77s6.9-5.91 8.94-5.69a10.76 10.76 0 0 0 3.11 0l.13 2.14z"
        fill="#dce6f2"
      />
      <path
        d="M640.51 413.29s-51.92 5.86-42.21 2.71c6.75-2.2 9.43-6.49 10-11.26.45-4-.57-8.3-1.94-12a51.64 51.64 0 0 0-4.64-9.38s39.69-21.83 31.75-2a31.8 31.8 0 0 0-2.25 9.4 26.28 26.28 0 0 0 1 9.51 28.27 28.27 0 0 0 8.29 13.02z"
        fill="#ffcdd3"
      />
      <path
        d="M633.47 381.37a31.8 31.8 0 0 0-2.25 9.4c-3.74 3.14-7.84 2.93-13.1 2.93-4 0-8.52 1-11.76-1a51.64 51.64 0 0 0-4.64-9.38s39.69-21.81 31.75-1.95z"
        opacity=".1"
      />
      <circle
        cx="617.41"
        cy="373.61"
        r="21.47"
        fill="#ffcdd3"
      />
      <path
        d="M640.51 413.29s-51.92 5.86-42.21 2.71c6.75-2.2 9.43-6.49 10-11.26 2.58-2.8 7.77-4.82 11.11-5.89a15.51 15.51 0 0 1 9.41-.15 13.07 13.07 0 0 1 3.42 1.58 28.27 28.27 0 0 0 8.27 13.01zM670.05 384.79l-9.93 2.3-.2-1.48a8.77 8.77 0 0 1 9.53-3.26zM510.35 373.51l-11.9 5.87-.24-2.56a87.48 87.48 0 0 1 12-5.32zM661.04 544.1c-20.1 3.18-48.72 7.31-53.26 5.93-3.76-1.15-15.79-1-26.26-.67.09-5.24.18-8.71.18-8.71l77.93-8.14a64.36 64.36 0 0 0 1.41 11.59z"
        opacity=".1"
      />
      <path
        d="M681.09 539.38s-66.2 11.37-73.31 9.2-43.58.18-43.58.18c-16.41 11-9.56-5.23-9.56-5.23s-1.44-8.48.54-15.33a93.37 93.37 0 0 0 2.76-15.33s-.36-10.83 1.62-13.35 4.33-20.57 4.33-20.57 1.81-12.26 1.63-15a102.58 102.58 0 0 1 .54-10.28l2.34-12.63c-13.53-1.8-54.66-27.06-54.66-27.06-2-8.47-17.31-28.32-17.31-28.32a20.6 20.6 0 0 0-1.27-4.87c-1.08-2.88 15.16-8.65 15.16-8.65s12.08 14.79 14.61 18.76 11.18 11.36 11.18 11.36a8.8 8.8 0 0 1 4 .52l.21.06a32.34 32.34 0 0 1 8.08 4.64 15.66 15.66 0 0 1 11 4.15s7.4-1.08 8.66.18 7.58 0 7.58 0 6.31-13.35 10.46-9.47 21.75 3.7 21.75 3.7c2.35-3.12 8.06-5.36 11.63-6.51a15.58 15.58 0 0 1 9.41-.15 12.13 12.13 0 0 1 3.71 1.79l10.68 10.46s3.07-4 2.71-4.87 3.61-1.62 3.61-1.62 5.23-1.63 7.21-2.17 3.8 1.61 4 1.8c-.06-.23-1.42-4.6-.89-7.93s-2.17-6.5-2.17-6.5c6.32-15.51 20.57-2.52 20.57-2.52s1.62 8.48.18 11.72 1.44 10.11 1.08 11.91.72 4.87.72 8.3-1.8 9.92-2.89 12.8-9.74 9.38-9.74 9.38-.54 10.29-4.33 16.24-1.55 26.34-1.55 26.34 3.61 15.91 8.15 21 11.15 33.87 11.15 33.87z"
        fill="#656691"
      />
      <path
        d="M584.59 420.69s-2-5.95-3.79-6.49a42.93 42.93 0 0 1-5.23-2.35l1.16-2.22s6.77 1.86 7.86 3.84 0 7.22 0 7.22zM548.33 407.51c-.36 1.8-16.42 3.43-16.42 3.43l8.12-8.14.2.07a32.34 32.34 0 0 1 8.1 4.64z"
        opacity=".1"
      />
      <circle
        cx="501.87"
        cy="382.76"
        r="1.44"
        fill="#575988"
      />
      <circle
        cx="503.72"
        cy="385.65"
        r="1.44"
        fill="#575988"
      />
      <circle
        cx="505.53"
        cy="388.31"
        r="1.44"
        fill="#575988"
      />
      <circle
        cx="507.42"
        cy="391.2"
        r="1.44"
        fill="#575988"
      />
      <circle
        cx="677.46"
        cy="391.04"
        r="1.17"
        fill="#575988"
      />
      <circle
        cx="677.64"
        cy="393.7"
        r="1.17"
        fill="#575988"
      />
      <circle
        cx="677.8"
        cy="396.36"
        r="1.17"
        fill="#575988"
      />
      <path
        d="M584.68 469.57c-.17-.21 40.49 51.14 72.06 21.47 0 0-49.88 6.76-72.06-21.47zM561.32 496.27s24.33.66 26.87 7.66v7.29a4.65 4.65 0 0 1-4.52 0c-2.45-1.33-17.17-8.8-22.35-5.21z"
        opacity=".1"
      />
      <path
        d="M561.77 496.27s23.27.63 25.7 7.31v6.93a4.46 4.46 0 0 1-4.33 0c-2.34-1.26-16.41-8.39-21.37-5z"
        fill="#656691"
      />
      <path
        d="M574.6 443.43a78.61 78.61 0 0 0 9.43 16.19 63.48 63.48 0 0 0 14.78 14.27S575 446.78 574.6 443.43zM566.64 415.16s4.06 17.52 14.52 23.48zM560.41 416.93c-.1-.32-3.6 13.86 13.49 21.71.04 0-7.26-2.47-13.49-21.71zM666.66 405.18c-.27 0 8.44 5.54 10.8 8.11 0 0-5.66-8.47-10.8-8.11z"
        opacity=".1"
      />
      <path
        d="M611.61 393.07a4.57 4.57 0 0 0 1.68 2.9 4.63 4.63 0 0 0 2 .45c6.55.4 13.36.69 19.41-1.83a7.34 7.34 0 0 0 3-1.95c1.08-1.32 1.28-3.11 1.72-4.75.84-3.21 2.65-6.07 4-9.12a30.59 30.59 0 0 0 2.12-16.37 10.85 10.85 0 0 0-1.63-4.79c-1.74-2.48-4.9-3.48-7.2-5.45s-3.77-5-6.45-6.48c-2.42-1.34-5.37-1.18-8.1-.72a42.74 42.74 0 0 0-15.22 5.68c-1.55.95-3.26 2.05-5 1.72-1.57-.3-2.71-1.62-3.72-2.85a20 20 0 0 0-1.6 9.35 4.16 4.16 0 0 1 0 1.41 4.35 4.35 0 0 1-1 1.49c-1.62 1.87-2.63 4.84-1 6.73.69.83 1.76 1.28 2.44 2.12 1.21 1.51.8 3.67.77 5.61a2.86 2.86 0 0 0 .48 1.9 2.77 2.77 0 0 0 2.65.63 7.35 7.35 0 0 1 2.82-.27 4.64 4.64 0 0 1 2.45 1.89c2.94 3.84 4.11 8.07 5.38 12.7z"
        fill="#2d293d"
      />
      <g opacity=".1">
        <path d="M638.39 390.98a7.26 7.26 0 0 1-3 2c-6 2.52-12.86 2.23-19.41 1.82a4.36 4.36 0 0 1-2-.45 4.54 4.54 0 0 1-1.68-2.9c-1.27-4.62-2.44-8.85-5.47-12.69a4.64 4.64 0 0 0-2.45-1.89 7.16 7.16 0 0 0-2.82.27 2.79 2.79 0 0 1-2.62-.63 2.88 2.88 0 0 1-.48-1.91c0-1.93.44-4.1-.77-5.6-.68-.85-1.74-1.29-2.44-2.12a4.24 4.24 0 0 1-.42-4.31c-1.14 1.82-1.64 4.16-.3 5.75.69.83 1.76 1.28 2.44 2.12 1.21 1.51.8 3.67.77 5.61a2.86 2.86 0 0 0 .48 1.9 2.77 2.77 0 0 0 2.65.63 7.35 7.35 0 0 1 2.82-.27 4.64 4.64 0 0 1 2.45 1.89c3 3.84 4.2 8.07 5.47 12.7a3.39 3.39 0 0 0 3.7 3.35c6.55.4 13.36.69 19.41-1.83a7.34 7.34 0 0 0 3-1.95 5.73 5.73 0 0 0 .93-1.74 3.06 3.06 0 0 1-.26.25zM596.62 359.7a3 3 0 0 0 .66-1.08 4.17 4.17 0 0 0 0-1.41 19.9 19.9 0 0 1 1-7.77l-.12-.14a19.86 19.86 0 0 0-1.6 9.35 6.15 6.15 0 0 1 .06 1.05z" />
      </g>
      <path
        d="M607.78 406.08s26.82 3.55 29.23-.48M659.94 394.98s14.89 0 18.17 5.61"
        opacity=".1"
      />
      <path
        d="M980.68 381.51s1.86 2.43-.86 6.11-5 6.79-4.06 9.08c0 0 4.11-6.83 7.45-6.93s1.15-4.2-2.53-8.26z"
        fill="#00c7fa"
      />
      <path
        d="M980.68 381.51a3.29 3.29 0 0 1 .38.76c3.26 3.84 5 7.41 1.86 7.5-2.92.09-6.42 5.31-7.26 6.63 0 .1.06.2.1.3s4.11-6.83 7.45-6.93 1.15-4.2-2.53-8.26z"
        opacity=".1"
      />
      <path
        d="M984.14 384.56c0 .86-.09 1.56-.21 1.56s-.22-.7-.22-1.56.12-.45.24-.45.19-.4.19.45z"
        fill="#ffd037"
      />
      <path
        d="M985.33 385.59c-.75.41-1.41.66-1.46.55s.5-.52 1.26-.93.45-.11.51 0 .45-.03-.31.38z"
        fill="#ffd037"
      />
      <path
        d="M970.84 381.51s-1.87 2.43.86 6.11 5 6.79 4.06 9.08c0 0-4.11-6.83-7.46-6.93s-1.14-4.2 2.54-8.26z"
        fill="#00c7fa"
      />
      <path
        d="M970.84 381.51a3.05 3.05 0 0 0-.39.76c-3.26 3.84-5 7.41-1.86 7.5 2.92.09 6.43 5.31 7.27 6.63 0 .1-.06.2-.1.3s-4.11-6.83-7.46-6.93-1.14-4.2 2.54-8.26z"
        opacity=".1"
      />
      <path
        d="M967.37 384.56c0 .86.1 1.56.22 1.56a3.16 3.16 0 0 0 .21-1.56c0-.85-.12-.45-.24-.45s-.19-.4-.19.45z"
        fill="#ffd037"
      />
      <path
        d="M966.18 385.59c.76.41 1.41.66 1.47.55s-.51-.52-1.26-.93-.46-.11-.52 0-.44-.03.31.38z"
        fill="#ffd037"
      />
      <path
        d="M967.94 396.33s5.21-.16 6.78-1.28 8-2.45 8.41-.66 7.83 8.92 2 9-13.67-.91-15.24-1.87-1.95-5.19-1.95-5.19z"
        fill="#a8a8a8"
      />
      <path
        d="M985.2 402.74c-5.88 0-13.67-.92-15.23-1.87-1.2-.73-1.67-3.34-1.83-4.54h-.2s.33 4.21 1.9 5.16 9.35 1.92 15.24 1.87c1.7 0 2.28-.62 2.25-1.51-.22.54-.86.88-2.13.89z"
        opacity=".2"
      />
    </svg>
  );
}

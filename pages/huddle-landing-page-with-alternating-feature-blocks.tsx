import dynamic from "next/dynamic";
import Head from "next/head";
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
    <footer>
      <p className="text-center text-[11px] [&_a]:text-[hsl(228,45%,44%)]">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </p>
    </footer>
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

{
  /*`
  Grow Together

  Generate meaningful discussions with your audience and build a strong, loyal community. 
  Think of the insightful conversations you miss out on with a feedback form. 

  Flowing Conversations

  You wouldn't paginate a conversation in real life, so why do it online? Our threads 
  have just-in-time loading for a more natural flow.

  Your Users

  It takes no time at all to integrate Huddle with your app's authentication solution. 
  This means, once signed in to your app, your users can start chatting immediately.

  Ready To Build Your Community?

  Get Started For Free

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua

  +1-543-123-4567
  example@huddle.com

  About Us
  What We Do
  FAQ

  Career
  Blog
  Contact Us

  &copy; Copyright 2018 Huddle. All rights reserved.
`*/
}

import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function HuddleLandingPageWithSingleIntroductorySection() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Huddle landing page with single introductory section</title>
      </Head>
      <div className="App font-open-sans bg-huddle-intro-primary-violet relative flex min-h-[100svh] flex-col items-center bg-[url('/huddle-landing-page-with-single-introductory-section/images/bg-mobile.svg')] bg-contain bg-[position:center_top] bg-no-repeat pt-[32px] pb-[40.15px] lg:bg-[url('/huddle-landing-page-with-single-introductory-section/images/bg-desktop.svg')] lg:bg-[position:center_left] lg:py-[55px]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/huddle-landing-page-with-single-introductory-section/design/"
          absolutePath="/huddle-landing-page-with-single-introductory-section/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  return (
    <div className="w-[calc(100vw-72px)] max-w-[calc(375px-72px)] lg:w-[calc(100vw-160px)] lg:max-w-[calc(1440px-160px)]">
      <Logo />
      <div className="flex flex-col items-center lg:mt-[92px] lg:grid lg:grid-cols-[calc(696/1440*100vw),auto] lg:grid-rows-1">
        <Mockup />
        <main className="lg:ml-[min(calc(58/1440*100vw),58px)] lg:self-start lg:pr-1 lg:pt-[39px]">
          <h1 className="font-poppins text-center text-[24px] font-semibold text-white lg:text-left lg:text-[40px]">Build The Community Your Fans Will Love</h1>
          <p className="mt-[13px] text-center text-white/75 lg:mt-[20px] lg:text-left lg:text-[18px]">Huddle re-imagines the way we build communities. You have a voice, but so does your audience. Create connections with your users as you engage in genuine discussion.</p>
          <a
            href=""
            className="text-huddle-intro-primary-violet font-poppins hover:bg-huddle-intro-primary-magenta mx-auto mt-6 flex h-[40px] w-[200px] items-center justify-center rounded-full bg-white pt-[2.2px] text-[12px] shadow-xl hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:ml-0 lg:h-[56px] lg:pt-0 lg:text-[18px]"
          >
            Register
          </a>
        </main>
      </div>
      <SocialMedia />
    </div>
  );
}

function Footer() {
  return (
    <p className="[&_a]:text-huddle-intro-primary-magenta absolute bottom-3 z-20 w-full text-center text-[11px] text-white lg:bottom-10 lg:px-20 lg:text-left lg:text-[13px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-white/50 [&_a]:decoration-wavy">
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
  );
}

function SocialMedia() {
  return (
    <div className="[&_a:hover]:border-huddle-intro-primary-magenta mt-[64px] flex items-center justify-center gap-[10px] place-self-center lg:absolute lg:bottom-[40px] lg:right-[80px] lg:z-40 lg:mt-0 lg:gap-[16px] lg:place-self-start [&_a]:flex [&_a]:aspect-square [&_a]:w-[28px] [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border lg:[&_a]:w-10">
      <a
        href=""
        className="group"
      >
        <svg
          className="group-hover:fill-huddle-intro-primary-magenta h-[14px] fill-white lg:h-[18.5px]"
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
          className="group-hover:fill-huddle-intro-primary-magenta h-[13px] fill-white lg:h-[17px]"
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
          className="group-hover:fill-huddle-intro-primary-magenta h-[14px] fill-white lg:h-[20px]"
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

function Mockup() {
  return (
    <svg
      className="mx-[.75px] my-[60px] lg:my-0 lg:mx-0 lg:w-[calc(696/1440*100vw)] lg:origin-center lg:scale-[calc(696/683.25)]"
      viewBox="0 0 709 506"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect
          id="b"
          width="657.638"
          height="410.833"
          rx="13.701"
        />
        <filter
          x="-1.6%"
          y="-2.6%"
          width="103.2%"
          height="105.1%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="3.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <path
          d="M13.7 0h630.237c7.567 0 13.7 6.134 13.7 13.7v30.122H0V13.701C0 6.134 6.134 0 13.7 0z"
          id="d"
        />
        <filter
          x="-1.6%"
          y="-24%"
          width="103.2%"
          height="147.9%"
          filterUnits="objectBoundingBox"
          id="c"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="3.5"
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
        <path
          d="M11.691 0h195.83c6.457 0 11.692 5.234 11.692 11.691v327.195c0 6.457-5.235 11.692-11.692 11.692H11.691C5.234 350.578 0 345.343 0 338.886V11.691C0 5.234 5.234 0 11.691 0z"
          id="i"
        />
        <filter
          x="-4.1%"
          y="-2.6%"
          width="108.2%"
          height="105.1%"
          filterUnits="objectBoundingBox"
          id="h"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="3"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0.145098039 0 0 0 0 0.180392157 0 0 0 0.181838768 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <path
          d="M11.691 0h195.83c6.457 0 11.692 5.234 11.692 11.691v25.704H0V11.691C0 5.234 5.234 0 11.691 0z"
          id="k"
        />
        <filter
          x="-4.1%"
          y="-24.1%"
          width="108.2%"
          height="148.1%"
          filterUnits="objectBoundingBox"
          id="j"
        >
          <feOffset
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="3"
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
        fill-rule="evenodd"
      >
        <g transform="translate(7 7)">
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
            x="49.323"
            y="13.694"
            width="137.008"
            height="16.433"
            rx="3.425"
          />
          <g
            transform="translate(591.874 15.064)"
            fill="#D8D8D8"
          >
            <rect
              width="21.921"
              height="2.739"
              rx="1.369"
            />
            <rect
              y="5.478"
              width="21.921"
              height="2.739"
              rx="1.369"
            />
            <rect
              y="10.956"
              width="21.921"
              height="2.739"
              rx="1.369"
            />
          </g>
          <g transform="translate(49.323 94.492)">
            <ellipse
              fill="url(#e)"
              cx="32.882"
              cy="32.867"
              rx="32.882"
              ry="32.867"
            />
            <g
              transform="translate(104.126 8.217)"
              fill="#E1E8EE"
            >
              <rect
                width="78.78"
                height="10.956"
                rx="2.055"
              />
              <rect
                y="21.911"
                width="274.016"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="32.867"
                width="251.181"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="43.822"
                width="228.346"
                height="5.478"
                rx="2.055"
              />
            </g>
            <g
              transform="translate(411.024 24.65)"
              fill="#A7B9C8"
            >
              <ellipse
                cx="8.22"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="52.063"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="30.142"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="73.984"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="95.906"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
            </g>
          </g>
          <g transform="translate(49.323 187.614)">
            <ellipse
              fill="url(#f)"
              cx="30.827"
              cy="30.813"
              rx="30.827"
              ry="30.813"
            />
            <g
              transform="translate(102.07 6.162)"
              fill="#E1E8EE"
            >
              <rect
                width="78.78"
                height="10.956"
                rx="2.055"
              />
              <rect
                y="21.911"
                width="274.016"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="32.867"
                width="251.181"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="43.822"
                width="228.346"
                height="5.478"
                rx="2.055"
              />
            </g>
            <g
              transform="translate(408.969 22.596)"
              fill="#A7B9C8"
            >
              <ellipse
                cx="8.22"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="52.063"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="30.142"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
            </g>
          </g>
          <g transform="translate(49.323 285.53)">
            <ellipse
              fill="url(#g)"
              cx="30.827"
              cy="30.813"
              rx="30.827"
              ry="30.813"
            />
            <g
              transform="translate(102.07 6.162)"
              fill="#E1E8EE"
            >
              <rect
                width="78.78"
                height="10.956"
                rx="2.055"
              />
              <rect
                y="21.911"
                width="274.016"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="32.867"
                width="251.181"
                height="5.478"
                rx="2.055"
              />
              <rect
                y="43.822"
                width="228.346"
                height="5.478"
                rx="2.055"
              />
            </g>
            <g
              transform="translate(408.969 22.596)"
              fill="#A7B9C8"
            >
              <ellipse
                cx="8.22"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="52.063"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="30.142"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
              <ellipse
                cx="73.984"
                cy="8.217"
                rx="8.22"
                ry="8.217"
              />
            </g>
          </g>
        </g>
        <g transform="translate(483.787 149.422)">
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
        <g transform="translate(483.787 149.422)">
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
        <g transform="translate(505.8 162.277)">
          <rect
            fill="#E1E8EE"
            width="71.244"
            height="14.023"
            rx="2.923"
          />
          <g
            transform="translate(155.111 1.169)"
            fill="#D8D8D8"
          >
            <rect
              width="18.706"
              height="2.337"
              rx="1.169"
            />
            <rect
              y="4.674"
              width="18.706"
              height="2.337"
              rx="1.169"
            />
            <rect
              y="9.349"
              width="18.706"
              height="2.337"
              rx="1.169"
            />
          </g>
        </g>
        <g transform="translate(505.709 223.372)">
          <ellipse
            fill="url(#e)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
        </g>
        <g transform="translate(505.709 317.864)">
          <ellipse
            fill="url(#e)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
        </g>
        <g transform="translate(505.709 254.87)">
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
          <ellipse
            fill="url(#f)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
        </g>
        <g transform="translate(505.709 349.361)">
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
          <ellipse
            fill="url(#f)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
        </g>
        <g transform="translate(505.709 286.367)">
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
          <ellipse
            fill="url(#g)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
        </g>
        <g transform="translate(505.709 380.858)">
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
          <ellipse
            fill="url(#g)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
        </g>
        <g transform="translate(505.709 412.356)">
          <ellipse
            fill="url(#e)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
        </g>
        <g transform="translate(505.709 443.853)">
          <g
            transform="translate(31.512 2.054)"
            fill="#E1E8EE"
          >
            <rect
              width="39.39"
              height="3.652"
              rx=".63"
            />
            <rect
              y="7.304"
              width="137.008"
              height="1.826"
              rx=".63"
            />
            <rect
              y="10.956"
              width="125.591"
              height="1.826"
              rx=".63"
            />
            <rect
              y="14.607"
              width="114.173"
              height="1.826"
              rx=".63"
            />
          </g>
          <ellipse
            fill="url(#f)"
            cx="10.276"
            cy="10.271"
            rx="10.276"
            ry="10.271"
          />
        </g>
      </g>
    </svg>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="-ml-[2px] w-[128px] lg:w-[200px] lg:scale-[calc(200/186)]"
      viewBox="0 0 198 49"
    >
      <g fill="#fff">
        <path d="M31.184 10.285c-5.91-.004-12.075 1.328-18.301 3.055-.79.16-1.563.676-1.969 1.316-.375.602-.512 1.207-.629 1.844-.605 3.387-.531 6.715-.406 10.398.027.844.156 1.848.547 2.454.414.613 1.117 1.003 1.96 1.132 1.083.164 2.16.29 3.239.403l-.238 6.656c-.04.527.222.969.543 1.223.289.218.61.316.937.34.656.05 1.43-.235 1.813-.961 1.68-3.235 2.734-4.66 4.832-6.81 5.48.138 10.261-.167 15.672-.57 1.914-.046 3.23-1.613 3.578-2.863 1.035-3.238 1.199-7.234 1.308-11.277.047-1.602-.508-3.172-1.492-4.004-.937-.758-2.066-1.031-3.105-1.312-2.883-.653-5.766-1.004-8.29-1.024zm7.875 2.531c1.039.282 1.957.555 2.53 1.024.966 1.023.934 1.707.923 2.812-.11 3.918-.297 7.723-1.184 10.606-.383 1.074-1.043 1.84-2.3 1.953-5.516.41-10.301.727-15.844.566a.792.792 0 0 0-.582.23c-2.329 2.352-3.52 3.99-5.297 7.407-.04.078-.13.125-.242.133-.07-.004-.102-.063-.106-.113l.238-7.22a.804.804 0 0 0-.695-.8 73.176 73.176 0 0 1-3.871-.477c-.555-.082-.758-.234-.91-.46-.266-.633-.262-1.024-.281-1.63-.126-3.656-.184-6.847.374-10.023.055-.472.231-.953.418-1.351.31-.485.782-.555 1.258-.688 6.086-1.68 12.04-2.937 17.649-2.941 2.75.097 5.633.375 7.922.972zm-21.024 6.192c-.84 1.004-.758 2.367-.11 3.281.34.48.868.863 1.509.95.836.07 1.367-.27 1.937-.657 1.035-.898 1.14-2.469.352-3.605a2.184 2.184 0 0 0-1.696-.946c-.898.008-1.507.407-1.992.977zm9.07-.82c-.835.027-1.511.605-1.925 1.23-.47.71-.746 1.605-.364 2.484.735 1.684 3.274 1.664 4.286-.05.464-.79.347-1.688 0-2.336-.348-.653-.872-1.184-1.633-1.305a1.934 1.934 0 0 0-.364-.023zm7.364.156a2.895 2.895 0 0 0-.778.086c-1.004.27-1.859 1.304-1.73 2.629.066.668.371 1.32.926 1.765.554.45 1.355.649 2.203.477.972-.2 1.578-.985 1.777-1.742.203-.758.153-1.528-.316-2.153a2.655 2.655 0 0 0-2.082-1.062zM19.96 19.586c.184.004.332.062.484.281.34.492.246 1.235-.097 1.535-.34.297-.555.325-.707.305-.149-.023-.301-.125-.438-.316-.258-.368-.336-.961.008-1.387.18-.242.516-.395.75-.418zm7.254.172c.027.004.355.195.512.488.156.293.183.563.035.813-.442.75-1.38.546-1.52.222-.055-.125-.015-.625.242-1.011.258-.391.578-.536.73-.512zm8.082.57c.047.067.164.492.074.828-.09.34-.238.547-.598.621-.46.098-.718 0-.914-.156-.191-.156-.324-.422-.351-.707-.07-.703.183-.867.586-.973.465-.117.992.086 1.203.387zm0 0M53.867 13.434a.892.892 0 0 1 .219-.536.665.665 0 0 1 .535-.238h5.223c.176 0 .36.074.547.219a.68.68 0 0 1 .28.555v8.336h8.74v-8.336a.768.768 0 0 1 .793-.773h5.151c.235 0 .438.058.614.175.176.117.265.305.265.562V38c0 .258-.078.45-.23.578-.152.129-.352.195-.598.195h-5.203a.845.845 0 0 1-.574-.195c-.145-.129-.219-.32-.219-.578v-9.988h-8.738V38c0 .246-.078.438-.238.57-.157.137-.371.203-.641.203h-5.172c-.492 0-.742-.23-.754-.687zm48.11 25.039a1.1 1.1 0 0 1-.485.246 2.422 2.422 0 0 1-.484.054h-2.656c-.211 0-.391-.039-.543-.113a1.197 1.197 0 0 1-.387-.308 1.842 1.842 0 0 1-.266-.442 3.71 3.71 0 0 1-.176-.508l-.543-2.25c-.175.364-.433.774-.765 1.239a6.65 6.65 0 0 1-1.274 1.3 7.077 7.077 0 0 1-1.847 1.02c-.715.277-1.535.414-2.461.414-1.336 0-2.55-.258-3.64-.773a8.372 8.372 0 0 1-2.79-2.11c-.765-.89-1.36-1.933-1.781-3.12a11.327 11.327 0 0 1-.633-3.81V17.797c0-.445.094-.785.29-1.012.19-.23.5-.344.921-.344h4.063c.503 0 .847.086 1.039.254.187.172.28.5.28.996v11.446c0 .504.114.98.34 1.433a4.282 4.282 0 0 0 2.18 2.012c.477.2.961.3 1.454.3.421 0 .859-.1 1.308-.3.453-.2.867-.465 1.25-.797.379-.336.695-.73.942-1.18.246-.453.367-.93.367-1.433v-11.43c0-.199.039-.398.113-.597a.963.963 0 0 1 .344-.457c.152-.094.297-.16.43-.196.136-.035.292-.05.468-.05h3.973c.504 0 .867.12 1.09.367.222.246.336.578.336.988v19.676c0 .222-.051.425-.153.613a1.091 1.091 0 0 1-.41.441zm20.414-2.426c-.317.316-.668.656-1.047 1.02-.383.363-.801.703-1.258 1.019-.457.316-.95.578-1.477.785a4.714 4.714 0 0 1-1.707.305c-1.593 0-3.062-.297-4.402-.895a10.537 10.537 0 0 1-3.465-2.453c-.969-1.039-1.722-2.262-2.27-3.668-.542-1.406-.816-2.918-.816-4.535 0-1.629.274-3.145.817-4.547.546-1.398 1.3-2.617 2.27-3.656a10.403 10.403 0 0 1 3.464-2.445c1.34-.59 2.809-.887 4.402-.887a5.32 5.32 0 0 1 1.77.281 6.49 6.49 0 0 1 1.457.719c.441.297.844.625 1.215.996.367.367.719.73 1.047 1.082v-8.04c0-.374.113-.69.34-.948.23-.258.574-.387 1.03-.387h3.958c.152 0 .312.035.48.098.172.066.328.156.469.273.14.117.254.258.34.422.09.164.133.344.133.543v26.289c0 .902-.473 1.355-1.422 1.355h-3.45c-.234 0-.414-.03-.542-.09a.826.826 0 0 1-.325-.253 1.64 1.64 0 0 1-.238-.422c-.07-.168-.16-.367-.266-.59zm-10.114-8.422c0 .773.121 1.496.364 2.172a5.142 5.142 0 0 0 1.027 1.75c.445.492.98.883 1.61 1.168.624.289 1.32.43 2.081.43.75 0 1.457-.133 2.121-.403.66-.27 1.239-.64 1.73-1.117a5.616 5.616 0 0 0 1.188-1.68 5.541 5.541 0 0 0 .5-2.074v-.246c0-.75-.14-1.465-.421-2.145a5.712 5.712 0 0 0-1.168-1.793 5.555 5.555 0 0 0-1.758-1.222 5.326 5.326 0 0 0-2.192-.45c-.761 0-1.457.15-2.082.45a4.827 4.827 0 0 0-1.609 1.223 5.497 5.497 0 0 0-1.027 1.792 6.341 6.341 0 0 0-.364 2.145zm37.278 8.422c-.317.316-.664.656-1.047 1.02-.38.363-.797.703-1.254 1.019-.457.316-.95.578-1.48.785a4.693 4.693 0 0 1-1.704.305c-1.593 0-3.062-.297-4.406-.895a10.561 10.561 0 0 1-3.46-2.453c-.97-1.039-1.727-2.262-2.27-3.668-.547-1.406-.817-2.918-.817-4.535 0-1.629.27-3.145.817-4.547a11.299 11.299 0 0 1 2.27-3.656 10.427 10.427 0 0 1 3.46-2.445c1.344-.59 2.813-.887 4.406-.887.645 0 1.235.094 1.766.281a6.52 6.52 0 0 1 1.46.719c.438.297.845.625 1.212.996.37.367.719.73 1.047 1.082v-8.04c0-.374.117-.69.343-.948.23-.258.57-.387 1.028-.387h3.957c.152 0 .312.035.484.098.168.066.324.156.465.273.14.117.258.258.344.422.09.164.133.344.133.543v26.289c0 .902-.477 1.355-1.426 1.355h-3.446c-.234 0-.417-.03-.546-.09a.855.855 0 0 1-.325-.253 1.764 1.764 0 0 1-.238-.422c-.07-.168-.156-.367-.262-.59zm-10.11-8.422c0 .773.121 1.496.36 2.172a5.214 5.214 0 0 0 1.03 1.75c.446.492.981.883 1.606 1.168.63.289 1.325.43 2.086.43a5.55 5.55 0 0 0 2.118-.403 5.36 5.36 0 0 0 1.734-1.117 5.616 5.616 0 0 0 1.187-1.68 5.541 5.541 0 0 0 .5-2.074v-.246a5.656 5.656 0 0 0-1.594-3.938 5.468 5.468 0 0 0-1.757-1.222 5.295 5.295 0 0 0-2.188-.45c-.761 0-1.457.15-2.086.45a4.851 4.851 0 0 0-1.605 1.223 5.577 5.577 0 0 0-1.031 1.792 6.436 6.436 0 0 0-.36 2.145zm21.54-16.477c0-.375.093-.691.28-.949.188-.258.512-.386.97-.386h4.308c.117 0 .238.03.367.097.13.063.25.152.36.27.113.117.207.258.28.422.079.164.118.347.118.546v26.27c0 .445-.129.785-.379 1.012-.254.23-.578.343-.976.343h-4.079c-.457 0-.78-.113-.968-.343-.188-.227-.282-.567-.282-1.012zm29.609 24.954a11.67 11.67 0 0 1-3.48 2.222c-1.29.535-2.657.801-4.098.801-1.606 0-3.121-.293-4.551-.879a11.8 11.8 0 0 1-3.766-2.437 11.656 11.656 0 0 1-2.566-3.664c-.633-1.407-.95-2.938-.95-4.59 0-1.032.126-2.032.38-3 .25-.965.609-1.871 1.07-2.715a11.743 11.743 0 0 1 1.687-2.332 10.792 10.792 0 0 1 4.899-2.996c.96-.282 1.976-.422 3.043-.422.972 0 1.914.129 2.832.387a11.04 11.04 0 0 1 4.781 2.777 11.35 11.35 0 0 1 1.723 2.156c.48.777.851 1.61 1.117 2.496.262.883.394 1.797.394 2.735 0 .609-.007 1.105-.027 1.492-.016.387-.105.695-.27.926-.164.226-.437.386-.82.472-.379.09-.941.133-1.68.133h-12.66c.118.75.356 1.379.715 1.883.356.504.77.906 1.238 1.203.47.3.97.512 1.497.64a6.294 6.294 0 0 0 1.492.196c.422 0 .855-.043 1.3-.133a8.748 8.748 0 0 0 1.293-.351 7.331 7.331 0 0 0 1.145-.508c.344-.196.625-.399.836-.61.187-.152.348-.265.48-.34a.86.86 0 0 1 .434-.117c.152 0 .309.055.465.16.16.106.336.258.535.458l1.863 2.109c.13.152.211.289.246.414.036.121.055.25.055.379a.977.977 0 0 1-.195.605c-.13.168-.281.32-.457.45zm-8.457-14.649c-.457 0-.899.09-1.328.274-.426.18-.829.421-1.204.726a6.37 6.37 0 0 0-1.011 1.04 6.486 6.486 0 0 0-.73 1.179h8.988a10.599 10.599 0 0 0-.801-1.266 5.564 5.564 0 0 0-.985-1.023 4.295 4.295 0 0 0-1.265-.684c-.477-.164-1.031-.246-1.664-.246zm0 0" />
      </g>
    </svg>
  );
}
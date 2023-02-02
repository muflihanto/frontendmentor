import Image from "next/image";
import { Logo } from "../../pages/huddle-landing-page-with-curved-sections";

const Footer = () => {
  return (
    <footer className="relative pt-[53px] lg:pt-[158px]">
      <div className="absolute top-0 left-0 aspect-[375/53] w-full lg:aspect-[1440/158]">
        <Image
          src="/huddle-landing-page-with-curved-sections/images/"
          alt="Footer Curved Background"
          className="object-contain"
          loader={({ src, width }) => {
            if (width > 1023) {
              return src + "bg-footer-top-desktop.svg";
            }
            return src + "bg-footer-top-mobile.svg";
          }}
          fill
        />
      </div>
      <div className="bg-huddle-curve-neutral-700 text-huddle-curve-neutral-100 relative grid grid-rows-2 gap-y-[92px] px-7 pb-[43.48px] pt-[56px] lg:grid-cols-2 lg:grid-rows-1 lg:px-[120px] lg:pt-[122px] lg:pb-[100.18px]">
        <div className="max-md:row-start-2 lg:w-[310px]">
          <Logo
            className="h-[32px] lg:h-[39px]"
            white
          />
          <p className="mt-[16px] pr-2 text-[14px] leading-[24px] tracking-[0.25px] lg:mt-[25px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla quam, hendrerit lacinia vestibulum a, ultrices quis sem.</p>
          <p className="mt-[42px] ml-[3px] flex items-center justify-start lg:mt-[26px]">
            <svg
              viewBox="0 0 18 18"
              className="w-[18px]"
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
            <span className="ml-[18px] text-[14px] tracking-[0.25px] lg:text-[16px] lg:tracking-[0px]">Phone: +1-543-123-4567</span>
          </p>
          <p className="ml-[3px] mt-[19px] flex items-center justify-start lg:mt-[15px]">
            <svg
              className="w-5"
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
            <span className="ml-[18px] text-[14px] tracking-[0.25px] lg:text-[16px] lg:tracking-[0px]">example@huddle.com</span>
          </p>

          <SocialIcons />
        </div>
        <div className="max-md:row-start-1 lg:w-[520px] lg:justify-self-end">
          <h2 className="text-[20px] font-bold uppercase lg:text-[24px]">Newsletter</h2>
          <p className="mt-[15px] pr-2 text-[14px] leading-[24px] tracking-[0.25px] lg:mt-[16px] lg:w-[360px]">To recieve tips on how to grow your community, sign up to our weekly newsletter. We’ll never send you spam or pass on your email address</p>
          <form className="mt-[32px] grid grid-cols-2 grid-rows-2 gap-x-0 gap-y-4 lg:mt-[40px] lg:grid-cols-[minmax(0px,auto),160px] lg:grid-rows-1 lg:gap-x-[40px]">
            <input
              type="email"
              className="text-huddle-curve-neutral-700 col-span-2 h-12 rounded-md px-4 text-left lg:col-span-1"
            />
            <button className="bg-huddle-curve-primary-pink-200 hover:bg-huddle-curve-primary-pink-100 text-huddle-curve-neutral-100/75 col-start-2 rounded-md font-bold lg:col-start-2">Subscribe</button>
          </form>
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
      </div>
    </footer>
  );
};

export default Footer;

function SocialIcons({}) {
  return (
    <div className="mt-[48px] flex items-center justify-start gap-[17px] lg:mt-[78px] lg:gap-[24px] [&_svg]:h-[26px] [&_svg]:fill-white lg:[&_svg]:h-[37px]">
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      </a>
      <a href="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          {/* Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
          <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" />
        </svg>
      </a>
    </div>
  );
}

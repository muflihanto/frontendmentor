import Image from "next/image";
import { Logo } from "../../pages/huddle-landing-page-with-curved-sections";

const Footer = () => {
  return (
    <footer className="relative pt-[calc(100vw*53/375)] lg:pt-[calc(100vw*158/1440)]">
      <div className="absolute left-0 top-0 aspect-[375/53] w-full lg:aspect-[1440/158]">
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
      <div className="bg-huddle-curve-neutral-700 text-huddle-curve-neutral-100 relative grid grid-rows-2 gap-y-[92px] px-7 pb-[43.48px] pt-[56px] lg:grid-cols-2 lg:grid-rows-1 lg:px-[120px] lg:pb-[100.18px] lg:pt-[122px]">
        <div className="max-md:row-start-2 lg:w-[310px]">
          <Logo
            className="h-[32px] lg:h-[39px]"
            white
          />
          <p className="mt-[16px] pr-2 text-[14px] leading-[24px] tracking-[0.25px] lg:mt-[25px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nulla quam, hendrerit lacinia vestibulum a, ultrices quis sem.</p>
          <p className="ml-[3px] mt-[42px] flex items-center justify-start lg:mt-[26px]">
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
        <p className="text-huddle-curve-neutral-100 [&_a]:text-huddle-curve-primary-pink-100 absolute bottom-2 left-0 w-full text-center text-[11px] lg:bottom-8 lg:px-[120px] lg:text-right lg:text-[13px] [&_a:hover]:opacity-75 [&_a]:font-bold [&_a]:underline [&_a]:decoration-wavy">
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
    <div className="mt-[48px] flex items-center justify-start gap-[17px] lg:mt-[78px] lg:gap-[24px] [&>a:hover]:text-[hsl(192,99%,49%)] [&>a]:text-white [&_svg]:h-[26px] lg:[&_svg]:h-[37px]">
      <a href="">
        <svg viewBox="0 0 448 512">
          <use href="/huddle-landing-page-with-curved-sections/images/icon-facebook.svg#icon-facebook" />
        </svg>
      </a>
      <a href="">
        <svg viewBox="0 0 448 512">
          <use href="/huddle-landing-page-with-curved-sections/images/icon-instagram.svg#icon-instagram" />
        </svg>
      </a>
      <a href="">
        <svg viewBox="0 0 448 512">
          <use href="/huddle-landing-page-with-curved-sections/images/icon-twitter.svg#icon-twitter" />
        </svg>
      </a>
    </div>
  );
}

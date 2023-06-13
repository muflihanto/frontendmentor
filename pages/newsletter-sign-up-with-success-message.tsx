import Head from "next/head";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: - Add their email and submit the form
// TODO: - See a success message with their email after successfully submitting the form
// TODO: - See form validation messages if:
// TODO:   - The field is left empty
// TODO:   - The email address is not formatted correctly
// TODO: - View the optimal layout for the interface depending on their device's screen size
// TODO: - See hover and focus states for all interactive elements on the page

const zInputSchema = z.object({
  email: z.string().email().min(1),
});
type InputSchema = z.infer<typeof zInputSchema>;

const isSuccessOpenAtom = atom(false);
const emailAtom = atom("");

export default function NewsletterSignUpWithSuccessMessage() {
  const isSuccessOpen = useAtomValue(isSuccessOpenAtom);

  useEffect(() => {
    if (isSuccessOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSuccessOpen]);

  return (
    <>
      <Head>
        <title>Frontend Mentor | Newsletter sign-up form with success message</title>
      </Head>
      <div className="App font-roboto lg:bg-newsletter-neutral-300 relative min-h-[100dvh] lg:flex lg:items-center lg:justify-center lg:py-10">
        {isSuccessOpen ? (
          <SuccessScreen />
        ) : (
          <div className="bg-newsletter-neutral-100 flex flex-col lg:-mt-[1px] lg:h-[641px] lg:w-[926px] lg:flex-row-reverse lg:justify-between lg:rounded-[36px] lg:p-6 lg:shadow-[0px_20px_10px_theme(colors.newsletter.neutral.400/50%),0px_30px_20px_30px_theme(colors.newsletter.neutral.400/25%)]">
            <IllustrationSignUp />
            <Main />
          </div>
        )}
        <Footer />
        {/* <Slider
          basePath="/newsletter-sign-up-with-success-message/design"
          absolutePath="/newsletter-sign-up-with-success-message/design/error-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Main() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InputSchema>({
    resolver: zodResolver(zInputSchema),
  });

  const setScreen = useSetAtom(isSuccessOpenAtom);
  const setEmail = useSetAtom(emailAtom);

  const onSubmit = handleSubmit((data) => {
    setEmail(data.email);
    // console.log(data);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setScreen(true);
    }
  }, [reset, isSubmitSuccessful, setScreen]);

  return (
    <div className="w-full lg:flex lg:flex-1 lg:items-center lg:justify-center">
      <div className="px-6 pb-10 pt-[30px] lg:pl-[39px] lg:pt-[24px]">
        <h1 className="text-newsletter-neutral-400 text-[40px] font-bold lg:text-[56px]">Stay updated!</h1>
        <p className="text-newsletter-neutral-300 mt-[13px] lg:mt-[10px]">Join 60,000+ product managers receiving monthly updates on:</p>
        <ul className="text-newsletter-neutral-300 mt-[26px] flex flex-col gap-3">
          <li className="flex items-start gap-4">
            <IconList className="w-[23px] lg:w-[21px]" />
            <p className="-mt-[2px]">Product discovery and building what matters</p>
          </li>
          <li className="flex items-start gap-4">
            <IconList className="w-[22px] lg:w-[21px]" />
            <p className="-mt-[2px]">Measuring to ensure updates are a success</p>
          </li>
          <li className="mt-[1px] flex items-start gap-4">
            <IconList />
            <p className="-mt-[2px]">And much more!</p>
          </li>
        </ul>
        <form
          className="mt-10 w-full"
          onSubmit={onSubmit}
        >
          <label htmlFor="email">
            <p className="text-newsletter-neutral-400 text-[12px] font-bold">Email address</p>
            <input
              type="email"
              id="email"
              placeholder="email@company.com"
              className="border-newsletter-neutral-200/75 focus:border-newsletter-neutral-300 text-newsletter-neutral-300 mt-2 h-[56px] w-full rounded-[8px] border px-[23px] focus-visible:outline focus-visible:outline-transparent"
              {...register("email", { required: true })}
            />
            <button className="bg-newsletter-neutral-400 text-newsletter-neutral-100 mt-6 flex h-[56px] w-full items-center justify-center rounded-lg pt-[2px] font-bold hover:bg-gradient-to-r hover:from-[#FF527B] hover:to-[#FF6A3A] hover:shadow-[0px_10px_10px_theme(colors.newsletter.primary/25%),0px_20px_20px_10px_theme(colors.newsletter.primary/20%)]">Subscribe to monthly newsletter</button>
          </label>
        </form>
      </div>
    </div>
  );
}

function IconList({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-[21px]", className ?? "")}
      viewBox="0 0 21 21"
    >
      <g fill="none">
        <circle
          cx="10.5"
          cy="10.5"
          r="10.5"
          fill="#FF6155"
        />
        <path
          stroke="#FFF"
          strokeWidth={2}
          d="M6 11.381 8.735 14 15 8"
        />
      </g>
    </svg>
  );
}

function IllustrationSignUp() {
  const { width } = useWindowSize();

  return (
    <>
      {width >= 1024 ? (
        <svg
          className="w-full flex-1 translate-x-5"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 400 593"
        >
          <defs>
            <linearGradient
              id="b"
              x1="72.75%"
              x2="27.25%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FF6A3A"
              />
              <stop
                offset="100%"
                stopColor="#FF527B"
              />
            </linearGradient>
            <linearGradient
              id="h"
              x1="22.319%"
              x2="99.127%"
              y1="28.497%"
              y2="70.858%"
            >
              <stop
                offset="0%"
                stopColor="#FF3E83"
              />
              <stop
                offset="100%"
                stopColor="#FF9F2E"
              />
            </linearGradient>
            <linearGradient
              id="k"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FFB443"
              />
              <stop
                offset="100%"
                stopColor="#FF5B64"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="o"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#F8F8F8"
              />
              <stop
                offset="100%"
                stopColor="#EEE"
              />
            </linearGradient>
            <linearGradient
              id="p"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#CACBE8"
              />
              <stop
                offset="100%"
                stopColor="#EEE"
              />
              <stop
                offset="100%"
                stopColor="#CACBE8"
              />
            </linearGradient>
            <linearGradient
              id="r"
              x1="97.791%"
              x2="7.729%"
              y1="26.944%"
              y2="71.879%"
            >
              <stop
                offset="0%"
                stopColor="#FF9049"
              />
              <stop
                offset="100%"
                stopColor="#FF5E5E"
              />
            </linearGradient>
            <linearGradient
              id="t"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FF6A3D"
              />
              <stop
                offset="100%"
                stopColor="#FF5B66"
              />
            </linearGradient>
            <path
              id="e"
              d="M0 26C0 11.64 11.64 0 26 0h381c14.36 0 26 11.64 26 26v237c0 14.36-11.64 26-26 26H26c-14.36 0-26-11.64-26-26V26Z"
            />
            <path
              id="g"
              d="M0 11C0 4.925 4.925 0 11 0h379c6.075 0 11 4.925 11 11v237c0 6.075-4.925 11-11 11H11c-6.075 0-11-4.925-11-11V11Z"
            />
            <path
              id="i"
              d="M0 11C0 4.925 4.925 0 11 0h379c6.075 0 11 4.925 11 11v237c0 6.075-4.925 11-11 11H11c-6.075 0-11-4.925-11-11V11Z"
            />
            <path
              id="n"
              d="M0 11C0 4.925 4.925 0 11 0h411c6.075 0 11 4.925 11 11v229c0 6.075-4.925 11-11 11H11c-6.075 0-11-4.925-11-11V11Z"
            />
            <path
              id="q"
              d="M0 4a4 4 0 0 1 4-4h90a4 4 0 0 1 4 4v122a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
            />
            <filter
              id="d"
              width="127.7%"
              height="141.5%"
              x="-13.9%"
              y="-12.5%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="f"
              width="129.9%"
              height="146.3%"
              x="-15%"
              y="-13.9%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="j"
              width="129.9%"
              height="146.3%"
              x="-15%"
              y="-13.9%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="m"
              width="127.7%"
              height="147.8%"
              x="-13.9%"
              y="-14.3%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <rect
              id="a"
              width={400}
              height={593}
              x={0}
              y={0}
              rx={16}
            />
          </defs>
          <g
            fill="none"
            fillRule="evenodd"
          >
            <mask
              id="c"
              fill="#fff"
            >
              <use xlinkHref="#a" />
            </mask>
            <rect
              width={400}
              height={593}
              rx={16}
            />
            <path
              fill="url(#b)"
              fillRule="nonzero"
              d="M0 0h400v593H0z"
              mask="url(#c)"
            />
            <g mask="url(#c)">
              <g
                fillRule="nonzero"
                transform="translate(-192 211)"
              >
                <use
                  xlinkHref="#e"
                  fill="#000"
                  filter="url(#d)"
                />
                <use
                  xlinkHref="#e"
                  fill="#242742"
                />
              </g>
              <g transform="translate(-176 226)">
                <g fillRule="nonzero">
                  <use
                    xlinkHref="#g"
                    fill="#000"
                    filter="url(#f)"
                  />
                  <use
                    xlinkHref="#g"
                    fill="url(#h)"
                  />
                </g>
                <mask
                  id="l"
                  fill="#fff"
                >
                  <use xlinkHref="#i" />
                </mask>
                <g fillRule="nonzero">
                  <use
                    xlinkHref="#i"
                    fill="#000"
                    filter="url(#j)"
                  />
                  <use
                    xlinkHref="#i"
                    fill="url(#h)"
                  />
                </g>
                <circle
                  cx={390}
                  cy={244}
                  r={158}
                  fill="url(#k)"
                  fillRule="nonzero"
                  mask="url(#l)"
                />
                <circle
                  cx="136.446"
                  cy="-34.554"
                  r={158}
                  fill="url(#k)"
                  fillRule="nonzero"
                  mask="url(#l)"
                  transform="rotate(-135 136.446 -34.554)"
                />
              </g>
              <g
                fillRule="nonzero"
                transform="translate(129 115)"
              >
                <use
                  xlinkHref="#n"
                  fill="#000"
                  filter="url(#m)"
                />
                <use
                  xlinkHref="#n"
                  fill="url(#o)"
                />
                <path
                  fill="url(#p)"
                  d="M0 11C0 4.925 4.925 0 11 0h85v251H11c-6.075 0-11-4.925-11-11V11Z"
                />
                <path
                  fill="#BABBDB"
                  d="M14 50.5a3.5 3.5 0 0 1 3.5-3.5h61a3.5 3.5 0 0 1 0 7h-61a3.5 3.5 0 0 1-3.5-3.5Zm0 20a3.5 3.5 0 0 1 3.5-3.5h54a3.5 3.5 0 0 1 0 7h-54a3.5 3.5 0 0 1-3.5-3.5Zm0 20a3.5 3.5 0 0 1 3.5-3.5h61a3.5 3.5 0 0 1 0 7h-61a3.5 3.5 0 0 1-3.5-3.5Zm0 20a3.5 3.5 0 0 1 3.5-3.5h39a3.5 3.5 0 1 1 0 7h-39a3.5 3.5 0 0 1-3.5-3.5Z"
                />
                <path
                  fill="#242742"
                  d="M0 11C0 4.925 4.925 0 11 0h411c6.075 0 11 4.925 11 11v20H0V11Z"
                />
                <g transform="translate(16 9)">
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="6.5"
                    fill="#FF6464"
                  />
                  <circle
                    cx="28.5"
                    cy="6.5"
                    r="6.5"
                    fill="#FF9255"
                  />
                  <circle
                    cx="50.5"
                    cy="6.5"
                    r="6.5"
                    fill="#6BD4A8"
                  />
                </g>
              </g>
              <g transform="translate(246 93)">
                <path
                  fill="#FFF"
                  fillRule="nonzero"
                  d="M0 4a4 4 0 0 1 4-4h90a4 4 0 0 1 4 4v122a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
                />
                <mask
                  id="s"
                  fill="#fff"
                >
                  <use xlinkHref="#q" />
                </mask>
                <use
                  xlinkHref="#q"
                  fill="#FFF"
                  fillRule="nonzero"
                />
                <path
                  fill="url(#r)"
                  fillRule="nonzero"
                  d="M108.12 28.878a3 3 0 0 1 .002 4.243L82.847 58.41c-4.348 4.351-11.4 4.351-15.749 0a5.132 5.132 0 0 0-7.26 0L42.406 75.853a8.668 8.668 0 0 1-12.262 0 2.668 2.668 0 0 0-3.774 0l-32.248 32.268a3 3 0 1 1-4.244-4.242l32.248-32.267a8.668 8.668 0 0 1 12.262 0 2.668 2.668 0 0 0 3.774 0L55.594 54.17c4.348-4.35 11.4-4.35 15.748 0a5.132 5.132 0 0 0 7.26 0l25.276-25.29a3 3 0 0 1 4.243-.002Z"
                  mask="url(#s)"
                />
                <path
                  fill="#FFF"
                  fillRule="nonzero"
                  d="M49 150a4 4 0 0 1 4-4h120a4 4 0 0 1 4 4v144a4 4 0 0 1-4 4H53a4 4 0 0 1-4-4V150Z"
                />
                <path
                  fill="url(#t)"
                  d="M46.5 79C64.45 79 79 64.45 79 46.5S64.45 14 46.5 14 14 28.55 14 46.5 28.55 79 46.5 79Zm0 14C72.181 93 93 72.181 93 46.5S72.181 0 46.5 0 0 20.819 0 46.5 20.819 93 46.5 93Z"
                  transform="translate(67 175)"
                />
                <path
                  fill="#242742"
                  fillRule="nonzero"
                  d="M96.61 216.72c0 2.27.589 4.067 1.766 5.39 1.177 1.313 2.78 1.969 4.812 1.969 1.886 0 3.36-.672 4.422-2.016 1.073-1.344 1.61-3.02 1.61-5.031h-1.172c0 1.146-.318 2.057-.954 2.734-.635.677-1.427 1.016-2.375 1.016-1.01 0-1.76-.339-2.25-1.016-.49-.687-.734-1.692-.734-3.015 0-1.51.245-2.594.734-3.25.5-.667 1.24-1 2.22-1 1.051 0 1.869.432 2.452 1.297.584.864.875 2.411.875 4.64l.14.625c0 3.302-.723 5.646-2.171 7.031-1.448 1.386-3.495 2.073-6.14 2.063h-.704v3.969h.813c4.25-.042 7.495-1.193 9.734-3.453 2.25-2.271 3.375-5.329 3.375-9.172v-.813c0-3.458-.776-5.958-2.328-7.5-1.552-1.552-3.557-2.328-6.016-2.328-2.468 0-4.437.714-5.906 2.14-1.469 1.428-2.203 3.334-2.203 5.72ZM123.923 232h4.828v-22.75h-4.516l-10.11 14.563v3.438h17.141v-3.891h-4.937l-.813.078h-6.5l4.828-7.562h.157v9.593l-.079.547v5.985Z"
                />
              </g>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 375 284"
        >
          <defs>
            <linearGradient
              id="b"
              x1="100%"
              x2="0%"
              y1="21.322%"
              y2="78.678%"
            >
              <stop
                offset="0%"
                stopColor="#FF6A3A"
              />
              <stop
                offset="100%"
                stopColor="#FF527B"
              />
            </linearGradient>
            <linearGradient
              id="h"
              x1="22.319%"
              x2="99.127%"
              y1="28.497%"
              y2="70.858%"
            >
              <stop
                offset="0%"
                stopColor="#FF3E83"
              />
              <stop
                offset="100%"
                stopColor="#FF9F2E"
              />
            </linearGradient>
            <linearGradient
              id="k"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FFB443"
              />
              <stop
                offset="100%"
                stopColor="#FF5B64"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="o"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#F8F8F8"
              />
              <stop
                offset="100%"
                stopColor="#EEE"
              />
            </linearGradient>
            <linearGradient
              id="p"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#CACBE8"
              />
              <stop
                offset="100%"
                stopColor="#EEE"
              />
              <stop
                offset="100%"
                stopColor="#CACBE8"
              />
            </linearGradient>
            <linearGradient
              id="r"
              x1="97.791%"
              x2="7.729%"
              y1="26.944%"
              y2="71.879%"
            >
              <stop
                offset="0%"
                stopColor="#FF9049"
              />
              <stop
                offset="100%"
                stopColor="#FF5E5E"
              />
            </linearGradient>
            <linearGradient
              id="t"
              x1="50%"
              x2="50%"
              y1="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FF6A3D"
              />
              <stop
                offset="100%"
                stopColor="#FF5B66"
              />
            </linearGradient>
            <path
              id="a"
              d="M0 0v268c0 8.837 7.163 16 16 16h343c8.837 0 16-7.163 16-16V0H0Z"
            />
            <path
              id="e"
              d="M0 14.054C0 6.292 6.292 0 14.054 0H220c7.762 0 14.054 6.292 14.054 14.054v128.108c0 7.762-6.292 14.054-14.054 14.054H14.054C6.292 156.216 0 149.924 0 142.162V14.054Z"
            />
            <path
              id="g"
              d="M0 5.946A5.946 5.946 0 0 1 5.946 0H210.81a5.946 5.946 0 0 1 5.946 5.946v128.108A5.946 5.946 0 0 1 210.81 140H5.946A5.946 5.946 0 0 1 0 134.054V5.946Z"
            />
            <path
              id="i"
              d="M0 5.946A5.946 5.946 0 0 1 5.946 0H210.81a5.946 5.946 0 0 1 5.946 5.946v128.108A5.946 5.946 0 0 1 210.81 140H5.946A5.946 5.946 0 0 1 0 134.054V5.946Z"
            />
            <path
              id="n"
              d="M0 5.946A5.946 5.946 0 0 1 5.946 0h222.162a5.946 5.946 0 0 1 5.946 5.946V129.73a5.946 5.946 0 0 1-5.946 5.946H5.946A5.946 5.946 0 0 1 0 129.73V5.946Z"
            />
            <path
              id="q"
              d="M0 2.162C0 .968.968 0 2.162 0h48.649c1.194 0 2.162.968 2.162 2.162v65.946a2.162 2.162 0 0 1-2.162 2.162H2.162A2.162 2.162 0 0 1 0 68.108V2.162Z"
            />
            <filter
              id="d"
              width="151.3%"
              height="176.8%"
              x="-25.6%"
              y="-23%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="f"
              width="155.4%"
              height="185.7%"
              x="-27.7%"
              y="-25.7%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="j"
              width="155.4%"
              height="185.7%"
              x="-27.7%"
              y="-25.7%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
            <filter
              id="m"
              width="151.3%"
              height="188.4%"
              x="-25.6%"
              y="-26.5%"
              filterUnits="objectBoundingBox"
            >
              <feOffset
                dy={24}
                in="SourceAlpha"
                result="shadowOffsetOuter1"
              />
              <feGaussianBlur
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
                stdDeviation={16}
              />
              <feColorMatrix
                in="shadowBlurOuter1"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.100000001 0"
              />
            </filter>
          </defs>
          <g
            fill="none"
            fillRule="evenodd"
          >
            <mask
              id="c"
              fill="#fff"
            >
              <use xlinkHref="#a" />
            </mask>
            <path d="M0 0v268c0 8.837 7.163 16 16 16h343c8.837 0 16-7.163 16-16V0H0Z" />
            <path
              fill="url(#b)"
              fillRule="nonzero"
              d="M0 0v268c0 8.837 7.163 16 16 16h343c8.837 0 16-7.163 16-16V0H0Z"
              mask="url(#c)"
            />
            <g mask="url(#c)">
              <g
                fillRule="nonzero"
                transform="translate(-16 87.784)"
              >
                <use
                  xlinkHref="#e"
                  fill="#000"
                  filter="url(#d)"
                />
                <use
                  xlinkHref="#e"
                  fill="#242742"
                />
              </g>
              <g transform="translate(-7.351 95.892)">
                <g fillRule="nonzero">
                  <use
                    xlinkHref="#g"
                    fill="#000"
                    filter="url(#f)"
                  />
                  <use
                    xlinkHref="#g"
                    fill="url(#h)"
                  />
                </g>
                <mask
                  id="l"
                  fill="#fff"
                >
                  <use xlinkHref="#i" />
                </mask>
                <g fillRule="nonzero">
                  <use
                    xlinkHref="#i"
                    fill="#000"
                    filter="url(#j)"
                  />
                  <use
                    xlinkHref="#i"
                    fill="url(#h)"
                  />
                </g>
                <circle
                  cx="210.81"
                  cy="131.892"
                  r="85.405"
                  fill="url(#k)"
                  fillRule="nonzero"
                  mask="url(#l)"
                />
                <circle
                  cx="73.754"
                  cy="-18.678"
                  r="85.405"
                  fill="url(#k)"
                  fillRule="nonzero"
                  mask="url(#l)"
                  transform="rotate(-135 73.754 -18.678)"
                />
              </g>
              <g
                fillRule="nonzero"
                transform="translate(157.513 35.892)"
              >
                <use
                  xlinkHref="#n"
                  fill="#000"
                  filter="url(#m)"
                />
                <use
                  xlinkHref="#n"
                  fill="url(#o)"
                />
                <path
                  fill="url(#p)"
                  d="M0 5.946A5.946 5.946 0 0 1 5.946 0h45.946v135.676H5.946A5.946 5.946 0 0 1 0 129.73V5.946Z"
                />
                <path
                  fill="#BABBDB"
                  d="M7.568 27.297c0-1.045.847-1.892 1.891-1.892h32.973a1.892 1.892 0 0 1 0 3.784H9.46a1.892 1.892 0 0 1-1.891-1.892Zm0 10.811c0-1.045.847-1.892 1.891-1.892h29.19a1.892 1.892 0 0 1 0 3.784H9.459a1.892 1.892 0 0 1-1.891-1.892Zm0 10.81c0-1.044.847-1.891 1.891-1.891h32.973a1.892 1.892 0 0 1 0 3.784H9.46a1.892 1.892 0 0 1-1.891-1.892Zm0 10.812c0-1.045.847-1.892 1.891-1.892h21.082a1.892 1.892 0 0 1 0 3.784H9.459a1.892 1.892 0 0 1-1.891-1.892Z"
                />
                <path
                  fill="#242742"
                  d="M0 5.946A5.946 5.946 0 0 1 5.946 0h222.162a5.946 5.946 0 0 1 5.946 5.946v10.81H0V5.947Z"
                />
                <g transform="translate(8.649 4.865)">
                  <circle
                    cx="3.514"
                    cy="3.514"
                    r="3.514"
                    fill="#FF6464"
                  />
                  <circle
                    cx="15.406"
                    cy="3.514"
                    r="3.514"
                    fill="#FF9255"
                  />
                  <circle
                    cx="27.297"
                    cy="3.514"
                    r="3.514"
                    fill="#6BD4A8"
                  />
                </g>
              </g>
              <g transform="translate(220.757 24)">
                <path
                  fill="#FFF"
                  fillRule="nonzero"
                  d="M0 2.162C0 .968.968 0 2.162 0h48.649c1.194 0 2.162.968 2.162 2.162v65.946a2.162 2.162 0 0 1-2.162 2.162H2.162A2.162 2.162 0 0 1 0 68.108V2.162Z"
                />
                <mask
                  id="s"
                  fill="#fff"
                >
                  <use xlinkHref="#q" />
                </mask>
                <use
                  xlinkHref="#q"
                  fill="#FFF"
                  fillRule="nonzero"
                />
                <path
                  fill="url(#r)"
                  fillRule="nonzero"
                  d="M58.444 15.61c.633.633.634 1.66 0 2.293l-13.662 13.67a6.018 6.018 0 0 1-8.512 0 2.774 2.774 0 0 0-3.925 0l-9.422 9.429a4.685 4.685 0 0 1-6.628 0 1.442 1.442 0 0 0-2.04 0L-3.178 58.444A1.622 1.622 0 1 1-5.47 56.15L11.96 38.709a4.685 4.685 0 0 1 6.629 0 1.442 1.442 0 0 0 2.04 0l9.422-9.428a6.018 6.018 0 0 1 8.513 0 2.774 2.774 0 0 0 3.924 0l13.663-13.67a1.622 1.622 0 0 1 2.293-.001Z"
                  mask="url(#s)"
                />
                <path
                  fill="#FFF"
                  fillRule="nonzero"
                  d="M26.487 81.081c0-1.194.968-2.162 2.162-2.162h64.865c1.194 0 2.162.968 2.162 2.162v77.838a2.162 2.162 0 0 1-2.162 2.162H28.649a2.162 2.162 0 0 1-2.162-2.162V81.081Z"
                />
                <path
                  fill="url(#t)"
                  d="M25.135 42.703c9.702 0 17.568-7.866 17.568-17.568 0-9.702-7.866-17.567-17.568-17.567-9.702 0-17.567 7.865-17.567 17.567s7.865 17.568 17.567 17.568Zm0 7.567c13.882 0 25.135-11.253 25.135-25.135C50.27 11.253 39.017 0 25.135 0 11.253 0 0 11.253 0 25.135 0 39.017 11.253 50.27 25.135 50.27Z"
                  transform="translate(36.217 94.595)"
                />
                <path
                  fill="#242742"
                  fillRule="nonzero"
                  d="M52.222 117.145c0 1.228.318 2.2.954 2.914.637.71 1.504 1.064 2.602 1.064 1.019 0 1.816-.363 2.39-1.09.58-.726.87-1.632.87-2.719h-.634c0 .62-.171 1.112-.515 1.478a1.688 1.688 0 0 1-1.284.55c-.546 0-.951-.184-1.216-.55-.264-.371-.397-.915-.397-1.63 0-.816.133-1.402.397-1.757.27-.36.67-.54 1.2-.54.568 0 1.01.234 1.326.7.315.468.473 1.304.473 2.51l.076.337c0 1.785-.392 3.052-1.174 3.8-.783.75-1.89 1.121-3.32 1.116h-.38v2.145h.44c2.297-.023 4.05-.645 5.261-1.867 1.216-1.227 1.825-2.88 1.825-4.957v-.44c0-1.869-.42-3.22-1.259-4.054-.839-.839-1.923-1.258-3.252-1.258-1.334 0-2.398.386-3.192 1.157s-1.191 1.802-1.191 3.091Zm14.764 8.26h2.61v-12.297h-2.442l-5.464 7.872v1.858h9.265v-2.103h-2.669l-.439.042h-3.514l2.61-4.088h.085v5.186l-.042.296v3.234Z"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </>
  );
}

function SuccessScreen() {
  const setScreen = useSetAtom(isSuccessOpenAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const closeMenu = () => {
    setEmail("");
    setScreen(false);
  };

  return (
    <div className="bg-news-homepage-neutral-100 fixed left-0 top-0 z-50 grid h-screen w-screen grid-cols-1 grid-rows-[auto,56px] gap-[155px] overflow-scroll px-6 py-10 lg:static lg:h-[520px] lg:w-[505px] lg:gap-0 lg:rounded-[36px] lg:p-16 lg:pt-[48px] lg:shadow-[0px_20px_10px_theme(colors.newsletter.neutral.400/50%),0px_20px_20px_30px_theme(colors.newsletter.neutral.400/25%)]">
      <div className="flex flex-col place-self-center lg:place-self-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16"
          viewBox="0 0 21 21"
        >
          <g fill="none">
            <circle
              cx="10.5"
              cy="10.5"
              r="10.5"
              fill="#FF6155"
            />
            <path
              stroke="#FFF"
              strokeWidth={1.5}
              d="M6 11.381 8.735 14 15 8"
            />
          </g>
        </svg>
        <h1 className="text-newsletter-neutral-400 mt-10 text-[40px] font-bold leading-none lg:-translate-y-[1px] lg:text-[56px]">Thanks for subscribing!</h1>
        <p className="text-newsletter-neutral-300 mt-[23px]">
          A confirmation email has been sent to <span className="text-newsletter-neutral-400 font-bold">{email}</span>. Please open it and click the button inside to confirm your subscription.
        </p>
      </div>
      <button
        className="text-news-homepage-neutral-100 bg-newsletter-neutral-400 h-[56px] w-full rounded-lg pl-[2px] pt-[2px] font-bold hover:bg-gradient-to-r hover:from-[#FF527B] hover:to-[#FF6A3A] hover:shadow-[0px_10px_10px_theme(colors.newsletter.primary/25%),0px_20px_20px_10px_theme(colors.newsletter.primary/20%)]"
        onClick={closeMenu}
      >
        Dismiss message
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="lg:text-newsletter-neutral-100 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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
    </footer>
  );
}

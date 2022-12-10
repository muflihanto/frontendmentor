import Head from "next/head";
import Accordion from "../components/test-component/accordion";

export default function Test(props) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-700/30">
      <Head>
        <title>Test Component</title>
      </Head>
      <nav className="shadow-2xl absolute right-0 w-[60vw] h-full px-5 py-5 text-introdrop-neutral-300 top-0 bg-introdrop-neutral-100 pt-[70px]">
        <ul className="block lg:flex lg:h-fit lg:gap-5">
          <li>
            <Accordion />
          </li>
          {/* <li>
            <details className="group lg:relative">
              <summary className="relative flex items-center justify-start gap-2 list-none hover:cursor-pointer w-fit">
                <span>Company</span>
                <span className="inline-block transition-transform group-open:rotate-180">
                  <svg
                    width="10"
                    height="6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="#686868"
                      strokeWidth="1.5"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="pl-4 lg:absolute lg:top-10 lg:left-0 lg:bg-white lg:px-5 lg:py-6 lg:rounded-lg lg:text lg:shadow-[0px_0px_15px_10px_rgba(0,0,0,.05)]">
                <li>
                  <a href="">Todo List</a>
                </li>
                <li>
                  <a href="">Calendar</a>
                </li>
                <li>
                  <a href="">Reminders</a>
                </li>
                <li>
                  <a href="">Planning</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

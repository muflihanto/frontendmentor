import dynamic from "next/dynamic";
import Head from "next/head";
import { cn } from "../utils/cn";
import { josefin } from "../utils/fonts/josefin";
const Main = dynamic(() => import("../components/todo-app/Main"), {
  ssr: false,
});
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

// TODO: View the optimal layout for the app depending on their device's screen size

export default function TodoApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
      </Head>
      <div
        className={cn(
          `App relative min-h-[100dvh] pb-[64.5px] pt-[45px] font-josefin lg:pb-[45px] lg:pt-[78px] ${josefin.variable} relative bg-todo-neutral-light-100 dark:bg-todo-neutral-dark-700`,
          "before:absolute before:left-0 before:top-0 before:h-full before:max-h-52 before:w-full before:bg-[url('/todo-app/images/bg-mobile-light.jpg')] before:bg-[length:100%] before:bg-fixed before:bg-no-repeat before:content-[''] before:dark:bg-[url('/todo-app/images/bg-mobile-dark.jpg')] lg:before:max-h-80 lg:before:bg-[url('/todo-app/images/bg-desktop-light.jpg')] lg:before:dark:bg-[url('/todo-app/images/bg-desktop-dark.jpg')]", // banner image
        )}
      >
        <Main />
        <Footer />
        {/* <Slider
          basePath="/todo-app/design"
          // absolutePath="/todo-app/design/mobile-design-light.jpg"
          // absolutePath="/todo-app/design/mobile-design-dark.jpg"
          // absolutePath="/todo-app/design/desktop-design-light.jpg"
          // absolutePath="/todo-app/design/desktop-design-dark.jpg"
          absolutePath="/todo-app/design/active-states-light.jpg"
          // absolutePath="/todo-app/design/active-states-dark.jpg"
        /> */}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-todo-neutral-light-400 dark:text-todo-neutral-dark-400 [&_a]:font-bold [&_a]:text-todo-neutral-light-500 [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy dark:[&_a]:text-todo-neutral-dark-300">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}

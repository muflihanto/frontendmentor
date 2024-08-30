import Head from "next/head";
import dynamic from "next/dynamic";
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
        className={`App relative min-h-[100dvh] bg-todo-neutral-light-100 bg-[url('/todo-app/images/bg-mobile-light.jpg')] bg-[length:100%] bg-fixed bg-no-repeat pb-[64.5px] pt-[45px] font-josefin dark:bg-todo-neutral-dark-700 dark:bg-[url('/todo-app/images/bg-mobile-dark.jpg')] lg:bg-[url('/todo-app/images/bg-desktop-light.jpg')] lg:pb-[45px] lg:pt-[78px] lg:dark:bg-[url('/todo-app/images/bg-desktop-dark.jpg')] ${josefin.variable}`}
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
    <footer className="absolute bottom-3 w-full text-center text-[11px] dark:text-todo-neutral-dark-400 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy dark:[&_a]:text-todo-neutral-dark-300 text-todo-neutral-light-400 [&_a]:text-todo-neutral-light-500">
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

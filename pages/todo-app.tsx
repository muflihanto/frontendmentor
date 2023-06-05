import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Main = dynamic(() => import("../components/todo-app/Main"), { ssr: false });
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: View the optimal layout for the app depending on their device's screen size
// TODO: See hover states for all interactive elements on the page
// TODO: Add new todos to the list
// TODO: Mark todos as complete
// TODO: Delete todos from the list
// TODO: Filter by all/active/complete todos
// TODO: Clear all completed todos
// TODO: Toggle light and dark mode
// TODO: **Bonus**: Drag and drop to reorder items on the list

export default function TodoApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
      </Head>
      <div className="App font-josefin bg-todo-neutral-light-100 dark:bg-todo-neutral-dark-700 relative min-h-[100dvh] bg-[url('/todo-app/images/bg-mobile-light.jpg')] bg-[length:100%] bg-fixed bg-no-repeat pb-[64.5px] pt-[45px] dark:bg-[url('/todo-app/images/bg-mobile-dark.jpg')] lg:bg-[url('/todo-app/images/bg-desktop-light.jpg')] lg:pb-[45px] lg:pt-[78px] lg:dark:bg-[url('/todo-app/images/bg-desktop-dark.jpg')]">
        <Main />
        <Footer />
        {/* <Slider
          basePath="/todo-app/design"
          // absolutePath="/todo-app/design/mobile-design-light.jpg"
          // absolutePath="/todo-app/design/mobile-design-dark.jpg"
          // absolutePath="/todo-app/design/desktop-design-light.jpg"
          absolutePath="/todo-app/design/desktop-design-dark.jpg"
        /> */}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="dark:text-todo-neutral-dark-400 dark:[&_a]:text-todo-neutral-dark-300 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

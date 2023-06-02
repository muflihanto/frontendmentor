import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

export default function TodoApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
      </Head>
      <div className="App font-josefin relative min-h-[100dvh]">
        <Main />
        <Footer />
        <Slider
          basePath="/todo-app/design"
          absolutePath="/todo-app/design/mobile-design-light.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        Todo

        <!-- Add dynamic number --> items left
      
        All
        Active 
        Completed
      
        Clear Completed
      
        Drag and drop to reorder list
      `}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

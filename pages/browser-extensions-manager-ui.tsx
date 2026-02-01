import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function BrowserExtensionsManagerUi() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Browser extensions manager UI</title>
      </Head>
      <div className="App relative min-h-[100svh] bg-white">
        <Main />
        <Footer />
        <Slider
          basePath="/browser-extensions-manager-ui/design"
          absolutePath="/browser-extensions-manager-ui/design/mobile-design-light.jpg"
        />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {/* {`
        Extensions List

        All
        Active
        Inactive

        <!-- If you plan to use the JSON file to populate the data dynamically, you can delete the content below -->

        DevLens
        Quickly inspect page layouts and visualize element boundaries.
        Remove

        StyleSpy
        Instantly analyze and copy CSS from any webpage element.
        Remove

        SpeedBoost
        Optimizes browser resource usage to accelerate page loading.
        Remove

        JSONWizard
        Formats, validates, and prettifies JSON responses in-browser.
        Remove

        TabMaster Pro
        Organizes browser tabs into groups and sessions.
        Remove

        ViewportBuddy
        Simulates various screen resolutions directly within the browser.
        Remove

        Markup Notes
        Enables annotation and notes directly onto webpages for collaborative debugging.
        Remove

        GridGuides
        Overlay customizable grids and alignment guides on any webpage.
        Remove

        Palette Picker
        Instantly extracts color palettes from any webpage.
        Remove

        LinkChecker
        Scans and highlights broken links on any page.
        Remove

        DOM Snapshot
        Capture and export DOM structures quickly.
        Remove

        ConsolePlus
        Enhanced developer console with advanced filtering and logging.
        Remove
      `} */}
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 w-full text-center text-[11px] text-black [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

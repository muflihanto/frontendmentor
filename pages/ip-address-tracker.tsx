import Head from "next/head";
// import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

// TODO: View the optimal layout for each page depending on their device's screen size
// TODO: See hover states for all interactive elements on the page
// TODO: See their own IP address on the map on the initial page load
// TODO: Search for any IP addresses or domains and see the key information and location

export default function IpAddressTracker() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
      </Head>
      <div className="App font-rubiks relative min-h-[100dvh]">
        <Main />
        <Footer />
        <Slider basePath="/ip-address-tracker/design" />
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      {`
        IP Address Tracker

        Search for any IP address or domain
      
        IP Address
        Location
        Timezone
          UTC <!-- add offset value dynamically using the API -->
        ISP
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

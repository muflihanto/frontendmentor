import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { bricolageGrotesque } from "../utils/fonts/bricolageGrotesque";
import { dmSans } from "../utils/fonts/dmSans";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function WeatherApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Weather App</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-weather-app-neutral-900 px-4 py-4 text-white ${dmSans.variable} ${bricolageGrotesque.variable} font-dm-sans overflow-x-hidden`}
      >
        <Header />
        <Main />
        <Footer />
        <Slider
          basePath="/weather-app/design"
          absolutePath="/weather-app/design/mobile-design-metric.jpg"
        />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="relative flex aspect-[197/40] h-7 items-center gap-2">
        <Image
          src="/weather-app/assets/images/logo.svg"
          alt="Weather Now Logo"
          className="object-contain"
          fill
        />
      </div>
      <button
        type="button"
        className="flex items-center gap-[6px] rounded bg-weather-app-neutral-800 px-[9px] py-2 text-xs font-medium"
        aria-label="Switch to Imperial/Metric"
      >
        <svg
          className="w-[14px] aspect-square"
          role="graphics-symbol"
          viewBox="0 0 16 16"
        >
          <use href="/weather-app/assets/images/icon-units.svg#icon-units" />
        </svg>
        <span className="text-[14px]">Units</span>
        <svg
          className="h-[6px] aspect-[13/8]"
          role="graphics-symbol"
          viewBox="0 0 13 8"
        >
          <use href="/weather-app/assets/images/icon-dropdown.svg#icon-dropdown" />
        </svg>
      </button>
    </header>
  );
}

function Main() {
  return (
    <main>
      {/* {`
        Units

        Switch to Imperial/Metric

        Temperature

        Celsius (°C)
        Fahrenheit (°F)

        Wind Speed

        km/h
        mph

        Precipitation

        Millimeters (mm)
        Inches (in)

        How's the sky looking today?

        Search for a city, e.g., New York
        Search

        Feels like
        <!-- Insert temperature here -->

        Humidity
        <!-- Insert humidity here -->

        Wind
        <!-- Insert wind here -->   
        
        Precipitation
        <!-- Insert precipitation here -->

        Daily forecast
        <!-- Insert daily forecast for the next 7 days here -->

        Hourly forecast
        <!-- Insert hourly forecast for the selected day here --> 
      `} */}
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-3 left-0 w-full text-center text-[11px] text-weather-app-neutral-300 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

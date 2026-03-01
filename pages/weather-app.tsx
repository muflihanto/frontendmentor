import dynamic from "next/dynamic";
import Head from "next/head";
import { bricolageGrotesque } from "../utils/fonts/bricolageGrotesque";
import { dmSans } from "../utils/fonts/dmSans";

const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function WeatherApp() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Weather App</title>
      </Head>
      <div className="App relative min-h-[100svh] bg-white">
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

function Main() {
  return (
    <>
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

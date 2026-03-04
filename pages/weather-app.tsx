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
        className={`App relative min-h-[100svh] bg-weather-app-neutral-900 px-4 py-4 text-white ${dmSans.variable} ${bricolageGrotesque.variable} overflow-x-hidden font-dm-sans`}
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
          className="aspect-square w-[14px]"
          role="graphics-symbol"
          viewBox="0 0 16 16"
        >
          <use href="/weather-app/assets/images/icon-units.svg#icon-units" />
        </svg>
        <span className="text-[14px]">Units</span>
        <svg
          className="aspect-[13/8] h-[6px]"
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
    <main className="mt-[48px] flex flex-col gap-8 pb-20">
      <section className="text-center">
        <h1
          className={`font-bricolage-grotesque text-[52px] font-semibold leading-[1.2] tracking-[0.03em]`}
        >
          How&apos;s the sky looking today?
        </h1>

        <div className="mt-12 flex flex-col gap-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center">
              <Image
                src="/weather-app/assets/images/icon-search.svg"
                alt=""
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              placeholder="Search for a place..."
              className="h-[56px] w-full rounded-xl bg-weather-app-neutral-800 pl-[58px] pr-4 text-[20px] outline-none placeholder:font-semibold placeholder:text-weather-app-neutral-300"
            />
          </div>
          <button
            type="button"
            className="h-[56px] w-full rounded-xl bg-weather-app-blue-500 text-[20px] font-medium tracking-wide transition-colors"
          >
            Search
          </button>
        </div>
      </section>

      <section>
        <div className="relative h-[286px] overflow-hidden rounded-[20px] bg-[image:url('/weather-app/assets/images/bg-today-small.svg')] bg-cover bg-center p-8 pt-[38px]">
          <div className="text-center">
            <h2 className="text-[28px] font-bold">Berlin, Germany</h2>
            <p className="mt-1 text-lg opacity-70">Tuesday, Aug 5, 2025</p>
          </div>

          <div className="mt-[13px] flex items-center justify-center gap-4">
            <Image
              src="/weather-app/assets/images/icon-sunny.webp"
              alt="Sunny"
              width={120}
              height={120}
            />
            <span className="pt-0.5 text-[96px] font-extrabold italic leading-none">
              20°
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {[
            { label: "Feels Like", value: "18°" },
            { label: "Humidity", value: "46%" },
            { label: "Wind", value: "14 km/h" },
            { label: "Precipitation", value: "0 mm" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex h-[118px] flex-col justify-between rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-5 pb-[19px] pt-4"
            >
              <p className="text-lg text-weather-app-neutral-200">
                {stat.label}
              </p>
              <p className="text-[32px] leading-none">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-medium leading-[1.1] tracking-[0.0175em]">
          Daily forecast
        </h3>
        <div className="mt-[22px] flex flex-wrap justify-between gap-4">
          {[
            { day: "Tue", icon: "icon-rain.webp", high: 20, low: 14 },
            { day: "Wed", icon: "icon-drizzle.webp", high: 21, low: 15 },
            { day: "Thu", icon: "icon-sunny.webp", high: 24, low: 14 },
            { day: "Fri", icon: "icon-partly-cloudy.webp", high: 25, low: 13 },
            { day: "Sat", icon: "icon-storm.webp", high: 21, low: 15 },
            { day: "Sun", icon: "icon-snow.webp", high: 25, low: 16 },
            { day: "Mon", icon: "icon-fog.webp", high: 24, low: 15 },
          ].map((item) => (
            <div
              key={item.day}
              className="flex h-[165px] w-[103px] flex-col items-center justify-between rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-[10px] py-[17px]"
            >
              <span className="text-weather-app-neutral-100 text-lg font-medium leading-none">
                {item.day}
              </span>
              <div>
                <Image
                  src={`/weather-app/assets/images/${item.icon}`}
                  alt={item.day}
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex w-full justify-between gap-2 text-[16px] font-medium leading-none">
                <span>{item.high}°</span>
                <span className="text-weather-app-neutral-300">
                  {item.low}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[20px] bg-weather-app-neutral-800 px-4 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-none">Hourly forecast</h3>
          <button
            type="button"
            className="flex items-center gap-[12px] rounded-lg bg-weather-app-neutral-600 px-[16px] py-[10px] leading-none"
          >
            Tuesday
            <Image
              src="/weather-app/assets/images/icon-dropdown.svg"
              alt=""
              width={13}
              height={8}
            />
          </button>
        </div>
        <div className="mt-[17px] flex flex-col gap-4">
          {[
            { time: "3 PM", icon: "icon-overcast.webp", temp: 20 },
            { time: "4 PM", icon: "icon-partly-cloudy.webp", temp: 20 },
            { time: "5 PM", icon: "icon-sunny.webp", temp: 20 },
            { time: "6 PM", icon: "icon-overcast.webp", temp: 19 },
            { time: "7 PM", icon: "icon-snow.webp", temp: 18 },
            { time: "8 PM", icon: "icon-fog.webp", temp: 18 },
            { time: "9 PM", icon: "icon-snow.webp", temp: 17 },
            { time: "10 PM", icon: "icon-overcast.webp", temp: 17 },
          ].map((item) => (
            <div
              key={item.time}
              className="flex h-[60px] items-center justify-between rounded-lg border border-weather-app-neutral-600 bg-weather-app-neutral-700 pl-[11px] pr-4 leading-none"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/weather-app/assets/images/${item.icon}`}
                  alt=""
                  width={40}
                  height={40}
                />
                <span className="text-xl">{item.time}</span>
              </div>
              <span className="font-medium text-weather-app-neutral-200">
                {item.temp}°
              </span>
            </div>
          ))}
        </div>
      </section>

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

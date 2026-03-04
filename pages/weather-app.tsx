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
        className={`App relative flex min-h-[100svh] flex-col bg-weather-app-neutral-900 px-4 py-4 pb-10 text-white ${dmSans.variable} ${bricolageGrotesque.variable} overflow-x-hidden font-dm-sans lg:py-[49px] lg:pb-[79px]`}
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <Header />
          <Main />
        </div>
        <Footer />
        <Slider
          basePath="/weather-app/design"
          absolutePath="/weather-app/design/desktop-design-metric.jpg"
          // absolutePath="/weather-app/design/mobile-design-metric.jpg"
        />
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="relative flex aspect-[197/40] h-7 items-center gap-2 lg:h-10">
        <Image
          src="/weather-app/assets/images/logo.svg"
          alt="Weather Now Logo"
          className="object-contain"
          fill
        />
      </div>
      <button
        type="button"
        className="flex items-center gap-[6px] rounded bg-weather-app-neutral-800 px-[9px] py-2 font-medium lg:gap-[10px] lg:px-4 lg:py-[9px]"
        aria-label="Switch to Imperial/Metric"
      >
        <svg
          className="aspect-square w-[14px] lg:w-4"
          role="graphics-symbol"
          viewBox="0 0 16 16"
        >
          <use href="/weather-app/assets/images/icon-units.svg#icon-units" />
        </svg>
        <span className="max-lg:text-[14px]">Units</span>
        <svg
          className="aspect-[13/8] h-[6px] lg:h-2"
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
    <main className="mt-[48px] flex flex-col gap-8 lg:mt-[64px]">
      <section className="text-center">
        <h1
          className={`font-bricolage-grotesque text-[52px] font-semibold leading-[1.2] tracking-[0.03em]`}
        >
          How&apos;s the sky looking today?
        </h1>

        <div className="mt-12 flex flex-col gap-3 lg:mx-auto lg:mt-16 lg:max-w-[655px] lg:flex-row lg:gap-4">
          <div className="relative lg:flex-1">
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
            className="h-[56px] w-full rounded-xl bg-weather-app-blue-500 text-[20px] font-medium tracking-wide transition-colors lg:w-[114px]"
          >
            Search
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-8 lg:mt-4 lg:grid lg:grid-cols-[auto_384px] lg:items-start">
        <div className="flex flex-col gap-8 lg:gap-12">
          <section>
            <div className="relative h-[286px] overflow-hidden rounded-[20px] bg-[image:url('/weather-app/assets/images/bg-today-small.svg')] bg-cover bg-center p-8 pt-[38px] lg:flex lg:items-center lg:justify-between lg:bg-[image:url('/weather-app/assets/images/bg-today-large.svg')] lg:px-6 lg:py-0">
              <div className="text-center lg:text-left">
                <h2 className="text-[28px] font-bold">Berlin, Germany</h2>
                <p className="mt-1 text-lg opacity-70">Tuesday, Aug 5, 2025</p>
              </div>

              <div className="mt-[13px] flex items-center justify-center gap-4 lg:mt-0">
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

            <div className="mt-5 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-4 lg:gap-6">
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
            <div className="mt-[22px] flex flex-wrap justify-between gap-4 lg:flex-nowrap">
              {[
                { day: "Tue", icon: "icon-rain.webp", high: 20, low: 14 },
                { day: "Wed", icon: "icon-drizzle.webp", high: 21, low: 15 },
                { day: "Thu", icon: "icon-sunny.webp", high: 24, low: 14 },
                {
                  day: "Fri",
                  icon: "icon-partly-cloudy.webp",
                  high: 25,
                  low: 13,
                },
                { day: "Sat", icon: "icon-storm.webp", high: 21, low: 15 },
                { day: "Sun", icon: "icon-snow.webp", high: 25, low: 16 },
                { day: "Mon", icon: "icon-fog.webp", high: 24, low: 15 },
              ].map((item) => (
                <div
                  key={item.day}
                  className="flex h-[165px] w-[103px] flex-col items-center justify-between rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-[10px] py-[17px] lg:w-[96px] lg:flex-1"
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
        </div>

        <section className="rounded-[20px] bg-weather-app-neutral-800 px-4 py-5 lg:h-full lg:px-6 lg:py-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold leading-none">
              Hourly forecast
            </h3>
            <button
              type="button"
              className="flex items-center gap-[12px] rounded-lg bg-weather-app-neutral-600 px-[16px] py-[10px] leading-none lg:w-[120px] lg:justify-between"
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
          <div className="mt-[17px] flex flex-col gap-4 lg:mt-4">
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
      </div>
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

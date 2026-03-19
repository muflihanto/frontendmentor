// import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { bricolageGrotesque } from "../utils/fonts/bricolageGrotesque";
import { dmSans } from "../utils/fonts/dmSans";
import {
  type LocationData,
  useGeocoding,
  useWeather,
  type WeatherData,
  type WeatherUnits,
} from "../utils/useWeather";

// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

export default function WeatherApp() {
  const [weatherUnits, setWeatherUnits] = useState<WeatherUnits>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });
  const [location, setLocation] = useState({
    name: "Berlin, Germany",
    lat: 52.52,
    lon: 13.41,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [lastSearchFailed, setLastSearchFailed] = useState(false);

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    refetch: refetchWeather,
  } = useWeather(location.lat, location.lon, weatherUnits);

  const { data: geocodingResults, isFetching: isGeocodingFetching } =
    useGeocoding(activeQuery);

  useEffect(() => {
    if (
      geocodingResults &&
      geocodingResults.length === 0 &&
      !isGeocodingFetching &&
      activeQuery.length >= 2
    ) {
      setLastSearchFailed(true);
    }
  }, [geocodingResults, isGeocodingFetching, activeQuery]);

  const updateWeatherUnits = (newUnits: Partial<WeatherUnits>) => {
    setWeatherUnits((prev) => ({ ...prev, ...newUnits }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery);
    }
  };

  const selectLocation = (res: LocationData) => {
    setLocation({
      name: `${res.name}, ${res.country}`,
      lat: res.latitude,
      lon: res.longitude,
    });
    setSearchQuery("");
    setActiveQuery("");
    setLastSearchFailed(false);
  };

  return (
    <>
      <Head>
        <title>Frontend Mentor | Weather App</title>
      </Head>
      <div
        className={`App relative flex min-h-[100svh] flex-col bg-weather-app-neutral-900 px-4 py-4 pb-10 text-white ${dmSans.variable} ${bricolageGrotesque.variable} overflow-x-hidden font-dm-sans lg:py-[49px] lg:pb-[79px]`}
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <Header
            weatherUnits={weatherUnits}
            onUpdateUnits={updateWeatherUnits}
          />
          {isWeatherError ? (
            <ApiError onRetry={() => refetchWeather()} />
          ) : (
            <Main
              weatherData={weatherData}
              isLoading={isWeatherLoading}
              locationName={location.name}
              searchQuery={searchQuery}
              onSearchChange={(val: string) => {
                setSearchQuery(val);
                if (val.length < 2) {
                  setActiveQuery("");
                }
              }}
              onSearchSubmit={handleSearch}
              geocodingResults={geocodingResults}
              isGeocodingLoading={isGeocodingFetching}
              onLocationSelect={selectLocation}
              weatherUnits={weatherUnits}
              lastSearchFailed={lastSearchFailed}
            />
          )}
        </div>

        <Footer />
        {/* <Slider
          basePath="/weather-app/design"
          absolutePath="/weather-app/design/focus-state.jpg"
          // absolutePath="/weather-app/design/mobile-design-metric.jpg"
        /> */}
      </div>
    </>
  );
}

function Header({
  weatherUnits,
  onUpdateUnits,
}: {
  weatherUnits: WeatherUnits;
  onUpdateUnits: (newUnits: Partial<WeatherUnits>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="flex items-center gap-[6px] rounded bg-weather-app-neutral-800 px-[9px] py-2 font-medium hover:bg-weather-app-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-neutral-0 lg:gap-[10px] lg:px-4 lg:py-[9px]"
          aria-label="Switch to Imperial/Metric"
          aria-describedby="units-description"
        >
          <svg
            className="aspect-square w-[14px] lg:w-4"
            role="graphics-symbol"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <use href="/weather-app/assets/images/icon-units.svg#icon-units" />
          </svg>
          <span className="max-lg:text-[14px]">Units</span>
          <span id="units-description" className="sr-only">
            Opens a menu to switch between metric and imperial units for
            temperature, wind speed, and precipitation.
          </span>
          <svg
            className={`aspect-[13/8] h-[6px] transition-transform lg:h-2 ${isOpen ? "rotate-180" : ""}`}
            role="graphics-symbol"
            aria-hidden="true"
            viewBox="0 0 13 8"
          >
            <use href="/weather-app/assets/images/icon-dropdown.svg#icon-dropdown" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-20 mt-[10px] flex w-[214px] flex-col overflow-hidden rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-[7px] shadow-xl">
            <button
              type="button"
              onClick={() => {
                const isCurrentlyMetric =
                  weatherUnits.temperature === "celsius" &&
                  weatherUnits.windSpeed === "kmh" &&
                  weatherUnits.precipitation === "mm";

                if (isCurrentlyMetric) {
                  onUpdateUnits({
                    temperature: "fahrenheit",
                    windSpeed: "mph",
                    precipitation: "inch",
                  });
                } else {
                  onUpdateUnits({
                    temperature: "celsius",
                    windSpeed: "kmh",
                    precipitation: "mm",
                  });
                }
                setIsOpen(false);
              }}
              className="my-1.5 w-full rounded-lg px-2 py-1.5 text-left font-medium transition-colors hover:bg-weather-app-neutral-700 focus-visible:bg-weather-app-neutral-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-neutral-0"
            >
              Switch to{" "}
              {weatherUnits.temperature === "celsius" &&
              weatherUnits.windSpeed === "kmh" &&
              weatherUnits.precipitation === "mm"
                ? "Imperial"
                : "Metric"}
            </button>

            <div className="pb-[3px]">
              <p className="mb-1 px-2 py-[3px] text-[14px] font-medium text-weather-app-neutral-300">
                Temperature
              </p>
              <div className="flex flex-col gap-[3px]">
                <button
                  type="button"
                  onClick={() => onUpdateUnits({ temperature: "celsius" })}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg px-2 pb-px font-medium transition-colors hover:bg-weather-app-neutral-700",
                    weatherUnits.temperature === "celsius" &&
                      "bg-weather-app-neutral-700",
                  )}
                >
                  <span className="text-weather-app-neutral-200">
                    Celsius (°C)
                  </span>
                  {weatherUnits.temperature === "celsius" && (
                    <svg className="h-3 w-3 fill-white" viewBox="0 0 12 9">
                      <title>Selected</title>
                      <path d="M10.6667 0L12 1.33333L4 9.33333L0 5.33333L1.33333 4L4 6.66667L10.6667 0Z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateUnits({ temperature: "fahrenheit" })}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg px-2 pb-px font-medium transition-colors hover:bg-weather-app-neutral-700",
                    weatherUnits.temperature === "fahrenheit" &&
                      "bg-weather-app-neutral-700",
                  )}
                >
                  <span className="text-weather-app-neutral-200">
                    Fahrenheit (°F)
                  </span>
                  {weatherUnits.temperature === "fahrenheit" && (
                    <svg className="h-3 w-3 fill-white" viewBox="0 0 12 9">
                      <title>Selected</title>
                      <path d="M10.6667 0L12 1.33333L4 9.33333L0 5.33333L1.33333 4L4 6.66667L10.6667 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-weather-app-neutral-600 pb-[3px] pt-1">
              <p className="mb-1 px-2 py-[3px] text-[14px] font-medium text-weather-app-neutral-300">
                Wind Speed
              </p>
              <div className="flex flex-col gap-[3px]">
                {[
                  { value: "kmh", label: "km/h" },
                  { value: "mph", label: "mph" },
                ].map((unit) => (
                  <button
                    key={unit.value}
                    type="button"
                    onClick={() =>
                      onUpdateUnits({
                        windSpeed: unit.value as WeatherUnits["windSpeed"],
                      })
                    }
                    className={cn(
                      "flex h-10 w-full items-center justify-between rounded-lg px-2 pb-px font-medium transition-colors hover:bg-weather-app-neutral-700",
                      weatherUnits.windSpeed === unit.value &&
                        "bg-weather-app-neutral-700",
                    )}
                  >
                    <span className="text-weather-app-neutral-200">
                      {unit.label}
                    </span>
                    {weatherUnits.windSpeed === unit.value && (
                      <svg className="h-3 w-3 fill-white" viewBox="0 0 12 9">
                        <title>Selected</title>
                        <path d="M10.6667 0L12 1.33333L4 9.33333L0 5.33333L1.33333 4L4 6.66667L10.6667 0Z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-weather-app-neutral-600 pb-[3px] pt-1">
              <p className="mb-1 px-2 py-[3px] text-[14px] font-medium text-weather-app-neutral-300">
                Precipitation
              </p>
              <div className="flex flex-col gap-[3px]">
                <button
                  type="button"
                  onClick={() => onUpdateUnits({ precipitation: "mm" })}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg px-2 pb-px font-medium transition-colors hover:bg-weather-app-neutral-700",
                    weatherUnits.precipitation === "mm" &&
                      "bg-weather-app-neutral-700",
                  )}
                >
                  <span className="text-weather-app-neutral-200">
                    Millimeters (mm)
                  </span>
                  {weatherUnits.precipitation === "mm" && (
                    <svg className="h-3 w-3 fill-white" viewBox="0 0 12 9">
                      <title>Selected</title>
                      <path d="M10.6667 0L12 1.33333L4 9.33333L0 5.33333L1.33333 4L4 6.66667L10.6667 0Z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateUnits({ precipitation: "inch" })}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-lg px-2 pb-px font-medium transition-colors hover:bg-weather-app-neutral-700",
                    weatherUnits.precipitation === "inch" &&
                      "bg-weather-app-neutral-700",
                  )}
                >
                  <span className="text-weather-app-neutral-200">
                    Inches (inch)
                  </span>
                  {weatherUnits.precipitation === "inch" && (
                    <svg className="h-3 w-3 fill-white" viewBox="0 0 12 9">
                      <title>Selected</title>
                      <path d="M10.6667 0L12 1.33333L4 9.33333L0 5.33333L1.33333 4L4 6.66667L10.6667 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function ApiError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="mt-[48px] flex flex-col items-center text-center lg:mt-[108px]">
      <Image
        src="/weather-app/assets/images/icon-error.svg"
        alt=""
        width={42}
        height={42}
      />
      <h1 className="mt-7 font-bricolage-grotesque text-[52px] font-semibold leading-[1.2] tracking-[0.03em]">
        Something went wrong
      </h1>
      <p className="mt-[24px] max-w-[540px] text-xl leading-[1.2] tracking-[0.01rem] text-weather-app-neutral-200">
        We couldn&lsquo;t connect to the server (API error). Please try again in
        a few moments.
      </p>
      <button
        className="mt-6 flex h-[42px] w-[98px] items-center justify-center gap-[10px] rounded-lg bg-weather-app-neutral-800 p-2 font-medium"
        type="button"
        onClick={onRetry}
      >
        <Image
          src="/weather-app/assets/images/icon-retry.svg"
          height={17}
          width={16}
          alt=""
        />
        <span>Retry</span>
      </button>
    </main>
  );
}

function Main({
  weatherData,
  isLoading,
  locationName,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  geocodingResults,
  isGeocodingLoading,
  onLocationSelect,
  weatherUnits,
  lastSearchFailed,
}: {
  weatherData?: WeatherData;
  isLoading: boolean;
  locationName: string;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  geocodingResults?: LocationData[];
  isGeocodingLoading: boolean;
  onLocationSelect: (res: LocationData) => void;
  weatherUnits: WeatherUnits;
  lastSearchFailed: boolean;
}) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (weatherData && !selectedDay) {
      setSelectedDay(Object.keys(weatherData.hourly)[0]);
    }
  }, [weatherData, selectedDay]);

  const currentDayHourly =
    weatherData?.hourly[selectedDay ?? ""] ??
    Object.values(weatherData?.hourly ?? {})[0] ??
    [];

  const speedLabel = {
    kmh: "km/h",
    mph: "mph",
  }[weatherUnits.windSpeed];

  const precipLabel = {
    mm: "mm",
    inch: "inch",
  }[weatherUnits.precipitation];

  return (
    <main className="mt-[48px] flex flex-col gap-8 lg:mt-[64px]">
      <section className="text-center">
        <h1
          className={`font-bricolage-grotesque text-[52px] font-semibold leading-[1.2] tracking-[0.03em]`}
        >
          How&rsquo;s the sky looking today?
        </h1>

        <div className="relative mt-12 flex flex-col gap-3 lg:mx-auto lg:mt-16 lg:max-w-[655px] lg:flex-row lg:gap-4">
          <form
            onSubmit={onSearchSubmit}
            className="relative flex flex-col gap-3 lg:flex-1 lg:flex-row lg:gap-4"
          >
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
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                }}
                placeholder="Search for a place..."
                aria-label="Search for a city or location"
                className="h-[56px] w-full rounded-xl bg-weather-app-neutral-800 pl-[58px] pr-4 text-[20px] outline-none placeholder:font-semibold placeholder:text-weather-app-neutral-300 hover:bg-weather-app-neutral-700 focus-visible:outline focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-neutral-0"
              />
            </div>
            <button
              type="submit"
              className="h-[56px] w-full rounded-xl bg-weather-app-blue-500 text-[20px] font-medium tracking-wide transition-colors hover:bg-weather-app-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-blue-500 lg:w-[114px]"
            >
              Search
            </button>
          </form>

          {isGeocodingLoading && (
            <div
              className="absolute top-full z-10 mt-[14px] flex h-[55px] w-full items-center gap-[10px] rounded-xl bg-weather-app-neutral-800 px-4 shadow lg:max-w-[525px]"
              aria-live="polite"
            >
              <div className="animate-spin">
                <Image
                  src="/weather-app/assets/images/icon-loading.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </div>
              <p className="font-medium text-weather-app-neutral-0">
                Search in progress
              </p>
            </div>
          )}

          {geocodingResults &&
            geocodingResults.length > 0 &&
            !isGeocodingLoading && (
              <div
                className="absolute top-full z-10 mt-[10px] w-full rounded-xl bg-weather-app-neutral-800 p-2 shadow-xl lg:max-w-[525px]"
                role="listbox"
                aria-label="Search results"
              >
                {geocodingResults.map((res: LocationData) => (
                  <button
                    type="button"
                    key={res.id}
                    onClick={() => onLocationSelect(res)}
                    className="w-full rounded border border-transparent px-4 py-3 text-left hover:border-weather-app-neutral-600 hover:bg-weather-app-neutral-700"
                    role="option"
                    aria-selected="false"
                  >
                    <p className="font-medium">{res.name}</p>
                    <p className="text-sm text-weather-app-neutral-300">
                      {res.admin1 ? `${res.admin1}, ` : ""}
                      {res.country}
                    </p>
                  </button>
                ))}
              </div>
            )}
        </div>
      </section>

      {lastSearchFailed ? (
        <div className="mt-5 flex justify-center" aria-live="polite">
          <p className="text-[28px] font-bold leading-none text-white">
            No search result found!
          </p>
        </div>
      ) : isLoading || !weatherData ? (
        <MainSkeleton />
      ) : (
        <div className="flex flex-col gap-8 lg:mt-4 lg:grid lg:grid-cols-[auto_384px] lg:items-start">
          <div className="flex flex-col gap-8 lg:gap-12">
            <section>
              <div className="relative h-[286px] overflow-hidden rounded-[20px] bg-[image:url('/weather-app/assets/images/bg-today-small.svg')] bg-cover bg-center p-8 pt-[38px] lg:flex lg:items-center lg:justify-between lg:bg-[image:url('/weather-app/assets/images/bg-today-large.svg')] lg:px-6 lg:py-0">
                <div className="text-center lg:text-left">
                  <h2 className="text-[28px] font-bold">{locationName}</h2>
                  <p className="mt-1 text-lg opacity-70">
                    {weatherData.current.formattedDate}
                  </p>
                </div>

                <div className="mt-[13px] flex items-center justify-center gap-4 lg:mt-0">
                  <Image
                    src={`/weather-app/assets/images/${weatherData.current.icon}`}
                    alt={weatherData.current.icon
                      .replace("icon-", "")
                      .replace(".webp", "")}
                    width={120}
                    height={120}
                  />
                  <span className="pt-0.5 text-[96px] font-extrabold italic leading-none">
                    {weatherData.current.temp}°
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-4 lg:gap-6">
                {[
                  {
                    label: "Feels Like",
                    value: `${weatherData.current.feelsLike}°`,
                  },
                  {
                    label: "Humidity",
                    value: `${weatherData.current.humidity}%`,
                  },
                  {
                    label: "Wind",
                    value: `${weatherData.current.windSpeed} ${speedLabel}`,
                  },
                  {
                    label: "Precipitation",
                    value: `${weatherData.current.precipitation} ${precipLabel}`,
                  },
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
              <h2 className="text-xl font-medium leading-[1.1] tracking-[0.0175em]">
                Daily forecast
              </h2>
              <ul className="mt-[22px] flex flex-wrap justify-between gap-4 lg:flex-nowrap">
                {weatherData.daily.map((item) => (
                  <li
                    key={item.date}
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
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-[20px] bg-weather-app-neutral-800 py-5 lg:h-full lg:py-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
              <h2 className="text-xl font-semibold leading-none">
                Hourly forecast
              </h2>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  className="flex h-[36px] items-center justify-between gap-[12px] rounded-lg bg-weather-app-neutral-600 px-[16px] leading-none outline-none hover:bg-weather-app-neutral-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-neutral-0 lg:w-[120px]"
                >
                  <span className="truncate">{selectedDay}</span>
                  <Image
                    src="/weather-app/assets/images/icon-dropdown.svg"
                    alt=""
                    width={13}
                    height={8}
                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 top-full z-20 mt-[11px] flex w-[214px] flex-col gap-1 overflow-hidden rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-[7px] py-[7px] shadow-xl"
                    role="listbox"
                    aria-label="Select a day"
                  >
                    {Object.keys(weatherData.hourly).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          setSelectedDay(day);
                          setIsDropdownOpen(false);
                        }}
                        role="option"
                        aria-selected={selectedDay === day}
                        className={`h-[39px] w-full rounded-lg px-2 text-left transition-colors hover:bg-weather-app-neutral-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-weather-app-neutral-0 ${
                          selectedDay === day
                            ? "bg-weather-app-neutral-700 text-white"
                            : "text-weather-app-neutral-200"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-[17px] flex max-h-[592px] flex-col gap-4 overflow-scroll px-4 lg:mt-4 lg:px-6">
              {currentDayHourly.map((item) => (
                <div
                  key={item.time}
                  className="flex min-h-[60px] flex-1 items-center justify-between rounded-lg border border-weather-app-neutral-600 bg-weather-app-neutral-700 pl-[11px] pr-4 leading-none"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/weather-app/assets/images/${item.icon}`}
                      alt={item.icon.replace("icon-", "").replace(".webp", "")}
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
      )}
    </main>
  );
}

function MainSkeleton() {
  return (
    <div className="flex flex-col gap-8 lg:mt-4 lg:grid lg:grid-cols-[auto_384px] lg:items-start">
      <div className="flex flex-col gap-8 lg:gap-12">
        <section>
          {/* Main Card */}
          <div className="relative flex h-[286px] items-center justify-center overflow-hidden rounded-[20px] bg-weather-app-neutral-800 p-8 pt-[38px]">
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-[10px]">
                <div className="h-3 w-3 animate-bounce rounded-full bg-weather-app-neutral-200 [animation-duration:1s]" />
                <div className="h-3 w-3 animate-bounce rounded-full bg-weather-app-neutral-200 [animation-delay:0.2s] [animation-duration:1s]" />
                <div className="h-3 w-3 animate-bounce rounded-full bg-weather-app-neutral-200 [animation-delay:0.4s] [animation-duration:1s]" />
              </div>
              <p className="text-lg font-medium text-weather-app-neutral-200">
                Loading...
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-4 lg:mt-8 lg:grid-cols-4 lg:gap-6">
            {["Feels Like", "Humidity", "Wind", "Precipitation"].map(
              (label) => (
                <div
                  key={label}
                  className="flex h-[118px] flex-col justify-between rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 px-5 pb-[19px] pt-4"
                >
                  <p className="text-lg text-weather-app-neutral-200">
                    {label}
                  </p>
                  <p className="text-[32px] leading-none text-white">&ndash;</p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Daily Forecast */}
        <section>
          <h2 className="text-xl font-medium leading-[1.1] tracking-[0.0175em]">
            Daily forecast
          </h2>
          <div className="mt-[22px] flex flex-wrap justify-between gap-4 lg:flex-nowrap">
            {["d1", "d2", "d3", "d4", "d5", "d6", "d7"].map((id) => (
              <div
                key={id}
                className="h-[165px] w-[103px] rounded-xl border border-weather-app-neutral-600 bg-weather-app-neutral-800 lg:w-[96px] lg:flex-1"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Hourly Forecast Sidebar */}
      <section className="rounded-[20px] bg-weather-app-neutral-800 py-5 lg:h-full lg:py-6">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <h2 className="text-xl font-semibold leading-none">
            Hourly forecast
          </h2>
          <div className="relative">
            <div className="flex h-[36px] items-center justify-between rounded-lg bg-weather-app-neutral-600 px-[16px] leading-none lg:w-[67px]">
              <span>&ndash;</span>
              <Image
                src="/weather-app/assets/images/icon-dropdown.svg"
                alt=""
                width={13}
                height={8}
              />
            </div>
          </div>
        </div>
        <div className="mt-[17px] flex flex-col gap-4 px-4 lg:mt-4 lg:px-6">
          {["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"].map((id) => (
            <div
              key={id}
              className="h-[60px] rounded-lg border border-weather-app-neutral-600 bg-weather-app-neutral-700"
            />
          ))}
        </div>
      </section>
    </div>
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

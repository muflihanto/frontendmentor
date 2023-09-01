import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "usehooks-ts";
import { Listbox } from "@headlessui/react";
import data from "../public/rest-countries-api-with-color-theme-switcher/data.json";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

/**
 * Your users should be able to:
 * - See all countries from the API on the homepag
 * - Search for a country using an `input` fiel
 * - Filter countries by regio
 * - Click on a country to see more detailed information on a separate pag
 * - Click through to the border countries on the detail pag
 * - Toggle the color scheme between light and dark mode *(optional)*
 *
 * [REST Countries API](https://restcountries.com)
 */

const RegionName = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;
type RegionName = (typeof RegionName)[number];
type Region = {
  id: number;
  name: RegionName;
  unavailable: boolean;
};
const regions: Region[] = [
  { id: 1, name: "Africa", unavailable: false },
  { id: 2, name: "Americas", unavailable: false },
  { id: 3, name: "Asia", unavailable: false },
  { id: 4, name: "Europe", unavailable: false },
  { id: 5, name: "Oceania", unavailable: false },
];
const regionFilterAtom = atom<Region | null>(null);
const themeAtom = atomWithStorage<boolean>("rcapi-dark-mode", false);
const inputAtom = atom<string>("");
// const exampleCountry = {
//   name: "Germany",
//   capital: "Berlin",
//   region: "Europe" as RegionName,
//   population: 83240525,
//   flag: "https://flagcdn.com/de.svg",
// };
type Country = (typeof data)[number];

export default function RestCountriesApiWithColorThemeSwitcher() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Rest Countries Api With Color Theme Switcher</title>
      </Head>
      <div className="App font-nunito-sans dark:bg-rest-countries-darkblue-200 relative min-h-[100svh] font-light">
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/rest-countries-api-with-color-theme-switcher/design"
          // absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-home-dark.jpg"
          absolutePath="/rest-countries-api-with-color-theme-switcher/design/mobile-design-home-light.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  const [dark, setDark] = useAtom(themeAtom);
  const toggle = () => {
    setDark((d) => !d);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="shadow-rest-countries-darkblue-100/5 dark:bg-rest-countries-darkblue-100 dark:shadow-rest-countries-darkblue-300/5 relative z-10 flex h-20 items-center justify-between px-4 shadow-md">
      <h1 className="text-rest-countries-darkblue-200 dark:text-rest-countries-gray-100 text-[14px] font-extrabold tracking-[-.1px]">Where in the world?</h1>
      <button
        className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 flex items-center px-px pt-px text-[12px] font-normal"
        onClick={() => toggle()}
      >
        <span className="relative mr-[10px] aspect-square h-[14px]">
          <Image
            src={dark ? "/rest-countries-api-with-color-theme-switcher/images/moon.svg" : "/rest-countries-api-with-color-theme-switcher/images/moon-outline.svg"}
            fill
            alt="Moon Icon"
          />
        </span>
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

function InputField() {
  const [input, setInput] = useAtom(inputAtom);
  const debouncedValue = useDebounce<string>(input, 500);

  // useEffect(() => {
  //   console.log(debouncedValue);
  // }, [debouncedValue]);

  return (
    <form className="relative h-12 w-full">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-rest-countries-gray-300/60 dark:text-rest-countries-gray-100 absolute left-8 top-1/2 w-[15px] -translate-y-1/2"
      />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="shadow-rest-countries-gray-300/10 text-rest-countries-gray-300 dark:bg-rest-countries-darkblue-100 dark:shadow-rest-countries-darkblue-300/10 dark:text-rest-countries-gray-100 dark:placeholder:text-rest-countries-gray-100 h-full w-full rounded px-4 py-2 pl-[74px] text-[12px] tracking-[.05px] shadow-md placeholder:opacity-50 dark:placeholder:opacity-80"
        placeholder="Search for a country..."
      />
    </form>
  );
}

function RegionFilter() {
  const [selectedFilter, setSelectedFilter] = useAtom(regionFilterAtom);

  return (
    <div className="relative z-10 mt-10 self-start">
      <Listbox
        value={selectedFilter}
        onChange={setSelectedFilter}
      >
        <Listbox.Button className="text-rest-countries-darkblue-100 dark:text-rest-countries-gray-200 dark:bg-rest-countries-darkblue-100 group flex h-12 w-[200px] items-center justify-between rounded bg-white pl-6 pr-5 text-left text-[12px] font-semibold tracking-[-.125px] shadow-sm">
          <span>{selectedFilter?.name ?? "Filter by Region"}</span>
          <FontAwesomeIcon
            className="w-2 transition-transform group-data-[headlessui-state=open]:rotate-180"
            icon={faChevronDown}
          />
        </Listbox.Button>
        <Listbox.Options className="text-rest-countries-darkblue-100 dark:text-rest-countries-gray-200 dark:bg-rest-countries-darkblue-100 absolute left-0 top-[52px] flex w-[200px] flex-col gap-[6px] rounded bg-white px-6 py-[15px] text-[12px] font-semibold tracking-[-.125px] shadow">
          {regions.map((region) => (
            <Listbox.Option
              key={region.id}
              value={region}
              disabled={region.unavailable}
              className="hover:cursor-pointer"
            >
              {region.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

// function CountryCard({ country }: { country: { flag: string; name: string; population: number; region: RegionName; capital: string } }) {
function CountryCard({ country }: { country: Country }) {
  const localeStringPopulation = useMemo(() => country.population.toLocaleString("en-GB"), [country]);
  return (
    <button className="shadow-rest-countries-gray-300/10 dark:bg-rest-countries-darkblue-100 dark:shadow-rest-countries-darkblue-300/10 flex h-[336px] w-[265px] flex-col items-center overflow-hidden rounded bg-white shadow-md">
      <div className="relative h-[160px] w-full">
        <Image
          src={country.flags.svg}
          alt={`${country.name}'s Flag`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-start px-[25px] pt-[24px] text-[14px]/[24px]">
        <h2 className="dark:text-rest-countries-gray-100 mb-[12px] text-[18px]/[1.5] font-extrabold">{country.name}</h2>
        <p className="text-rest-countries-darkblue-100 dark:text-rest-countries-gray-200">
          <span className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 font-semibold">Population: </span>
          {localeStringPopulation}
        </p>
        <p className="text-rest-countries-darkblue-100 dark:text-rest-countries-gray-200">
          <span className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 font-semibold">Region: </span>
          {country.region}
        </p>
        <p className="text-rest-countries-darkblue-100 dark:text-rest-countries-gray-200">
          <span className="text-rest-countries-darkblue-300 dark:text-rest-countries-gray-100 font-semibold">Capital: </span>
          {country.capital}
        </p>
      </div>
    </button>
  );
}

function Main() {
  const selectedFilter = useAtomValue(regionFilterAtom);

  return (
    <div className="bg-rest-countries-gray-200 dark:bg-rest-countries-darkblue-200 min-h-52 flex flex-col items-center px-4 py-6">
      <InputField />
      <RegionFilter />
      <div className="mt-[32px] flex flex-col gap-10">
        {selectedFilter === null
          ? data.map((ctr, index) => {
              return (
                <CountryCard
                  key={index}
                  country={ctr}
                />
              );
            })
          : data
              .filter((ctr) => {
                return ctr.region === selectedFilter.name;
              })
              .map((ctr, index) => {
                return (
                  <CountryCard
                    key={index}
                    country={ctr}
                  />
                );
              })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="dark:text-rest-countries-gray-100 absolute bottom-3 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
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

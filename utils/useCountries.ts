// https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,subregion,capital,topLevelDomain,currencies,languages,borders

import { useQuery } from "@tanstack/react-query";
import ky from "ky-universal";
import type { Countries } from "./types";

type Country = Countries[number];
const filterKeys = [
  "name",
  "flags",
  "cca3",
  "population",
  "region",
  "subregion",
  "capital",
  "tld",
  "currencies",
  "languages",
  "borders",
] as const;
type CountryFiltered = Pick<Country, (typeof filterKeys)[number]>;
type CountriesFiltered = CountryFiltered[];
const filterQuery = `fields=${filterKeys.join(",")}`;

const fetchCountries = async (limit = 10) => {
  const parsed: CountriesFiltered = await ky(
    `https://restcountries.com/v3.1/all?${filterQuery}`,
  ).json();

  return parsed.filter((_, index) => index <= limit);
};

const fetchCountry = async (name: string) => {
  const parsed: CountriesFiltered = await ky(
    `https://restcountries.com/v3.1/name/${name}?fullText=true&${filterQuery}`,
  ).json();

  return parsed;
};

const fetchCountryBorders = async (countries: string[]) => {
  const parsed: CountriesFiltered = await ky(
    `https://restcountries.com/v3.1/alpha?codes=${countries.join(",")}&${filterQuery}`,
  ).json();

  return parsed;
};

const useCountries = (limit: number) => {
  return useQuery({
    queryKey: ["countries", limit],
    queryFn: () => fetchCountries(limit),
  });
};

const useCountry = (name: string) => {
  return useQuery({
    queryKey: ["country", name],
    queryFn: () => fetchCountry(name),
    enabled: name !== undefined,
    retry: (count) => {
      if (count >= 1) return false;
      return true;
    },
  });
};

const useBorders = (countries: string[]) => {
  return useQuery({
    queryKey: ["borders", countries],
    queryFn: () => fetchCountryBorders(countries),
    enabled: countries.length > 0,
  });
};

export { fetchCountries, fetchCountry, useBorders, useCountries, useCountry };

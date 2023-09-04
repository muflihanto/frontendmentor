// https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,subregion,capital,topLevelDomain,currencies,languages,borders

import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { type Countries } from "./types";
type Country = Countries[number];

const fetchCountries = async (limit = 10) => {
  const parsed: Countries = await ky("https://restcountries.com/v3.1/all?fields=name,flags,cca3,population,region,subregion,capital,topLevelDomain,currencies,languages,borders").json();

  return parsed.filter((_, index) => index <= limit);
};

const fetchCountry = async (name: string) => {
  const parsed: Countries = await ky(`https://restcountries.com/v3.1/name/${name}`).json();

  return parsed;
};

const fetchCountryBorders = async (countries: string[]) => {
  const parsed: Countries = await ky(`https://restcountries.com/v3.1/alpha?codes=${countries.join(",")}`).json();

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
  });
};

const useBorders = (countries: string[]) => {
  return useQuery({
    queryKey: ["borders", countries],
    queryFn: () => fetchCountryBorders(countries),
    enabled: countries.length > 0,
  });
};

export { useCountries, fetchCountries, useCountry, fetchCountry, useBorders };

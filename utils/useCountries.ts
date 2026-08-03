// The legacy REST Countries API (v1-v4) is deprecated and no longer returns
// data, so all lookups are served from the local snapshot in
// `public/rest-countries-api-with-color-theme-switcher/all.json`.

import { useQuery } from "@tanstack/react-query";
import dataJson from "../public/rest-countries-api-with-color-theme-switcher/all.json";
import type { Countries } from "./types";

const data = dataJson as Countries;

const fetchCountries = (limit = 10) => {
  return data.filter((_, index) => index <= limit);
};

const fetchCountry = (name: string) => {
  const matches = data.filter(
    (country) => country.name.common.toLowerCase() === name.toLowerCase(),
  );
  return matches.length > 0 ? matches : undefined;
};

const fetchCountryBorders = (codes: string[]) => {
  return data.filter((country) => codes.includes(country.cca3));
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

export { fetchCountries, fetchCountry, useBorders, useCountries, useCountry };

import { objectKeys } from 'utils/object.keys.ts';

import { memoize } from 'library/intl/phone-input/memoize.ts';

import type { Flags } from 'app/valibot.ts';
import type { Country, Region, Masks } from 'library/intl/phone-input/types.ts';

// Countries array methods
export function deleteAreaCodes(
  filteredCountries: ReadonlyArray<Country>
): ReadonlyArray<Country> {
  return filteredCountries.filter((country: Country): boolean => {
    return country.isAreaCode !== true;
  });
}

export function filterRegions(
  regions: Region | Array<Region>,
  filteredCountries: Array<Country>
): Array<Country> {
  if (typeof regions === 'string') {
    return filteredCountries.filter((country): boolean => {
      return country.regions.includes(regions);
    });
  }

  // Regions is array
  return filteredCountries.filter((country: Country): boolean => {
    for (const region of regions) {
      if (country.regions.includes(region)) {
        return true;
      }
    }

    return false;
  });
}

export function insertMasks(
  masks: Readonly<Masks>,
  filteredCountries: Array<Country>
): Array<Country> {
  let count = objectKeys(masks).length;

  for (let i = 0; i < filteredCountries.length && count > 0; ++i) {
    const country = filteredCountries[i];

    if (typeof country !== 'undefined') {
      const mask = masks[country.iso2];

      if (typeof mask !== 'undefined') {
        country.format = mask;
        --count;
      }
    }
  }

  return filteredCountries;
}

export function getOnlyCountries(
  onlyCountriesArray: ReadonlyArray<string>,
  filteredCountries: ReadonlyArray<Country>
): ReadonlyArray<Country> {
  if (onlyCountriesArray.length === 0) {
    return filteredCountries;
  }

  return filteredCountries.filter((country) => {
    return onlyCountriesArray.includes(country.iso2);
  });
}

export function excludeCountriesUtil(
  selectedCountries: ReadonlyArray<Country>,
  excludedCountries: ReadonlyArray<string>
): ReadonlyArray<Country> {
  if (excludedCountries.length === 0) {
    return selectedCountries;
  }

  return selectedCountries.filter((country) => {
    return excludedCountries.includes(country.iso2) === false;
  });
}

export const getProbableCandidateIndex = memoize(
  (queryString: string, onlyCountries: ReadonlyArray<Country>): number => {
    if (queryString.length === 0) {
      return -1;
    }

    // don't include the preferred countries in search
    return onlyCountries.findIndex((country): boolean => {
      return country.name.toLowerCase().startsWith(queryString.toLowerCase());
    });
  }
);

export const guessSelectedCountry = memoize(
  (
    inputNumber: string,
    onlyCountries: ReadonlyArray<Country>,
    defaultCountry: Flags
  ): Readonly<Country> => {
    const secondBestGuess =
      onlyCountries.find((country): boolean => {
        return country.iso2 === defaultCountry;
      }) ||
      ({
        name: '',
        regions: [],

        iso2: '' as Flags,
        dialCode: '',
      } as Readonly<Country>);

    if (inputNumber.trim() === '') {
      return secondBestGuess;
    }

    let res: Readonly<Country> = {
      name: '',
      regions: [],
      iso2: 'ph',
      dialCode: '',
      priority: 10_001,
    };

    for (const item of onlyCountries) {
      if (
        inputNumber.startsWith(item.dialCode) &&
        (item.dialCode.length > res.dialCode.length ||
          (item.dialCode.length === res.dialCode.length &&
            typeof item.priority !== 'undefined' &&
            typeof res.priority !== 'undefined' &&
            item.priority < res.priority))
      ) {
        res = item;
      }
    }

    if (res.name.length > 0) {
      return res;
    }

    return secondBestGuess;
  }
);

export function filterCountriesByValue(
  search: string,
  countries: ReadonlyArray<Country>
): ReadonlyArray<Country> {
  return countries.filter(({ name, iso2, dialCode }) => {
    return `${name}|${iso2}|+${dialCode}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });
}

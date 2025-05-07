import type { InputHTMLAttributes } from 'react';

import type { Flags } from 'app/valibot.ts';

type CountryName = string;

export type Region =
  | 'america'
  | 'europe'
  | 'asia'
  | 'oceania'
  | 'africa'
  | 'north-america'
  | 'south-america'
  | 'central-america'
  | 'carribean'
  | 'european-union'
  | 'ex-ussr'
  | 'middle-east'
  | 'north-africa';

type DialCode = string;
type Format = string;
type Priority = number;
type AreaCodes = Array<string>;

export type RawCountry = [
  CountryName,
  ReadonlyArray<Region>,
  Flags,
  DialCode,
  Format?,
  Priority?,
  AreaCodes?,
];

export type Country = {
  name: CountryName;
  readonly regions: ReadonlyArray<Region>;
  iso2: Flags;
  dialCode: DialCode;
  format?: Format | undefined;
  priority?: Priority | undefined;
  hasAreaCodes?: boolean | undefined;
  isAreaCode?: boolean | undefined;
};

export type CountryData = {
  name: string;
  dialCode: string;
  countryCode: string;
};

export type ExtraProps = InputHTMLAttributes<HTMLInputElement>;

export type Localization = Record<string, string | undefined>;

export type Masks = Record<string, string | undefined>;

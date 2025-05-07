import {
  memo,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
} from 'react';
import classnames from 'classnames';

import { objectKeys } from 'utils/object.keys.ts';

import {
  insertMasks,
  filterRegions,
  guessSelectedCountry,
} from 'library/intl/phone-input/utils.ts';
import { allCountries } from 'library/intl/phone-input/country-data.ts';

import { noop } from 'utils/noop.ts';

import * as flagsBgClasses from 'styles/flags.module.css';

import type {
  Masks,
  Region,
  Country,
  ExtraProps,
} from 'library/intl/phone-input/types.ts';
import type { Flags } from 'app/valibot.ts';

type Props = {
  masks?: Masks;
  defaultCountry?: Flags;
  id: string;
  name: string;
  value: string;
  inputClassName: string;
  flagClassName: string;
  dropdownButtonClassName: string;
  dataTestId?: string | undefined;
  autoFormat?: boolean | undefined;
  containerClassName?: string | undefined;
  enableLongNumbers?: boolean | undefined;
  inputExtraProps?: ExtraProps | undefined;
  disableCountryCode?: boolean | undefined;
  regions?: Region | Array<Region> | undefined;
};

type State = {
  id: string;
  defaultCountry: Flags;
  formattedNumber: string;
  selectedCountry: Readonly<Country> | undefined;
  freezeSelection: boolean;
};

type DefaultProps = Required<
  Pick<
    Props,
    'defaultCountry' | 'containerClassName' | 'inputExtraProps' | 'masks'
  >
>;

const defaultProps: DefaultProps = {
  defaultCountry: 'us',
  containerClassName: '',
  inputExtraProps: {},
  masks: {},
};

function F_PhoneInputReadonly({
  id,
  name,
  value,
  regions,
  flagClassName,
  inputClassName,
  dropdownButtonClassName,
  autoFormat = true,
  enableLongNumbers = false,
  disableCountryCode = false,
  masks = defaultProps.masks,
  defaultCountry = defaultProps.defaultCountry,
  inputExtraProps = defaultProps.inputExtraProps,
  containerClassName = defaultProps.containerClassName,
  dataTestId = '',
}: Props): JSX.Element {
  const formatNumber = useCallback<
    (text: string, patternArg?: string | undefined) => string
  >(
    (text, patternArg) => {
      const pattern =
        disableCountryCode &&
        typeof patternArg !== 'undefined' &&
        patternArg !== ''
          ? patternArg.slice(patternArg.indexOf(' ') + 1)
          : patternArg;

      if (text.length === 0) {
        return disableCountryCode ? '' : '+';
      }

      // for all strings with length less than 3, just return it (1, 2 etc.)
      // also return the same text if the selected country has no fixed format
      if (
        (text.length > 0 && text.length < 2) ||
        typeof pattern === 'undefined' ||
        pattern === '' ||
        !autoFormat
      ) {
        return disableCountryCode ? text : `+${text}`;
      }

      const array: Array<string> = [];
      const src = text.split('');

      // Fill array by pattern
      for (const char of pattern) {
        if (src.length === 0) {
          break;
        }

        array.push(char === '.' ? (src.shift() ?? '') : char);
      }

      if (enableLongNumbers) {
        array.push(...src);
      }

      return array.join('');
    },
    [autoFormat, disableCountryCode, enableLongNumbers]
  );

  const incomingCountries = useMemo<Array<Country>>(() => {
    let filteredCountries = allCountries;

    if (typeof regions !== 'undefined') {
      const readOnly: Array<Country> = filteredCountries;

      filteredCountries = filterRegions(regions, readOnly);
    }

    if (objectKeys(masks).length !== 0) {
      return insertMasks(masks, filteredCountries);
    }

    return filteredCountries;
  }, [masks, regions]);

  const [state, setState] = useState<State>(() => {
    const inputNumber = value.replace(/[^\d.]+/g, '') || '';

    const countryGuess = incomingCountries.find((country: Country): boolean => {
      return country.iso2 === defaultCountry;
    });

    const dialCode =
      inputNumber.length < 2 &&
      typeof countryGuess !== 'undefined' &&
      !inputNumber.replace(/\D/g, '').startsWith(countryGuess.dialCode)
        ? countryGuess.dialCode
        : '';

    const formattedNumber =
      inputNumber === '' && typeof countryGuess === 'undefined'
        ? ''
        : formatNumber(
            (disableCountryCode ? '' : dialCode) +
              inputNumber.replace(/\D/g, ''),
            typeof countryGuess !== 'undefined' && countryGuess.name
              ? countryGuess.format
              : undefined
          );

    return {
      id: id || Date.now().toString(16),
      placeholder: '',
      formattedNumber,
      defaultCountry,
      selectedCountry: countryGuess,
      freezeSelection: false,
    };
  });

  const updateFormattedNumber = useCallback<(value: string) => void>(
    (value: string): void => {
      setState((state): State => {
        let country: Readonly<Country> | undefined;

        const inputNumber = value.replace(/\D/g, '');

        let formattedNumber = value;

        // if inputNumber does not start with '+', then use default country's dialing prefix,
        // otherwise use logic for finding country based on country prefix.
        if (value.startsWith('+')) {
          country = guessSelectedCountry(
            inputNumber.substring(0, 6),
            incomingCountries,
            state.defaultCountry
          );

          formattedNumber = formatNumber(inputNumber, country.format);
        } else {
          country =
            incomingCountries.find((country): boolean => {
              return country.iso2 === state.defaultCountry;
            }) || state.selectedCountry;

          const dialCode =
            typeof country !== 'undefined' &&
            !inputNumber.startsWith(country.dialCode)
              ? country.dialCode
              : '';

          formattedNumber = formatNumber(
            (disableCountryCode ? '' : dialCode) + inputNumber,
            country ? country.format : undefined
          );
        }

        return {
          ...state,
          selectedCountry: country,
          formattedNumber,
        };
      });
    },
    [incomingCountries, formatNumber, disableCountryCode]
  );

  useEffect((): void => {
    if (defaultCountry !== state.defaultCountry) {
      setState((currentState: State): State => {
        const country = incomingCountries.find((country: Country): boolean => {
          return country.iso2 === defaultCountry;
        });

        return {
          ...currentState,
          defaultCountry,
          selectedCountry: country,
          formattedNumber:
            disableCountryCode || typeof country === 'undefined'
              ? ''
              : `+${country.dialCode}`,
        };
      });
    } else if (value !== state.formattedNumber && value !== '') {
      updateFormattedNumber(value);
    }
  }, [
    defaultCountry,
    disableCountryCode,
    incomingCountries,
    state.defaultCountry,
    state.formattedNumber,
    updateFormattedNumber,
    value,
  ]);

  const flag_ClassName = useMemo<string>(() => {
    return classnames(
      flagClassName,
      flagsBgClasses[
        typeof state.selectedCountry === 'undefined'
          ? defaultCountry
          : state.selectedCountry.iso2
      ]
    );
  }, [defaultCountry, flagClassName, state.selectedCountry]);

  return (
    <div className={containerClassName}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <button
        type='button'
        aria-expanded={false}
        aria-haspopup='listbox'
        onClick={noop}
        disabled={true}
        className={dropdownButtonClassName}
        aria-label={
          state.selectedCountry
            ? `${state.selectedCountry.name}: + ${state.selectedCountry.dialCode}`
            : ''
        }
      >
        <span role='img' aria-hidden className={flag_ClassName} />
      </button>

      <input
        id={id}
        type='tel'
        name={name}
        onClick={noop}
        className={inputClassName}
        value={state.formattedNumber}
        data-testid={dataTestId}
        {...inputExtraProps}
      />
    </div>
  );
}

export const PhoneInputReadonly: ComponentType<Props> =
  memo<Props>(F_PhoneInputReadonly);

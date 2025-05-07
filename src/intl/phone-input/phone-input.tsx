import {
  memo,
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type MouseEvent as ReactMouseEvent,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import classnames from 'classnames';
import { debounce } from 'ts-debounce';

import { objectKeys } from 'utils/object.keys.ts';

import {
  insertMasks,
  filterRegions,
  deleteAreaCodes,
  getOnlyCountries,
  excludeCountriesUtil,
  guessSelectedCountry,
  filterCountriesByValue,
  getProbableCandidateIndex,
} from 'library/intl/phone-input/utils.ts';
import { Listbox } from 'library/intl/phone-input/listbox.tsx';
import { allCountries } from 'library/intl/phone-input/country-data.ts';

import * as flagsBgClasses from 'styles/flags.module.css';

import type {
  Masks,
  Region,
  Country,
  ExtraProps,
  CountryData,
  Localization,
} from 'library/intl/phone-input/types.ts';
import type { Flags } from 'app/valibot.ts';
import type { AutoComplete } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  name: string;
  value: string;
  masks?: Masks;
  valid: boolean;
  invalid: boolean;
  isTouched: boolean;
  required?: boolean;
  disabled?: boolean;
  validClassName: string;
  defaultCountry?: Flags;
  inputClassName: string;
  buttonClassName: string;
  hiddenClassName: string;
  searchClassName: string;
  invalidClassName: string;
  listBoxClassName: string;
  flagClassName: string;
  localization?: Localization;
  searchIconClassName: string;
  listboxItemClassName: string;
  searchLabelClassName: string;
  inputTouchedClassName: string;
  listContainerClassName: string;
  inputUnTouchedClassName: string;
  dropdownButtonClassName: string;
  listboxDividerClassName: string;
  searchInputLabel: IntlMessageId;
  listboxItemIconClassName: string;
  listboxItemNameClassName: string;
  listboxItemDescClassName: string;
  searchContainerClassName: string;
  searchPlaceholder: IntlMessageId;
  noEntriesMessageClassName: string;
  dropdownButtonIconClassName: string;
  dataTestId?: string | undefined;
  autoFormat?: boolean | undefined;
  disableDropdown?: boolean | undefined;
  disableAreaCodes?: boolean | undefined;
  containerClassName?: string | undefined;
  enableSearchField?: boolean | undefined;
  disableSearchIcon?: boolean | undefined;
  enableLongNumbers?: boolean | undefined;
  autoComplete?: AutoComplete | undefined;
  inputExtraProps?: ExtraProps | undefined;
  disableCountryCode?: boolean | undefined;
  countryCodeEditable?: boolean | undefined;
  regions?: Region | Array<Region> | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  readonly onlyCountries?: ReadonlyArray<string>;
  readonly excludeCountries?: ReadonlyArray<string>;
  readonly preferredCountries?: ReadonlyArray<string>;
  onChange(value: string, country: Readonly<CountryData>, valid: boolean): void;
  onBlur(
    event: ReactFocusEvent<HTMLInputElement, Element>,
    country: Readonly<CountryData>,
    valid: boolean
  ): void;
  onKeyUp?:
    | ((event: ReactKeyboardEvent<HTMLInputElement>, valid: boolean) => void)
    | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;

  onClick?:
    | ((
        event: ReactMouseEvent<HTMLInputElement, MouseEvent>,
        country: Readonly<CountryData>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        event: ReactFocusEvent<HTMLInputElement, Element>,
        country: Readonly<CountryData>
      ) => void)
    | undefined;
  onEnterKeyPress?:
    | ((event: ReactKeyboardEvent<HTMLInputElement | HTMLLIElement>) => void)
    | undefined;
};

type State = {
  id: string;
  formattedNumber: string;
  defaultCountry: Flags;
  selectedCountry: Readonly<Country> | undefined;
  freezeSelection: boolean;
};

type DefaultProps = Required<
  Pick<
    Props,
    | 'preferredCountries'
    | 'excludeCountries'
    | 'onlyCountries'
    | 'defaultCountry'
    | 'containerClassName'
    | 'inputExtraProps'
    | 'localization'
    | 'masks'
    // | 'isValid'
  >
>;

function isValid(inputNumber: string, format: string | undefined): boolean {
  return typeof format === 'string' && format.length > 0
    ? inputNumber.length === format.length
    : inputNumber.length > 6;
}

const defaultProps: DefaultProps = {
  preferredCountries: [],
  excludeCountries: [],
  onlyCountries: [],
  defaultCountry: 'us',
  containerClassName: '',
  inputExtraProps: {},
  localization: {},
  masks: {},
};

function F_PhoneInput({
  id,
  name,
  value,
  valid,
  onBlur,
  invalid,
  regions,
  onClick,
  onFocus,
  onKeyUp,
  inputRef,
  onChange,
  onKeyDown,
  isTouched,
  autoComplete,
  flagClassName,
  inputClassName,
  validClassName,
  hiddenClassName,
  searchClassName,
  onEnterKeyPress,
  invalidClassName,
  listBoxClassName,
  searchInputLabel,
  searchPlaceholder,
  searchIconClassName,
  listboxItemClassName,
  searchLabelClassName,
  inputTouchedClassName,
  listContainerClassName,
  inputUnTouchedClassName,
  listboxDividerClassName,
  dropdownButtonClassName,
  listboxItemIconClassName,
  listboxItemNameClassName,
  listboxItemDescClassName,
  searchContainerClassName,
  noEntriesMessageClassName,
  dropdownButtonIconClassName,
  disabled = false,
  required = false,
  autoFormat = true,
  disableDropdown = false,
  disableAreaCodes = false,
  enableLongNumbers = false,
  enableSearchField = false,
  disableSearchIcon = false,
  disableCountryCode = false,
  countryCodeEditable = true,
  masks = defaultProps.masks,
  localization = defaultProps.localization,
  onlyCountries = defaultProps.onlyCountries,
  defaultCountry = defaultProps.defaultCountry,
  inputExtraProps = defaultProps.inputExtraProps,
  excludeCountries = defaultProps.excludeCountries,
  preferredCountries = defaultProps.preferredCountries,
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

  const onlyCountriesMemo = useMemo<ReadonlyArray<Country>>(() => {
    return excludeCountriesUtil(
      getOnlyCountries(onlyCountries, incomingCountries),
      excludeCountries.concat(preferredCountries)
    );
  }, [excludeCountries, incomingCountries, onlyCountries, preferredCountries]);

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

  const preferredCountriesMemo = useMemo<Array<Country>>(() => {
    return incomingCountries.filter((country): boolean => {
      return preferredCountries.includes(country.iso2);
    });
  }, [incomingCountries, preferredCountries]);

  // Filter countries by string value
  const [filter, setFilterOrig] = useState<string>('');

  const filteredOnlyCountries = useMemo<ReadonlyArray<Country>>(() => {
    const list = enableSearchField
      ? filterCountriesByValue(filter, onlyCountriesMemo)
      : onlyCountriesMemo;

    return disableAreaCodes ? deleteAreaCodes(list) : list;
  }, [disableAreaCodes, enableSearchField, filter, onlyCountriesMemo]);

  const filteredPreferredCountries = useMemo<ReadonlyArray<Country>>(() => {
    const list = enableSearchField
      ? filterCountriesByValue(filter, preferredCountriesMemo)
      : preferredCountriesMemo;

    return disableAreaCodes ? deleteAreaCodes(list) : list;
  }, [disableAreaCodes, enableSearchField, filter, preferredCountriesMemo]);

  // Concat filtered countries
  const filteredCountries = useMemo<ReadonlyArray<Country>>(() => {
    return filteredPreferredCountries.concat(filteredOnlyCountries);
  }, [filteredPreferredCountries, filteredOnlyCountries]);

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
    value,
    defaultCountry,
    incomingCountries,
    disableCountryCode,
    state.defaultCountry,
    state.formattedNumber,
    updateFormattedNumber,
  ]);

  // Put the cursor to the end of the input (usually after a focus event)
  const cursorToEnd = useCallback<() => void>(() => {
    const input = inputRef?.current;

    if (input === null) {
      return;
    }

    input?.focus();

    const len = input?.value.length;

    if (typeof len === 'undefined') {
      return;
    }

    input?.setSelectionRange(len, len);
  }, [inputRef]);

  // return country data from state
  const getCountryData = useCallback<() => CountryData>(() => {
    if (typeof state.selectedCountry === 'undefined') {
      return {
        name: '',
        dialCode: '',
        countryCode: '',
      };
    }

    return {
      name: state.selectedCountry.name || '',
      dialCode: state.selectedCountry.dialCode || '',
      countryCode: state.selectedCountry.iso2,
    };
  }, [state.selectedCountry]);

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    return typeof state.selectedCountry === 'undefined'
      ? -1
      : filteredCountries.indexOf(state.selectedCountry);
  });

  const [open, setOpen] = useState<boolean>(false);

  const onDropdownClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event): void => {
      event.stopPropagation();

      setOpen((open) => {
        if (disabled && !open) {
          return open;
        }

        return !open;
      });

      if (disabled && !open) {
        return;
      }

      if (typeof state.selectedCountry === 'undefined') {
        setActiveIndex(-1);
      } else {
        let index = preferredCountriesMemo.indexOf(state.selectedCountry);

        if (index === -1) {
          const listCountries = disableAreaCodes
            ? deleteAreaCodes(onlyCountriesMemo)
            : onlyCountriesMemo;

          index = listCountries.indexOf(state.selectedCountry);

          setActiveIndex(index + preferredCountries.length);
        } else {
          setActiveIndex(index);
        }
      }
    },
    [
      disableAreaCodes,
      disabled,
      onlyCountriesMemo,
      open,
      preferredCountries.length,
      preferredCountriesMemo,
      state.selectedCountry,
    ]
  );

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      let selected = state.selectedCountry;

      if (!countryCodeEditable) {
        const updatedInput = `+${
          typeof selected === 'undefined' ? '' : selected.dialCode
        }`;

        if (event.target.value.length < updatedInput.length) {
          return;
        }
      }

      // before entering the number in new format, lets check if the dial code now matches some other country
      const inputNumber = event.target.value.replace(/\D/g, '');

      // Does not exceed 15 digit phone number limit
      if (inputNumber.length > 15) {
        return;
      }

      // if the input is the same as before, must be some special key like enter etc.
      if (event.target.value === state.formattedNumber) {
        return;
      }

      event.preventDefault();

      let freezeSelection = state.freezeSelection;
      let formattedNumber = disableCountryCode ? '' : '+';

      if (event.target.value.length > 0) {
        // we don't need to send the whole number to guess the country... only the first 6 characters are enough
        // the guess country function can then use memoization much more effectively since the set of input it
        // gets has drastically reduced
        if (
          state.freezeSelection === false ||
          typeof selected === 'undefined' ||
          selected.dialCode.length > inputNumber.length
        ) {
          selected = guessSelectedCountry(
            inputNumber.substring(0, 6),
            incomingCountries,
            state.defaultCountry
          );
          freezeSelection = false;
        }

        // remove all non numerals from the input
        formattedNumber = formatNumber(inputNumber, selected.format);

        selected = selected.dialCode ? selected : state.selectedCountry;
      }

      let caretPosition = event.target.selectionStart ?? 0;

      const oldFormattedText = state.formattedNumber;

      const diff = formattedNumber.length - oldFormattedText.length;

      if (diff > 0) {
        caretPosition -= diff;
      }

      const lastChar = formattedNumber.charAt(formattedNumber.length - 1);

      if (inputRef?.current != null) {
        if (lastChar === ')') {
          inputRef.current.setSelectionRange(
            formattedNumber.length - 1,
            formattedNumber.length - 1
          );
        } else if (
          caretPosition > 0 &&
          oldFormattedText.length >= formattedNumber.length
        ) {
          inputRef.current.setSelectionRange(caretPosition, caretPosition);
        }
      }

      setState((state: State): State => {
        return {
          ...state,
          formattedNumber,
          freezeSelection,
          selectedCountry: selected,
        };
      });

      if (typeof onChange === 'function') {
        const valid = isValid(
          formattedNumber.replace(/\D/g, ''),
          state.selectedCountry?.format?.replace(/[^.]/g, '')
        );

        onChange(formattedNumber, getCountryData(), valid);
      }
    },
    [
      state.selectedCountry,
      state.formattedNumber,
      state.freezeSelection,
      state.defaultCountry,
      countryCodeEditable,
      disableCountryCode,
      inputRef,
      onChange,
      formatNumber,
      incomingCountries,
      getCountryData,
    ]
  );

  const handleClick = useCallback<MouseEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      setOpen(() => {
        return false;
      });

      setFilterOrig('');

      if (typeof onClick === 'function') {
        onClick(event, getCountryData());
      }
    },
    [getCountryData, onClick]
  );

  const onSelect = useCallback<(country: Readonly<Country>) => void>(
    (country): void => {
      const unformattedNumber = state.formattedNumber.replace(/[ ()-]/g, '');

      const newNumber =
        unformattedNumber.length > 1 &&
        typeof state.selectedCountry !== 'undefined'
          ? unformattedNumber.replace(
              state.selectedCountry.dialCode,
              country.dialCode
            )
          : country.dialCode;

      const formattedNumber = formatNumber(
        newNumber.replace(/\D/g, ''),
        country.format
      );

      setState((state: State): State => {
        return {
          ...state,
          selectedCountry: country,
          freezeSelection: true,
          formattedNumber,
        };
      });

      setOpen(false);

      setFilterOrig('');

      window.setTimeout(cursorToEnd, 0);
    },
    [state.formattedNumber, state.selectedCountry, formatNumber, cursorToEnd]
  );

  const handleInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      // if the input is blank, insert dial code of the selected country
      if (
        inputRef?.current !== null &&
        inputRef?.current.value === '+' &&
        disableCountryCode === false
      ) {
        setState((state: State): State => {
          if (typeof state.selectedCountry !== 'undefined') {
            const formattedNumber = `+${state.selectedCountry.dialCode}`;

            return {
              ...state,
              formattedNumber,
            };
          }

          return state;
        });
      }

      if (typeof onFocus === 'function') {
        onFocus(event, getCountryData());
      }

      window.setTimeout(cursorToEnd, 10);
    },
    [cursorToEnd, disableCountryCode, getCountryData, inputRef, onFocus]
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      // value is from props, not event.
      if (value === '') {
        setState((state: State): State => {
          return {
            ...state,
          };
        });
      }

      if (onBlur instanceof Function && typeof isValid === 'function') {
        const valid = isValid(
          state.formattedNumber.replace(/\D/g, ''),
          state.selectedCountry?.format?.replace(/[^.]/g, '')
        );

        onBlur(event, getCountryData(), valid);
      }
    },
    [
      value,
      onBlur,
      getCountryData,
      state.formattedNumber,
      state.selectedCountry?.format,
    ]
  );

  // Jump to searched country
  const [, setSearch] = useState<string>('');

  const searchCountry = useCallback<() => void>((): void => {
    setSearch((search) => {
      setActiveIndex(getProbableCandidateIndex(search, filteredCountries));

      return '';
    });
  }, [filteredCountries]);

  const debouncedQueryStingSearcher = useMemo<() => void>((): (() => void) => {
    return debounce(searchCountry, 250, { isImmediate: false });
  }, [searchCountry]);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        rootRef.current !== null &&
        event.relatedTarget instanceof HTMLElement &&
        !rootRef.current.contains(event.relatedTarget)
      ) {
        setOpen(false);

        setFilterOrig('');
      }
    },
    []
  );

  const onDivKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (!open || disabled) {
        return;
      }

      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Escape':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Backspace': {
          event.preventDefault();

          break;
        }

        default: {
          break;
        }
      }

      switch (event.key) {
        case 'ArrowDown': {
          setActiveIndex((index) => {
            return (index + 1) % filteredCountries.length;
          });

          break;
        }

        case 'ArrowUp': {
          setActiveIndex((index: number): number => {
            return (
              (index - 1 + filteredCountries.length) % filteredCountries.length
            );
          });

          break;
        }

        case 'Enter': {
          setActiveIndex((index: number): number => {
            const country =
              index >= 0 && index < filteredCountries.length
                ? filteredCountries[index]
                : undefined;

            if (typeof country !== 'undefined') {
              onSelect(country);
            }

            return index;
          });
          break;
        }

        case 'Escape': {
          setOpen(() => {
            window.setTimeout(cursorToEnd, 0);

            return false;
          });

          setFilterOrig('');

          break;
        }

        case 'Backspace': {
          setSearch((search: string): string => {
            debouncedQueryStingSearcher();

            return search.slice(0, -1);
          });

          break;
        }

        default: {
          const key = event.key.toLowerCase();

          if (key.length === 1 && /[ a-z]/.test(key)) {
            setSearch((search: string): string => {
              debouncedQueryStingSearcher();

              return search + key;
            });
          }

          break;
        }
      }
    },
    [
      open,
      disabled,
      filteredCountries,
      onSelect,
      cursorToEnd,
      debouncedQueryStingSearcher,
    ]
  );

  const handleInputKeyDown = useCallback<
    KeyboardEventHandler<HTMLInputElement>
  >(
    (event): void => {
      event.stopPropagation();

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
      } else {
        switch (event.key) {
          case 'Enter': {
            if (typeof onEnterKeyPress === 'function') {
              onEnterKeyPress(event);
            }
          }
        }
      }
    },
    [onEnterKeyPress, onKeyDown]
  );

  const handleOptionKeyDown = useCallback<KeyboardEventHandler<HTMLLIElement>>(
    (event): void => {
      event.stopPropagation();

      switch (event.key) {
        case 'Enter': {
          break;
        }
        case 'Escape': {
          break;
        }
        case 'ArrowUp': {
          break;
        }
        case 'ArrowDown': {
          break;
        }

        default: {
          break;
        }
      }
    },
    []
  );

  const handleKeyUp = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      if (onKeyUp instanceof Function) {
        const valid = isValid(
          state.formattedNumber.replace(/\D/g, ''),
          state.selectedCountry?.format?.replace(/[^.]/g, '')
        );

        onKeyUp(event, valid);
      }
    },
    [onKeyUp, state.formattedNumber, state.selectedCountry?.format]
  );

  const flag_ClassName = useMemo<string>(() => {
    const value =
      typeof state.selectedCountry === 'undefined'
        ? defaultCountry
        : state.selectedCountry.iso2;

    return classnames(flagClassName, flagsBgClasses[value]);
  }, [defaultCountry, flagClassName, state.selectedCountry]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const onButtonKeyUp = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
    (event): void => {
      event.stopPropagation();

      switch (event.key) {
        case ' ': {
          searchInputRef.current?.focus();

          break;
        }

        case 'Enter': {
          searchInputRef.current?.focus();

          break;
        }

        case 'Tab': {
          searchInputRef.current?.focus();

          break;
        }

        default: {
          searchInputRef.current?.focus();

          break;
        }
      }
    },
    []
  );

  const onCountryCodeSearchChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((event): void => {
    event.stopPropagation();

    const {
      target: { value },
    } = event;

    setActiveIndex(0);

    setFilterOrig(value);
  }, []);

  const isInvalid = invalid && !valid && isTouched;

  const className = classnames(inputClassName, {
    [validClassName]: valid && isTouched,
    [invalidClassName]: invalid && isTouched,
    [inputUnTouchedClassName]: valid || !isTouched,
    [inputTouchedClassName]: !disabled && !valid && isTouched,
  });

  const buttonClassName = classnames(dropdownButtonClassName, {
    [validClassName]: valid && isTouched,
    [invalidClassName]: invalid && isTouched,
  });

  return (
    <div className={containerClassName}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='listbox'
        onClick={onDropdownClick}
        onKeyUp={onButtonKeyUp}
        disabled={disableDropdown}
        className={buttonClassName}
        aria-label={
          state.selectedCountry
            ? `${state.selectedCountry.name}: + ${state.selectedCountry.dialCode}`
            : ''
        }
      >
        <span role='img' aria-hidden className={flag_ClassName} />

        {disableDropdown ? null : (
          <span
            role='img'
            aria-hidden
            data-expanded={open}
            className={dropdownButtonIconClassName}
          />
        )}
      </button>

      <input
        id={id}
        type='tel'
        name={name}
        ref={inputRef}
        disabled={disabled}
        required={required}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        className={className}
        onChange={handleChange}
        onFocus={handleInputFocus}
        autoComplete={autoComplete}
        value={state.formattedNumber}
        onKeyDown={handleInputKeyDown}
        data-testid={dataTestId}
        {...inputExtraProps}
      />

      <div
        ref={rootRef}
        aria-expanded={open}
        onBlur={handleDivBlur}
        onKeyDown={onDivKeyDown}
        className={classnames(listContainerClassName, {
          [hiddenClassName]: !open,
        })}
        aria-invalid={isInvalid}
      >
        <Listbox
          id={id}
          open={open}
          filter={filter}
          onSelect={onSelect}
          activeIndex={activeIndex}
          localization={localization}
          searchInputId={`${id}-search`}
          searchInputRef={searchInputRef}
          searchClassName={searchClassName}
          searchInputLabel={searchInputLabel}
          listBoxClassName={listBoxClassName}
          onOptionKeyDown={handleOptionKeyDown}
          filteredCountries={filteredCountries}
          enableSearchField={enableSearchField}
          disableSearchIcon={disableSearchIcon}
          searchPlaceholder={searchPlaceholder}
          flagClassName={flagClassName}
          searchIconClassName={searchIconClassName}
          listboxItemClassName={listboxItemClassName}
          searchLabelClassName={searchLabelClassName}
          listboxDividerClassName={listboxDividerClassName}
          listboxItemNameClassName={listboxItemNameClassName}
          preferredLength={filteredPreferredCountries.length}
          listboxItemIconClassName={listboxItemIconClassName}
          listboxItemDescClassName={listboxItemDescClassName}
          searchContainerClassName={searchContainerClassName}
          onCountryCodeSearchChange={onCountryCodeSearchChange}
          noEntriesMessageClassName={noEntriesMessageClassName}
        />
      </div>
    </div>
  );
}

export const PhoneInput: ComponentType<Props> = memo<Props>(F_PhoneInput);

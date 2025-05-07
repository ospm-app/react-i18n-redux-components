import {
  memo,
  useMemo,
  type JSX,
  type RefObject,
  type ComponentType,
  type ChangeEventHandler,
  type KeyboardEventHandler as ReactKeyboardEventHandler,
} from 'react';

import { Option } from 'library/intl/phone-input/option.tsx';
import { CountryCodeSearchField } from 'library/intl/phone-input/country-code-search-field.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { Country, Localization } from 'library/intl/phone-input/types.ts';

type Props = {
  id: string;
  open: boolean;
  filter: string;
  activeIndex: number;
  flagClassName: string;
  searchInputId: string;
  preferredLength: number;
  searchClassName: string;
  listBoxClassName: string;
  enableSearchField: boolean;
  disableSearchIcon: boolean;
  searchIconClassName: string;
  listboxItemClassName: string;
  searchLabelClassName: string;
  listboxDividerClassName: string;
  searchInputLabel: IntlMessageId;
  listboxItemNameClassName: string;
  listboxItemIconClassName: string;
  listboxItemDescClassName: string;
  searchContainerClassName: string;
  searchPlaceholder: IntlMessageId;
  noEntriesMessageClassName: string;
  localization: Readonly<Localization>;
  onSelect: (country: Readonly<Country>) => void;
  readonly filteredCountries: ReadonlyArray<Country>;
  onOptionKeyDown: ReactKeyboardEventHandler<HTMLLIElement>;
  onCountryCodeSearchChange: ChangeEventHandler<HTMLInputElement>;
  searchInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function F_Listbox({
  id,
  open,
  filter,
  onSelect,
  activeIndex,
  localization,
  flagClassName,
  searchInputId,
  searchInputRef,
  onOptionKeyDown,
  searchClassName,
  preferredLength,
  listBoxClassName,
  searchInputLabel,
  enableSearchField,
  disableSearchIcon,
  filteredCountries,
  searchPlaceholder,
  searchIconClassName,
  listboxItemClassName,
  searchLabelClassName,
  listboxDividerClassName,
  listboxItemNameClassName,
  listboxItemIconClassName,
  listboxItemDescClassName,
  searchContainerClassName,
  onCountryCodeSearchChange,
  noEntriesMessageClassName,
}: Props): JSX.Element {
  const countryDropdownList = useMemo<Array<JSX.Element>>(() => {
    const countryDropdownList = filteredCountries.map(
      (country: Country, index: number): JSX.Element => {
        return (
          <Option
            key={country.iso2 + country.dialCode}
            country={country}
            onSelect={onSelect}
            localization={localization}
            id={`${id}-option-${index}`}
            onOptionKeyDown={onOptionKeyDown}
            active={open && activeIndex === index}
            flagClassName={flagClassName}
            listboxItemClassName={listboxItemClassName}
            listboxItemNameClassName={listboxItemNameClassName}
            listboxItemIconClassName={listboxItemIconClassName}
            listboxItemDescClassName={listboxItemDescClassName}
          />
        );
      }
    );

    // let's insert a dashed line in between preferred countries and the rest
    if (preferredLength > 0 && preferredLength !== filteredCountries.length) {
      const dashedLi = <li key='dashes' className={listboxDividerClassName} />;

      countryDropdownList.splice(preferredLength, 0, dashedLi);
    }

    return countryDropdownList;
  }, [
    activeIndex,
    filteredCountries,
    id,
    flagClassName,
    listboxDividerClassName,
    listboxItemClassName,
    listboxItemDescClassName,
    listboxItemIconClassName,
    listboxItemNameClassName,
    localization,
    onOptionKeyDown,
    onSelect,
    open,
    preferredLength,
  ]);

  return (
    <>
      <CountryCodeSearchField
        open={open}
        filter={filter}
        id={searchInputId}
        onChange={onCountryCodeSearchChange}
        inputRef={searchInputRef}
        activeIndex={activeIndex}
        searchClassName={searchClassName}
        searchInputLabel={searchInputLabel}
        disableSearchIcon={disableSearchIcon}
        searchPlaceholder={searchPlaceholder}
        searchIconClassName={searchIconClassName}
        searchLabelClassName={searchLabelClassName}
        searchContainerClassName={searchContainerClassName}
      />

      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <ul
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role='listbox'
        tabIndex={0}
        id={`${id}-listbox`}
        aria-activedescendant={
          !enableSearchField && activeIndex !== -1
            ? `${id}-option-${activeIndex}`
            : ''
        }
        className={listBoxClassName}
      >
        {countryDropdownList.length > 0 ? (
          countryDropdownList
        ) : (
          <li className={noEntriesMessageClassName}>
            <span> </span>
          </li>
        )}
      </ul>
    </>
  );
}

export const Listbox: ComponentType<Props> = memo<Props>(F_Listbox);

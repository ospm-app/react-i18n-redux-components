import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';

import { scrollToElement } from 'utils/scroll.ts';

import * as flagsBgClasses from 'styles/flags.module.css';

import type { Country, Localization } from 'library/intl/phone-input/types.ts';

function getDropdownCountryName(
  country: Readonly<Country>,
  localization: Readonly<Localization>
): string {
  return (
    (localization[country.name] ?? '') ||
    (localization[country.iso2] ?? '') ||
    country.name
  );
}

type Props = {
  id: string;
  active: boolean;
  flagClassName: string;
  country: Readonly<Country>;
  listboxItemClassName: string;
  listboxItemNameClassName: string;
  listboxItemIconClassName: string;
  listboxItemDescClassName: string;
  localization: Readonly<Localization>;
  onSelect: (country: Readonly<Country>) => void;
  onOptionKeyDown: KeyboardEventHandler<HTMLLIElement>;
};

function F_Option({
  id,
  active,
  country,
  onSelect,
  localization,
  flagClassName,
  onOptionKeyDown,
  listboxItemClassName,
  listboxItemNameClassName,
  listboxItemIconClassName,
  listboxItemDescClassName,
}: Props): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    if (active) {
      scrollToElement(itemRef.current);
    }
  }, [active]);

  const onClick = useCallback<() => void>((): void => {
    onSelect(country);
  }, [country, onSelect]);

  const flag_ClassName = useMemo<string>(() => {
    return classnames(
      flagClassName,
      listboxItemIconClassName,
      flagsBgClasses[country.iso2]
    );
  }, [country.iso2, listboxItemIconClassName, flagClassName]);

  const dropdownCountryName = useMemo<string>(() => {
    return getDropdownCountryName(country, localization);
  }, [country, localization]);

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    <li
      id={id}
      tabIndex={0}
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='option'
      ref={itemRef}
      onClick={onClick}
      aria-current={active}
      onKeyDown={onOptionKeyDown}
      aria-selected={active}
      className={listboxItemClassName}
    >
      <div className={flag_ClassName} />

      <span className={listboxItemNameClassName}>{dropdownCountryName}</span>

      <span className={listboxItemDescClassName}>+{country.dialCode}</span>
    </li>
  );
}

export const Option: ComponentType<Props> = memo<Props>(F_Option);

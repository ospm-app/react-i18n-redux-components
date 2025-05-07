import {
  memo,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type ComponentType,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import { SearchIcon } from 'svg/search.tsx';

import { Label } from 'library/intl/label.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  id: string;
  open: boolean;
  filter: string;
  activeIndex: number;
  searchClassName: string;
  disableSearchIcon: boolean;
  searchIconClassName: string;
  searchLabelClassName: string;
  searchInputLabel: IntlMessageId;
  searchContainerClassName: string;
  searchPlaceholder: IntlMessageId;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function F_CountryCodeSearchField({
  id,
  open,
  filter,
  onChange,
  inputRef,
  activeIndex,
  searchClassName,
  searchInputLabel,
  disableSearchIcon,
  searchPlaceholder,
  searchIconClassName,
  searchLabelClassName,
  searchContainerClassName,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      switch (event.key) {
        case 'Enter': {
          break;
        }
        case 'Escape': {
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          break;
        }
        case 'ArrowDown': {
          event.preventDefault();

          break;
        }
        case 'Backspace': {
          break;
        }

        default: {
          break;
        }
      }
    },
    []
  );

  useEffect((): void => {
    if (open && inputRef?.current != null) {
      inputRef.current.focus();
    }
  }, [inputRef, open]);

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <div
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='combobox'
      aria-expanded
      aria-haspopup='listbox'
      aria-controls={`${id}-listbox`}
      className={searchContainerClassName}
    >
      <Label
        id={id}
        required={false}
        label={searchInputLabel}
        className={searchLabelClassName}
      />

      {disableSearchIcon ? null : (
        <div
          role='img'
          aria-label='Magnifying glass'
          className={searchIconClassName}
        >
          <SearchIcon />
        </div>
      )}

      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <input
        tabIndex={0}
        type='search'
        ref={inputRef}
        value={filter}
        id={`${id}-search`}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name='country-search'
        aria-autocomplete='list'
        aria-controls={`${id}-listbox`}
        placeholder={t(searchPlaceholder)}
        aria-activedescendant={
          activeIndex === -1 ? '' : `${id}-option-${activeIndex}`
        }
        className={searchClassName}
      />
    </div>
  );
}

export const CountryCodeSearchField: ComponentType<Props> = memo<Props>(
  F_CountryCodeSearchField
);

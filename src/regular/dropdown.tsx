import {
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { DropdownOption } from 'library/regular/dropdown-option.tsx';

import { ArrowUpIcon } from 'svg/arrow-up.tsx';

import type { Option } from 'types/common.ts';
import type { IntlMessageId, Locale } from 'const/intl/index.ts';

type Props<Label extends string> = {
  id: string;
  value: Locale;
  divClassName: string;
  listClassName: string;
  listItemClassName: string;
  'aria-label': IntlMessageId;
  hiddenListClassName: string;
  toggleButtonClassName: string;
  listItemButtonClassName: string;
  onChange: (next: Locale) => void;
  toggleButtonLabelClassName: string;
  toggleButtonIconClassName: string;
  listItemButtonLabelClassName: string;
  toggleButtonArrowClassNameOpen: string;
  toggleButtonArrowClassNameClosed: string;
  readonly options: ReadonlyArray<Option<Locale, Label>>;
};

function F_Dropdown<Label extends string>({
  id,
  value,
  options,
  onChange,
  divClassName,
  listClassName,
  listItemClassName,
  hiddenListClassName,
  toggleButtonClassName,
  'aria-label': ariaLabel,
  listItemButtonClassName,
  toggleButtonIconClassName,
  toggleButtonLabelClassName,
  listItemButtonLabelClassName,
  toggleButtonArrowClassNameOpen,
  toggleButtonArrowClassNameClosed,
}: Props<Label>): JSX.Element {
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (typeof timeoutRef.current === 'number') {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const [active, setActive] = useState<number>(0);

  const [selected, setSelected] = useState<number>(-1);

  const current = useMemo<Readonly<Option<Locale, Label>> | undefined>(() => {
    const index = Math.max(
      0,
      options.findIndex((option): boolean => {
        return option.value === value;
      })
    );

    return options[index];
  }, [options, value]);

  useEffect((): void => {
    if (!open) {
      return;
    }

    const index =
      typeof current === 'undefined' ? -1 : options.indexOf(current);

    setActive(index === -1 ? 0 : index);
    setSelected(index);
  }, [open, current, options]);

  const listRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event): void => {
      event.stopPropagation();

      setOpen((open: boolean): boolean => {
        if (!open) {
          timeoutRef.current = window.setTimeout((): void => {
            if (listRef.current !== null) {
              listRef.current.focus();
            }
          }, 0);
        }

        return !open;
      });
    },
    []
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLUListElement>>(
    (event) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'End':
        case 'Home':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft': {
          event.preventDefault();

          break;
        }

        default: {
          break;
        }
      }

      switch (event.key) {
        case 'Enter':
        case ' ': {
          setOpen((open: boolean): boolean => {
            if (open) {
              setActive((active: number): number => {
                const option = active === -1 ? undefined : options[active];

                if (typeof option !== 'undefined') {
                  onChange(option.value);
                }

                return active;
              });

              if (buttonRef.current !== null) {
                buttonRef.current.focus();
              }

              return false;
            }

            return true;
          });

          break;
        }

        case 'Escape': {
          if (buttonRef.current !== null) {
            buttonRef.current.focus();
          }

          setOpen(false);

          break;
        }

        case 'End': {
          setActive(options.length - 1);

          break;
        }

        case 'Home': {
          setActive(0);

          break;
        }

        case 'ArrowUp':
        case 'ArrowLeft': {
          setActive((active: number): number => {
            return (active - 1 + options.length) % options.length;
          });

          break;
        }

        case 'ArrowDown':
        case 'ArrowRight': {
          setActive((active: number): number => {
            return (active + 1) % options.length;
          });

          break;
        }

        default: {
          break;
        }
      }
    },
    [options, onChange]
  );

  const onClick = useCallback<(value: Locale) => void>(
    (value): void => {
      onChange(value);

      setOpen(false);
    },
    [onChange]
  );

  const onBlur = useCallback<FocusEventHandler<HTMLDivElement>>((event) => {
    if (
      event.relatedTarget instanceof HTMLElement &&
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setOpen(false);
    }
  }, []);

  const ariaLabelMemo = useMemo<string>(() => {
    return t(ariaLabel);
  }, [ariaLabel, t]);

  const listboxId = `dropdown-${id}-listbox`;

  const activeOption = active === -1 ? undefined : options[active];

  const label = current?.label ?? null;

  const toggledListClassName = classnames(listClassName, {
    [hiddenListClassName]: !open,
  });

  const toggleButtonArrowClassNameMemo = useMemo<string>(() => {
    return classnames(toggleButtonIconClassName, {
      [toggleButtonArrowClassNameOpen]: open,
      [toggleButtonArrowClassNameClosed]: !open,
    });
  }, [
    open,
    toggleButtonIconClassName,
    toggleButtonArrowClassNameClosed,
    toggleButtonArrowClassNameOpen,
  ]);

  return (
    <div className={divClassName} onBlur={onBlur}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <button
        id={id}
        type='button'
        ref={buttonRef}
        aria-expanded={open}
        aria-haspopup='listbox'
        onClick={toggleDropdown}
        aria-controls={listboxId}
        aria-label={ariaLabelMemo}
        className={toggleButtonClassName}
      >
        {typeof label !== 'undefined' && label !== null ? (
          <span className={toggleButtonLabelClassName}>{label}</span>
        ) : null}

        <span
          role='img'
          aria-hidden
          data-expanded={open}
          className={toggleButtonArrowClassNameMemo}
        >
          <ArrowUpIcon />
        </span>
      </button>

      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <ul
        tabIndex={0}
        ref={listRef}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role='listbox'
        id={listboxId}
        aria-expanded={open}
        onKeyDown={onKeyDown}
        className={toggledListClassName}
        aria-activedescendant={
          typeof activeOption === 'undefined'
            ? ''
            : `dropdown-${id}-option-${activeOption.value}`
        }
      >
        {options.map(({ value, label }, index): JSX.Element => {
          return (
            <DropdownOption
              value={value}
              label={label}
              onClick={onClick}
              key={value.toString()}
              active={active === index}
              selected={selected === index}
              id={`dropdown-${id}-option-${value}`}
              listItemClassName={listItemClassName}
              listItemButtonClassName={listItemButtonClassName}
              listItemButtonLabelClassName={listItemButtonLabelClassName}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const Dropdown = reactMemo(F_Dropdown);

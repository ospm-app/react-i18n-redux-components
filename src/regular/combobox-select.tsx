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

import { reactMemo } from 'utils/react-memo.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import {
  changeSelect,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';
import { useAppDispatch } from 'state/store.ts';

import { ChevronRightIcon } from 'svg/chevron-right.tsx';

import { ComboboxSelectLi } from 'library/regular/combobox-select-li.tsx';

import type { SelectOption } from 'library/types.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  disabled?: boolean;
  listClassName: string;
  optionClassName: string;
  selectClassName: string;
  selectDivClassName: string;
  selectValueClassName: string;
  selectIconClassName: string;
  selectButtonClassName: string;
  readonly options: ReadonlyArray<SelectOption>;
  field: Readonly<SelectField<string, FormName, FieldName>>;
  onChange?:
    | ((
        value: string | undefined,
        field: Readonly<SelectField<string, FormName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string | undefined,
        field: Readonly<SelectField<string, FormName>>
      ) => void)
    | undefined;
};

function F_ComboboxSelect<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  field,
  onBlur,
  options,
  onChange,
  listClassName,
  optionClassName,
  selectClassName,
  selectDivClassName,
  selectIconClassName,
  selectValueClassName,
  selectButtonClassName,
  disabled = false,
}: Props<FormName, FieldName>): JSX.Element {
  const dispatch = useAppDispatch();

  const onSelectChange = useCallback<
    (
      value: string | undefined,
      field: Readonly<SelectField<string, FormName, FieldName>>
    ) => void
  >(
    (value, field): void => {
      if (typeof onChange === 'function') {
        onChange(value, field);
      } else {
        dispatch(changeSelect({ path: field.path, value }));
      }
    },
    [dispatch, onChange]
  );

  const onSelectBlur = useCallback<
    (
      value: string | undefined,
      field: Readonly<SelectField<string, FormName, FieldName>>
    ) => void
  >(
    (value, field): void => {
      if (typeof onBlur === 'function') {
        onBlur(value, field);
      }
    },
    [onBlur]
  );

  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect((): void => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect((): void => {
    let index = options.findIndex((option): boolean => {
      return option.value === field.value;
    });

    if (index === -1 && options.length > 0 && open) {
      index = 0;
    }

    if (open && listRef.current !== null) {
      listRef.current.focus();
    }

    setActiveIndex(index);

    setSelectedIndex(index);
  }, [open, options, field.value]);

  const toggleDropdown = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      event.preventDefault();

      setOpen(toggleBoolean);
    },
    []
  );

  const selectOption = useCallback<(index: number) => void>(
    (index) => {
      if (buttonRef.current !== null) {
        buttonRef.current.focus();
      }

      if (typeof onSelectChange === 'function') {
        const option = options[index];

        if (typeof option !== 'undefined') {
          onSelectChange(option.value, field);
        }
      }

      setOpen(false);
    },
    [field, options, onSelectChange]
  );

  const onKeyDown = useCallback<
    KeyboardEventHandler<HTMLButtonElement | HTMLUListElement>
  >(
    (event) => {
      event.stopPropagation();

      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'End':
        case 'Home':
        case 'ArrowUp':
        case 'ArrowDown': {
          event.preventDefault();

          break;
        }

        default: {
          break;
        }
      }

      switch (event.key) {
        case 'Enter':
        case ' ':
          setOpen((open: boolean): boolean => {
            if (open) {
              setActiveIndex((index: number): number => {
                if (index !== -1) {
                  selectOption(index);
                }

                return index;
              });
            }

            return true;
          });

          break;

        case 'Escape': {
          setOpen(false);

          if (buttonRef.current !== null) {
            buttonRef.current.focus();
          }

          break;
        }

        case 'End':
          setOpen((open: boolean): boolean => {
            if (open) {
              setActiveIndex(options.length - 1);
            }

            return open;
          });

          break;

        case 'Home':
          setOpen((open: boolean): boolean => {
            if (open) {
              setActiveIndex(0);
            }

            return open;
          });

          break;

        case 'ArrowUp':
          setOpen((open: boolean): boolean => {
            if (open) {
              setActiveIndex((index: number): number => {
                return (index - 1 + options.length) % options.length;
              });
            }

            return true;
          });

          break;

        case 'ArrowDown':
          setOpen((open: boolean): boolean => {
            if (open) {
              setActiveIndex((index: number): number => {
                return (index + 1) % options.length;
              });
            }

            return true;
          });

          break;

        default:
          break;
      }
    },
    [selectOption, options.length]
  );

  const ref = useRef<HTMLDivElement>(null);

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event): void => {
      event.stopPropagation();

      if (
        !(
          ref.current !== null &&
          event.relatedTarget instanceof HTMLElement &&
          !ref.current.contains(event.relatedTarget)
        )
      ) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      setOpen(false);

      setActiveIndex((index: number): number => {
        if (onSelectBlur instanceof Function) {
          const option = index >= 0 ? options[index] : undefined;

          onSelectBlur(
            typeof option === 'undefined' ? field.value : option.value,
            field
          );
        }

        return index;
      });
    },
    [field, onSelectBlur, options]
  );

  const currentMemo = useMemo<Readonly<SelectOption> | undefined>(() => {
    const value = field.value;

    return options.find((option: SelectOption): boolean => {
      return option.value === value;
    });
  }, [field.value, options]);

  const invalid = !field.valid && field.invalid && field.isTouched;

  return (
    <div ref={ref} className={selectDivClassName} onBlur={onDivBlur}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <button
        id={id}
        type='button'
        ref={buttonRef}
        aria-expanded={open}
        onKeyDown={onKeyDown}
        aria-haspopup='listbox'
        onClick={toggleDropdown}
        className={selectClassName}
        data-invalid={invalid}
        aria-labelledby={`${id}-label`}
        aria-controls={`${id}-owned_listbox`}
      >
        <div className={selectValueClassName}>
          {typeof currentMemo === 'undefined' ? '' : currentMemo.label}
        </div>

        <button type='button' className={selectButtonClassName}>
          <span
            role='img'
            aria-hidden
            data-expanded={open}
            className={selectIconClassName}
            aria-controls={`${id}-owned_listbox`}
          >
            <ChevronRightIcon />
          </span>
        </button>
      </button>

      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <ul
        tabIndex={0}
        ref={listRef}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role='listbox'
        aria-expanded={open}
        onKeyDown={onKeyDown}
        className={listClassName}
        id={`${id}-owned_listbox`}
        aria-activedescendant={
          activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`
        }
      >
        {options.map((option: SelectOption, index: number): JSX.Element => {
          return (
            <ComboboxSelectLi
              id={id}
              index={index}
              option={option}
              key={option.value}
              onSelect={selectOption}
              className={optionClassName}
              active={open && index === activeIndex}
              selected={open && index === selectedIndex}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const ComboboxSelect = reactMemo(F_ComboboxSelect);

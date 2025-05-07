import {
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';
import { toggleBoolean } from 'utils/boolean.ts';

import {
  changeSelect,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { Option } from 'library/regular/option.tsx';

import { ArrowUpIcon } from 'svg/arrow-up.tsx';

import { useAppDispatch } from 'state/store.ts';

import type {
  SelectField,
  ChangeSelectPayload,
} from 'state/reducers/forms/types.ts';
import type { SelectOption } from 'library/types.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

type Props<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  disabled?: boolean;
  id: string;
  invalid: boolean;
  listClassName: string;
  validClassName: string;
  hiddenClassName: string;
  optionClassName: string;
  invalidClassName: string;
  selectDivClassName: string;
  inputTouchedClassName: string;
  readonlyInputClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  readonly options: ReadonlyArray<SelectOption<Value>>;
  field: Readonly<SelectField<Value, FormName, FieldName>>;
  placeholder?: IntlMessageId | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;

  onChange?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: Value | undefined,
        field: Readonly<SelectField<Value, FormName, FieldName>>
      ) => void)
    | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

function F_Combobox<
  Value extends string | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  field,
  onBlur,
  invalid,
  onFocus,
  options,
  inputRef,
  onChange,
  onKeyDown,
  placeholder,
  listClassName,
  validClassName,
  hiddenClassName,
  optionClassName,
  invalidClassName,
  selectDivClassName,
  inputTouchedClassName,
  readonlyInputClassName,
  inputUnTouchedClassName,
  selectButtonIconClassName,
  disabled = false,
}: Props<Value, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onSelectChange = useCallback<
    (
      value: Value,
      field: Readonly<SelectField<Value, FormName, FieldName>>
    ) => void
  >(
    (value, field) => {
      const payload: ChangeSelectPayload = {
        path: field.path,
        value,
      };

      dispatch(changeSelect(payload));

      if (typeof onChange === 'function') {
        onChange(value, field);
      }
    },
    [dispatch, onChange]
  );

  const onSelectBlur = useCallback<
    (
      value: Value | undefined,
      field: Readonly<SelectField<Value, FormName, FieldName>>
    ) => void
  >(
    (value, field) => {
      if (typeof onBlur === 'function') {
        onBlur(value, field);
      }
    },
    [onBlur]
  );

  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect((): void => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  const listRef = useRef<HTMLUListElement>(null);

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
  }, [open, options, field.value]);

  const toggleDropdown = useCallback<MouseEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();
      event.preventDefault();

      if (!open && typeof onFocus === 'function') {
        onFocus(field.value, field);
      }

      setOpen(toggleBoolean);
    },
    [field, onFocus, open]
  );

  const selectOption = useCallback<(index: number) => void>(
    (index) => {
      if (inputRef?.current != null) {
        inputRef.current.focus();
      }

      if (typeof onSelectChange === 'function') {
        const option = options[index];

        if (typeof option !== 'undefined') {
          onSelectChange(option.value, field);
        }
      }

      setOpen(false);
    },
    [inputRef, onSelectChange, options, field]
  );

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
      }

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
        case ' ': {
          if (open && activeIndex !== -1) {
            selectOption(activeIndex);
          }

          setOpen(true);

          break;
        }

        case 'Escape': {
          setOpen(false);

          if (inputRef?.current != null) {
            inputRef.current.focus();
          }

          break;
        }

        case 'End': {
          if (open) {
            setActiveIndex(options.length - 1);
          }

          break;
        }

        case 'Home': {
          if (open) {
            setActiveIndex(0);
          }

          break;
        }

        case 'ArrowUp': {
          if (open) {
            setActiveIndex((index: number): number => {
              return (index - 1 + options.length) % options.length;
            });
          }

          setOpen(true);

          break;
        }

        case 'ArrowDown': {
          if (open) {
            setActiveIndex((index) => {
              return (index + 1) % options.length;
            });
          }

          setOpen(true);

          break;
        }

        default: {
          break;
        }
      }
    },
    [onKeyDown, open, activeIndex, selectOption, inputRef, options.length]
  );

  const onUlKeyDown = useCallback<KeyboardEventHandler<HTMLUListElement>>(
    (event): void => {
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
        case ' ': {
          if (open) {
            if (activeIndex !== -1) {
              selectOption(activeIndex);
            }
          }

          setOpen(true);

          break;
        }

        case 'Escape': {
          setOpen(false);

          if (inputRef?.current != null) {
            inputRef.current.focus();
          }

          break;
        }

        case 'End': {
          if (open) {
            setActiveIndex(options.length - 1);
          }

          break;
        }

        case 'Home': {
          if (open) {
            setActiveIndex(0);
          }

          break;
        }

        case 'ArrowUp': {
          if (open) {
            setActiveIndex((index: number): number => {
              return (index - 1 + options.length) % options.length;
            });
          }

          setOpen(true);

          break;
        }

        case 'ArrowDown': {
          if (open) {
            setActiveIndex((index: number): number => {
              return (index + 1) % options.length;
            });
          }

          setOpen(true);

          break;
        }

        default: {
          break;
        }
      }
    },
    [open, activeIndex, selectOption, inputRef, options.length]
  );

  const ref = useRef<HTMLDivElement>(null);

  const onDivBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
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

      if (typeof onSelectBlur === 'function') {
        const option = activeIndex >= 0 ? options[activeIndex] : undefined;

        onSelectBlur(
          typeof option === 'undefined' ? field.value : option.value,
          field
        );
      }
    },
    [activeIndex, field, onSelectBlur, options]
  );

  const placeholderMemo = useMemo<string>(() => {
    return typeof placeholder === 'undefined' ? '' : t(placeholder);
  }, [t, placeholder]);

  const currentOption = useMemo<
    Readonly<SelectOption<Value>> | undefined
  >(() => {
    const value = field.value;

    return options.find((option): boolean => {
      return option.value === value;
    });
  }, [field.value, options]);

  const readonlyInputValue = useMemo<string>(() => {
    return typeof currentOption === 'undefined'
      ? typeof placeholder === 'undefined'
        ? ''
        : t(placeholder)
      : t(currentOption.label);
  }, [currentOption, t, placeholder]);

  const className = classnames(readonlyInputClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
    [inputTouchedClassName]: !disabled && !field.valid && field.isTouched,
  });

  return (
    <div ref={ref} className={selectDivClassName} onBlur={onDivBlur}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <input
        id={id}
        readOnly
        type='button'
        ref={inputRef}
        aria-expanded={open}
        className={className}
        aria-haspopup='listbox'
        onClick={toggleDropdown}
        onKeyDown={onInputKeyDown}
        value={readonlyInputValue}
        aria-labelledby={`${id}-label`}
        aria-controls={`${id}-owned_listbox`}
        data-invalid={invalid}
      />

      <div
        role='img'
        aria-hidden
        data-expanded={open}
        className={selectButtonIconClassName}
        aria-controls={`${id}-owned_listbox`}
      >
        <ArrowUpIcon />
      </div>

      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      <ul
        tabIndex={0}
        ref={listRef}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role='listbox'
        aria-expanded={open}
        onKeyDown={onUlKeyDown}
        className={classnames(listClassName, {
          [hiddenClassName]: !open,
        })}
        id={`${id}-owned_listbox`}
        aria-activedescendant={
          activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`
        }
      >
        {placeholderMemo.length > 0 ? (
          // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
          // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
          <li role='option' aria-selected={false} value={0} hidden>
            {placeholderMemo}
          </li>
        ) : null}

        {options.map((option: SelectOption<Value>): JSX.Element => {
          return (
            <Option<Value>
              key={option.value}
              value={option.value}
              label={option.label}
              optionClassName={optionClassName}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const Combobox = reactMemo(F_Combobox);

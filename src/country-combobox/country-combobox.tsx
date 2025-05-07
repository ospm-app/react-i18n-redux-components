import {
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type RefObject,
  type FocusEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { Label } from 'library/intl/label.tsx';
import { ListBox } from 'library/country-combobox/list-box.tsx';

import {
  changeInput,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import * as enItems from 'app/../scripts/intl/countries-en.json';
import { useAppDispatch } from 'state/store.ts';

import * as flagsBgClasses from 'styles/flags.module.css';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectField } from 'state/reducers/forms/types.ts';
import type { CountryOption } from 'library/country-combobox/types.ts';
import type { Flags } from '/app/valibot.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  id: string;
  name: string;
  disabled: boolean;
  label: IntlMessageId;
  listClassName: string;
  itemClassName: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  flagClassName: string;
  optionFlagClassName: string;
  spanOptionClassName: string;
  iso2List: ReadonlyArray<Flags>;
  required?: boolean | undefined;
  inputSelectedClassName: string;
  dataTestId?: string | undefined;
  inputUnselectedClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  placeholder?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  field: Readonly<SelectField<Flags | '', FormName, FieldName>>;

  onChange?:
    | ((
        value: string,
        field: Readonly<SelectField<Flags | '', FormName, FieldName>>
      ) => void)
    | undefined;
  onSelect?:
    | ((
        value: string,
        field: Readonly<SelectField<Flags | '', FormName, FieldName>>
      ) => void)
    | undefined;
  onFocus?:
    | ((
        value: string,
        field: Readonly<SelectField<Flags | '', FormName, FieldName>>
      ) => void)
    | undefined;
  onBlur?:
    | ((
        value: string,
        field: Readonly<SelectField<Flags | '', FormName, FieldName>>
      ) => void)
    | undefined;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
};

function F_CountryCombobox<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  label,
  field,
  onBlur,
  onFocus,
  inputRef,
  onChange,
  iso2List,
  disabled,
  onSelect,
  onKeyDown,
  description,
  placeholder,
  errorMessage,
  listClassName,
  itemClassName,
  flagClassName,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  fieldsetClassName,
  optionFlagClassName,
  spanOptionClassName,
  inputSelectedClassName,
  inputUnselectedClassName,
  required = true,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<FormName, FieldName>): JSX.Element {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }): void => {
      if (typeof onChange === 'function') {
        onChange(value, field);
      }
    },
    [field, onChange]
  );

  const onInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }): void => {
      if (typeof onBlur === 'function') {
        onBlur(value, field);
      }
    },
    [field, onBlur]
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target }): void => {
      target.select();

      if (typeof onFocus === 'function') {
        onFocus(target.value, field);
      }
    },
    [field, onFocus]
  );

  const onCountrySelect = useCallback<(value: Flags | '') => void>(
    (value) => {
      const valid = required ? value !== '' : false;

      dispatch(
        changeInput({
          path: field.path,
          value,
          valid,
        })
      );

      if (typeof onSelect === 'function') {
        onSelect(value, field);
      }
    },
    [onSelect, required, dispatch, field]
  );

  const initialValues = useMemo<Array<CountryOption<Flags>>>(() => {
    const list: Array<CountryOption<Flags>> = [];

    for (const iso2 of iso2List) {
      try {
        const key = `country.${iso2}` as const;

        const translation = t(key);

        let search = translation.toLocaleLowerCase();

        if (i18n.language !== 'en') {
          const english = enItems[key as keyof typeof enItems];

          if (typeof english !== 'undefined') {
            search += `\n${english.toLowerCase()}`;
          }
        }

        const nextItem = {
          value: iso2,
          label: translation,
          search,
        };

        list.push(nextItem);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else if (typeof error === 'string') {
          console.error(error);
        } else {
          console.error(JSON.stringify(error));
        }
      }
    }

    return list;
  }, [iso2List, t, i18n.language]);

  const [search, setSearch] = useState<string>(() => {
    return field.value === '' ? '' : t(`country.${field.value}`);
  });

  useEffect((): void => {
    if (field.value !== '') {
      setSearch(t(`country.${field.value}`));
    }
  }, [t, field.value]);

  const filtered = useMemo<Array<CountryOption<Flags>>>(() => {
    const searchString = search.trim().toLocaleLowerCase();

    if (searchString === '' || field.value !== '') {
      return [];
    }

    return initialValues.filter((iVal: CountryOption<Flags>): boolean => {
      return iVal.search.includes(searchString);
    });
  }, [search, field.value, initialValues]);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [active, setActive] = useState<number>(-1);

  useEffect((): void => {
    const expand = filtered.length > 0;

    setExpanded(expand);

    if (expand) {
      setActive(0);
    }
  }, [filtered.length]);

  const values = filtered.length > 0 ? filtered : initialValues;

  useEffect((): void => {
    if (expanded) {
      const current = field.value;

      if (current === '') {
        setActive(0);
      } else {
        setActive(
          values.findIndex(({ value }): boolean => {
            return value === current;
          })
        );
      }
    }
  }, [expanded, field.value, values]);

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      switch (event.key) {
        case 'Enter': {
          event.preventDefault();

          const option = active === -1 ? undefined : values[active];

          if (option !== undefined) {
            onCountrySelect(option.value);
            setExpanded(false);
          }

          break;
        }

        case 'Escape': {
          event.preventDefault();
          setExpanded(false);
          setActive(-1);
          inputRef?.current?.focus();
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();

          if (expanded) {
            setActive((active) => {
              return (active + 1) % values.length;
            });
          }

          setExpanded(true);

          break;
        }

        case 'ArrowUp': {
          event.preventDefault();

          if (expanded) {
            setActive((active) => {
              return (active - 1 + values.length) % values.length;
            });
          }

          setExpanded(true);

          break;
        }

        default:
          event.stopPropagation();
          break;
      }

      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
      }
    },
    [onKeyDown, active, values, onCountrySelect, inputRef, expanded]
  );

  const onComboboxFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      onInputFocus(event);
      setExpanded(true);
    },
    [onInputFocus]
  );

  const onClick = useCallback<(value: Flags) => void>(
    (value) => {
      onCountrySelect(value);
      setExpanded(false);
    },
    [onCountrySelect]
  );

  const onComboboxChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setActive(0);
      setSearch(event.target.value);
      onInputChange(event);
      onCountrySelect('');
    },
    [onInputChange, onCountrySelect]
  );

  const onComboboxBlur = useCallback<FocusEventHandler<HTMLDivElement>>(
    (event) => {
      if (
        event.relatedTarget instanceof HTMLElement &&
        event.currentTarget.contains(event.relatedTarget) === false
      ) {
        setExpanded(false);
      }
    },
    []
  );

  const placeholderMemo = useMemo<string>(() => {
    return typeof placeholder !== 'undefined' ? t(placeholder) : '';
  }, [t, placeholder]);

  const inputId = `${id}-search`;

  const invalid =
    field.valid === false && field.invalid === true && field.isTouched;

  const className = classnames(inputClassName, {
    [validClassName]: field.valid === true && field.isTouched,
    [invalidClassName]: field.invalid === true && field.isTouched,
    [inputSelectedClassName]: field.value !== '',
    [inputUnselectedClassName]: field.value === '',
  });

  const flag_ClassName = classnames(
    flagClassName,
    field.value === '' ? '' : flagsBgClasses[field.value],
    {
      [validClassName]: field.valid === true && field.isTouched,
      [invalidClassName]: field.invalid === true && field.isTouched,
    }
  );

  return (
    <fieldset className={fieldsetClassName}>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
      {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
      <div
        role='combobox'
        aria-haspopup='listbox'
        onBlur={onComboboxBlur}
        aria-expanded={expanded}
        aria-controls={`${id}-listbox`}
      >
        <Label
          id={inputId}
          label={label}
          required={required}
          className={labelClassName}
        />

        {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
        <input
          type='text'
          name={name}
          id={inputId}
          ref={inputRef}
          value={search}
          autoCorrect='off'
          disabled={disabled}
          autoCapitalize='on'
          onBlur={onInputBlur}
          className={className}
          autoComplete='country'
          aria-autocomplete='list'
          onFocus={onComboboxFocus}
          onKeyDown={onInputKeyDown}
          onChange={onComboboxChange}
          placeholder={placeholderMemo}
          aria-controls={`${id}-listbox`}
          aria-invalid={required ? invalid : undefined}
          aria-activedescendant={
            values.length === 0 ? undefined : `${id}-option-${field.value}`
          }
          data-testid={dataTestId}
        />

        {field.value === '' ? null : <div className={flag_ClassName} />}

        <ListBox
          id={id}
          active={active}
          values={values}
          onSelect={onClick}
          expanded={expanded}
          currentValue={field.value}
          listClassName={listClassName}
          itemClassName={itemClassName}
          flagClassName={optionFlagClassName}
          hiddenListClassName={hiddenClassName}
          spanOptionClassName={spanOptionClassName}
        />

        <div className={descriptionClassName}>
          {typeof description === 'undefined' ? null : t(description)}
        </div>

        <p className={errorClassName}>
          {invalid === true && typeof errorMessage === 'string'
            ? t(errorMessage)
            : null}
        </p>
      </div>
    </fieldset>
  );
}

export const CountryCombobox = reactMemo(F_CountryCombobox);

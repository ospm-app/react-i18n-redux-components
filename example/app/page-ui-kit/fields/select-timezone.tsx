import {
  memo,
  useId,
  type JSX,
  useCallback,
  type RefObject,
  type ComponentType,
  type KeyboardEventHandler,
} from 'react';
import { shallowEqual } from 'react-redux';

import { validateInput } from 'state/reducers/forms.ts';
import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import { Timezone } from 'library/intl/timezone/index.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitTimezoneField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitTimezoneField;
};

type Props = {
  label: IntlMessageId;
  divClassName: string;
  listClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  optionClassName: string;
  selectClassName: string;
  invalidClassName: string;
  selectDivClassName: string;
  inputTouchedClassName: string;
  readonlyInputClassName: string;
  inputUnTouchedClassName: string;
  selectButtonIconClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  selectRef?: RefObject<HTMLSelectElement | null> | undefined;
  nextInputRef?: RefObject<HTMLTextAreaElement | null> | undefined;
};

function select({
  forms: {
    uiKit: { isFetching, timezone },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: timezone,
  };
}

function F_SelectTimezone({
  label,
  inputRef,
  selectRef,
  description,
  nextInputRef,
  divClassName,
  errorMessage,
  listClassName,
  labelClassName,
  validClassName,
  selectClassName,
  optionClassName,
  hiddenClassName,
  invalidClassName,
  selectDivClassName,
  inputTouchedClassName,
  readonlyInputClassName,
  inputUnTouchedClassName,
  selectButtonIconClassName,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
}: Props): JSX.Element {
  const id = useId();

  const dispatch = useAppDispatch();

  const { disabled, field } = useAppSelector<SelectorProps>(
    select,
    shallowEqual
  );

  const onBlur = useCallback<() => void>(() => {
    dispatch(
      validateInput({
        path: field.path,
        value: field.selectedTimezone,
        valid: typeof field.selectedTimezone !== 'undefined',
        invalid: typeof field.selectedTimezone === 'undefined',
      })
    );
  }, [dispatch, field.path, field.selectedTimezone]);

  const onFocus = useCallback<
    (value: IntlMessageId | undefined, field: UiKitTimezoneField) => void
  >(
    (value, field): void => {
      if (field.isTouched) {
        dispatch(
          validateInput({
            path: field.path,
            value,
            valid: false,
            invalid: false,
          })
        );
      }
    },
    [dispatch]
  );

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      if (event.key === 'Tab') {
        event.preventDefault();

        nextInputRef?.current?.focus();
      }
    },
    [nextInputRef]
  );

  const onSelectKeyDown = useCallback<KeyboardEventHandler<HTMLSelectElement>>(
    (event): void => {
      event.stopPropagation();

      if (event.key === 'Tab') {
        event.preventDefault();

        nextInputRef?.current?.focus();
      }
    },
    [nextInputRef]
  );

  return (
    <Timezone<IntlMessageId | undefined, 'uiKit', 'timezone'>
      name={'timezone'}
      id={id}
      label={label}
      field={field}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      inputRef={inputRef}
      selectRef={selectRef}
      description={description}
      divClassName={divClassName}
      errorMessage={errorMessage}
      listClassName={listClassName}
      errorClassName={errorClassName}
      labelClassName={labelClassName}
      validClassName={validClassName}
      onInputKeyDown={onInputKeyDown}
      hiddenClassName={hiddenClassName}
      selectClassName={selectClassName}
      optionClassName={optionClassName}
      onSelectKeyDown={onSelectKeyDown}
      invalidClassName={invalidClassName}
      selectDivClassName={selectDivClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      readonlyInputClassName={readonlyInputClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      selectButtonIconClassName={selectButtonIconClassName}
    />
  );
}

export const SelectTimezone: ComponentType<Props> = memo(F_SelectTimezone);

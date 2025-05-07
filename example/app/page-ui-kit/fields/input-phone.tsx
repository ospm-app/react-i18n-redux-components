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
import { useTranslation } from 'react-i18next';

import { validateInput } from 'state/reducers/forms.ts';
import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import { InputTelWithLabelAndDescription } from 'library/intl/input-tel-with-label-and-description.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitPhoneField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitPhoneField;
};

type Props = {
  label: IntlMessageId;
  inputClassName: string;
  labelClassName: string;
  validClassname: string;
  buttonClassName: string;
  hiddenClassName: string;
  searchClassName: string;
  invalidClassName: string;
  listBoxClassName: string;
  fieldsetClassName: string;
  containerClassName: string;
  flagClassName: string;
  searchIconClassName: string;
  listboxItemClassName: string;
  searchLabelClassName: string;
  inputTouchedClassName: string;
  listContainerClassName: string;
  searchInputLabel: IntlMessageId;
  dropdownButtonClassName: string;
  listboxDividerClassName: string;
  inputUnTouchedClassName: string;
  listboxItemIconClassName: string;
  listboxItemNameClassName: string;
  listboxItemDescClassName: string;
  searchContainerClassName: string;
  searchPlaceholder: IntlMessageId;
  noEntriesMessageClassName: string;
  dropdownButtonIconClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function selector({
  forms: {
    uiKit: { isFetching, phone },
  },
}: ReduxState): SelectorProps {
  return {
    field: phone,
    disabled: isFetching,
  };
}

function F_InputPhone({
  label,
  inputRef,
  description,
  nextInputRef,
  errorMessage,
  errorClassName,
  inputClassName,
  labelClassName,
  validClassname,
  buttonClassName,
  hiddenClassName,
  searchClassName,
  invalidClassName,
  listBoxClassName,
  searchInputLabel,
  searchPlaceholder,
  fieldsetClassName,
  containerClassName,
  flagClassName,
  searchIconClassName,
  descriptionClassName,
  listboxItemClassName,
  searchLabelClassName,
  inputTouchedClassName,
  listContainerClassName,
  dropdownButtonClassName,
  listboxDividerClassName,
  inputUnTouchedClassName,
  listboxItemIconClassName,
  listboxItemNameClassName,
  listboxItemDescClassName,
  searchContainerClassName,
  noEntriesMessageClassName,
  dropdownButtonIconClassName,
}: Props): JSX.Element {
  const { i18n } = useTranslation();

  const id = useId();

  const dispatch = useAppDispatch();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onBlur = useCallback<
    (value: string, field: UiKitPhoneField, isValid: boolean) => void
  >(
    (value, field, isValid): void => {
      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: isValid,
          invalid: !isValid,
        })
      );
    },
    [dispatch]
  );

  const onFocus = useCallback<(value: string, field: UiKitPhoneField) => void>(
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

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
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
    <InputTelWithLabelAndDescription<'uiKit', 'phone'>
      id={id}
      name='phone'
      label={label}
      field={field}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      inputRef={inputRef}
      onKeyDown={onKeyDown}
      locale={i18n.language}
      description={description}
      errorMessage={errorMessage}
      errorClassName={errorClassName}
      inputClassName={inputClassName}
      labelClassName={labelClassName}
      validClassName={validClassname}
      buttonClassName={buttonClassName}
      hiddenClassName={hiddenClassName}
      searchClassName={searchClassName}
      invalidClassName={invalidClassName}
      listBoxClassName={listBoxClassName}
      searchInputLabel={searchInputLabel}
      fieldsetClassName={fieldsetClassName}
      searchPlaceholder={searchPlaceholder}
      containerClassName={containerClassName}
      flagClassName={flagClassName}
      searchIconClassName={searchIconClassName}
      descriptionClassName={descriptionClassName}
      listboxItemClassName={listboxItemClassName}
      searchLabelClassName={searchLabelClassName}
      inputTouchedClassName={inputTouchedClassName}
      listContainerClassName={listContainerClassName}
      dropdownButtonClassName={dropdownButtonClassName}
      listboxDividerClassName={listboxDividerClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      listboxItemIconClassName={listboxItemIconClassName}
      listboxItemNameClassName={listboxItemNameClassName}
      listboxItemDescClassName={listboxItemDescClassName}
      searchContainerClassName={searchContainerClassName}
      noEntriesMessageClassName={noEntriesMessageClassName}
      dropdownButtonIconClassName={dropdownButtonIconClassName}
    />
  );
}

export const InputPhone: ComponentType<Props> = memo<Props>(F_InputPhone);

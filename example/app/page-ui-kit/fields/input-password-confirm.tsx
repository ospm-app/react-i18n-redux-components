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

import { InputPasswordWithLabelAndDescription } from 'library/intl/input-password-with-label-and-description.tsx';

import type {
  UiKitPasswordField,
  UiKitConfirmPasswordField,
} from 'state/reducers/forms/ui-kit.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  label: IntlMessageId;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  placeholder: IntlMessageId;
  inputIconClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  inputIconButtonClassName: string;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  required?: boolean | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

type SelectorProps = {
  disabled: boolean;
  password: UiKitPasswordField;
  field: UiKitConfirmPasswordField;
};

function selector({
  forms: {
    uiKit: { isFetching, confirmPassword, password },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: confirmPassword,
    password,
  };
}

function F_InputPasswordConfirm({
  label,
  onKeyUp,
  inputRef,
  required,
  description,
  placeholder,
  errorMessage,
  nextInputRef,
  errorClassName,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  fieldsetClassName,
  inputIconClassName,
  descriptionClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  inputIconButtonClassName,
}: Props): JSX.Element {
  const id = useId();

  const dispatch = useAppDispatch();

  const { disabled, field, password } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onChange = useCallback<
    (value: string, field: UiKitConfirmPasswordField) => void
  >(
    (value, field) => {
      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: value === password.value,
          invalid: value !== password.value,
        })
      );
    },
    [dispatch, password.value]
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
    <InputPasswordWithLabelAndDescription<'uiKit', 'confirmPassword'>
      id={id}
      label={label}
      field={field}
      onKeyUp={onKeyUp}
      onBlur={onChange}
      disabled={disabled}
      inputRef={inputRef}
      onChange={onChange}
      required={required}
      onKeyDown={onKeyDown}
      description={description}
      placeholder={placeholder}
      name={'confirm-password'}
      autoComplete='new-password'
      errorMessage={errorMessage}
      errorClassName={errorClassName}
      inputClassName={inputClassName}
      labelClassName={labelClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      fieldsetClassName={fieldsetClassName}
      inputIconClassName={inputIconClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
      inputIconButtonClassName={inputIconButtonClassName}
    />
  );
}

export const InputPasswordConfirm: ComponentType<Props> = memo<Props>(
  F_InputPasswordConfirm
);

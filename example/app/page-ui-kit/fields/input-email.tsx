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

import { changeInput, validateInput } from 'state/reducers/forms.ts';

import { emailRegexp } from 'utils/regexp.ts';

import { InputEmailWithLabelAndDescription } from 'library/intl/input-email-with-label-and-description.tsx';

import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitEmailField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitEmailField;
};

type Props = {
  label: IntlMessageId;
  labelClassName: string;
  inputClassName: string;
  errorClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  placeholder: IntlMessageId;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function selector({
  forms: {
    uiKit: { isFetching, email },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: email,
  };
}

function F_InputEmail({
  label,
  inputRef,
  description,
  placeholder,
  errorMessage,
  nextInputRef,
  labelClassName,
  inputClassName,
  errorClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  fieldsetClassName,
  descriptionClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props): JSX.Element {
  const id = useId();

  const dispatch = useAppDispatch();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onChange = useCallback<(value: string, field: UiKitEmailField) => void>(
    (value, field) => {
      const isValid = emailRegexp(value);
      const { path, valid } = field;

      if (valid === isValid) {
        dispatch(
          changeInput({
            path,
            value,
          })
        );
      } else {
        dispatch(
          validateInput({
            path,
            value,
            valid: isValid,
            invalid: !isValid,
          })
        );
      }
    },
    [dispatch]
  );

  const onBlur = useCallback<(value: string, field: UiKitEmailField) => void>(
    (value, field) => {
      const isValid = emailRegexp(value);

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
    <InputEmailWithLabelAndDescription<'uiKit', 'email'>
      id={id}
      name={'email'}
      label={label}
      field={field}
      onBlur={onBlur}
      disabled={disabled}
      inputRef={inputRef}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete='username'
      description={description}
      placeholder={placeholder}
      errorMessage={errorMessage}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      errorClassName={errorClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      fieldsetClassName={fieldsetClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
    />
  );
}

export const InputEmail: ComponentType<Props> = memo<Props>(F_InputEmail);

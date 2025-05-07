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

import { testPass } from 'utils/regexp.ts';

import { validateInput } from 'state/reducers/forms.ts';
import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import { InputPasswordWithLabelAndDescription } from 'library/intl/input-password-with-label-and-description.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitPasswordField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitPasswordField;
};

type Props = {
  label: IntlMessageId;
  labelClassName: string;
  inputClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  placeholder: IntlMessageId;
  inputIconClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  inputIconButtonClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
};

function selector({
  forms: {
    uiKit: { isFetching, password },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: password,
  };
}

function F_InputPassword({
  label,
  onKeyUp,
  inputRef,
  description,
  placeholder,
  nextInputRef,
  errorMessage,
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

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onChange = useCallback<
    (value: string, field: UiKitPasswordField) => void
  >(
    (value, field) => {
      const isValid = testPass(value);

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
    <InputPasswordWithLabelAndDescription<'uiKit', 'password'>
      id={id}
      label={label}
      field={field}
      name='password'
      onKeyUp={onKeyUp}
      onBlur={onChange}
      disabled={disabled}
      inputRef={inputRef}
      onChange={onChange}
      onKeyDown={onKeyDown}
      description={description}
      placeholder={placeholder}
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

export const InputPassword: ComponentType<Props> = memo<Props>(F_InputPassword);

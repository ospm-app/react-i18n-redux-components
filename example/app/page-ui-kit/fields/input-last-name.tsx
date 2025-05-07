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

import { InputTextWithLabelAndDescription } from 'library/intl/input-text-with-label-and-description.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitLastNameField } from 'state/reducers/forms/ui-kit.tsx';

type SelectorProps = {
  disabled: boolean;
  field: UiKitLastNameField;
};

type Props = {
  label: IntlMessageId;
  divClassName: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  placeholder: IntlMessageId;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function selector({
  forms: {
    uiKit: { isFetching, lastName },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: lastName,
  };
}

function F_InputLastName({
  label,
  inputRef,
  placeholder,
  description,
  divClassName,
  errorMessage,
  nextInputRef,
  errorClassName,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  descriptionClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props): JSX.Element {
  const id = useId();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
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
    <InputTextWithLabelAndDescription<'uiKit', 'lastName'>
      id={id}
      label={label}
      field={field}
      name='lastName'
      inputRef={inputRef}
      disabled={disabled}
      autoComplete='family-name'
      onKeyDown={onKeyDown}
      description={description}
      placeholder={placeholder}
      divClassName={divClassName}
      errorMessage={errorMessage}
      errorClassName={errorClassName}
      inputClassName={inputClassName}
      labelClassName={labelClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
    />
  );
}

export const InputLastName: ComponentType<Props> = memo<Props>(F_InputLastName);

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

import { TextareaWithLabelAndDescription } from 'library/intl/textarea-with-label-and-description.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitMessageField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitMessageField;
};

type Props = {
  label: IntlMessageId;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  fieldsetClassName: string;
  textareaClassName: string;
  placeholder: IntlMessageId;
  textareaTouchedClassName: string;
  textareaUnTouchedClassName: string;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef: RefObject<HTMLTextAreaElement | null> | undefined;
  nextInputRef?: RefObject<HTMLInputElement | null> | undefined;
};

function selector({
  forms: {
    uiKit: { isFetching, message },
  },
}: ReduxState): SelectorProps {
  return {
    field: message,
    disabled: isFetching,
  };
}

function F_TextareaMessage({
  label,
  inputRef,
  description,
  placeholder,
  errorMessage,
  nextInputRef,
  errorClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  fieldsetClassName,
  textareaClassName,
  descriptionClassName,
  textareaTouchedClassName,
  textareaUnTouchedClassName,
}: Props): JSX.Element {
  const id = useId();

  const dispatch = useAppDispatch();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  const onChange = useCallback<
    (value: string, field: UiKitMessageField) => void
  >(
    (value: string, field: UiKitMessageField): void => {
      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: value !== '',
          invalid: value === '',
        })
      );
    },
    [dispatch]
  );

  const onBlur = useCallback<(value: string, field: UiKitMessageField) => void>(
    (value: string, field: UiKitMessageField): void => {
      dispatch(
        validateInput({
          path: field.path,
          value,
          valid: value !== '',
          invalid: value === '',
        })
      );
    },
    [dispatch]
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
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
    <TextareaWithLabelAndDescription<'uiKit', 'message'>
      id={id}
      label={label}
      field={field}
      onBlur={onBlur}
      name={'message'}
      inputRef={inputRef}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      description={description}
      placeholder={placeholder}
      errorMessage={errorMessage}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      validClassName={validClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      fieldsetClassName={fieldsetClassName}
      textareaClassName={textareaClassName}
      descriptionClassName={descriptionClassName}
      textareaTouchedClassName={textareaTouchedClassName}
      textareaUnTouchedClassName={textareaUnTouchedClassName}
    />
  );
}

export const TextareaMessage: ComponentType<Props> =
  memo<Props>(F_TextareaMessage);

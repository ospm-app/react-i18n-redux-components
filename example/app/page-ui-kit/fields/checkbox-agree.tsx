import { useId, type JSX, type RefObject } from 'react';
import { shallowEqual } from 'react-redux';

import { reactMemo } from 'utils/react-memo.ts';

import { CheckboxWithLabelAdnDescription } from 'library/intl/checkbox-with-label-and-description.tsx';

import { useAppSelector, type ReduxState } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { UiKitAgreeField } from 'state/reducers/forms/ui-kit.ts';

type SelectorProps = {
  disabled: boolean;
  field: UiKitAgreeField;
};

type Props<TranslationComponents extends Record<string, JSX.Element>> = {
  label: IntlMessageId;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  checkerClassName: string;
  checkBoxClassName: string;
  fieldsetClassName: string;
  checkMarkClassName: string;
  inputTouchedClassName: string;
  inputUnTouchedClassName: string;

  components: TranslationComponents;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  onChange?: ((checked: boolean, field: UiKitAgreeField) => void) | undefined;
};

function selector({
  forms: {
    uiKit: { agree, isFetching },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: isFetching,
    field: agree,
  };
}

function F_CheckboxAgree<
  TranslationComponents extends Record<string, JSX.Element>,
>({
  label,
  inputRef,
  onChange,
  components,
  description,
  labelClassName,
  inputClassName,
  validClassName,
  hiddenClassName,
  invalidClassName,
  checkerClassName,
  checkBoxClassName,
  fieldsetClassName,
  checkMarkClassName,
  descriptionClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
}: Props<TranslationComponents>): JSX.Element {
  const id = useId();

  const { disabled, field } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  return (
    <CheckboxWithLabelAdnDescription<TranslationComponents, 'uiKit', 'agree'>
      id={id}
      name='agree'
      field={field}
      label={label}
      inputRef={inputRef}
      disabled={disabled}
      onChange={onChange}
      components={components}
      description={description}
      validClassName={validClassName}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      hiddenClassName={hiddenClassName}
      invalidClassName={invalidClassName}
      checkerClassName={checkerClassName}
      fieldsetClassName={fieldsetClassName}
      checkBoxClassName={checkBoxClassName}
      checkMarkClassName={checkMarkClassName}
      descriptionClassName={descriptionClassName}
      inputTouchedClassName={inputTouchedClassName}
      inputUnTouchedClassName={inputUnTouchedClassName}
    />
  );
}

export const CheckboxAgree = reactMemo(F_CheckboxAgree);

import {
  type JSX,
  useCallback,
  type RefObject,
  type ChangeEventHandler,
} from 'react';
import classnames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { CheckCircleIcon } from 'svg/check-circle.tsx';

import {
  changeCheckbox,
  type FormNames,
  type FieldNames,
} from 'state/reducers/forms.ts';

import { useAppDispatch } from 'state/store.ts';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { InputCheckboxField } from 'state/reducers/forms/types.ts';

type Props<
  TranslationComponents extends Record<string, JSX.Element> | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
> = {
  id: string;
  name: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  invalidClassName: string;
  checkerClassName: string;
  fieldsetClassName: string;
  checkBoxClassName: string;
  checkMarkClassName: string;
  inputTouchedClassName: string;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  inputUnTouchedClassName: string;
  label?: IntlMessageId | undefined;
  errorClassName?: string | undefined;
  description?: IntlMessageId | undefined;
  errorMessage?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  components?: TranslationComponents | undefined;
  inputRef?: RefObject<HTMLInputElement | null> | undefined;
  field: InputCheckboxField<FormName, FieldName>;
  dataTestId?: string | undefined;
  onChange?:
    | ((
        checked: boolean,
        field: InputCheckboxField<FormName, FieldName>
      ) => void)
    | undefined;
};

function F_CheckboxWithLabelAdnDescription<
  TranslationComponents extends Record<string, JSX.Element> | undefined,
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  id,
  name,
  field,
  label,
  disabled,
  inputRef,
  onChange,
  components,
  description,
  errorMessage,
  inputClassName,
  labelClassName,
  validClassName,
  hiddenClassName,
  checkerClassName,
  invalidClassName,
  fieldsetClassName,
  checkBoxClassName,
  checkMarkClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  required = true,
  errorClassName = hiddenClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<TranslationComponents, FormName, FieldName>): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.stopPropagation();

      dispatch(
        changeCheckbox({
          path: field.path,
          checked: event.target.checked,
          valid: required ? event.target.checked : false,
        })
      );

      if (typeof onChange === 'function') {
        onChange(event.target.checked, field);
      }
    },
    [onChange, field, dispatch, required]
  );

  const invalid = !field.valid && field.invalid && field.isTouched;

  const className = classnames(inputClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
    [inputUnTouchedClassName]: field.valid || !field.isTouched,
    [inputTouchedClassName]:
      disabled !== true && !field.valid && field.isTouched,
  });

  return (
    <div className={fieldsetClassName}>
      <div className={checkBoxClassName}>
        <input
          id={id}
          name={name}
          ref={inputRef}
          type='checkbox'
          required={required}
          disabled={disabled}
          className={className}
          checked={field.checked}
          onChange={onInputChange}
          data-testid={dataTestId}
        />
        <div className={checkerClassName}>
          {field.checked ? (
            <div className={checkMarkClassName}>
              <CheckCircleIcon />
            </div>
          ) : null}
        </div>
      </div>

      <label htmlFor={id} data-invalid={invalid} className={labelClassName}>
        {typeof label === 'string' ? (
          typeof components === 'undefined' ? (
            t(label)
          ) : (
            <Trans<IntlMessageId> i18nKey={label} components={components} />
          )
        ) : null}
      </label>

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>

      <p className={errorClassName}>
        {invalid && typeof errorMessage === 'string' ? t(errorMessage) : null}
      </p>
    </div>
  );
}

export const CheckboxWithLabelAdnDescription = reactMemo(
  F_CheckboxWithLabelAdnDescription
);

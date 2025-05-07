import { type JSX, useCallback, type ChangeEventHandler } from 'react';
import classnames from 'classnames';

import { reactMemo } from 'utils/react-memo.ts';

import {
  type FormNames,
  type FieldNames,
  changeRadioGroup,
} from 'state/reducers/forms.ts';

import {
  RadioOptionIntl,
  type RadioOption,
} from 'library/intl/radio-option.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { RadioGroupField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  divClassName: string;
  radioGroupName: string;
  inputClassName: string;
  labelClassName: string;
  validClassName: string;
  hiddenClassName: string;
  checkerClassName: string;
  invalidClassName: string;
  checkmarkClassName: string;
  containerClassName: string;
  options: ReadonlyArray<RadioOption>;
  descriptionClassName?: string | undefined;
  field: RadioGroupField<FormName, FieldName>;
  onChange?:
    | ((checked: boolean, field: RadioGroupField<FormName, FieldName>) => void)
    | undefined;
};

function F_RadioWithLabelAndDescriptionGroup<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  field,
  options,
  onChange,
  divClassName,
  inputClassName,
  labelClassName,
  radioGroupName,
  validClassName,
  hiddenClassName,
  required = true,
  disabled = false,
  invalidClassName,
  checkerClassName,
  containerClassName,
  checkmarkClassName,
  descriptionClassName,
}: Props<FormName, FieldName>): JSX.Element {
  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      const {
        target: { checked, id },
      } = event;

      dispatch(
        changeRadioGroup({
          path: field.path,
          selected: id,
          valid: checked,
        })
      );

      if (typeof onChange === 'function') {
        onChange(checked, field);
      }
    },
    [field, onChange, dispatch]
  );

  const invalid = !field.valid && field.invalid && field.isTouched;

  const className = classnames(inputClassName, {
    [validClassName]: field.valid && field.isTouched,
    [invalidClassName]: field.invalid && field.isTouched,
  });

  return (
    <>
      {options.map((option: RadioOption): JSX.Element => {
        return (
          <RadioOptionIntl
            key={option.id}
            option={option}
            invalid={invalid}
            required={required}
            disabled={disabled}
            name={radioGroupName}
            selected={field.selected}
            divClassName={divClassName}
            inputClassName={className}
            onInputChange={onInputChange}
            labelClassName={labelClassName}
            hiddenClassName={hiddenClassName}
            checkerClassName={checkerClassName}
            checkmarkClassName={checkmarkClassName}
            containerClassName={containerClassName}
            descriptionClassName={descriptionClassName}
          />
        );
      })}
    </>
  );
}

export const RadioWithLabelAndDescriptionGroup = reactMemo(
  F_RadioWithLabelAndDescriptionGroup
);

import { type JSX, useCallback, type ChangeEventHandler } from 'react';

import { reactMemo } from 'utils/react-memo.ts';

import {
  type FormNames,
  type FieldNames,
  changeRadioGroup,
} from 'state/reducers/forms.ts';

import { RadioOption } from 'library/regular/radio-option.tsx';

import { useAppDispatch } from 'state/store.ts';

import type { RadioGroupField } from 'state/reducers/forms/types.ts';

type Props<FormName extends FormNames, FieldName extends FieldNames> = {
  required?: boolean;
  divClassName: string;
  radioGroupName: string;
  inputClassName: string;
  labelClassName: string;
  titleClassName: string;
  checkerClassName: string;
  checkmarkClassName: string;
  containerClassName: string;
  options: ReadonlyArray<RadioOption>;
  descriptionClassName: string;
  field: RadioGroupField<FormName, FieldName>;
  onChange?:
    | ((checked: boolean, field: RadioGroupField<FormName, FieldName>) => void)
    | undefined;
};

function F_RadioGroup<
  FormName extends FormNames,
  FieldName extends FieldNames,
>({
  field,
  options,
  onChange,
  divClassName,
  inputClassName,
  labelClassName,
  titleClassName,
  radioGroupName,
  checkerClassName,
  containerClassName,
  checkmarkClassName,
  descriptionClassName,
  required = true,
}: Props<FormName, FieldName>): JSX.Element {
  const dispatch = useAppDispatch();

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.stopPropagation();

      dispatch(
        changeRadioGroup({
          path: field.path,
          selected: event.target.value,
          valid: event.target.checked,
        })
      );

      if (typeof onChange === 'function') {
        onChange(event.target.checked, field);
      }
    },
    [field, onChange, dispatch]
  );

  const invalid = !field.valid && field.invalid && field.isTouched;

  return (
    <>
      {options.map((option: RadioOption): JSX.Element => {
        return (
          <RadioOption
            key={option.value}
            option={option}
            invalid={invalid}
            required={required}
            disabled={option.disabled}
            name={radioGroupName}
            selected={field.selected}
            divClassName={divClassName}
            onInputChange={onInputChange}
            labelClassName={labelClassName}
            titleClassName={titleClassName}
            inputClassName={inputClassName}
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

export const RadioGroup = reactMemo(F_RadioGroup);
